from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from src.db.main import get_session
from .models import Subscriber, SubscriberCreate
from src.auth.utils import create_access_token, decode_token
from src.mail_service import mail, create_message
from src.config import Config
from datetime import timedelta
import json

mail_router = APIRouter()

import logging
import httpx

logger = logging.getLogger(__name__)

async def send_email_background(message, template):
    try:
        await mail.send_message(message, template_name=template)
        logger.info(f"Email sent successfully to {message.recipients}")
    except Exception as e:
        logger.error(f"Failed to send email to {message.recipients}: {str(e)}")

async def trigger_n8n_webhook(data: dict):
    url = Config.N8N_WEBHOOK_URL
    if not url:
        return
        
    async with httpx.AsyncClient() as client:
        try:
            # We don't want to block or fail the request if webhook fails
            response = await client.post(url, json=data)
            if response.status_code >= 400:
                logger.error(f"N8n webhook failed with status {response.status_code}: {response.text}")
            else:
                logger.info(f"N8n webhook triggered successfully for {data.get('email')}")
        except Exception as e:
            logger.error(f"Failed to trigger n8n webhook: {str(e)}")

@mail_router.post("/subscribe")
async def subscribe(
    sub_data: SubscriberCreate, 
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_session)
):
    # Check if exists
    statement = select(Subscriber).where(Subscriber.email == sub_data.email)
    existing_result = await session.exec(statement)
    existing_sub = existing_result.first()
    
    if existing_sub:
        logger.info(f"User {sub_data.email} already subscribed. Triggering webhook for resources.")
        webhook_data = {
            "email": existing_sub.email,
            "source": sub_data.source,
            "lead_magnets": sub_data.lead_magnets,
            "subscriber_id": str(existing_sub.id),
            "confirm_url": None
        }
        background_tasks.add_task(trigger_n8n_webhook, webhook_data)
        return {"message": "We've sent the requested resources to your inbox!"}
    
    new_sub = Subscriber(
        email=sub_data.email,
        source=sub_data.source,
        interests=json.dumps(sub_data.lead_magnets) if sub_data.lead_magnets else "[]"
    )
    
    session.add(new_sub)
    await session.commit()
    await session.refresh(new_sub)
    
    # Send Confirmation Email
    token = create_access_token(
        user_data={
            "email": new_sub.email,
            "sub_id": str(new_sub.id)
        },
        expiry=timedelta(hours=24)
    )
    
    confirm_url = f"{Config.DOMAIN}/api/mail/confirm/{token}"
    
    message, template = create_message(
        recipients=[new_sub.email], 
        subject="Banana Intel - Confirm Subscription", 
        body={"url": confirm_url},
        template_name="subscription.html"
    )
    
    background_tasks.add_task(send_email_background, message, template)
    
    # Trigger n8n webhook
    webhook_data = {
        "email": new_sub.email,
        "source": new_sub.source,
        "lead_magnets": sub_data.lead_magnets,
        "subscriber_id": str(new_sub.id),
        "confirm_url": confirm_url
    }
    background_tasks.add_task(trigger_n8n_webhook, webhook_data)
    
    return {"message": "Subscription successful. Please check your email to confirm."}

@mail_router.get("/confirm/{token}")
async def confirm_subscription(
    token: str, 
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_session)
):
    token_data = decode_token(token)
    if not token_data:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
        
    user_data = token_data.get("user")
    sub_id = user_data.get("sub_id")
    
    if not sub_id:
        raise HTTPException(status_code=400, detail="Invalid token content")

    statement = select(Subscriber).where(Subscriber.id == sub_id)
    result = await session.exec(statement)
    subscriber = result.first()
    
    if not subscriber:
        raise HTTPException(status_code=404, detail="Subscriber not found")
        
    subscriber.is_confirmed = True
    session.add(subscriber)
    await session.commit()
    
    # Send Resources Email
    message, template = create_message(
        recipients=[subscriber.email], 
        subject="Welcome to Banana Intel - Your Resources", 
        body={},
        template_name="resources.html"
    )
    
    background_tasks.add_task(send_email_background, message, template)
        
    return {"message": "Subscription confirmed! Please check your email for the resources."}

from fastapi import APIRouter, Depends, HTTPException, status, Query, BackgroundTasks
from fastapi.responses import RedirectResponse
from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.main import get_session
from .schemas import UserCreateModel, UserLoginModel, UserResponseModel, TokenResponse, PasswordResetRequestModel, PasswordResetConfirmModel
from .service import UserService
from .utils import create_access_token, verify_password, decode_token, generate_password_hash
from src.config import Config
from src.mail_service import mail, create_message
from datetime import timedelta, datetime

auth_router = APIRouter()
user_service = UserService()
REFRESH_TOKEN_EXPIRY = 2

@auth_router.post('/signup', response_model=UserResponseModel, status_code=status.HTTP_201_CREATED)
async def create_user_account(
    user_data: UserCreateModel, 
    background_tasks: BackgroundTasks,
    admin_token: str = Query(None, description="Token to create admin account"),
    session: AsyncSession = Depends(get_session)
):
    email = user_data.email
    user_exists = await user_service.user_exists(email, session)
    
    if user_exists:
        raise HTTPException(status_code=403, detail="User with email already exists")
    
    # Check for Admin Token
    is_superuser = False
    if admin_token:
        if admin_token == Config.ADMIN_CREATION_TOKEN:
            is_superuser = True
        else:
            raise HTTPException(status_code=403, detail="Invalid Admin Token")
            
    new_user = await user_service.create_user(user_data, session, is_superuser=is_superuser)
    
    # Send Verification Email
    token = create_access_token(
        user_data={
            "email": new_user.email,
            "user_uid": str(new_user.uid)
        },
        expiry=timedelta(hours=24)
    )
    
    verify_url = f"{Config.DOMAIN}/api/auth/verify/{token}"
    print(f"DEBUG: Verification URL: {verify_url}")
    
    message, template = create_message(
        recipients=[new_user.email], 
        subject="Welcome to Banana Intel - Verify Account", 
        body={"name": new_user.first_name, "url": verify_url},
        template_name="verification.html"
    )
    
    background_tasks.add_task(mail.send_message, message, template_name=template)
    
    return new_user

@auth_router.get('/verify/{token}')
async def verify_user_account(token: str, session: AsyncSession = Depends(get_session)):
    token_data = decode_token(token)
    
    if not token_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired token")
        
    user_payload = token_data.get("user", {})
    user_email = user_payload.get("email")
    
    if user_email:
        user = await user_service.get_user_by_email(user_email, session)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        
        user.is_verified = True
        await session.commit()
        
        # Redirect to frontend
        return RedirectResponse(url="http://localhost:3000/#/admin?verified=true")
        
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token")

@auth_router.post('/login', response_model=TokenResponse)
async def login_users(
    login_data: UserLoginModel, 
    session: AsyncSession = Depends(get_session)
):
    email = login_data.email
    password = login_data.password
    
    user = await user_service.get_user_by_email(email, session)
    
    if user:
        password_valid = verify_password(password, user.password_hash)
        
        if password_valid:
            access_token = create_access_token(
                user_data={
                    'email': user.email,
                    'user_uid': str(user.uid),
                    'is_superuser': user.is_superuser
                }
            )
            
            refresh_token = create_access_token(
                user_data={
                    'email': user.email,
                    'user_uid': str(user.uid)
                },
                refresh=True,
                expiry=timedelta(days=REFRESH_TOKEN_EXPIRY)
            )
            
            return {
                "access_token": access_token, 
                "refresh_token": refresh_token,
                "user": user
            }
        
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN, 
        detail="Invalid Email or Password"
    )

@auth_router.get('/verify/{token}')
async def verify_email(token: str, session: AsyncSession = Depends(get_session)):
    token_data = decode_token(token)
    if not token_data:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
        
    user_data = token_data.get("user")
    email = user_data.get("email")
    
    user = await user_service.get_user_by_email(email, session)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if user.is_verified:
        return {"message": "Email already verified"}
        
    user.is_verified = True
    session.add(user)
    await session.commit()
    
    return {"message": "Email verified successfully"}

@auth_router.post('/refresh', response_model=TokenResponse)
async def refresh_token(token: str, session: AsyncSession = Depends(get_session)):
    token_data = decode_token(token)
    
    if not token_data:
        raise HTTPException(status_code=403, detail="Invalid or expired token")
    
    if not token_data.get("refresh"):
         raise HTTPException(status_code=403, detail="Not a refresh token")
         
    user_data = token_data.get("user")
    email = user_data.get("email")
    
    user = await user_service.get_user_by_email(email, session)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    access_token = create_access_token(
        user_data={
            'email': user.email,
            'user_uid': str(user.uid),
            'is_superuser': user.is_superuser
        }
    )
    
    return {
        "access_token": access_token, 
        "refresh_token": token,
        "user": user
    }

@auth_router.post('/password-reset-request')
async def password_reset_request(
    email_data: PasswordResetRequestModel, 
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_session)
):
    email = email_data.email
    user = await user_service.get_user_by_email(email, session)
    
    if not user:
        # Do not reveal if user exists
        return {"message": "If email exists, a password reset link has been sent."}
        
    token = create_access_token(
        user_data={
            "email": user.email,
            "user_uid": str(user.uid),
            "type": "password_reset"
        },
        expiry=timedelta(minutes=30)
    )
    
    reset_url = f"{Config.DOMAIN}/reset-password/{token}"
    
    message, template = create_message(
        recipients=[user.email], 
        subject="Banana Intel - Reset Password", 
        body={"name": user.first_name, "url": reset_url},
        template_name="password_reset.html"
    )
    
    background_tasks.add_task(mail.send_message, message, template_name=template)
    
    return {"message": "If email exists, a password reset link has been sent."}

@auth_router.post('/password-reset-confirm/{token}')
async def password_reset_confirm(
    token: str, 
    passwords: PasswordResetConfirmModel, 
    session: AsyncSession = Depends(get_session)
):
    if passwords.new_password != passwords.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
        
    token_data = decode_token(token)
    if not token_data:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
        
    if token_data.get("user", {}).get("type") != "password_reset":
        raise HTTPException(status_code=400, detail="Invalid token type")
        
    user_data = token_data.get("user")
    email = user_data.get("email")
    
    user = await user_service.get_user_by_email(email, session)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    user.password_hash = generate_password_hash(passwords.new_password)
    session.add(user)
    await session.commit()
    
    return {"message": "Password reset successfully"}

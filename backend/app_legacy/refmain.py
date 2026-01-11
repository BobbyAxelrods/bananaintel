import os
from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, Query, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from passlib.context import CryptContext
import bcrypt
from jose import JWTError, jwt
from . import models, database
import logging
import httpx

# --- Config ---
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey") # CHANGE IN PROD
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days

# --- Auth Setup ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/token")

# Create tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Banana Intel API")

# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class SubscriptionCreate(BaseModel):
    email: EmailStr
    lead_magnets: list[str] = []
    source: str = "landing_page"

class IntelItemCreate(BaseModel):
    title: str
    type: str 
    description: Optional[str] = None
    content: Optional[str] = None
    url: Optional[str] = None
    is_premium: bool = False

class IntelItemResponse(IntelItemCreate):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class LoginRequest(BaseModel):
    username: str
    password: str

# --- Auth Helpers ---
def verify_password(plain_password, hashed_password):
    ADMIN_PLAIN = os.getenv("ADMIN_PASSWORD", "banana123")
    return plain_password == ADMIN_PLAIN

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return username

# --- Routes ---
## Route User/Admin Login And Password Generation 
## - Admin can create account with pre approved token only , if match then proceed 
@app.post("/api/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # Hardcoded admin for "me only" request
    # In prod, fetch from DB
    ADMIN_USER = "admin"
    # Generated using bcrypt.gensalt() + bcrypt.hashpw("banana123")
    ADMIN_HASH = "$2b$12$KXjVUyn6GOoxjyftrRDzBudwOvxHvqZa8PQG4h7f7cua4BqjR1R0a" 
    
    ok_user = form_data.username == ADMIN_USER
    ok_pass = verify_password(form_data.password, ADMIN_HASH)
    print(f"Login attempt user_match={ok_user} pass_ok={ok_pass} user={form_data.username}")
    if not ok_user or not ok_pass:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/login", response_model=Token)
async def login_json(payload: LoginRequest):
    ADMIN_USER = "admin"
    ADMIN_HASH = "$2b$12$KXjVUyn6GOoxjyftrRDzBudwOvxHvqZa8PQG4h7f7cua4BqjR1R0a"
    ok_user = payload.username == ADMIN_USER
    ok_pass = verify_password(payload.password, ADMIN_HASH)
    if not ok_user or not ok_pass:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": payload.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/")
def read_root():
    return {"message": "Welcome to Banana Intel API"}

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/subscribe")
async def subscribe(subscription: SubscriptionCreate, db: Session = Depends(database.get_db)):
    db_subscriber = db.query(models.Subscriber).filter(models.Subscriber.email == subscription.email).first()
    if db_subscriber:
        # Trigger n8n webhook for existing users too
        try:
            webhook_url = "https://neuralseas.malaysiawest.cloudapp.azure.com/webhook/b6a7bb37-de5c-46e0-8394-ad52f5d4f13f"
            async with httpx.AsyncClient() as client:
                await client.post(webhook_url, json={
                    "email": subscription.email,
                    "lead_magnets": subscription.lead_magnets,
                    "source": subscription.source,
                    "is_existing": True
                })
        except Exception as e:
            print(f"Failed to trigger n8n webhook: {e}")

        return {
            "success": True, 
            "message": "Welcome back!", 
            "subscriber_id": db_subscriber.id
        }
    
    new_subscriber = models.Subscriber(
        email=subscription.email,
        source=subscription.source,
        lead_magnet_opensource="opensource" in subscription.lead_magnets,
        lead_magnet_ai_guide="ai_guide" in subscription.lead_magnets,
        lead_magnet_market_gaps="market_gaps" in subscription.lead_magnets
    )
    
    db.add(new_subscriber)
    db.commit()
    db.refresh(new_subscriber)

    # Trigger n8n webhook
    try:
        webhook_url = "https://neuralseas.malaysiawest.cloudapp.azure.com/webhook/b6a7bb37-de5c-46e0-8394-ad52f5d4f13f"
        async with httpx.AsyncClient() as client:
            await client.post(webhook_url, json={
                "email": subscription.email,
                "lead_magnets": subscription.lead_magnets,
                "source": subscription.source,
                "is_existing": False
            })
    except Exception as e:
        print(f"Failed to trigger n8n webhook: {e}")

    return {
        "success": True,
        "message": "Subscription successful",
        "subscriber_id": new_subscriber.id
    }

@app.get("/api/intel", response_model=List[IntelItemResponse])
def get_intel_items(type: Optional[str] = Query(None), db: Session = Depends(database.get_db)):
    query = db.query(models.IntelItem)
    if type:
        query = query.filter(models.IntelItem.type == type)
    return query.order_by(models.IntelItem.created_at.desc()).all()

@app.get("/api/intel/{item_id}", response_model=IntelItemResponse)
def get_intel_item(item_id: int, db: Session = Depends(database.get_db)):
    db_item = db.query(models.IntelItem).filter(models.IntelItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

# --- Admin Protected Routes ---

@app.post("/api/intel", response_model=IntelItemResponse)
def create_intel_item(
    item: IntelItemCreate, 
    db: Session = Depends(database.get_db),
    current_user: str = Depends(get_current_user)
):
    db_item = models.IntelItem(
        title=item.title,
        type=item.type,
        description=item.description,
        content=item.content,
        url=item.url,
        is_premium=item.is_premium
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.put("/api/intel/{item_id}", response_model=IntelItemResponse)
def update_intel_item(
    item_id: int,
    item_update: IntelItemCreate,
    db: Session = Depends(database.get_db),
    current_user: str = Depends(get_current_user)
):
    db_item = db.query(models.IntelItem).filter(models.IntelItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db_item.title = item_update.title
    db_item.type = item_update.type
    db_item.description = item_update.description
    db_item.content = item_update.content
    db_item.url = item_update.url
    db_item.is_premium = item_update.is_premium
    
    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/api/intel/{item_id}")
def delete_intel_item(
    item_id: int,
    db: Session = Depends(database.get_db),
    current_user: str = Depends(get_current_user)
):
    db_item = db.query(models.IntelItem).filter(models.IntelItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db.delete(db_item)
    db.commit()
    return {"success": True, "message": "Item deleted"}

from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
from src.config import Config
import uuid
import logging

passwd_context = CryptContext(schemes=["bcrypt"])

def generate_password_hash(password: str) -> str:
    return passwd_context.hash(password)

def verify_password(password: str, hash: str) -> bool:
    return passwd_context.verify(password, hash)

def create_access_token(user_data: dict, expiry: timedelta = None, refresh: bool = False):
    payload = {}
    
    payload["user"] = user_data
    payload["exp"] = datetime.now() + (
        expiry if expiry is not None else timedelta(minutes=Config.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    
    payload["jti"] = str(uuid.uuid4())
    payload["refresh"] = refresh
    
    token = jwt.encode(
        payload,
        Config.SECRET_KEY,
        algorithm=Config.ALGORITHM
    )
    
    return token

def decode_token(token: str) -> dict:
    try:
        token_data = jwt.decode(
            token=token,
            key=Config.SECRET_KEY,
            algorithms=[Config.ALGORITHM]
        )
        return token_data
    except jwt.PyJWTError as e:
        logging.exception(e)
        return None

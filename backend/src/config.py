from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://user:password@localhost:5432/banana"
    MONGO_URL: str = "mongodb://localhost:27017"
    MONGO_DB_NAME: str = "banana_intel"
    MILVUS_URI: str = "http://localhost:19530"
    MILVUS_TOKEN: str = ""
    
    SECRET_KEY: str = "supersecretkey"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ADMIN_CREATION_TOKEN: str = "changeme_to_secure_token"
    
    MAIL_USERNAME: str = "admin@imbanana.cc"
    MAIL_PASSWORD: str = ""
    MAIL_FROM: str = "admin@imbanana.cc"
    MAIL_PORT: int = 587
    MAIL_SERVER: str = "smtp.gmail.com"
    MAIL_FROM_NAME: str = "Banana Intel"
    
    DOMAIN: str = "http://localhost:8000"
    
    N8N_WEBHOOK_URL: str = "https://neuralseas.malaysiawest.cloudapp.azure.com/webhook/send_resources"
    
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

Config = Settings()

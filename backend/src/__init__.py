from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.db.main import init_db
from src.db.mongo import mongo_db
from src.db.milvus import connect_milvus, disconnect_milvus
from src.routes import api_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up...")
    await init_db() # Postgres
    mongo_db.connect() # Mongo
    # connect_milvus() # Milvus - Disabled for now
    yield
    print("Shutting down...")
    mongo_db.close()
    # disconnect_milvus()

version = "v1"

app = FastAPI(
    title="Banana Intel API",
    description="REST API for Banana Intel Platform",
    version=version,
    lifespan=lifespan
)

# CORS
origins = [
    "http://localhost:3000",
    "http://localhost:8080",
    "https://imbanana.cc",
    "https://www.imbanana.cc",
    "*" # For dev
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=["localhost", "127.0.0.1", "0.0.0.0", "imbanana.cc", "www.imbanana.cc"]
)

# Main API Router (Prefix /api)
app.include_router(api_router, prefix="/api")

# Legacy/Direct routes compatibility
@app.post("/api/login", tags=["Legacy"])
async def login_legacy(login_data: dict):
    # This is just a placeholder to prevent 404s if frontend calls old route
    # Ideally frontend should be updated to /api/auth/login
    pass

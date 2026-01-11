from fastapi import APIRouter
from src.auth.routes import auth_router
from src.intel.routes import intel_router
from src.mail.routes import mail_router
from src.search.routes import search_router

# Main API Router
api_router = APIRouter()

# Include Sub-Routers
api_router.include_router(auth_router, prefix="/auth", tags=["Auth"])
api_router.include_router(intel_router, prefix="/intel", tags=["Intel"])
api_router.include_router(mail_router, prefix="/mail", tags=["Mail"])
api_router.include_router(search_router, prefix="/search", tags=["Search"])

# Legacy Support (if needed, but prefer clean routes)
# We can keep specific redirects here if necessary

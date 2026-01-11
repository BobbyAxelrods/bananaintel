from fastapi import APIRouter
from pydantic import BaseModel

search_router = APIRouter()

class SearchQuery(BaseModel):
    query: str
    limit: int = 5

@search_router.post("/")
async def search_intel(query: SearchQuery):
    # TODO: 
    # 1. Embed query using OpenAI
    # 2. Search Milvus for nearest vectors
    # 3. Retrieve articles from Mongo using UUIDs from Milvus results
    return {
        "results": [], 
        "message": "Search implemented in future update"
    }

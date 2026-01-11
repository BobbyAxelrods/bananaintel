from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from src.db.mongo import get_mongo_db
from .models import IntelCreate, IntelUpdate, IntelResponse
from src.auth.dependencies import get_current_admin_user
import uuid
from datetime import datetime
from bson import ObjectId

intel_router = APIRouter()

@intel_router.get("/", response_model=List[dict])
async def get_all_intel(
    type: Optional[str] = None,
    db = Depends(get_mongo_db)
):
    query = {}
    if type and type != 'all':
        query['type'] = type
        
    cursor = db.intel_items.find(query)
    items = await cursor.to_list(length=100)
    
    # Convert ObjectId to string for response
    for item in items:
        item['id'] = str(item['_id'])
        del item['_id']
        
    return items

@intel_router.get("/{id}", response_model=dict)
async def get_intel_by_id(id: str, db = Depends(get_mongo_db)):
    try:
        oid = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
        
    item = await db.intel_items.find_one({"_id": oid})
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    item['id'] = str(item['_id'])
    del item['_id']
    return item

@intel_router.post("/", status_code=status.HTTP_201_CREATED)
async def create_intel(
    item: IntelCreate,
    db = Depends(get_mongo_db),
    admin = Depends(get_current_admin_user)
):
    item_dict = item.model_dump()
    item_dict['uuid'] = str(uuid.uuid4())
    item_dict['created_at'] = datetime.now()
    
    # TODO: Trigger background task for Milvus Vectorization here
    # background_tasks.add_task(vectorize_article, item_dict['uuid'], item_dict['content'])
    
    new_item = await db.intel_items.insert_one(item_dict)
    
    return {
        "id": str(new_item.inserted_id),
        "uuid": item_dict['uuid'],
        "message": "Intel created successfully"
    }

@intel_router.put("/{id}")
async def update_intel(
    id: str,
    update_data: IntelUpdate,
    db = Depends(get_mongo_db),
    admin = Depends(get_current_admin_user)
):
    try:
        oid = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
    
    if not update_dict:
        return {"message": "No changes provided"}
        
    result = await db.intel_items.update_one(
        {"_id": oid},
        {"$set": update_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
        
    # TODO: Trigger vector update if content/title changed
    
    return {"message": "Intel updated successfully"}

@intel_router.delete("/{id}")
async def delete_intel(
    id: str,
    db = Depends(get_mongo_db),
    admin = Depends(get_current_admin_user)
):
    try:
        oid = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
        
    # Get item first to get UUID for Milvus deletion
    item = await db.intel_items.find_one({"_id": oid})
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
        
    await db.intel_items.delete_one({"_id": oid})
    
    # TODO: Trigger Milvus deletion using item['uuid']
    
    return {"message": "Intel deleted successfully"}

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

class IntelBase(BaseModel):
    title: str
    type: str = Field(..., pattern="^(report|ai_tool|open_source)$")
    description: Optional[str] = None
    content: Optional[str] = None
    url: Optional[str] = None
    is_premium: bool = False

class IntelCreate(IntelBase):
    pass

class IntelUpdate(BaseModel):
    title: Optional[str] = None
    type: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    url: Optional[str] = None
    is_premium: Optional[bool] = None

class IntelResponse(IntelBase):
    id: str = Field(alias="_id")
    uuid: str
    created_at: datetime

    class Config:
        populate_by_name = True

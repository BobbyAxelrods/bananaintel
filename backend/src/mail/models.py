from sqlmodel import SQLModel, Field
from datetime import datetime
import uuid
from typing import Optional, List

class Subscriber(SQLModel, table=True):
    __tablename__ = "subscribers"
    
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    email: str = Field(index=True, unique=True)
    is_confirmed: bool = False
    source: str = "landing_page"
    interests: Optional[str] = None # JSON string of interests
    created_at: datetime = Field(default_factory=datetime.now)

class SubscriberCreate(SQLModel):
    email: str
    lead_magnets: Optional[List[str]] = None
    source: str = "landing_page"

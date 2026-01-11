import uuid
from datetime import datetime
from sqlmodel import SQLModel, Field
from typing import Optional

class User(SQLModel, table=True):
    __tablename__ = "users"
    
    uid: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        nullable=False,
    )
    username: str
    email: str = Field(unique=True, index=True)
    first_name: str
    last_name: str
    is_verified: bool = Field(default=False)
    is_superuser: bool = Field(default=False)
    password_hash: str = Field(exclude=True)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    def __repr__(self):
        return f"<User {self.username}>"

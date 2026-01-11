from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.sql import func
from .database import Base

class Subscriber(Base):
    __tablename__ = "subscribers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    subscribed_at = Column(DateTime(timezone=True), server_default=func.now())
    lead_magnet_opensource = Column(Boolean, default=False)
    lead_magnet_ai_guide = Column(Boolean, default=False)
    lead_magnet_market_gaps = Column(Boolean, default=False)
    status = Column(String, default="active")
    source = Column(String, default="landing_page")

class IntelItem(Base):
    __tablename__ = "intel_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    type = Column(String, index=True, nullable=False) # 'ai_tool', 'open_source', 'report'
    description = Column(String)
    content = Column(Text) # Markdown content for reports
    url = Column(String) # External link for tools/repos
    is_premium = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

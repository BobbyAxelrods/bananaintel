from pydantic import BaseModel
from typing import Optional

###### Class Validation #####
class Email(BaseModel):
    email : EmailStr 

class SubcriptionCreate(BaseModel):
    email: EmailStr
    lead_magnets: List[str]= []
    source: str = "Landing_page"


class ArticleCreate(BaseModel):
    title:str
    type:str
    description: Optional[str] = None
    contents: Optional[str] = None
    url: Optional[str] = None
    is_premium: bool = False




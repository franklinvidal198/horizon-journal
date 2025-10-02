from pydantic import BaseModel, EmailStr
from datetime import datetime

from pydantic import validator

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

    @validator("password")
    def password_length(cls, v):
        if len(v) > 72:
            raise ValueError("Password must be 72 characters or fewer.")
        return v

class UserRead(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime

class UserLogin(BaseModel):
    email: EmailStr
    password: str

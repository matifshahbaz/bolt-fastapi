from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    message: str = Field(min_length=10, max_length=5000)


class ContactMessageRecord(ContactMessageCreate):
    submission_id: str
    received_at: datetime


class ContactMessageResponse(BaseModel):
    submission_id: str
    received_at: datetime
    message: str
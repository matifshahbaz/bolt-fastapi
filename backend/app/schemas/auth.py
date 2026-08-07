from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    mobile_number: str | None = Field(default=None, min_length=7, max_length=30)
    age: int | None = Field(default=None, ge=10, le=100)
    location: str | None = Field(default=None, min_length=2, max_length=120)


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserProfile(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    mobile_number: str | None = None
    age: int | None = None
    location: str | None = None
    created_at: datetime
    is_admin: bool = False


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserProfile


class PasswordResetRequest(BaseModel):
    email: EmailStr


class PasswordResetConfirm(BaseModel):
    token: str = Field(min_length=20, max_length=2000)
    new_password: str = Field(min_length=8, max_length=128)


class PasswordResetRequestResponse(BaseModel):
    message: str
    reset_token: str | None = None


class MessageResponse(BaseModel):
    message: str
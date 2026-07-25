from fastapi import APIRouter

from app.api.dependencies import CurrentUser
from app.schemas.auth import AuthResponse, UserLogin, UserProfile, UserRegister
from app.services.auth_service import auth_service

router = APIRouter(prefix="/auth")


@router.post("/register", response_model=AuthResponse)
def register(payload: UserRegister) -> AuthResponse:
    return auth_service.register(payload)


@router.post("/login", response_model=AuthResponse)
def login(payload: UserLogin) -> AuthResponse:
    return auth_service.login(payload)


@router.get("/me", response_model=UserProfile)
def me(current_user: UserProfile = CurrentUser) -> UserProfile:
    return current_user
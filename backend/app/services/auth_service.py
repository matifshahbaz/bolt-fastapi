from fastapi import HTTPException, status

from app.core.security import create_access_token, hash_password, verify_password
from app.repositories.user_repository import UserRepository
from app.schemas.auth import AuthResponse, UserLogin, UserProfile, UserRegister


class AuthService:
    def __init__(self, repository: UserRepository) -> None:
        self._repository = repository

    def register(self, payload: UserRegister) -> AuthResponse:
        existing = self._repository.get_auth_record_by_email(payload.email)
        if existing is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

        user = self._repository.create_user(
            full_name=payload.full_name,
            email=payload.email,
            password_hash=hash_password(payload.password),
        )
        return AuthResponse(access_token=create_access_token(user.id), user=user)

    def login(self, payload: UserLogin) -> AuthResponse:
        record = self._repository.get_auth_record_by_email(payload.email)
        if record is None or not verify_password(payload.password, str(record["password_hash"])):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
        user = self._repository.get_by_id(int(record["id"]))
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
        return AuthResponse(access_token=create_access_token(user.id), user=user)

    def get_user_by_id(self, user_id: int) -> UserProfile | None:
        return self._repository.get_by_id(user_id)


auth_service = AuthService(UserRepository())
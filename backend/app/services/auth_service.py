import hashlib
from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, status

from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_password_reset_token,
    decode_password_reset_token,
    hash_password,
    hash_reset_token,
    verify_password,
)
from app.repositories.user_repository import UserRepository
from app.schemas.auth import (
    AuthResponse,
    MessageResponse,
    PasswordResetConfirm,
    PasswordResetRequest,
    PasswordResetRequestResponse,
    UserLogin,
    UserProfile,
    UserRegister,
)


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

    def request_password_reset(self, payload: PasswordResetRequest) -> PasswordResetRequestResponse:
        generic_message = "If the email exists, a reset instruction has been prepared for that account."
        record = self._repository.get_auth_record_by_email(payload.email)

        if record is None:
            return PasswordResetRequestResponse(message=generic_message)

        reset_token = create_password_reset_token(
            user_id=int(record["id"]),
            email=str(record["email"]),
            password_hash=str(record["password_hash"]),
            expires_in_minutes=settings.password_reset_token_ttl_minutes,
        )

        self._repository.create_password_reset_token(
            user_id=int(record["id"]),
            token_hash=hash_reset_token(reset_token),
            expires_at=datetime.now(timezone.utc) + timedelta(minutes=settings.password_reset_token_ttl_minutes),
        )

        # Production should send this token via email; keep hidden unless explicitly enabled.
        if settings.expose_password_reset_token or settings.debug:
            return PasswordResetRequestResponse(message=generic_message, reset_token=reset_token)
        return PasswordResetRequestResponse(message=generic_message)

    def confirm_password_reset(self, payload: PasswordResetConfirm) -> MessageResponse:
        token_payload = decode_password_reset_token(payload.token)
        token_hash = hash_reset_token(payload.token)

        token_record = self._repository.get_password_reset_token(token_hash)
        if token_record is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid reset token")
        if token_record.used_at is not None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Reset token already used")
        if self._as_utc(token_record.expires_at) < datetime.now(timezone.utc):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Reset token expired")

        user_record = self._repository.get_auth_record_by_id(int(token_payload["user_id"]))
        if user_record is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid reset token")
        if str(user_record["email"]).lower() != str(token_payload["email"]).lower():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid reset token")

        current_pwd_fingerprint = hashlib.sha256(str(user_record["password_hash"]).encode("utf-8")).hexdigest()[:16]
        if current_pwd_fingerprint != token_payload["pwd"]:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Reset token expired")

        self._repository.update_password_hash(
            user_id=int(user_record["id"]),
            password_hash=hash_password(payload.new_password),
        )
        self._repository.mark_password_reset_token_used(token_hash=token_hash, used_at=datetime.now(timezone.utc))

        return MessageResponse(message="Password updated successfully")

    @staticmethod
    def _as_utc(value: datetime) -> datetime:
        if value.tzinfo is None:
            return value.replace(tzinfo=timezone.utc)
        return value.astimezone(timezone.utc)


auth_service = AuthService(UserRepository())
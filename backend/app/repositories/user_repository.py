from sqlalchemy import select
from datetime import datetime

from app.core.db import get_db_session
from app.models import PasswordResetTokenModel, UserModel
from app.schemas.auth import UserProfile


class UserRepository:
    def create_user(self, full_name: str, email: str, password_hash: str) -> UserProfile:
        with get_db_session() as session:
            user = UserModel(
                full_name=full_name,
                email=email.lower(),
                password_hash=password_hash,
            )
            session.add(user)
            session.flush()
            session.refresh(user)
            return self._to_profile(user)

    def get_auth_record_by_email(self, email: str) -> dict[str, str | int] | None:
        with get_db_session() as session:
            user = session.scalar(select(UserModel).where(UserModel.email == email.lower()))
        if user is None:
            return None
        return {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "password_hash": user.password_hash,
            "created_at": user.created_at,
        }

    def get_by_id(self, user_id: int) -> UserProfile | None:
        with get_db_session() as session:
            user = session.get(UserModel, user_id)
        if user is None:
            return None
        return self._to_profile(user)

    def get_auth_record_by_id(self, user_id: int) -> dict[str, str | int] | None:
        with get_db_session() as session:
            user = session.get(UserModel, user_id)
        if user is None:
            return None
        return {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "password_hash": user.password_hash,
            "created_at": user.created_at,
        }

    def create_password_reset_token(self, user_id: int, token_hash: str, expires_at: datetime) -> None:
        with get_db_session() as session:
            session.add(
                PasswordResetTokenModel(
                    user_id=user_id,
                    token_hash=token_hash,
                    expires_at=expires_at,
                )
            )

    def get_password_reset_token(self, token_hash: str) -> PasswordResetTokenModel | None:
        with get_db_session() as session:
            return session.scalar(
                select(PasswordResetTokenModel).where(PasswordResetTokenModel.token_hash == token_hash)
            )

    def mark_password_reset_token_used(self, token_hash: str, used_at: datetime) -> None:
        with get_db_session() as session:
            token = session.scalar(
                select(PasswordResetTokenModel).where(PasswordResetTokenModel.token_hash == token_hash)
            )
            if token is not None:
                token.used_at = used_at

    def update_password_hash(self, user_id: int, password_hash: str) -> None:
        with get_db_session() as session:
            user = session.get(UserModel, user_id)
            if user is not None:
                user.password_hash = password_hash

    @staticmethod
    def _to_profile(user: UserModel) -> UserProfile:
        return UserProfile(
            id=user.id,
            full_name=user.full_name,
            email=user.email,
            created_at=user.created_at,
        )
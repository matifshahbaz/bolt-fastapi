from sqlalchemy import select

from app.core.db import get_db_session
from app.models import UserModel
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

    @staticmethod
    def _to_profile(user: UserModel) -> UserProfile:
        return UserProfile(
            id=user.id,
            full_name=user.full_name,
            email=user.email,
            created_at=user.created_at,
        )
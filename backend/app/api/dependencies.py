from fastapi import Depends, Header, HTTPException, status

from app.core.config import settings
from app.core.security import decode_access_token
from app.schemas.auth import UserProfile
from app.services.auth_service import auth_service


def get_current_user(authorization: str | None = Header(default=None)) -> UserProfile:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
    token = authorization.removeprefix("Bearer ").strip()
    user_id = decode_access_token(token)
    user = auth_service.get_user_by_id(user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user


CurrentUser = Depends(get_current_user)


def get_admin_user(current_user: UserProfile = CurrentUser) -> UserProfile:
    if not settings.admin_emails:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Admin emails are not configured",
        )

    if current_user.email.lower() not in settings.admin_emails:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return current_user


AdminUser = Depends(get_admin_user)
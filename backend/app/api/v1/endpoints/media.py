from fastapi import APIRouter

from app.api.dependencies import AdminUser
from app.schemas.auth import UserProfile
from app.schemas.media import (
    ImageDirectUploadRequest,
    ImageDirectUploadResponse,
    StreamDirectUploadRequest,
    StreamDirectUploadResponse,
)
from app.services.cloudflare_service import cloudflare_service

router = APIRouter(prefix="/media")


@router.post("/stream/direct-upload", response_model=StreamDirectUploadResponse)
def create_stream_direct_upload(
    payload: StreamDirectUploadRequest,
    admin_user: UserProfile = AdminUser,
) -> StreamDirectUploadResponse:
    _ = admin_user
    return cloudflare_service.create_stream_direct_upload(
        max_duration_seconds=payload.max_duration_seconds,
        require_signed_urls=payload.require_signed_urls,
    )


@router.post("/images/direct-upload", response_model=ImageDirectUploadResponse)
def create_image_direct_upload(
    payload: ImageDirectUploadRequest,
    admin_user: UserProfile = AdminUser,
) -> ImageDirectUploadResponse:
    _ = admin_user
    return cloudflare_service.create_image_direct_upload(payload.require_signed_urls)

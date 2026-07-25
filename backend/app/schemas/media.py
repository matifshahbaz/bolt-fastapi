from datetime import datetime

from pydantic import BaseModel, Field


class LessonPlaybackResponse(BaseModel):
    video_uid: str
    iframe_url: str
    hls_url: str
    dash_url: str
    thumbnail_url: str
    expires_at: datetime
    completion_threshold_percent: float


class LessonWatchEvent(BaseModel):
    watched_percent: float = Field(ge=0, le=100)


class LessonWatchUpdateResponse(BaseModel):
    marked_complete: bool
    watched_percent: float


class StreamDirectUploadRequest(BaseModel):
    max_duration_seconds: int | None = Field(default=None, ge=30, le=14400)
    require_signed_urls: bool = True


class StreamDirectUploadResponse(BaseModel):
    uid: str
    upload_url: str


class ImageDirectUploadRequest(BaseModel):
    require_signed_urls: bool = False


class ImageDirectUploadResponse(BaseModel):
    image_id: str
    upload_url: str

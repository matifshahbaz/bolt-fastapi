import base64
import hashlib
import hmac
import json
from datetime import datetime, timedelta, timezone

import httpx
from fastapi import HTTPException, status

from app.core.config import settings
from app.schemas.media import (
    ImageDirectUploadResponse,
    LessonPlaybackResponse,
    StreamDirectUploadResponse,
)


class CloudflareService:
    def _require_credentials(self) -> None:
        if not settings.cloudflare_account_id or not settings.cloudflare_api_token:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Cloudflare API credentials are not configured",
            )

    def _require_stream_signing(self) -> None:
        if not settings.stream_delivery_base_url:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Cloudflare Stream delivery subdomain is not configured",
            )
        if not settings.cloudflare_stream_signing_key_id or not settings.cloudflare_stream_signing_key_secret:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Cloudflare Stream signing keys are not configured",
            )

    def get_lesson_video_uid(self, course_id: str, module_id: str, lesson_index: int) -> str:
        course_map = settings.stream_lesson_video_map.get(course_id, {})
        key = f"{module_id}:{lesson_index}"
        video_uid = course_map.get(key)
        if not video_uid:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson video is not configured")
        return video_uid

    def get_signed_lesson_playback(self, video_uid: str) -> LessonPlaybackResponse:
        now = datetime.now(timezone.utc)
        expires_at = now + timedelta(seconds=settings.cloudflare_stream_token_ttl_seconds)
        base = f"{settings.stream_delivery_base_url}/{video_uid}"
        token_query = ""
        if settings.cloudflare_stream_require_signed_urls:
            self._require_stream_signing()
            token = self._create_stream_token(video_uid, expires_at, now)
            token_query = f"?token={token}"

        return LessonPlaybackResponse(
            video_uid=video_uid,
            iframe_url=f"{base}/iframe{token_query}",
            hls_url=f"{base}/manifest/video.m3u8{token_query}",
            dash_url=f"{base}/manifest/video.mpd{token_query}",
            thumbnail_url=f"{base}/thumbnails/thumbnail.jpg",
            expires_at=expires_at,
            completion_threshold_percent=settings.cloudflare_stream_watch_completion_threshold,
        )

    def create_stream_direct_upload(self, max_duration_seconds: int | None, require_signed_urls: bool) -> StreamDirectUploadResponse:
        self._require_credentials()
        endpoint = (
            f"https://api.cloudflare.com/client/v4/accounts/"
            f"{settings.cloudflare_account_id}/stream/direct_upload"
        )

        payload: dict[str, object] = {
            "requireSignedURLs": require_signed_urls,
        }
        if max_duration_seconds is not None:
            payload["maxDurationSeconds"] = max_duration_seconds

        result = self._call_cloudflare_api("POST", endpoint, payload)
        return StreamDirectUploadResponse(
            uid=str(result.get("uid", "")),
            upload_url=str(result.get("uploadURL", "")),
        )

    def create_image_direct_upload(self, require_signed_urls: bool) -> ImageDirectUploadResponse:
        self._require_credentials()
        endpoint = (
            f"https://api.cloudflare.com/client/v4/accounts/"
            f"{settings.cloudflare_account_id}/images/v2/direct_upload"
        )

        payload = {
            "requireSignedURLs": require_signed_urls,
        }
        result = self._call_cloudflare_api("POST", endpoint, payload)
        return ImageDirectUploadResponse(
            image_id=str(result.get("id", "")),
            upload_url=str(result.get("uploadURL", "")),
        )

    def _call_cloudflare_api(self, method: str, url: str, payload: dict[str, object]) -> dict[str, object]:
        headers = {
            "Authorization": f"Bearer {settings.cloudflare_api_token}",
            "Content-Type": "application/json",
        }
        try:
            response = httpx.request(method, url, headers=headers, json=payload, timeout=20.0)
        except httpx.HTTPError as exc:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"Cloudflare request failed: {exc}",
            ) from exc

        if response.status_code >= 400:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"Cloudflare API error ({response.status_code}): {response.text}",
            )

        body = response.json()
        if not body.get("success"):
            errors = body.get("errors") or []
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"Cloudflare API rejected request: {errors}",
            )

        result = body.get("result")
        if not isinstance(result, dict):
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Cloudflare API returned an unexpected response",
            )
        return result

    def _create_stream_token(self, video_uid: str, expires_at: datetime, now: datetime) -> str:
        header = {
            "alg": "HS256",
            "typ": "JWT",
            "kid": settings.cloudflare_stream_signing_key_id,
        }
        payload = {
            "sub": video_uid,
            "nbf": int(now.timestamp()),
            "exp": int(expires_at.timestamp()),
        }

        header_b64 = self._urlsafe_json(header)
        payload_b64 = self._urlsafe_json(payload)
        signing_input = f"{header_b64}.{payload_b64}".encode("utf-8")
        signature = hmac.new(
            settings.cloudflare_stream_signing_key_secret.encode("utf-8"),
            signing_input,
            hashlib.sha256,
        ).digest()
        signature_b64 = base64.urlsafe_b64encode(signature).rstrip(b"=").decode("utf-8")
        return f"{header_b64}.{payload_b64}.{signature_b64}"

    @staticmethod
    def _urlsafe_json(value: dict[str, object]) -> str:
        encoded = json.dumps(value, separators=(",", ":")).encode("utf-8")
        return base64.urlsafe_b64encode(encoded).rstrip(b"=").decode("utf-8")


cloudflare_service = CloudflareService()

from functools import cached_property
import json
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Shama.pk API"
    app_version: str = "0.1.0"
    api_v1_prefix: str = "/api/v1"
    debug: bool = False
    secret_key: str = "change-this-before-production"
    database_url: str | None = None
    admin_emails_raw: str = ""

    cloudflare_account_id: str = ""
    cloudflare_api_token: str = ""

    cloudflare_stream_customer_subdomain: str = ""
    cloudflare_stream_signing_key_id: str = ""
    cloudflare_stream_signing_key_secret: str = ""
    cloudflare_stream_token_ttl_seconds: int = 900
    cloudflare_stream_watch_completion_threshold: float = 50.0
    cloudflare_stream_require_signed_urls: bool = True

    cloudflare_images_delivery_base_url: str = ""
    cloudflare_images_require_signed_urls: bool = False
    cloudflare_images_default_variant: str = "public"

    cloudflare_stream_lesson_video_map_raw: str = (
        '{"career-guidance-for-pakistani-youth": {'
        '"m1:0": "05364cb45c1b5ac9bc091c709da5e527",'
        '"m1:2": "placeholder-m1-v2",'
        '"m1:4": "placeholder-m1-v3",'
        '"m1:6": "placeholder-m1-v4",'
        '"m2:0": "fb6e5f113a4ad665c7130baaf685a3e9",'
        '"m2:2": "placeholder-m2-v2",'
        '"m2:4": "placeholder-m2-v3",'
        '"m3:0": "placeholder-m3-v1",'
        '"m3:2": "placeholder-m3-v2",'
        '"m3:4": "placeholder-m3-v3",'
        '"m3:6": "placeholder-m3-v4",'
        '"m4:0": "placeholder-m4-v1",'
        '"m4:2": "placeholder-m4-v2",'
        '"m4:4": "placeholder-m4-v3",'
        '"m5:0": "placeholder-m5-v1",'
        '"m5:2": "placeholder-m5-v2",'
        '"m5:4": "placeholder-m5-v3",'
        '"m5:6": "placeholder-m5-v4",'
        '"m6:0": "placeholder-m6-v1",'
        '"m6:2": "placeholder-m6-v2",'
        '"m6:4": "placeholder-m6-v3"'
        '}}'
    )
    allowed_origins_raw: str = (
        "http://localhost:3000,"
        "http://127.0.0.1:3000,"
        "https://shama.pk,"
        "https://www.shama.pk"
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="SHAMA_",
        case_sensitive=False,
        extra="ignore",
    )

    @cached_property
    def allowed_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins_raw.split(",") if origin.strip()]

    @cached_property
    def admin_emails(self) -> set[str]:
        return {email.strip().lower() for email in self.admin_emails_raw.split(",") if email.strip()}

    @cached_property
    def stream_lesson_video_map(self) -> dict[str, dict[str, str]]:
        try:
            parsed = json.loads(self.cloudflare_stream_lesson_video_map_raw)
        except json.JSONDecodeError:
            return {}
        if not isinstance(parsed, dict):
            return {}

        normalized: dict[str, dict[str, str]] = {}
        for course_id, mapping in parsed.items():
            if not isinstance(course_id, str) or not isinstance(mapping, dict):
                continue
            normalized[course_id] = {
                key: value
                for key, value in mapping.items()
                if isinstance(key, str) and isinstance(value, str)
            }
        return normalized

    @property
    def stream_delivery_base_url(self) -> str:
        subdomain = self.cloudflare_stream_customer_subdomain.strip()
        if not subdomain:
            return ""
        return f"https://{subdomain}.cloudflarestream.com"

    @property
    def contact_storage_path(self) -> Path:
        return Path(__file__).resolve().parents[2] / "data" / "contact_messages.jsonl"

    @property
    def resolved_database_url(self) -> str:
        if self.database_url:
            return self.database_url
        sqlite_path = Path(__file__).resolve().parents[2] / "data" / "shama_lms.db"
        return f"sqlite:///{sqlite_path.as_posix()}"


settings = Settings()
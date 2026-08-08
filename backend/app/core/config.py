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
    admin_emails_raw: str = "contact@shama.pk"
    password_reset_token_ttl_minutes: int = 30
    expose_password_reset_token: bool = False
    frontend_base_url: str = "https://shama.pk"

    smtp_host: str = ""
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = ""
    smtp_use_tls: bool = True
    smtp_use_ssl: bool = False
    email_from: str = "contact@shama.pk"
    email_from_name: str = "Shama.pk"
    admin_notification_email: str = "contact@shama.pk"

    jazzcash_number: str = "03216630988"
    bank_name: str = "Askari Bank"
    bank_account_title: str = "Muhammad Atif Shahbaz"
    bank_account_number: str = "02120320011584"
    bank_iban: str = "PK70ASCM0002120320011584"
    bank_branch: str = "Tarnol Branch Islamabad"

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
        '"m1:0": "a30413716856e9e07b95bf258096fd9c",'
        '"m1:2": "9969875f3e936e738e6ef28f8762c98c",'
        '"m1:4": "placeholder-m1-v3",'
        '"m1:6": "placeholder-m1-v4",'
        '"m2:0": "ddbb12252d982b5ef19eb42ca07e5eec",'
        '"m2:2": "701a6ffd173193628347d31f422f9018",'
        '"m2:4": "9aa90aefeb75e46b25a274047b559106",'
        '"m3:0": "072336982e4f8759249c1d02edf14aba",'
        '"m3:1": "d24d8a9a8b651147fd80bada011a38b2",'
        '"m3:2": "0c6ef060e7232246ef0a823111883fed",'
        '"m3:4": "d589d0b83800d7bafe30ead9c07a8980",'
        '"m3:6": "3d66a6a2dcbfd91ce07affe6ed64654b",'
        '"m3:8": "placeholder-m3-v4",'
        '"m4:0": "5afcbd3069127022f70f0bd768c60276",'
        '"m4:2": "placeholder-m4-v2",'
        '"m4:4": "placeholder-m4-v3",'
        '"m5:0": "178a4245e678061087e7d28f2b4a7783",'
        '"m5:2": "460b8d57c1ac1b8db9fc0173b6c099fb",'
        '"m5:4": "f69acb71aeefb5bc48170bd9ae5cd289",'
        '"m5:5": "5cf10ad82447c00e5a56ad5e89e95a4d",'
        '"m5:7": "placeholder-m5-v4",'
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
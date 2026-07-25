import base64
import hashlib
import hmac
import json
import secrets
from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, status

from app.core.config import settings


def hash_password(password: str, salt: str | None = None) -> str:
    effective_salt = salt or secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        effective_salt.encode("utf-8"),
        100_000,
    )
    return f"{effective_salt}${digest.hex()}"


def verify_password(password: str, password_hash: str) -> bool:
    try:
        salt, _ = password_hash.split("$", maxsplit=1)
    except ValueError:
        return False
    return hmac.compare_digest(hash_password(password, salt), password_hash)


def create_access_token(user_id: int, expires_in_hours: int = 72) -> str:
    payload = {
        "user_id": user_id,
        "exp": int((datetime.now(timezone.utc) + timedelta(hours=expires_in_hours)).timestamp()),
    }
    payload_bytes = json.dumps(payload, separators=(",", ":")).encode("utf-8")
    payload_b64 = base64.urlsafe_b64encode(payload_bytes).rstrip(b"=")
    signature = hmac.new(
        settings.secret_key.encode("utf-8"),
        payload_b64,
        hashlib.sha256,
    ).digest()
    signature_b64 = base64.urlsafe_b64encode(signature).rstrip(b"=")
    return f"{payload_b64.decode('utf-8')}.{signature_b64.decode('utf-8')}"


def decode_access_token(token: str) -> int:
    try:
        payload_part, signature_part = token.split(".", maxsplit=1)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from exc

    expected_signature = hmac.new(
        settings.secret_key.encode("utf-8"),
        payload_part.encode("utf-8"),
        hashlib.sha256,
    ).digest()
    supplied_signature = base64.urlsafe_b64decode(_pad_base64(signature_part))

    if not hmac.compare_digest(expected_signature, supplied_signature):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    payload = json.loads(base64.urlsafe_b64decode(_pad_base64(payload_part)).decode("utf-8"))
    if payload["exp"] < int(datetime.now(timezone.utc).timestamp()):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    return int(payload["user_id"])


def _pad_base64(value: str) -> bytes:
    padding = "=" * (-len(value) % 4)
    return f"{value}{padding}".encode("utf-8")
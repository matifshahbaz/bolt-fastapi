from datetime import datetime, timezone
from uuid import uuid4

from app.core.config import settings
from app.repositories.contact_repository import ContactRepository
from app.schemas.contact import (
    ContactMessageCreate,
    ContactMessageRecord,
    ContactMessageResponse,
)


class ContactService:
    def __init__(self, repository: ContactRepository) -> None:
        self._repository = repository

    def submit_message(self, payload: ContactMessageCreate) -> ContactMessageResponse:
        record = ContactMessageRecord(
            submission_id=str(uuid4()),
            received_at=datetime.now(timezone.utc),
            **payload.model_dump(),
        )
        self._repository.save(record)
        return ContactMessageResponse(
            submission_id=record.submission_id,
            received_at=record.received_at,
            message="آپ کا پیغام موصول ہو گیا ہے۔ ہم جلد رابطہ کریں گے۔",
        )


contact_service = ContactService(ContactRepository(settings.contact_storage_path))
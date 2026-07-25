import json
from pathlib import Path

from app.schemas.contact import ContactMessageRecord


class ContactRepository:
    def __init__(self, storage_path: Path) -> None:
        self._storage_path = storage_path

    def save(self, record: ContactMessageRecord) -> None:
        self._storage_path.parent.mkdir(parents=True, exist_ok=True)
        with self._storage_path.open("a", encoding="utf-8") as storage:
            storage.write(json.dumps(record.model_dump(mode="json"), ensure_ascii=False))
            storage.write("\n")
from fastapi import APIRouter, status

from app.schemas.contact import ContactMessageCreate, ContactMessageResponse
from app.services.contact_service import contact_service

router = APIRouter()


@router.post(
    "/contact",
    response_model=ContactMessageResponse,
    status_code=status.HTTP_201_CREATED,
)
def submit_contact_message(payload: ContactMessageCreate) -> ContactMessageResponse:
    return contact_service.submit_message(payload)
import base64
import binascii
from uuid import uuid4

from fastapi import HTTPException, status

from app.core.config import settings
from app.repositories.content_repository import ContentRepository
from app.repositories.lms_repository import LmsRepository
from app.repositories.payment_repository import PaymentRepository
from app.schemas.auth import UserProfile
from app.schemas.lms import (
    PaymentInstructions,
    PaymentReviewRequest,
    PaymentSubmission,
    PaymentSubmissionCreate,
)
from app.services.email_service import email_service


class PaymentService:
    MAX_PROOF_BYTES = 4 * 1024 * 1024
    ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}

    def __init__(
        self,
        payment_repository: PaymentRepository,
        lms_repository: LmsRepository,
        content_repository: ContentRepository,
    ) -> None:
        self._payment_repository = payment_repository
        self._lms_repository = lms_repository
        self._content_repository = content_repository

    def get_instructions(self) -> PaymentInstructions:
        return PaymentInstructions(
            jazzcash_number=settings.jazzcash_number,
            bank_name=settings.bank_name,
            bank_account_title=settings.bank_account_title,
            bank_account_number=settings.bank_account_number,
            bank_iban=settings.bank_iban,
            bank_branch=settings.bank_branch,
        )

    def submit(self, user: UserProfile, course_id: str, payload: PaymentSubmissionCreate) -> PaymentSubmission:
        course = self._get_course(course_id)
        enrollment = self._lms_repository.get_enrollment(user.id, course_id)
        if enrollment and enrollment.status == "active":
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Course access is already active")

        latest = self._payment_repository.get_latest_for_user(user.id, course_id)
        if latest and latest.status == "pending":
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A payment proof is already pending review")
        if latest and latest.status == "approved":
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Payment has already been approved")

        content_type, proof_data = self._decode_proof(payload.proof_data_url)
        extension = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp"}[content_type]
        proof_filename = f"payment-{uuid4().hex}.{extension}"
        submission = self._payment_repository.create(
            user_id=user.id,
            course_id=course_id,
            payment_method=payload.payment_method,
            amount=course.price,
            sender_account=self._clean_optional(payload.sender_account),
            transaction_reference=self._clean_optional(payload.transaction_reference),
            proof_filename=proof_filename,
            proof_content_type=content_type,
            proof_data=proof_data,
        )
        email_service.send_payment_received(user.email, user.full_name, course.title)
        email_service.send_payment_alert(user.full_name, user.email, course.title)
        return submission

    def get_latest(self, user: UserProfile, course_id: str) -> PaymentSubmission | None:
        return self._payment_repository.get_latest_for_user(user.id, course_id)

    def list_for_admin(self, status_filter: str | None) -> list[PaymentSubmission]:
        if status_filter and status_filter not in {"pending", "approved", "rejected"}:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Invalid payment status")
        return self._payment_repository.list(status_filter)

    def get_proof(self, submission_id: int) -> tuple[str, str, bytes]:
        proof = self._payment_repository.get_proof(submission_id)
        if proof is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payment submission not found")
        return proof

    def approve(
        self,
        reviewer: UserProfile,
        submission_id: int,
        payload: PaymentReviewRequest,
    ) -> PaymentSubmission:
        submission = self._get_pending_submission(submission_id)
        course = self._get_course(submission.course_id)
        self._lms_repository.create_or_activate_enrollment(
            submission.user_id,
            submission.course_id,
            submission.amount,
        )
        reviewed = self._payment_repository.mark_reviewed(
            submission_id,
            reviewer.id,
            "approved",
            self._clean_optional(payload.review_note),
        )
        if reviewed is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payment submission not found")
        email_service.send_payment_approved(reviewed.user_email, reviewed.user_name, course.title)
        return reviewed

    def reject(
        self,
        reviewer: UserProfile,
        submission_id: int,
        payload: PaymentReviewRequest,
    ) -> PaymentSubmission:
        submission = self._get_pending_submission(submission_id)
        course = self._get_course(submission.course_id)
        reviewed = self._payment_repository.mark_reviewed(
            submission_id,
            reviewer.id,
            "rejected",
            self._clean_optional(payload.review_note),
        )
        if reviewed is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payment submission not found")
        email_service.send_payment_rejected(
            reviewed.user_email,
            reviewed.user_name,
            course.title,
            reviewed.review_note,
        )
        return reviewed

    def _get_pending_submission(self, submission_id: int) -> PaymentSubmission:
        submission = self._payment_repository.get(submission_id)
        if submission is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payment submission not found")
        if submission.status != "pending":
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Payment submission has already been reviewed")
        return submission

    def _get_course(self, course_id: str):
        course = self._content_repository.get_course_by_id(course_id)
        if course is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
        return course

    def _decode_proof(self, data_url: str) -> tuple[str, bytes]:
        try:
            header, encoded = data_url.split(",", 1)
            content_type = header.removeprefix("data:").removesuffix(";base64")
            if not header.endswith(";base64") or content_type not in self.ALLOWED_IMAGE_TYPES:
                raise ValueError
            proof_data = base64.b64decode(encoded, validate=True)
        except (ValueError, binascii.Error):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Payment proof must be a valid JPEG, PNG, or WebP image",
            ) from None

        if not proof_data or len(proof_data) > self.MAX_PROOF_BYTES:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Payment proof must be no larger than 4 MB",
            )
        if not self._matches_signature(content_type, proof_data):
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Payment proof image is invalid")
        return content_type, proof_data

    @staticmethod
    def _matches_signature(content_type: str, data: bytes) -> bool:
        if content_type == "image/png":
            return data.startswith(b"\x89PNG\r\n\x1a\n")
        if content_type == "image/jpeg":
            return data.startswith(b"\xff\xd8\xff")
        return len(data) >= 12 and data.startswith(b"RIFF") and data[8:12] == b"WEBP"

    @staticmethod
    def _clean_optional(value: str | None) -> str | None:
        cleaned = value.strip() if value else ""
        return cleaned or None


payment_service = PaymentService(PaymentRepository(), LmsRepository(), ContentRepository())
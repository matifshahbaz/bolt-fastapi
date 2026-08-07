from datetime import datetime, timezone

from sqlalchemy import select

from app.core.db import get_db_session
from app.models import PaymentSubmissionModel, UserModel
from app.schemas.lms import PaymentSubmission


class PaymentRepository:
    def create(
        self,
        *,
        user_id: int,
        course_id: str,
        payment_method: str,
        amount: str,
        sender_account: str | None,
        transaction_reference: str | None,
        proof_filename: str,
        proof_content_type: str,
        proof_data: bytes,
    ) -> PaymentSubmission:
        with get_db_session() as session:
            submission = PaymentSubmissionModel(
                user_id=user_id,
                course_id=course_id,
                payment_method=payment_method,
                amount=amount,
                sender_account=sender_account,
                transaction_reference=transaction_reference,
                proof_filename=proof_filename,
                proof_content_type=proof_content_type,
                proof_data=proof_data,
                status="pending",
            )
            session.add(submission)
            session.flush()
            session.refresh(submission)
            user = session.get(UserModel, user_id)
            return self._to_schema(submission, user)

    def get_latest_for_user(self, user_id: int, course_id: str) -> PaymentSubmission | None:
        with get_db_session() as session:
            submission = session.scalar(
                select(PaymentSubmissionModel)
                .where(
                    PaymentSubmissionModel.user_id == user_id,
                    PaymentSubmissionModel.course_id == course_id,
                )
                .order_by(PaymentSubmissionModel.submitted_at.desc(), PaymentSubmissionModel.id.desc())
            )
            user = session.get(UserModel, user_id) if submission else None
            return self._to_schema(submission, user) if submission else None

    def list(self, status_filter: str | None = None) -> list[PaymentSubmission]:
        query = select(PaymentSubmissionModel).order_by(
            PaymentSubmissionModel.submitted_at.desc(),
            PaymentSubmissionModel.id.desc(),
        )
        if status_filter:
            query = query.where(PaymentSubmissionModel.status == status_filter)

        with get_db_session() as session:
            submissions = session.scalars(query).all()
            return [self._to_schema(item, session.get(UserModel, item.user_id)) for item in submissions]

    def get(self, submission_id: int) -> PaymentSubmission | None:
        with get_db_session() as session:
            submission = session.get(PaymentSubmissionModel, submission_id)
            user = session.get(UserModel, submission.user_id) if submission else None
            return self._to_schema(submission, user) if submission else None

    def get_proof(self, submission_id: int) -> tuple[str, str, bytes] | None:
        with get_db_session() as session:
            submission = session.get(PaymentSubmissionModel, submission_id)
            if submission is None:
                return None
            return submission.proof_filename, submission.proof_content_type, submission.proof_data

    def mark_reviewed(
        self,
        submission_id: int,
        reviewer_id: int,
        review_status: str,
        review_note: str | None,
    ) -> PaymentSubmission | None:
        with get_db_session() as session:
            submission = session.get(PaymentSubmissionModel, submission_id)
            if submission is None:
                return None
            submission.status = review_status
            submission.review_note = review_note
            submission.reviewed_by = reviewer_id
            submission.reviewed_at = datetime.now(timezone.utc)
            session.flush()
            session.refresh(submission)
            user = session.get(UserModel, submission.user_id)
            return self._to_schema(submission, user)

    @staticmethod
    def _to_schema(submission: PaymentSubmissionModel, user: UserModel | None) -> PaymentSubmission:
        return PaymentSubmission(
            id=submission.id,
            user_id=submission.user_id,
            user_name=user.full_name if user else "Unknown user",
            user_email=user.email if user else "",
            course_id=submission.course_id,
            payment_method=submission.payment_method,
            amount=submission.amount,
            sender_account=submission.sender_account,
            transaction_reference=submission.transaction_reference,
            proof_filename=submission.proof_filename,
            proof_content_type=submission.proof_content_type,
            status=submission.status,
            review_note=submission.review_note,
            submitted_at=submission.submitted_at,
            reviewed_at=submission.reviewed_at,
        )
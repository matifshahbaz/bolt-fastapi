from datetime import date, datetime, timezone

from sqlalchemy import Boolean, Date, DateTime, ForeignKey, Integer, LargeBinary, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.core.db import Base


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class UserModel(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(Text, nullable=False)
    mobile_number: Mapped[str | None] = mapped_column(String(30), nullable=True)
    age: Mapped[int | None] = mapped_column(Integer, nullable=True)
    location: Mapped[str | None] = mapped_column(String(120), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)


class PasswordResetTokenModel(Base):
    __tablename__ = "password_reset_tokens"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    token_hash: Mapped[str] = mapped_column(String(64), nullable=False, unique=True, index=True)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    used_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)


class EnrollmentModel(Base):
    __tablename__ = "enrollments"
    __table_args__ = (UniqueConstraint("user_id", "course_id", name="uq_enrollment_user_course"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    course_id: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False)
    price_paid: Mapped[str] = mapped_column(String(50), nullable=False)
    enrolled_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)
    last_accessed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


class PaymentSubmissionModel(Base):
    __tablename__ = "payment_submissions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    course_id: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    payment_method: Mapped[str] = mapped_column(String(30), nullable=False)
    amount: Mapped[str] = mapped_column(String(50), nullable=False)
    sender_account: Mapped[str | None] = mapped_column(String(120), nullable=True)
    transaction_reference: Mapped[str | None] = mapped_column(String(120), nullable=True)
    proof_filename: Mapped[str] = mapped_column(String(255), nullable=False)
    proof_content_type: Mapped[str] = mapped_column(String(50), nullable=False)
    proof_data: Mapped[bytes] = mapped_column(LargeBinary, nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="pending", index=True)
    review_note: Mapped[str | None] = mapped_column(Text, nullable=True)
    reviewed_by: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    submitted_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)
    reviewed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


class LessonProgressModel(Base):
    __tablename__ = "lesson_progress"
    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "course_id",
            "module_id",
            "lesson_index",
            name="uq_progress_user_course_lesson",
        ),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    course_id: Mapped[str] = mapped_column(String(255), nullable=False)
    module_id: Mapped[str] = mapped_column(String(255), nullable=False)
    lesson_index: Mapped[int] = mapped_column(Integer, nullable=False)
    lesson_title: Mapped[str] = mapped_column(String(255), nullable=False)
    completed: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


class CourseFinderListingModel(Base):
    __tablename__ = "course_finder_listings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    title_en: Mapped[str | None] = mapped_column(String(255), nullable=True)
    provider: Mapped[str | None] = mapped_column(String(255), nullable=True)
    subject: Mapped[str] = mapped_column(String(120), nullable=False, index=True)
    delivery_mode: Mapped[str | None] = mapped_column(String(120), nullable=True)
    price_type: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    price_label: Mapped[str | None] = mapped_column(String(255), nullable=True)
    duration_label: Mapped[str] = mapped_column(String(255), nullable=False)
    duration_bucket: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    external_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)


class UniversityProgramModel(Base):
    """One row = one program offered at one campus (see Public_Data_View import)."""

    __tablename__ = "university_programs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    public_id: Mapped[str] = mapped_column(String(40), nullable=False, unique=True, index=True)
    university_name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    sector: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    campus_name: Mapped[str] = mapped_column(String(255), nullable=False)
    city: Mapped[str] = mapped_column(String(120), nullable=False, index=True)
    province: Mapped[str] = mapped_column(String(120), nullable=False, index=True)
    degree_level: Mapped[str] = mapped_column(String(60), nullable=False, index=True)
    program_name_en: Mapped[str] = mapped_column(String(255), nullable=False)
    program_name_ur: Mapped[str | None] = mapped_column(String(255), nullable=True)
    field_group: Mapped[str] = mapped_column(String(120), nullable=False, index=True)
    discipline: Mapped[str | None] = mapped_column(String(255), nullable=True)
    duration_years: Mapped[int | None] = mapped_column(Integer, nullable=True)
    semesters: Mapped[int | None] = mapped_column(Integer, nullable=True)
    shift: Mapped[str | None] = mapped_column(String(60), nullable=True)
    gender_restriction: Mapped[str | None] = mapped_column(String(60), nullable=True)
    admission_status: Mapped[str | None] = mapped_column(String(255), nullable=True)
    fee_amount_pkr: Mapped[int | None] = mapped_column(Integer, nullable=True)
    fee_basis_code: Mapped[str | None] = mapped_column(String(60), nullable=True)
    fee_basis_label_ur: Mapped[str | None] = mapped_column(String(120), nullable=True)
    fee_filter_amount_pkr: Mapped[int | None] = mapped_column(Integer, nullable=True)
    include_in_main_fee_filter: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    fee_display_ur: Mapped[str | None] = mapped_column(String(255), nullable=True)
    fee_warning_ur: Mapped[str | None] = mapped_column(Text, nullable=True)
    program_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    admission_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    fee_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    source_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    last_verified: Mapped[str | None] = mapped_column(String(40), nullable=True)
    confidence: Mapped[str | None] = mapped_column(String(20), nullable=True)
    publish_status: Mapped[str | None] = mapped_column(String(120), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)


class ScholarshipModel(Base):
    __tablename__ = "scholarships"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    country: Mapped[str] = mapped_column(String(120), nullable=False, index=True)
    degree_level: Mapped[str] = mapped_column(String(60), nullable=False, index=True)
    field_of_study: Mapped[str] = mapped_column(Text, nullable=False)
    deadline_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    deadline_label: Mapped[str | None] = mapped_column(String(60), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    external_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)
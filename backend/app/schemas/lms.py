from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class Enrollment(BaseModel):
    id: int
    course_id: str
    status: str
    price_paid: str
    enrolled_at: datetime
    last_accessed_at: datetime | None = None


class AdminStudentRecord(BaseModel):
    user_id: int
    full_name: str
    email: str
    mobile_number: str | None = None
    age: int | None = None
    location: str | None = None
    registered_at: datetime
    enrollment: Enrollment | None = None
    completed_lessons: int = 0


class AdminEnrollmentCreate(BaseModel):
    email: str = Field(min_length=3, max_length=255)
    course_id: str = Field(min_length=1, max_length=255)
    price_paid: str | None = Field(default=None, max_length=50)


class AdminEnrollmentStatusUpdate(BaseModel):
    status: Literal["active", "inactive", "expired", "refunded"]


class PaymentSubmissionCreate(BaseModel):
    payment_method: Literal["jazzcash", "bank_transfer"]
    sender_account: str | None = Field(default=None, max_length=120)
    transaction_reference: str | None = Field(default=None, max_length=120)
    proof_filename: str = Field(min_length=1, max_length=255)
    proof_data_url: str = Field(min_length=100, max_length=6_000_000)


class PaymentSubmission(BaseModel):
    id: int
    user_id: int
    user_name: str
    user_email: str
    course_id: str
    payment_method: str
    amount: str
    sender_account: str | None = None
    transaction_reference: str | None = None
    proof_filename: str
    proof_content_type: str
    status: str
    review_note: str | None = None
    submitted_at: datetime
    reviewed_at: datetime | None = None


class PaymentReviewRequest(BaseModel):
    review_note: str | None = Field(default=None, max_length=1000)


class PaymentInstructions(BaseModel):
    jazzcash_number: str
    bank_name: str
    bank_account_title: str
    bank_account_number: str
    bank_iban: str
    bank_branch: str


class LessonProgressItem(BaseModel):
    module_id: str
    lesson_index: int
    lesson_title: str
    completed: bool
    completed_at: datetime | None = None


class LessonProgressUpdate(BaseModel):
    completed: bool


class CourseProgress(BaseModel):
    course_id: str
    total_lessons: int
    completed_lessons: int
    percent_complete: float
    items: list[LessonProgressItem]


class DashboardCourse(BaseModel):
    enrollment: Enrollment
    progress: CourseProgress
    course_title: str
    course_subtitle: str


class DashboardResponse(BaseModel):
    student_name: str
    student_email: str
    enrolled_courses: list[DashboardCourse]
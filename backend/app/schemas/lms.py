from datetime import datetime

from pydantic import BaseModel


class Enrollment(BaseModel):
    id: int
    course_id: str
    status: str
    price_paid: str
    enrolled_at: datetime
    last_accessed_at: datetime | None = None


class PurchaseRequest(BaseModel):
    payment_method: str = "manual"


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
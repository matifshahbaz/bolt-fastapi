from fastapi import HTTPException, status

from app.repositories.content_repository import ContentRepository
from app.repositories.lms_repository import LmsRepository
from app.repositories.user_repository import UserRepository
from app.schemas.auth import MessageResponse
from app.schemas.lms import (
    AdminEnrollmentCreate,
    AdminEnrollmentStatusUpdate,
    AdminStudentRecord,
    Enrollment,
)
from app.services.email_service import email_service


class AdminEnrollmentService:
    def __init__(
        self,
        user_repository: UserRepository,
        lms_repository: LmsRepository,
        content_repository: ContentRepository,
    ) -> None:
        self._user_repository = user_repository
        self._lms_repository = lms_repository
        self._content_repository = content_repository

    def list_students(self, course_id: str, search: str | None) -> list[AdminStudentRecord]:
        self._get_course(course_id)
        records: list[AdminStudentRecord] = []
        for user in self._user_repository.list_users(search):
            records.append(
                AdminStudentRecord(
                    user_id=user.id,
                    full_name=user.full_name,
                    email=user.email,
                    mobile_number=user.mobile_number,
                    age=user.age,
                    location=user.location,
                    registered_at=user.created_at,
                    enrollment=self._lms_repository.get_enrollment(user.id, course_id),
                    completed_lessons=self._lms_repository.count_completed_lessons(user.id, course_id),
                )
            )
        return records

    def enroll(self, payload: AdminEnrollmentCreate) -> Enrollment:
        course = self._get_course(payload.course_id)
        user = self._user_repository.get_auth_record_by_email(payload.email.strip())
        if user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User account not found")

        price_paid = payload.price_paid.strip() if payload.price_paid else course.price
        enrollment = self._lms_repository.create_or_activate_enrollment(
            int(user["id"]),
            payload.course_id,
            price_paid,
        )
        email_service.send_course_access_granted(
            recipient=str(user["email"]),
            full_name=str(user["full_name"]),
            course_title=course.title,
        )
        return enrollment

    def update_status(
        self,
        user_id: int,
        course_id: str,
        payload: AdminEnrollmentStatusUpdate,
    ) -> Enrollment:
        self._get_course(course_id)
        enrollment = self._lms_repository.get_enrollment(user_id, course_id)
        if enrollment is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")

        if payload.status == "active":
            return self._lms_repository.create_or_activate_enrollment(
                user_id,
                course_id,
                enrollment.price_paid,
            )
        updated = self._lms_repository.update_enrollment_status(user_id, course_id, payload.status)
        if updated is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")
        return updated

    def remove(self, user_id: int, course_id: str) -> MessageResponse:
        self._get_course(course_id)
        if not self._lms_repository.delete_enrollment(user_id, course_id):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")
        return MessageResponse(message="Enrollment and course progress removed")

    def _get_course(self, course_id: str):
        course = self._content_repository.get_course_by_id(course_id)
        if course is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
        return course


admin_enrollment_service = AdminEnrollmentService(UserRepository(), LmsRepository(), ContentRepository())
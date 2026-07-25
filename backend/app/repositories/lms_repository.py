from datetime import datetime, timezone

from sqlalchemy import select

from app.core.db import get_db_session
from app.models import EnrollmentModel, LessonProgressModel
from app.schemas.lms import Enrollment, LessonProgressItem


class LmsRepository:
    def get_enrollment(self, user_id: int, course_id: str) -> Enrollment | None:
        with get_db_session() as session:
            enrollment = session.scalar(
                select(EnrollmentModel).where(
                    EnrollmentModel.user_id == user_id,
                    EnrollmentModel.course_id == course_id,
                )
            )
        return self._to_enrollment(enrollment) if enrollment else None

    def create_or_activate_enrollment(self, user_id: int, course_id: str, price_paid: str) -> Enrollment:
        now = datetime.now(timezone.utc)
        with get_db_session() as session:
            enrollment = session.scalar(
                select(EnrollmentModel).where(
                    EnrollmentModel.user_id == user_id,
                    EnrollmentModel.course_id == course_id,
                )
            )
            if enrollment is None:
                enrollment = EnrollmentModel(
                    user_id=user_id,
                    course_id=course_id,
                    status="active",
                    price_paid=price_paid,
                    enrolled_at=now,
                    last_accessed_at=now,
                )
                session.add(enrollment)
            else:
                enrollment.status = "active"
                enrollment.price_paid = price_paid
                enrollment.last_accessed_at = now
            session.flush()
            session.refresh(enrollment)
            return self._to_enrollment(enrollment)

    def list_enrollments(self, user_id: int) -> list[Enrollment]:
        with get_db_session() as session:
            rows = session.scalars(
                select(EnrollmentModel)
                .where(EnrollmentModel.user_id == user_id)
                .order_by(EnrollmentModel.enrolled_at.desc())
            ).all()
        return [self._to_enrollment(row) for row in rows]

    def touch_enrollment(self, user_id: int, course_id: str) -> None:
        with get_db_session() as session:
            enrollment = session.scalar(
                select(EnrollmentModel).where(
                    EnrollmentModel.user_id == user_id,
                    EnrollmentModel.course_id == course_id,
                )
            )
            if enrollment is not None:
                enrollment.last_accessed_at = datetime.now(timezone.utc)

    def list_progress(self, user_id: int, course_id: str) -> list[LessonProgressItem]:
        with get_db_session() as session:
            rows = session.scalars(
                select(LessonProgressModel)
                .where(
                    LessonProgressModel.user_id == user_id,
                    LessonProgressModel.course_id == course_id,
                )
                .order_by(LessonProgressModel.module_id.asc(), LessonProgressModel.lesson_index.asc())
            ).all()
        return [self._to_progress_item(row) for row in rows]

    def upsert_progress(
        self,
        user_id: int,
        course_id: str,
        module_id: str,
        lesson_index: int,
        lesson_title: str,
        completed: bool,
    ) -> LessonProgressItem:
        completed_at = datetime.now(timezone.utc) if completed else None
        with get_db_session() as session:
            progress = session.scalar(
                select(LessonProgressModel).where(
                    LessonProgressModel.user_id == user_id,
                    LessonProgressModel.course_id == course_id,
                    LessonProgressModel.module_id == module_id,
                    LessonProgressModel.lesson_index == lesson_index,
                )
            )
            if progress is None:
                progress = LessonProgressModel(
                    user_id=user_id,
                    course_id=course_id,
                    module_id=module_id,
                    lesson_index=lesson_index,
                    lesson_title=lesson_title,
                    completed=completed,
                    completed_at=completed_at,
                )
                session.add(progress)
            else:
                progress.lesson_title = lesson_title
                progress.completed = completed
                progress.completed_at = completed_at
            session.flush()
            session.refresh(progress)
            return self._to_progress_item(progress)

    @staticmethod
    def _to_enrollment(enrollment: EnrollmentModel) -> Enrollment:
        return Enrollment(
            id=enrollment.id,
            course_id=enrollment.course_id,
            status=enrollment.status,
            price_paid=enrollment.price_paid,
            enrolled_at=enrollment.enrolled_at,
            last_accessed_at=enrollment.last_accessed_at,
        )

    @staticmethod
    def _to_progress_item(progress: LessonProgressModel) -> LessonProgressItem:
        return LessonProgressItem(
            module_id=progress.module_id,
            lesson_index=progress.lesson_index,
            lesson_title=progress.lesson_title,
            completed=progress.completed,
            completed_at=progress.completed_at,
        )
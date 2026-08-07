from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, status

from app.core.config import settings
from app.repositories.content_repository import ContentRepository
from app.repositories.lms_repository import LmsRepository
from app.schemas.auth import UserProfile
from app.schemas.lms import (
    CourseProgress,
    DashboardCourse,
    DashboardResponse,
    Enrollment,
    LessonProgressUpdate,
)
from app.schemas.media import LessonPlaybackResponse, LessonWatchEvent, LessonWatchUpdateResponse
from app.services.cloudflare_service import cloudflare_service


class LmsService:
    REFUND_WINDOW_DAYS = 7
    ACCESS_WINDOW_DAYS = 30

    def __init__(self, lms_repository: LmsRepository, content_repository: ContentRepository) -> None:
        self._lms_repository = lms_repository
        self._content_repository = content_repository

    def purchase_course(self, user: UserProfile, course_id: str) -> Enrollment:
        course = self._content_repository.get_course_by_id(course_id)
        if course is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
        return self._lms_repository.create_or_activate_enrollment(user.id, course_id, course.price)

    def get_course_progress(self, user: UserProfile, course_id: str) -> CourseProgress:
        enrollment = self._lms_repository.get_enrollment(user.id, course_id)
        if enrollment is None:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Course not purchased")
        enrollment = self._enforce_access_window(user.id, enrollment)
        if enrollment.status != "active":
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Course access is inactive")
        course = self._content_repository.get_course_by_id(course_id)
        if course is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

        self._lms_repository.touch_enrollment(user.id, course_id)
        items = self._lms_repository.list_progress(user.id, course_id)
        total_lessons = sum(len(module.lessons) for module in course.modules)
        completed_lessons = sum(1 for item in items if item.completed)
        percent_complete = round((completed_lessons / total_lessons) * 100, 1) if total_lessons else 0.0

        return CourseProgress(
            course_id=course_id,
            total_lessons=total_lessons,
            completed_lessons=completed_lessons,
            percent_complete=percent_complete,
            items=items,
        )

    def update_lesson_progress(
        self,
        user: UserProfile,
        course_id: str,
        module_id: str,
        lesson_index: int,
        payload: LessonProgressUpdate,
    ) -> CourseProgress:
        enrollment = self._lms_repository.get_enrollment(user.id, course_id)
        if enrollment is None:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Course not purchased")
        enrollment = self._enforce_access_window(user.id, enrollment)
        if enrollment.status != "active":
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Course access is inactive")
        course = self._content_repository.get_course_by_id(course_id)
        if course is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

        module = next((module for module in course.modules if module.id == module_id), None)
        if module is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Module not found")
        if lesson_index < 0 or lesson_index >= len(module.lessons):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found")

        lesson_title = module.lessons[lesson_index].title
        self._lms_repository.upsert_progress(
            user.id,
            course_id,
            module_id,
            lesson_index,
            lesson_title,
            payload.completed,
        )
        self._lms_repository.touch_enrollment(user.id, course_id)
        return self.get_course_progress(user, course_id)

    def get_dashboard(self, user: UserProfile) -> DashboardResponse:
        enrollments = self._lms_repository.list_enrollments(user.id)
        dashboard_courses: list[DashboardCourse] = []
        for enrollment in enrollments:
            enrollment = self._enforce_access_window(user.id, enrollment)
            course = self._content_repository.get_course_by_id(enrollment.course_id)
            if course is None:
                continue
            progress = self._build_course_progress(user.id, enrollment.course_id, course.modules)
            dashboard_courses.append(
                DashboardCourse(
                    enrollment=enrollment,
                    progress=progress,
                    course_title=course.title,
                    course_subtitle=course.subtitle,
                )
            )
        return DashboardResponse(
            student_name=user.full_name,
            student_email=user.email,
            enrolled_courses=dashboard_courses,
        )

    def refund_course(self, user: UserProfile, course_id: str) -> Enrollment:
        enrollment = self._lms_repository.get_enrollment(user.id, course_id)
        if enrollment is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")
        enrollment = self._enforce_access_window(user.id, enrollment)

        if enrollment.status != "active":
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Course is already refunded")

        now = datetime.now(timezone.utc)
        if now - self._as_utc(enrollment.enrolled_at) > timedelta(days=self.REFUND_WINDOW_DAYS):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Refund window expired. Refunds are allowed within 7 days of purchase.",
            )

        refunded = self._lms_repository.mark_enrollment_refunded(user.id, course_id)
        if refunded is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")
        return refunded

    def get_lesson_playback(
        self,
        user: UserProfile,
        course_id: str,
        module_id: str,
        lesson_index: int,
    ) -> LessonPlaybackResponse:
        self._validate_lesson_access(user, course_id, module_id, lesson_index)
        video_uid = cloudflare_service.get_lesson_video_uid(course_id, module_id, lesson_index)
        return cloudflare_service.get_signed_lesson_playback(video_uid)

    def submit_watch_event(
        self,
        user: UserProfile,
        course_id: str,
        module_id: str,
        lesson_index: int,
        payload: LessonWatchEvent,
    ) -> LessonWatchUpdateResponse:
        enrollment, lesson_title = self._validate_lesson_access(user, course_id, module_id, lesson_index)
        _ = enrollment

        existing = next(
            (
                item
                for item in self._lms_repository.list_progress(user.id, course_id)
                if item.module_id == module_id and item.lesson_index == lesson_index
            ),
            None,
        )

        threshold = settings.cloudflare_stream_watch_completion_threshold
        was_completed = bool(existing and existing.completed)
        should_mark_complete = was_completed or payload.watched_percent >= threshold

        if should_mark_complete != was_completed:
            self._lms_repository.upsert_progress(
                user.id,
                course_id,
                module_id,
                lesson_index,
                lesson_title,
                True,
            )
            self._lms_repository.touch_enrollment(user.id, course_id)

        return LessonWatchUpdateResponse(
            marked_complete=should_mark_complete,
            watched_percent=payload.watched_percent,
        )

    def _validate_lesson_access(
        self,
        user: UserProfile,
        course_id: str,
        module_id: str,
        lesson_index: int,
    ) -> tuple[Enrollment, str]:
        enrollment = self._lms_repository.get_enrollment(user.id, course_id)
        if enrollment is None:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Course not purchased")
        enrollment = self._enforce_access_window(user.id, enrollment)
        if enrollment.status != "active":
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Course access is inactive")
        course = self._content_repository.get_course_by_id(course_id)
        if course is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

        module = next((module for module in course.modules if module.id == module_id), None)
        if module is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Module not found")
        if lesson_index < 0 or lesson_index >= len(module.lessons):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found")
        lesson_title = module.lessons[lesson_index].title
        return enrollment, lesson_title

    def _enforce_access_window(self, user_id: int, enrollment: Enrollment) -> Enrollment:
        if enrollment.status != "active":
            return enrollment

        now = datetime.now(timezone.utc)
        if now - self._as_utc(enrollment.enrolled_at) > timedelta(days=self.ACCESS_WINDOW_DAYS):
            expired = self._lms_repository.mark_enrollment_expired(user_id, enrollment.course_id)
            if expired is not None:
                return expired
        return enrollment

    def _build_course_progress(self, user_id: int, course_id: str, modules: list) -> CourseProgress:
        items = self._lms_repository.list_progress(user_id, course_id)
        total_lessons = sum(len(module.lessons) for module in modules)
        completed_lessons = sum(1 for item in items if item.completed)
        percent_complete = round((completed_lessons / total_lessons) * 100, 1) if total_lessons else 0.0

        return CourseProgress(
            course_id=course_id,
            total_lessons=total_lessons,
            completed_lessons=completed_lessons,
            percent_complete=percent_complete,
            items=items,
        )

    @staticmethod
    def _as_utc(value: datetime) -> datetime:
        if value.tzinfo is None:
            return value.replace(tzinfo=timezone.utc)
        return value.astimezone(timezone.utc)


lms_service = LmsService(LmsRepository(), ContentRepository())
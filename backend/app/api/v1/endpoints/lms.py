from fastapi import APIRouter

from app.api.dependencies import CurrentUser
from app.schemas.auth import UserProfile
from app.schemas.lms import (
    CourseProgress,
    DashboardResponse,
    Enrollment,
    LessonProgressUpdate,
    PurchaseRequest,
)
from app.schemas.media import LessonPlaybackResponse, LessonWatchEvent, LessonWatchUpdateResponse
from app.services.lms_service import lms_service

router = APIRouter(prefix="/lms")


@router.post("/courses/{course_id}/purchase", response_model=Enrollment)
def purchase_course(
    course_id: str,
    payload: PurchaseRequest,
    current_user: UserProfile = CurrentUser,
) -> Enrollment:
    _ = payload
    return lms_service.purchase_course(current_user, course_id)


@router.post("/courses/{course_id}/refund", response_model=Enrollment)
def refund_course(
    course_id: str,
    current_user: UserProfile = CurrentUser,
) -> Enrollment:
    return lms_service.refund_course(current_user, course_id)


@router.get("/courses/{course_id}/progress", response_model=CourseProgress)
def get_course_progress(course_id: str, current_user: UserProfile = CurrentUser) -> CourseProgress:
    return lms_service.get_course_progress(current_user, course_id)


@router.post("/courses/{course_id}/modules/{module_id}/lessons/{lesson_index}", response_model=CourseProgress)
def update_lesson_progress(
    course_id: str,
    module_id: str,
    lesson_index: int,
    payload: LessonProgressUpdate,
    current_user: UserProfile = CurrentUser,
) -> CourseProgress:
    return lms_service.update_lesson_progress(current_user, course_id, module_id, lesson_index, payload)


@router.get(
    "/courses/{course_id}/modules/{module_id}/lessons/{lesson_index}/playback",
    response_model=LessonPlaybackResponse,
)
def get_lesson_playback(
    course_id: str,
    module_id: str,
    lesson_index: int,
    current_user: UserProfile = CurrentUser,
) -> LessonPlaybackResponse:
    return lms_service.get_lesson_playback(current_user, course_id, module_id, lesson_index)


@router.post(
    "/courses/{course_id}/modules/{module_id}/lessons/{lesson_index}/watch",
    response_model=LessonWatchUpdateResponse,
)
def submit_watch_event(
    course_id: str,
    module_id: str,
    lesson_index: int,
    payload: LessonWatchEvent,
    current_user: UserProfile = CurrentUser,
) -> LessonWatchUpdateResponse:
    return lms_service.submit_watch_event(current_user, course_id, module_id, lesson_index, payload)


@router.get("/me/dashboard", response_model=DashboardResponse)
def dashboard(current_user: UserProfile = CurrentUser) -> DashboardResponse:
    return lms_service.get_dashboard(current_user)
from fastapi import APIRouter, HTTPException, Query, Response, status

from app.api.dependencies import AdminUser, CurrentUser
from app.schemas.auth import MessageResponse, UserProfile
from app.schemas.lms import (
    AdminEnrollmentCreate,
    AdminEnrollmentStatusUpdate,
    AdminStudentRecord,
    CourseProgress,
    DashboardResponse,
    Enrollment,
    LessonProgressUpdate,
    PaymentInstructions,
    PaymentReviewRequest,
    PaymentSubmission,
    PaymentSubmissionCreate,
)
from app.schemas.media import LessonPlaybackResponse, LessonWatchEvent, LessonWatchUpdateResponse
from app.services.lms_service import lms_service
from app.services.payment_service import payment_service
from app.services.admin_enrollment_service import admin_enrollment_service

router = APIRouter(prefix="/lms")


@router.get("/payment-instructions", response_model=PaymentInstructions)
def payment_instructions() -> PaymentInstructions:
    return payment_service.get_instructions()


@router.post("/courses/{course_id}/purchase")
def purchase_course_disabled(course_id: str, current_user: UserProfile = CurrentUser) -> None:
    _ = course_id, current_user
    raise HTTPException(
        status_code=status.HTTP_409_CONFLICT,
        detail="Online checkout is temporarily unavailable. Submit manual payment proof instead.",
    )


@router.post("/courses/{course_id}/payment-submissions", response_model=PaymentSubmission)
def submit_payment(
    course_id: str,
    payload: PaymentSubmissionCreate,
    current_user: UserProfile = CurrentUser,
) -> PaymentSubmission:
    return payment_service.submit(current_user, course_id, payload)


@router.get("/courses/{course_id}/payment-submission", response_model=PaymentSubmission | None)
def get_payment_submission(
    course_id: str,
    current_user: UserProfile = CurrentUser,
) -> PaymentSubmission | None:
    return payment_service.get_latest(current_user, course_id)


@router.get("/admin/payment-submissions", response_model=list[PaymentSubmission])
def list_payment_submissions(
    payment_status: str | None = Query(default=None, alias="status"),
    admin_user: UserProfile = AdminUser,
) -> list[PaymentSubmission]:
    _ = admin_user
    return payment_service.list_for_admin(payment_status)


@router.get("/admin/payment-submissions/{submission_id}/proof")
def get_payment_proof(submission_id: int, admin_user: UserProfile = AdminUser) -> Response:
    _ = admin_user
    filename, content_type, proof_data = payment_service.get_proof(submission_id)
    safe_filename = filename.replace('"', "")
    return Response(
        content=proof_data,
        media_type=content_type,
        headers={"Content-Disposition": f'inline; filename="{safe_filename}"'},
    )


@router.post("/admin/payment-submissions/{submission_id}/approve", response_model=PaymentSubmission)
def approve_payment(
    submission_id: int,
    payload: PaymentReviewRequest,
    admin_user: UserProfile = AdminUser,
) -> PaymentSubmission:
    return payment_service.approve(admin_user, submission_id, payload)


@router.post("/admin/payment-submissions/{submission_id}/reject", response_model=PaymentSubmission)
def reject_payment(
    submission_id: int,
    payload: PaymentReviewRequest,
    admin_user: UserProfile = AdminUser,
) -> PaymentSubmission:
    return payment_service.reject(admin_user, submission_id, payload)


@router.get("/admin/students", response_model=list[AdminStudentRecord])
def list_students(
    course_id: str = Query(..., min_length=1),
    search: str | None = Query(default=None, max_length=120),
    admin_user: UserProfile = AdminUser,
) -> list[AdminStudentRecord]:
    _ = admin_user
    return admin_enrollment_service.list_students(course_id, search)


@router.post("/admin/enrollments", response_model=Enrollment)
def create_admin_enrollment(
    payload: AdminEnrollmentCreate,
    admin_user: UserProfile = AdminUser,
) -> Enrollment:
    _ = admin_user
    return admin_enrollment_service.enroll(payload)


@router.patch("/admin/students/{user_id}/courses/{course_id}/enrollment", response_model=Enrollment)
def update_admin_enrollment(
    user_id: int,
    course_id: str,
    payload: AdminEnrollmentStatusUpdate,
    admin_user: UserProfile = AdminUser,
) -> Enrollment:
    _ = admin_user
    return admin_enrollment_service.update_status(user_id, course_id, payload)


@router.delete("/admin/students/{user_id}/courses/{course_id}/enrollment", response_model=MessageResponse)
def delete_admin_enrollment(
    user_id: int,
    course_id: str,
    admin_user: UserProfile = AdminUser,
) -> MessageResponse:
    _ = admin_user
    return admin_enrollment_service.remove(user_id, course_id)


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
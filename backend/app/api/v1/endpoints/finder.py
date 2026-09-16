from fastapi import APIRouter

from app.schemas.finder import CourseFinderListing, Scholarship, University
from app.services.finder_service import finder_service

router = APIRouter()


@router.get("/course-finder", response_model=list[CourseFinderListing])
def list_course_finder_listings() -> list[CourseFinderListing]:
    return finder_service.list_course_listings()


@router.get("/university-finder", response_model=list[University])
def list_universities() -> list[University]:
    return finder_service.list_universities()


@router.get("/scholarship-finder", response_model=list[Scholarship])
def list_scholarships() -> list[Scholarship]:
    return finder_service.list_scholarships()

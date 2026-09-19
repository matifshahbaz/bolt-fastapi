from fastapi import APIRouter

from app.schemas.finder import CourseFinderListing, Scholarship, UniversityProgram
from app.services.finder_service import finder_service

router = APIRouter()


@router.get("/course-finder", response_model=list[CourseFinderListing])
def list_course_finder_listings() -> list[CourseFinderListing]:
    return finder_service.list_course_listings()


@router.get("/university-finder", response_model=list[UniversityProgram])
def list_university_programs() -> list[UniversityProgram]:
    return finder_service.list_university_programs()


@router.get("/scholarship-finder", response_model=list[Scholarship])
def list_scholarships() -> list[Scholarship]:
    return finder_service.list_scholarships()

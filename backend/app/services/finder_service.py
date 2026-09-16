from app.repositories.finder_repository import FinderRepository
from app.schemas.finder import CourseFinderListing, Scholarship, University


class FinderService:
    def __init__(self, repository: FinderRepository) -> None:
        self._repository = repository

    def list_course_listings(self) -> list[CourseFinderListing]:
        return self._repository.list_course_listings()

    def list_universities(self) -> list[University]:
        return self._repository.list_universities()

    def list_scholarships(self) -> list[Scholarship]:
        return self._repository.list_scholarships()


finder_service = FinderService(FinderRepository())

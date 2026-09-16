from sqlalchemy import select

from app.core.db import get_db_session
from app.models import CourseFinderListingModel, ScholarshipModel, UniversityModel
from app.schemas.finder import CourseFinderListing, Scholarship, University


class FinderRepository:
    def list_course_listings(self) -> list[CourseFinderListing]:
        with get_db_session() as session:
            rows = session.scalars(
                select(CourseFinderListingModel).order_by(CourseFinderListingModel.id)
            ).all()
        return [self._to_course_listing(row) for row in rows]

    def list_universities(self) -> list[University]:
        with get_db_session() as session:
            rows = session.scalars(select(UniversityModel).order_by(UniversityModel.id)).all()
        return [self._to_university(row) for row in rows]

    def list_scholarships(self) -> list[Scholarship]:
        with get_db_session() as session:
            rows = session.scalars(select(ScholarshipModel).order_by(ScholarshipModel.id)).all()
        return [self._to_scholarship(row) for row in rows]

    @staticmethod
    def _to_course_listing(row: CourseFinderListingModel) -> CourseFinderListing:
        return CourseFinderListing(
            id=row.id,
            title=row.title,
            provider=row.provider,
            subject=row.subject,
            level=row.level,
            price_type=row.price_type,
            price_label=row.price_label,
            duration_label=row.duration_label,
            duration_bucket=row.duration_bucket,
            description=row.description,
            external_url=row.external_url,
            created_at=row.created_at,
        )

    @staticmethod
    def _to_university(row: UniversityModel) -> University:
        return University(
            id=row.id,
            name=row.name,
            city=row.city,
            sector=row.sector,
            programs=row.programs,
            website_url=row.website_url,
            description=row.description,
            established_year=row.established_year,
            created_at=row.created_at,
        )

    @staticmethod
    def _to_scholarship(row: ScholarshipModel) -> Scholarship:
        return Scholarship(
            id=row.id,
            name=row.name,
            country=row.country,
            degree_level=row.degree_level,
            field_of_study=row.field_of_study,
            deadline_date=row.deadline_date,
            deadline_label=row.deadline_label,
            description=row.description,
            external_url=row.external_url,
            created_at=row.created_at,
        )

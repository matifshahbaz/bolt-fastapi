from sqlalchemy import select

from app.core.db import get_db_session
from app.models import CourseFinderListingModel, ScholarshipModel, UniversityProgramModel
from app.schemas.finder import CourseFinderListing, Scholarship, UniversityProgram


class FinderRepository:
    def list_course_listings(self) -> list[CourseFinderListing]:
        with get_db_session() as session:
            rows = session.scalars(
                select(CourseFinderListingModel).order_by(CourseFinderListingModel.id)
            ).all()
        return [self._to_course_listing(row) for row in rows]

    def list_university_programs(self) -> list[UniversityProgram]:
        with get_db_session() as session:
            rows = session.scalars(
                select(UniversityProgramModel).order_by(UniversityProgramModel.id)
            ).all()
        return [self._to_university_program(row) for row in rows]

    def list_scholarships(self) -> list[Scholarship]:
        with get_db_session() as session:
            rows = session.scalars(select(ScholarshipModel).order_by(ScholarshipModel.id)).all()
        return [self._to_scholarship(row) for row in rows]

    @staticmethod
    def _to_course_listing(row: CourseFinderListingModel) -> CourseFinderListing:
        return CourseFinderListing(
            id=row.id,
            title=row.title,
            title_en=row.title_en,
            provider=row.provider,
            subject=row.subject,
            delivery_mode=row.delivery_mode,
            price_type=row.price_type,
            price_label=row.price_label,
            duration_label=row.duration_label,
            duration_bucket=row.duration_bucket,
            description=row.description,
            external_url=row.external_url,
            created_at=row.created_at,
        )

    @staticmethod
    def _to_university_program(row: UniversityProgramModel) -> UniversityProgram:
        return UniversityProgram(
            id=row.id,
            public_id=row.public_id,
            university_name=row.university_name,
            sector=row.sector,
            campus_name=row.campus_name,
            city=row.city,
            province=row.province,
            degree_level=row.degree_level,
            program_name_en=row.program_name_en,
            program_name_ur=row.program_name_ur,
            field_group=row.field_group,
            discipline=row.discipline,
            duration_years=row.duration_years,
            semesters=row.semesters,
            shift=row.shift,
            gender_restriction=row.gender_restriction,
            admission_status=row.admission_status,
            fee_amount_pkr=row.fee_amount_pkr,
            fee_basis_code=row.fee_basis_code,
            fee_basis_label_ur=row.fee_basis_label_ur,
            fee_filter_amount_pkr=row.fee_filter_amount_pkr,
            include_in_main_fee_filter=row.include_in_main_fee_filter,
            fee_display_ur=row.fee_display_ur,
            fee_warning_ur=row.fee_warning_ur,
            program_url=row.program_url,
            admission_url=row.admission_url,
            fee_url=row.fee_url,
            source_url=row.source_url,
            last_verified=row.last_verified,
            confidence=row.confidence,
            publish_status=row.publish_status,
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

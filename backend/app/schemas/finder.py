from datetime import date, datetime

from pydantic import BaseModel


class CourseFinderListing(BaseModel):
    id: int
    title: str
    title_en: str | None = None
    provider: str | None = None
    subject: str
    delivery_mode: str | None = None
    price_type: str
    price_label: str | None = None
    duration_label: str
    duration_bucket: str
    description: str | None = None
    external_url: str | None = None
    created_at: datetime


class UniversityProgram(BaseModel):
    id: int
    public_id: str
    university_name: str
    sector: str
    campus_name: str
    city: str
    province: str
    degree_level: str
    program_name_en: str
    program_name_ur: str | None = None
    field_group: str
    discipline: str | None = None
    duration_years: int | None = None
    semesters: int | None = None
    shift: str | None = None
    gender_restriction: str | None = None
    admission_status: str | None = None
    fee_amount_pkr: int | None = None
    fee_basis_code: str | None = None
    fee_basis_label_ur: str | None = None
    fee_filter_amount_pkr: int | None = None
    include_in_main_fee_filter: bool
    fee_display_ur: str | None = None
    fee_warning_ur: str | None = None
    program_url: str | None = None
    admission_url: str | None = None
    fee_url: str | None = None
    source_url: str | None = None
    last_verified: str | None = None
    confidence: str | None = None
    publish_status: str | None = None
    created_at: datetime


class Scholarship(BaseModel):
    id: int
    name: str
    country: str
    degree_level: str
    field_of_study: str
    deadline_date: date | None = None
    deadline_label: str | None = None
    description: str | None = None
    external_url: str | None = None
    created_at: datetime

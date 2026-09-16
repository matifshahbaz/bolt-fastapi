from datetime import date, datetime

from pydantic import BaseModel


class CourseFinderListing(BaseModel):
    id: int
    title: str
    provider: str | None = None
    subject: str
    level: str
    price_type: str
    price_label: str | None = None
    duration_label: str
    duration_bucket: str
    description: str | None = None
    external_url: str | None = None
    created_at: datetime


class University(BaseModel):
    id: int
    name: str
    city: str
    sector: str
    programs: str
    website_url: str | None = None
    description: str | None = None
    established_year: int | None = None
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

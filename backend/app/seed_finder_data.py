"""Seed placeholder data for the scholarship finder tool.

Run with: python -m app.seed_finder_data (from the backend/ directory, venv active).
Safe to re-run: each row is looked up by its natural key (title/name) and only
inserted if missing, so existing rows are left untouched.

This is placeholder data only. Once a real Excel file is provided for
scholarships, replace this script's row list with a proper import script that
reads the spreadsheet (e.g. via openpyxl) instead of hardcoding rows here.

Course finder listings and university finder listings are no longer seeded
here: see import_course_finder.py and import_university_finder.py, which
import the real catalogues from Excel files.
"""

from sqlalchemy import select

from app.core.db import get_db_session, init_db
from app.models import ScholarshipModel

SCHOLARSHIPS = [
    {
        "name": "فل برائٹ اسکالرشپ",
        "country": "امریکہ",
        "degree_level": "ماسٹرز",
        "field_of_study": "تمام شعبے",
        "deadline_label": "سالانہ - اکتوبر",
    },
    {
        "name": "چیوننگ اسکالرشپ",
        "country": "برطانیہ",
        "degree_level": "ماسٹرز",
        "field_of_study": "تمام شعبے",
        "deadline_label": "سالانہ - نومبر",
    },
    {
        "name": "کامن ویلتھ اسکالرشپ",
        "country": "برطانیہ",
        "degree_level": "ماسٹرز",
        "field_of_study": "ترقیاتی مطالعہ, صحت عامہ, تعلیم",
        "deadline_label": "سالانہ - دسمبر",
    },
    {
        "name": "ڈی اے اے ڈی اسکالرشپ",
        "country": "جرمنی",
        "degree_level": "ماسٹرز",
        "field_of_study": "انجینئرنگ, سائنس, سماجی علوم",
        "deadline_label": "سالانہ - اکتوبر",
    },
    {
        "name": "ایراسمس منڈس اسکالرشپ",
        "country": "یورپی یونین",
        "degree_level": "ماسٹرز",
        "field_of_study": "تمام شعبے",
        "deadline_label": "سالانہ - جنوری",
    },
    {
        "name": "آسٹریلیا ایوارڈز اسکالرشپ",
        "country": "آسٹریلیا",
        "degree_level": "ماسٹرز",
        "field_of_study": "ترقیاتی مطالعہ, زراعت, صحت",
        "deadline_label": "سالانہ - اپریل",
    },
    {
        "name": "سوئس گورنمنٹ ایکسیلنس اسکالرشپ",
        "country": "سوئٹزرلینڈ",
        "degree_level": "پی ایچ ڈی",
        "field_of_study": "تمام شعبے",
        "deadline_label": "سالانہ - دسمبر",
    },
    {
        "name": "جاپان ایم ای ایکس ٹی اسکالرشپ",
        "country": "جاپان",
        "degree_level": "ماسٹرز",
        "field_of_study": "انجینئرنگ, سائنس, بزنس",
        "deadline_label": "سالانہ - مئی",
    },
    {
        "name": "ترکی برسلری اسکالرشپ",
        "country": "ترکی",
        "degree_level": "انڈرگریجویٹ",
        "field_of_study": "تمام شعبے",
        "deadline_label": "سالانہ - جنوری",
    },
    {
        "name": "ونیئر کینیڈا گریجویٹ اسکالرشپ",
        "country": "کینیڈا",
        "degree_level": "پی ایچ ڈی",
        "field_of_study": "سائنس, انجینئرنگ, صحت",
        "deadline_label": "سالانہ - نومبر",
    },
]


def seed_scholarships() -> int:
    inserted = 0
    with get_db_session() as session:
        for row in SCHOLARSHIPS:
            exists = session.scalar(select(ScholarshipModel).where(ScholarshipModel.name == row["name"]))
            if exists is None:
                session.add(ScholarshipModel(**row))
                inserted += 1
    return inserted


def main() -> None:
    init_db()
    scholarships_added = seed_scholarships()
    print(f"Seeded finder data: {scholarships_added} scholarship(s) added.")


if __name__ == "__main__":
    main()

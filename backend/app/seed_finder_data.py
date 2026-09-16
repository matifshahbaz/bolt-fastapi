"""Seed placeholder data for the course/university/scholarship finder tools.

Run with: python -m app.seed_finder_data (from the backend/ directory, venv active).
Safe to re-run: each row is looked up by its natural key (title/name) and only
inserted if missing, so existing rows are left untouched.

This is placeholder data only. Once real Excel files are provided per tool,
replace this script's row lists with a proper import script that reads the
spreadsheet (e.g. via openpyxl) instead of hardcoding rows here.
"""

from sqlalchemy import select

from app.core.db import get_db_session, init_db
from app.models import CourseFinderListingModel, ScholarshipModel, UniversityModel

COURSE_LISTINGS = [
    {
        "title": "ویب ڈویلپمنٹ کا تعارف",
        "provider": "شمع اکیڈمی",
        "subject": "کمپیوٹر سائنس",
        "level": "ابتدائی",
        "price_type": "free",
        "price_label": "مفت",
        "duration_label": "4 ہفتے",
        "duration_bucket": "short",
        "description": "ویب سائٹس بنانے کی بنیادی مہارتیں سیکھیں۔",
    },
    {
        "title": "ایکسل برائے کاروبار",
        "provider": "شمع اکیڈمی",
        "subject": "بزنس",
        "level": "ابتدائی",
        "price_type": "free",
        "price_label": "مفت",
        "duration_label": "3 ہفتے",
        "duration_bucket": "short",
        "description": "روزمرہ کاروباری حساب کتاب کے لیے ایکسل کا استعمال۔",
    },
    {
        "title": "گرافک ڈیزائن کے بنیادی اصول",
        "provider": None,
        "subject": "ڈیزائن",
        "level": "ابتدائی",
        "price_type": "paid",
        "price_label": "2,500 روپے",
        "duration_label": "6 ہفتے",
        "duration_bucket": "medium",
        "description": "بصری ڈیزائن کے اصولوں کا عملی تعارف۔",
    },
    {
        "title": "ڈیجیٹل مارکیٹنگ",
        "provider": None,
        "subject": "مارکیٹنگ",
        "level": "درمیانی",
        "price_type": "paid",
        "price_label": "4,000 روپے",
        "duration_label": "8 ہفتے",
        "duration_bucket": "medium",
        "description": "سوشل میڈیا اور آن لائن اشتہارات کی حکمت عملی۔",
    },
    {
        "title": "انگریزی بول چال کی مہارت",
        "provider": "شمع اکیڈمی",
        "subject": "زبان کی مہارت",
        "level": "ابتدائی",
        "price_type": "free",
        "price_label": "مفت",
        "duration_label": "6 ہفتے",
        "duration_bucket": "medium",
        "description": "اعتماد کے ساتھ انگریزی بولنے کی مشق۔",
    },
    {
        "title": "پروگرامنگ ود پائتھون",
        "provider": None,
        "subject": "کمپیوٹر سائنس",
        "level": "درمیانی",
        "price_type": "paid",
        "price_label": "5,000 روپے",
        "duration_label": "10 ہفتے",
        "duration_bucket": "long",
        "description": "پائتھون زبان میں پروگرامنگ کی بنیادیں اور عملی مشقیں۔",
    },
    {
        "title": "فری لانسنگ کا آغاز",
        "provider": "شمع اکیڈمی",
        "subject": "کیریئر مہارتیں",
        "level": "ابتدائی",
        "price_type": "free",
        "price_label": "مفت",
        "duration_label": "3 ہفتے",
        "duration_bucket": "short",
        "description": "آن لائن فری لانس پلیٹ فارمز پر کام شروع کرنے کا طریقہ۔",
    },
    {
        "title": "ڈیٹا اینالیسس بذریعہ ایکسل",
        "provider": None,
        "subject": "ڈیٹا سائنس",
        "level": "درمیانی",
        "price_type": "paid",
        "price_label": "4,500 روپے",
        "duration_label": "8 ہفتے",
        "duration_bucket": "medium",
        "description": "ایکسل کے ذریعے ڈیٹا کا تجزیہ اور رپورٹنگ۔",
    },
    {
        "title": "مواصلات اور پریزنٹیشن کی مہارت",
        "provider": "شمع اکیڈمی",
        "subject": "ذاتی ترقی",
        "level": "ابتدائی",
        "price_type": "free",
        "price_label": "مفت",
        "duration_label": "2 ہفتے",
        "duration_bucket": "short",
        "description": "پراعتماد گفتگو اور پریزنٹیشن کی مہارتیں۔",
    },
    {
        "title": "ایڈوانسڈ ویب ڈویلپمنٹ",
        "provider": None,
        "subject": "کمپیوٹر سائنس",
        "level": "اعلیٰ",
        "price_type": "paid",
        "price_label": "8,000 روپے",
        "duration_label": "12 ہفتے",
        "duration_bucket": "long",
        "description": "جدید ویب ایپلیکیشنز بنانے کی گہرائی سے تربیت۔",
    },
    {
        "title": "سوشل میڈیا مینجمنٹ",
        "provider": None,
        "subject": "مارکیٹنگ",
        "level": "ابتدائی",
        "price_type": "free",
        "price_label": "مفت",
        "duration_label": "3 ہفتے",
        "duration_bucket": "short",
        "description": "برانڈز کے لیے سوشل میڈیا اکاؤنٹس چلانے کا طریقہ۔",
    },
    {
        "title": "یو آئی/یو ایکس ڈیزائن",
        "provider": None,
        "subject": "ڈیزائن",
        "level": "درمیانی",
        "price_type": "paid",
        "price_label": "6,000 روپے",
        "duration_label": "9 ہفتے",
        "duration_bucket": "medium",
        "description": "صارف دوست ایپ اور ویب سائٹ ڈیزائن کی مہارتیں۔",
    },
]

UNIVERSITIES = [
    {
        "name": "قائداعظم یونیورسٹی",
        "city": "اسلام آباد",
        "sector": "public",
        "programs": "کمپیوٹر سائنس, طبیعیات, بین الاقوامی تعلقات",
    },
    {
        "name": "نسٹ",
        "city": "اسلام آباد",
        "sector": "public",
        "programs": "انجینئرنگ, کمپیوٹر سائنس, بزنس ایڈمنسٹریشن",
    },
    {
        "name": "پنجاب یونیورسٹی",
        "city": "لاہور",
        "sector": "public",
        "programs": "قانون, معاشیات, اردو ادب, کمپیوٹر سائنس",
    },
    {
        "name": "لمز",
        "city": "لاہور",
        "sector": "private",
        "programs": "بزنس ایڈمنسٹریشن, کمپیوٹر سائنس, معاشیات, سوشل سائنسز",
    },
    {
        "name": "کامسیٹس یونیورسٹی",
        "city": "اسلام آباد",
        "sector": "public",
        "programs": "کمپیوٹر سائنس, انجینئرنگ, بزنس",
    },
    {
        "name": "یو ای ٹی لاہور",
        "city": "لاہور",
        "sector": "public",
        "programs": "سول انجینئرنگ, الیکٹریکل انجینئرنگ, مکینیکل انجینئرنگ",
    },
    {
        "name": "آغا خان یونیورسٹی",
        "city": "کراچی",
        "sector": "private",
        "programs": "میڈیسن, نرسنگ, تعلیم",
    },
    {
        "name": "یونیورسٹی آف لاہور",
        "city": "لاہور",
        "sector": "private",
        "programs": "فارمیسی, بزنس ایڈمنسٹریشن, کمپیوٹر سائنس",
    },
    {
        "name": "جامعہ کراچی",
        "city": "کراچی",
        "sector": "public",
        "programs": "کیمسٹری, معاشیات, بین الاقوامی تعلقات",
    },
    {
        "name": "آئی بی اے کراچی",
        "city": "کراچی",
        "sector": "public",
        "programs": "بزنس ایڈمنسٹریشن, اکاؤنٹنگ اینڈ فنانس, کمپیوٹر سائنس",
    },
    {
        "name": "غلام اسحاق خان انسٹیٹیوٹ",
        "city": "ٹوپی",
        "sector": "private",
        "programs": "انجینئرنگ, کمپیوٹر سائنس",
    },
    {
        "name": "یونیورسٹی آف پشاور",
        "city": "پشاور",
        "sector": "public",
        "programs": "اسلامیات, کیمسٹری, قانون",
    },
]

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


def seed_course_listings() -> int:
    inserted = 0
    with get_db_session() as session:
        for row in COURSE_LISTINGS:
            exists = session.scalar(
                select(CourseFinderListingModel).where(CourseFinderListingModel.title == row["title"])
            )
            if exists is None:
                session.add(CourseFinderListingModel(**row))
                inserted += 1
    return inserted


def seed_universities() -> int:
    inserted = 0
    with get_db_session() as session:
        for row in UNIVERSITIES:
            exists = session.scalar(select(UniversityModel).where(UniversityModel.name == row["name"]))
            if exists is None:
                session.add(UniversityModel(**row))
                inserted += 1
    return inserted


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
    courses_added = seed_course_listings()
    universities_added = seed_universities()
    scholarships_added = seed_scholarships()
    print(
        f"Seeded finder data: {courses_added} course listing(s), "
        f"{universities_added} university(ies), {scholarships_added} scholarship(s) added."
    )


if __name__ == "__main__":
    main()

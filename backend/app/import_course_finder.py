"""Import real course listings for the course finder tool from an Excel catalogue.

Run with: python -m app.import_course_finder (from the backend/ directory, venv active).
Requires openpyxl (see requirements.txt).

The source file lives outside this repository, alongside the rest of the
editable content archive (see AGENTS.md):

    C:\\Users\\97156\\Desktop\\Personal\\Shama.pk\\Tools\\Course finder\\Shama_Course_Catalogue_Urdu.xlsx

Only the "Courses" sheet is read, and only these columns are used (every other
column and sheet in the workbook is ignored):

    Category, Course name, Provider name, Course brief description,
    URL of course, Price, Course duration, Delivery mode (online or in-person),
    Location of the in-person classes (if applicable)

All of these columns are free-text Urdu (there is no separate English title),
so title_en is left unset. Price and duration are open-ended descriptive
sentences rather than clean numbers, so price_type/duration_bucket are only a
best-effort classification for filtering; the original sentence is kept as
price_label/duration_label so nothing is lost.

Re-running this script fully replaces the course_finder_listings table with a
fresh import, so it is safe to re-run whenever the spreadsheet changes.
"""

import re
from pathlib import Path

import openpyxl

from app.core.db import get_db_session, init_db
from app.models import CourseFinderListingModel

DEFAULT_XLSX_PATH = Path(
    r"C:\Users\97156\Desktop\Personal\Shama.pk\Tools\Course finder\Shama_Course_Catalogue_Urdu.xlsx"
)
SHEET_NAME = "Courses"

REQUIRED_COLUMNS = [
    "Category",
    "Course name",
    "Provider name",
    "Course brief description",
    "URL of course",
    "Price",
    "Course duration",
    "Delivery mode (online or in-person)",
    "Location of the in-person classes (if applicable)",
]

_FREE_PRICE_MARKERS = ("مفت", "تعلیمی فیس نہیں")
_SPLIT_RE = re.compile(r"[؛;]")

_MONTH_RE = re.compile(r"(\d+(?:[.,]\d+)?)\s*(?:ماہ|مہینے)")
_WEEK_RE = re.compile(r"(\d+(?:[.,]\d+)?)\s*ہفتے?")
_DAY_RE = re.compile(r"(\d+(?:[.,]\d+)?)\s*دن")
_HOUR_RE = re.compile(r"(\d+(?:[.,]\d+)?)\s*گھنٹے")

_LOCATION_NOT_USEFUL = {
    "لاگو نہیں",
    "مقام درج نہیں",
    "منتخب بوٹ کیمپ کا مقام درج نہیں",
}


def _duration_bucket(duration_text: str | None) -> str:
    """Best-effort short/medium/long bucket for filtering.

    The spreadsheet has no explicit duration bucket, so this parses the free-text
    "Course duration" sentence: calendar length (months/weeks/days) takes
    priority over training-hour counts, since it better reflects course scope.
    """
    if not duration_text:
        return "medium"

    months = _MONTH_RE.search(duration_text)
    if months:
        value = float(months.group(1).replace(",", "."))
        if value <= 1:
            return "short"
        return "medium" if value <= 3 else "long"

    weeks = _WEEK_RE.search(duration_text)
    if weeks:
        value = float(weeks.group(1).replace(",", "."))
        if value <= 4:
            return "short"
        return "medium" if value <= 13 else "long"

    days = _DAY_RE.search(duration_text)
    if days:
        value = float(days.group(1).replace(",", "."))
        if value <= 7:
            return "short"
        return "medium" if value <= 30 else "long"

    hours = _HOUR_RE.search(duration_text)
    if hours:
        value = float(hours.group(1).replace(",", "."))
        if value <= 10:
            return "short"
        return "medium" if value <= 50 else "long"

    return "medium"


def _price_type(price_text: str) -> str:
    if any(marker in price_text for marker in _FREE_PRICE_MARKERS):
        return "free"
    return "paid"


def _price_label(price_text: str) -> str:
    """Short label for the listing badge: the lead clause before any ";" caveat."""
    return _SPLIT_RE.split(price_text, maxsplit=1)[0].strip()


def _delivery_mode(mode: str, location: str | None) -> str:
    if location and location not in _LOCATION_NOT_USEFUL:
        return f"{mode} — {location}"
    return mode


def _load_rows(xlsx_path: Path) -> list[dict]:
    workbook = openpyxl.load_workbook(xlsx_path, data_only=True)
    sheet = workbook[SHEET_NAME]
    rows = list(sheet.iter_rows(values_only=True))
    header = rows[0]
    column_index = {name: header.index(name) for name in REQUIRED_COLUMNS}

    parsed = []
    for row in rows[1:]:
        if all(value is None for value in row):
            continue
        parsed.append({name: row[column_index[name]] for name in REQUIRED_COLUMNS})
    return parsed


def _to_model_kwargs(row: dict) -> dict:
    price_text = row["Price"]
    return {
        "title": row["Course name"],
        "title_en": None,
        "provider": row["Provider name"],
        "subject": row["Category"],
        "delivery_mode": _delivery_mode(
            row["Delivery mode (online or in-person)"],
            row["Location of the in-person classes (if applicable)"],
        ),
        "price_type": _price_type(price_text),
        "price_label": _price_label(price_text),
        "duration_label": row["Course duration"],
        "duration_bucket": _duration_bucket(row["Course duration"]),
        "description": row["Course brief description"],
        "external_url": row["URL of course"],
    }


def import_course_listings(xlsx_path: Path = DEFAULT_XLSX_PATH) -> int:
    rows = _load_rows(xlsx_path)
    with get_db_session() as session:
        session.query(CourseFinderListingModel).delete()
        for row in rows:
            session.add(CourseFinderListingModel(**_to_model_kwargs(row)))
    return len(rows)


def main() -> None:
    init_db()
    count = import_course_listings()
    print(f"Imported {count} course listing(s) from {DEFAULT_XLSX_PATH.name}.")


if __name__ == "__main__":
    main()

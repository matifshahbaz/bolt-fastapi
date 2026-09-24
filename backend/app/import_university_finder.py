"""Import university/campus/program listings for the university finder tool.

Run with: python -m app.import_university_finder (from the backend/ directory, venv active).
Requires openpyxl (see requirements.txt).

The source file lives outside this repository, alongside the rest of the
editable content archive (see AGENTS.md). It is the latest consolidated
master workbook (currently the batch07 KPK/Balochistan/Sindh file); update
DEFAULT_XLSX_PATH below whenever a newer consolidated batch file replaces it:

    C:\\Users\\97156\\Desktop\\Personal\\Shama.pk\\Tools\\University finder\\shama_pk_university_finder_batch07_kpk_balochistan_sindh (1) 2.xlsx

Only the "Public_Data_View" sheet is read (per that workbook's own
Claude_Handoff sheet: it is the pre-normalized, fee-safe, one-row-per-campus-
program import source; the raw Universities/Campuses/Program_Offerings/
Fees_Admissions sheets are for editorial research, not direct import). Rows
are kept only when include_in_public_tool is TRUE.

Fee handling follows that workbook's Fee_Normalization rules: fee_amount_pkr
is the raw figure, but only fee_filter_amount_pkr (when
include_in_main_fee_filter is TRUE) is safe to use in a fee range filter,
since some rows report a full package/annual fee rather than a per-semester
figure. fee_basis_label_ur/fee_display_ur/fee_warning_ur must stay attached to
the amount whenever it is shown, so the fee's basis is never ambiguous.

Re-running this script fully replaces the university_programs table with a
fresh import, so it is safe to re-run whenever the spreadsheet changes.
"""

import sys
from pathlib import Path

import openpyxl

from app.core.db import get_db_session, init_db
from app.models import UniversityProgramModel

DEFAULT_XLSX_PATH = Path(
    r"C:\Users\97156\Desktop\Personal\Shama.pk\Tools\University finder\shama_pk_university_finder_batch07_kpk_balochistan_sindh (1) 2.xlsx"
)
SHEET_NAME = "Public_Data_View"

COLUMN_TO_FIELD = {
    "public_id": "public_id",
    "university_name": "university_name",
    "sector": "sector",
    "campus_name": "campus_name",
    "city": "city",
    "province": "province",
    "degree_level": "degree_level",
    "program_name_en": "program_name_en",
    "program_name_ur": "program_name_ur",
    "field_group": "field_group",
    "discipline": "discipline",
    "duration_years": "duration_years",
    "semesters": "semesters",
    "shift": "shift",
    "gender_restriction": "gender_restriction",
    "admission_status": "admission_status",
    "fee_amount_pkr": "fee_amount_pkr",
    "fee_basis_code": "fee_basis_code",
    "fee_basis_label_ur": "fee_basis_label_ur",
    "fee_filter_amount_pkr": "fee_filter_amount_pkr",
    "include_in_main_fee_filter": "include_in_main_fee_filter",
    "fee_display_ur": "fee_display_ur",
    "fee_warning_ur": "fee_warning_ur",
    "program_url": "program_url",
    "admission_url": "admission_url",
    "fee_url": "fee_url",
    "source_url": "source_url",
    "last_verified": "last_verified",
    "confidence": "confidence",
    "publish_status": "publish_status",
}

_INT_FIELDS = {"duration_years", "semesters", "fee_amount_pkr", "fee_filter_amount_pkr"}
_STR_FIELDS = {
    field
    for field in COLUMN_TO_FIELD.values()
    if field not in _INT_FIELDS and field != "include_in_main_fee_filter"
}


def _to_bool(value, *, context: str) -> bool:
    """Normalize a checkbox-style cell to bool.

    Some batches typed the literal text TRUE/FALSE into these cells instead
    of using a real Excel boolean, which `is not True` / `bool(...)` would
    silently misread (a "FALSE" string is truthy in Python). Handle both
    forms explicitly and raise on anything else, so a future bad value gets
    caught instead of being misinterpreted one way or the other.
    """
    if isinstance(value, bool):
        return value
    if isinstance(value, str) and value.strip().upper() in {"TRUE", "FALSE"}:
        return value.strip().upper() == "TRUE"
    raise ValueError(f"Unexpected boolean cell value for {context}: {value!r}")


def _load_rows(xlsx_path: Path) -> list[dict]:
    workbook = openpyxl.load_workbook(xlsx_path, data_only=True)
    sheet = workbook[SHEET_NAME]
    rows = list(sheet.iter_rows(values_only=True))
    header = rows[0]
    column_index = {name: header.index(name) for name in ["include_in_public_tool", *COLUMN_TO_FIELD]}

    parsed = []
    for row in rows[1:]:
        if all(value is None for value in row):
            continue
        public_id = row[column_index["public_id"]]
        if not _to_bool(row[column_index["include_in_public_tool"]], context=f"include_in_public_tool ({public_id})"):
            continue
        parsed.append({name: row[column_index[name]] for name in COLUMN_TO_FIELD})
    return parsed


def _to_model_kwargs(row: dict) -> dict:
    kwargs: dict = {}
    for column, field in COLUMN_TO_FIELD.items():
        value = row[column]
        if field in _INT_FIELDS:
            kwargs[field] = int(value) if value is not None else None
        elif field in _STR_FIELDS:
            kwargs[field] = str(value) if value is not None else None
        else:
            kwargs[field] = _to_bool(value, context=f"{field} ({row.get('public_id')})")
    return kwargs


def import_university_programs(xlsx_path: Path = DEFAULT_XLSX_PATH) -> int:
    rows = _load_rows(xlsx_path)
    with get_db_session() as session:
        session.query(UniversityProgramModel).delete()
        for row in rows:
            session.add(UniversityProgramModel(**_to_model_kwargs(row)))
    return len(rows)


def main() -> None:
    # Optional CLI arg lets this run against an uploaded copy of the workbook
    # on a host where DEFAULT_XLSX_PATH (a local Windows path) doesn't exist,
    # e.g. `python -m app.import_university_finder /tmp/batch07.xlsx` on the VPS.
    xlsx_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_XLSX_PATH
    init_db()
    count = import_university_programs(xlsx_path)
    print(f"Imported {count} university program listing(s) from {xlsx_path.name}.")


if __name__ == "__main__":
    main()

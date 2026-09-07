const urduMonths: Record<string, string> = {
  جنوری: '01',
  فروری: '02',
  مارچ: '03',
  اپریل: '04',
  مئی: '05',
  جون: '06',
  جولائی: '07',
  اگست: '08',
  ستمبر: '09',
  اکتوبر: '10',
  نومبر: '11',
  دسمبر: '12',
};

/** Parses a "26 جولائی 2026" style Urdu date string into an ISO 8601 timestamp (PKT, +05:00). */
export function getIsoPublishedDate(date: string): string | undefined {
  const match = date.trim().match(/^(\d{1,2})\s+([^\s]+)\s+(\d{4})$/);
  if (!match) {
    return undefined;
  }

  const [, day, monthName, year] = match;
  const month = urduMonths[monthName];
  return month ? `${year}-${month}-${day.padStart(2, '0')}T00:00:00+05:00` : undefined;
}

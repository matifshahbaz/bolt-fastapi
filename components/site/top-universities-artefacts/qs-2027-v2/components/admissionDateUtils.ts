import type { AdmissionEvent, AdmissionProgramme } from "../data/admissionDates";

const DAY = 86400000;
const months = ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"];
export function formatUrduDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}
export function pakistanDate(now: Date): string {
  const parts = new Intl.DateTimeFormat("en", { timeZone: "Asia/Karachi", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  return ["year", "month", "day"].map(k => parts.find(p => p.type === k)!.value).join("-");
}
export function daysUntil(date: string, now: Date): number {
  return Math.round((Date.parse(`${date}T00:00:00Z`) - Date.parse(`${pakistanDate(now)}T00:00:00Z`)) / DAY);
}
export function eventHasPassed(event: AdmissionEvent, now: Date): boolean {
  if (!event.date) return false;
  if (event.time && !event.endDate) return now.getTime() >= Date.parse(`${event.date}T${event.time}:00+05:00`);
  return daysUntil(event.endDate ?? event.date, now) < 0;
}
export function nextEvent(record: AdmissionProgramme, now: Date): AdmissionEvent | undefined {
  // Partial dates, provisional schedules and unverified dates must never get a live countdown.
  return record.events.filter(e => e.kind !== "open" && e.certainty === "published" && e.date && !eventHasPassed(e, now))
    .sort((a, b) => a.date!.localeCompare(b.date!) || (a.time ?? "").localeCompare(b.time ?? ""))[0];
}
export function applicationStatus(record: AdmissionProgramme, now: Date): { label: string; tone: "green" | "blue" | "red" | "yellow"; key: "open" | "soon" | "closed" | "pending" | "dated" } {
  const end = record.events.find(e => e.kind === "deadline" && e.certainty === "published" && e.date);
  const start = record.events.find(e => e.kind === "open" && e.certainty === "published" && e.date);
  if (end && eventHasPassed(end, now)) return { label: "درخواست بند", tone: "red", key: "closed" };
  if (end && daysUntil(end.date!, now) === 0) return { label: "آخری تاریخ آج", tone: "red", key: "dated" };
  if (start && daysUntil(start.date!, now) > 0) return { label: "جلد کھلے گا", tone: "blue", key: "soon" };
  if (start && end) return { label: "درخواست کھلی ہے", tone: "green", key: "open" };
  if (record.events.some(e => e.date)) return { label: "شیڈول دستیاب", tone: "blue", key: "dated" };
  return { label: record.coverage === "awaiting-announcement" ? "اعلان باقی" : "تصدیق باقی", tone: "yellow", key: "pending" };
}
export function dateLabel(event: AdmissionEvent): string {
  if (event.date) return formatUrduDate(event.date) + (event.endDate ? ` تا ${formatUrduDate(event.endDate)}` : "");
  return event.displayText ?? ({ unannounced: "اعلان باقی", unverified: "تصدیق شدہ تاریخ دستیاب نہیں", "not-applicable": "لاگو نہیں", published: "دن درج نہیں", tentative: "عارضی شیڈول" }[event.certainty]);
}

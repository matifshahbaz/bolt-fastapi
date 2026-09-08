"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { ArrowUpLeft, CalendarDays, Check, ChevronLeft, Clock3, ExternalLink, Info } from "lucide-react";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { ADMISSIONS_CHECKED_ON, admissionProgrammes, admissionUniversities, completeEvents } from "../data/admissionDates";
import type { AdmissionEvent, AdmissionProgramme, IntakeYear } from "../data/admissionDates";
import { applicationStatus, dateLabel, daysUntil, eventHasPassed, formatUrduDate, nextEvent } from "./admissionDateUtils";
import styles from "./AdmissionDeadlineTracker.module.css";

export type AdmissionTimeline2027Props = {
  records?: AdmissionProgramme[];
  initialYear?: IntakeYear;
  initialUniversityId?: string;
  /** Optional editorial subset; default preserves the article's full 12-university list. */
  includeUniversityIds?: string[];
  /** ISO instant for deterministic previews; omit in production. */
  asOf?: string;
};
const eventColours: Record<AdmissionEvent["kind"], string> = { open: "green", deadline: "red", registration: "yellow", test: "blue", merit: "green", documents: "blue", fee: "yellow" };
const snapshot = new Date(`${ADMISSIONS_CHECKED_ON}T12:00:00+05:00`);
function preferred(records: AdmissionProgramme[], now: Date) {
  return [...records].sort((a, b) => (nextEvent(a, now)?.date ?? "9999").localeCompare(nextEvent(b, now)?.date ?? "9999") || Number(b.events.length > 0) - Number(a.events.length > 0))[0];
}
function DateTile({ event, record, now }: { event: AdmissionEvent; record: AdmissionProgramme; now: Date | null }) {
  const known = Boolean(event.date || event.displayText);
  const passed = now && eventHasPassed(event, now);
  return <article className={`${styles.dateTile} ${known ? "" : styles.missingTile}`} data-tone={eventColours[event.kind]}>
    <div className={styles.tileLabel}><span className={styles.tileIcon}><CalendarDays size={17} aria-hidden="true" /></span><span>{event.title}</span></div>
    <p className={styles.dateValue}>{event.date ? <time dateTime={event.date}>{dateLabel(event)}</time> : dateLabel(event)}</p>
    {event.time && <span className={styles.time}>پاکستانی وقت <bdi>{event.time}</bdi></span>}
    {event.note && <p className={styles.tileNote}>{event.note}</p>}
    <div className={styles.tileFoot}><span>{event.certainty === "tentative" ? "سرکاری، مگر عارضی" : passed ? "یہ تاریخ گزر چکی ہے" : known ? "سرکاری شیڈول" : record.year === 2027 ? "2026 کی تاریخ استعمال نہیں کی گئی" : "اندازہ شامل نہیں"}</span>{known && <a href={event.sourceUrl ?? record.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`${event.title} کا سرکاری ماخذ، نئی ونڈو میں`}><ExternalLink size={15} aria-hidden="true" /></a>}</div>
  </article>;
}

export function AdmissionTimeline2027({ records = admissionProgrammes, initialYear = 2027, initialUniversityId = "aku", includeUniversityIds, asOf }: AdmissionTimeline2027Props) {
  const uid = useId();
  const [year, setYear] = useState<IntakeYear>(initialYear);
  const [universityId, setUniversityId] = useState(initialUniversityId);
  const [programmeId, setProgrammeId] = useState("");
  const [filter, setFilter] = useState<"all" | "dated" | "pending">("all");
  const [now, setNow] = useState<Date | null>(() => asOf ? new Date(asOf) : null);
  useEffect(() => {
    if (asOf) { setNow(new Date(asOf)); return; }
    setNow(new Date());
    const interval = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(interval);
  }, [asOf]);
  const clock = now ?? snapshot;
  const unis = admissionUniversities.filter(u => !includeUniversityIds || includeUniversityIds.includes(u.id));
  const currentRecords = records.filter(r => r.year === year && unis.some(u => u.id === r.universityId));
  const summaries = unis.map(u => ({ university: u, record: preferred(currentRecords.filter(r => r.universityId === u.id), clock) }))
    .filter((s): s is { university: typeof admissionUniversities[number]; record: AdmissionProgramme } => Boolean(s.record))
    .sort((a, b) => (nextEvent(a.record, clock)?.date ?? "9999").localeCompare(nextEvent(b.record, clock)?.date ?? "9999"));
  const visibleSummaries = summaries.filter(s => filter === "all" || (s.record.events.some(e => e.date) ? filter === "dated" : filter === "pending"));
  const selectedSummary = visibleSummaries.find(s => s.university.id === universityId) ?? visibleSummaries[0];
  const choices = currentRecords.filter(r => r.universityId === selectedSummary?.university.id);
  const selected = choices.find(r => r.id === programmeId) ?? preferred(choices, clock);
  const next = selected ? nextEvent(selected, clock) : undefined;
  const days = now && next?.date ? daysUntil(next.date, now) : null;
  const status = selected ? applicationStatus(selected, clock) : undefined;
  const tiles = useMemo(() => selected ? completeEvents(selected) : [], [selected]);
  // No Arts & Sciences 2026 record is verified here: never borrow AKU's MBBS deadline.
  const previous = selected && year === 2027 && selected.id !== "aku-fas-2027" ? records.filter(r => r.year === 2026 && r.universityId === selected.universityId && r.events.some(e => e.date)) : [];
  const reference = previous.find(r => r.events.some(e => e.kind === "deadline")) ?? previous[previous.length - 1];
  const referenceEvent = reference?.events.find(e => e.kind === "deadline" || e.kind === "registration") ?? reference?.events.find(e => e.date);
  const verifiedUniversities = summaries.filter(s => s.record.events.some(e => e.date)).length;
  const chooseUniversity = (id: string) => { setUniversityId(id); setProgrammeId(""); };
  const changeYear = (value: string) => { setYear(Number(value) as IntakeYear); setProgrammeId(""); setFilter("all"); };

  return <section className={styles.tracker} dir="rtl" lang="ur" aria-labelledby={`${uid}-title`}>
    <div className={styles.colourBar} aria-hidden="true"><i /><i /><i /><i /></div>
    <header className={styles.header}>
      <div className={styles.topline}><span className={styles.eyebrow}><CalendarDays size={18} aria-hidden="true" /> داخلہ کیلنڈر</span><span className={styles.brand} dir="ltr">shama<span>.</span>pk</span></div>
      <div className={styles.headingRow}><div><h2 id={`${uid}-title`}>آخری تاریخ کب ہے؟</h2><p>یونیورسٹی، پروگرام اور داخلے کا سال منتخب کریں۔</p></div><label className={styles.yearPicker} htmlFor={`${uid}-year`}><span>داخلے کا سال</span><NativeSelect id={`${uid}-year`} value={year} onChange={e => changeYear(e.target.value)}><NativeSelectOption value="2027">2027 کا شیڈول</NativeSelectOption><NativeSelectOption value="2026">2026 کا شیڈول</NativeSelectOption></NativeSelect></label></div>
      <div className={styles.summaryStrip}><span><strong>{verifiedUniversities}</strong> جامعات کی تاریخیں درج</span><span><strong>{summaries.length - verifiedUniversities}</strong> کا اعلان / تصدیق باقی</span><span className={styles.snapshot}><Clock3 size={15} aria-hidden="true" /> آخری جائزہ: {formatUrduDate(ADMISSIONS_CHECKED_ON)}</span></div>
    </header>
    <div className={styles.body}>
      <div className={styles.filters} role="group" aria-label="شیڈول کی دستیابی">{([['all', 'تمام جامعات'], ['dated', 'تاریخیں دستیاب'], ['pending', 'اعلان / تصدیق باقی']] as const).map(([key, label]) => <button type="button" key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}</div>
      {year === 2026 && <p className={styles.referenceBanner}><Info size={18} aria-hidden="true" /> آپ 2026 کا الگ داخلہ سائیکل دیکھ رہے ہیں۔ اس کی تاریخیں 2027 کی آخری تاریخیں نہیں ہیں۔</p>}
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="یونیورسٹی منتخب کریں"><p className={styles.listCaption}>قریب ترین شائع شدہ تاریخ پہلے</p>{visibleSummaries.map(({ university, record }) => {
          const s = applicationStatus(record, clock);
          const due = nextEvent(record, clock) ?? record.events.find(e => e.kind === "deadline" || e.kind === "registration");
          return <button type="button" key={university.id} className={`${styles.uniButton} ${selected?.universityId === university.id ? styles.selectedUni : ""}`} aria-pressed={selected?.universityId === university.id} data-tone={university.colour} onClick={() => chooseUniversity(university.id)}><span className={styles.uniIdentity}><bdi>{university.shortName}</bdi><ChevronLeft size={16} aria-hidden="true" /></span><span className={styles.uniName}>{university.name}</span><span className={styles.uniMeta}>{due?.date ? formatUrduDate(due.date) : s.label}</span></button>;
        })}</aside>
        <div className={styles.detail}>{selected && selectedSummary ? <>
          <label className={styles.mobilePicker} htmlFor={`${uid}-university`}>یونیورسٹی<NativeSelect id={`${uid}-university`} value={selected.universityId} onChange={e => chooseUniversity(e.target.value)}>{visibleSummaries.map(s => <NativeSelectOption key={s.university.id} value={s.university.id}>{s.university.name}</NativeSelectOption>)}</NativeSelect></label>
          <div className={styles.selectionHeader}><div><h3>{selectedSummary.university.name}</h3><p>{selected.campus}</p></div><span className={styles.badge} data-tone={now ? status?.tone : "blue"}>{now ? status?.label : "شائع شدہ معلومات"}</span></div>
          <label className={styles.programmePicker} htmlFor={`${uid}-programme`}><span>پروگرام / داخلے کا مرحلہ</span><NativeSelect id={`${uid}-programme`} value={selected.id} onChange={e => setProgrammeId(e.target.value)}>{choices.map(r => <NativeSelectOption key={r.id} value={r.id}>{r.label}</NativeSelectOption>)}</NativeSelect></label>
          {next?.date ? <div className={styles.nextDeadline}><div><span className={styles.nextEyebrow}><Check size={16} aria-hidden="true" /> اگلی شائع شدہ تاریخ</span><h4>{next.title}</h4><p><time dateTime={next.date}>{formatUrduDate(next.date)}</time></p>{next.note && <small>{next.note}</small>}</div><div className={styles.countdown}><strong>{days === null ? "—" : days}</strong><span>{days === 0 ? "آخری تاریخ آج" : "دن باقی"}</span></div></div> : <div className={styles.pendingNotice} data-tone={selected.events.some(e => e.date) ? "blue" : "yellow"}><CalendarDays size={25} aria-hidden="true" /><div><strong>{selected.events.some(e => e.date) ? "اس شیڈول میں اگلی قطعی تاریخ باقی نہیں" : selected.coverage === "awaiting-announcement" ? "اس پروگرام کے نئے شیڈول کا اعلان باقی ہے" : "اس پروگرام کی تاریخ کی تصدیق باقی ہے"}</strong><p>{selected.events.some(e => e.date) ? "گزری ہوئی، عارضی اور صرف مہینے والی تاریخوں پر countdown نہیں چلتا۔" : "ذیل میں صرف ماخذ سے ملنے والی تاریخیں درج کی جاتی ہیں۔"}</p></div></div>}
          <p className={styles.programmeNote}><Info size={17} aria-hidden="true" />{selected.note ?? "تاریخیں منتخب پروگرام اور داخلہ سائیکل کے لیے ہیں۔"}</p>
          <div className={styles.dateGrid}>{tiles.map(event => <DateTile key={event.id} event={event} record={selected} now={now} />)}</div>
          {reference && referenceEvent?.date && <div className={styles.previousCycle}><span className={styles.referenceTag}>2026 کا حوالہ — 2027 کی مہلت نہیں</span><p>{reference.label} · {referenceEvent.title}: <strong>{formatUrduDate(referenceEvent.date)}</strong></p><button type="button" onClick={() => { changeYear("2026"); setProgrammeId(reference.id); }}>2026 کا مکمل شیڈول دیکھیں <ArrowUpLeft size={17} aria-hidden="true" /></button></div>}
          <div className={styles.sourceFooter}><span>اس پروگرام کا آخری جائزہ: {formatUrduDate(selected.checkedOn)}</span><a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer">سرکاری ماخذ <ExternalLink size={16} aria-hidden="true" /></a></div>
        </> : <div className={styles.empty}><CalendarDays size={34} aria-hidden="true" /><h3>اس انتخاب میں کوئی شیڈول نہیں</h3><p>دوسرا فلٹر یا داخلے کا سال منتخب کریں۔</p><button type="button" onClick={() => setFilter("all")}>تمام جامعات دکھائیں</button></div>}</div>
      </div>
    </div>
    <footer className={styles.footer}><Info size={16} aria-hidden="true" /><span>یہ سرکاری ذرائع کا ادارتی خلاصہ ہے، خودکار لائیو فیڈ نہیں۔ تاریخیں شمع کی ٹیم اپڈیٹ کرے گی؛ باقی دن خود بدلتے ہیں۔ جہاں وقت درج نہیں، وہاں آخری دن کی پوری مہلت فرض نہ کریں۔</span></footer>
  </section>;
}

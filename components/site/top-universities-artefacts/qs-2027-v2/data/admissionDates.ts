/** Editorial snapshot, not a live connection. Never advance an old date by a year. */
export const ADMISSIONS_CHECKED_ON = "2026-09-08";
export type IntakeYear = 2026 | 2027;
export type DateKind = "open" | "deadline" | "registration" | "test" | "merit" | "documents" | "fee";
export type Certainty = "published" | "tentative" | "unannounced" | "unverified" | "not-applicable";
export type AdmissionEvent = {
  id: string;
  kind: DateKind;
  title: string;
  date?: string;
  endDate?: string;
  /** Only use a clock time expressly stated by the official notice; Pakistan time. */
  time?: string;
  displayText?: string;
  certainty: Certainty;
  sourceUrl?: string;
  note?: string;
};
export type AdmissionProgramme = {
  id: string;
  universityId: string;
  year: IntakeYear;
  label: string;
  campus: string;
  sourceUrl: string;
  checkedOn: string;
  coverage: "announced" | "awaiting-announcement" | "unverified";
  note?: string;
  events: AdmissionEvent[];
};
export type AdmissionUniversity = { id: string; shortName: string; name: string; colour: "blue" | "red" | "yellow" | "green"; sourceUrl: string };

export const admissionUniversities: AdmissionUniversity[] = [
  { id: "qau", shortName: "QAU", name: "قائداعظم یونیورسٹی", colour: "blue", sourceUrl: "https://ugadmissions.qau.edu.pk/" },
  { id: "nust", shortName: "NUST", name: "نسٹ", colour: "red", sourceUrl: "https://nust.edu.pk/admissions/undergraduates/dates-to-remember/" },
  { id: "pieas", shortName: "PIEAS", name: "پیاس", colour: "yellow", sourceUrl: "https://admissions.pieas.edu.pk/Admissions/schedule.html" },
  { id: "pu", shortName: "PU", name: "پنجاب یونیورسٹی", colour: "green", sourceUrl: "https://pu.edu.pk/home/admission_notice/698" },
  { id: "lums", shortName: "LUMS", name: "لمز", colour: "blue", sourceUrl: "https://admission.lums.edu.pk/critical-dates-all-programmes" },
  { id: "uaf", shortName: "UAF", name: "زرعی یونیورسٹی فیصل آباد", colour: "red", sourceUrl: "https://web.uaf.edu.pk/contents/admissions/un/adm_overview.html" },
  { id: "comsats", shortName: "COMSATS", name: "کامسیٹس", colour: "yellow", sourceUrl: "https://lahore.comsats.edu.pk/admissions.aspx" },
  { id: "gcuf", shortName: "GCUF", name: "گورنمنٹ کالج یونیورسٹی فیصل آباد", colour: "green", sourceUrl: "https://gcuf.edu.pk/admissions/" },
  { id: "uet", shortName: "UET", name: "یو ای ٹی لاہور", colour: "blue", sourceUrl: "https://admission.uet.edu.pk/UG-2026-1" },
  { id: "aku", shortName: "AKU", name: "آغا خان یونیورسٹی", colour: "red", sourceUrl: "https://www.aku.edu/admissions/Pages/home.aspx" },
  { id: "uol", shortName: "UOL", name: "یونیورسٹی آف لاہور", colour: "yellow", sourceUrl: "https://uol.edu.pk/" },
  { id: "uop", shortName: "UoP", name: "یونیورسٹی آف پشاور", colour: "green", sourceUrl: "https://www.uop.edu.pk/news/" },
];

const labels: Record<DateKind, string> = { open: "درخواستیں کھلیں", deadline: "درخواست کی آخری تاریخ", registration: "ٹیسٹ رجسٹریشن", test: "داخلہ ٹیسٹ", merit: "پہلی میرٹ لسٹ / پیشکش", documents: "دستاویزات", fee: "فیس جمع کروانا" };
function event(kind: DateKind, date: string | undefined, extra: Partial<AdmissionEvent> = {}): AdmissionEvent {
  return { id: kind, kind, title: labels[kind], date, certainty: date ? "published" : "unverified", ...extra };
}
function programme(universityId: string, id: string, label: string, campus: string, events: AdmissionEvent[], extra: Partial<AdmissionProgramme> = {}): AdmissionProgramme {
  return { universityId, id, label, campus, year: 2026, checkedOn: ADMISSIONS_CHECKED_ON, coverage: "announced", sourceUrl: admissionUniversities.find(u => u.id === universityId)!.sourceUrl, events, ...extra };
}

const historical: AdmissionProgramme[] = [
  programme("qau", "qau-bs-2026", "بی ایس / انڈرگریجویٹ", "اسلام آباد", [], { coverage: "unverified", note: "پورٹل سے پروگرام اور زمرے کے لحاظ سے مکمل تاریخ کی تصدیق نہیں ہو سکی؛ فیس جمع کروانے کی تاریخ کو درخواست کی آخری تاریخ نہیں بنایا گیا۔" }),
  ...([
    ["1", "2025-10-05", "2025-11-25", "2025-11-22", "2025-12-10"],
    ["2", "2025-12-14", "2026-02-01", "2026-01-31", "2026-02-15"],
    ["3", "2026-02-22", "2026-04-05", "2026-04-04", "2026-05-02"],
    ["4", "2026-04-26", "2026-06-18", "2026-06-13", undefined],
  ] as const).map(([series, opens, closes, test, end]) => programme("nust", `nust-net${series}-2026`, `NET سیریز ${series}`, "اسلام آباد ٹیسٹ مرکز", [
    event("open", opens, { title: "NET رجسٹریشن شروع", certainty: "tentative" }),
    event("registration", closes, { title: "NET رجسٹریشن کی آخری تاریخ", certainty: series === "4" ? "published" : "tentative", sourceUrl: series === "4" ? "https://nust.edu.pk/admissions/undergraduates/updates-on-ug-admissions/" : undefined }),
    event("test", test, { endDate: end, certainty: "tentative", note: end ? "شائع شدہ ٹیسٹ ونڈو؛ آپ کا دن ایڈمٹ کارڈ پر ہوگا۔" : "اس تاریخ سے آگے؛ اختتامی دن شائع نہیں۔ ذاتی تاریخ ایڈمٹ کارڈ پر ہوگی۔" }),
  ], { note: "NUST نے NET شیڈول کو عارضی کہا ہے۔ یہاں صرف اسلام آباد کی ونڈو ہے؛ کراچی، کوئٹہ اور گلگت کی تاریخیں مختلف ہیں۔ ہر سیریز کی الگ رجسٹریشن ہے۔" })),
  programme("pieas", "pieas-test1-2026", "بی ایس — پہلا ٹیسٹ", "پاکستان؛ مرکز ایڈمٹ کارڈ کے مطابق", [
    event("open", "2026-02-08"), event("registration", "2026-03-26", { note: "بغیر لیٹ فیس؛ توسیع شدہ تاریخ۔" }),
    event("fee", "2026-04-01", { title: "لیٹ فیس کے ساتھ درخواست" }), event("test", "2026-04-12"), event("merit", "2026-07-27"),
  ]),
  programme("pieas", "pieas-test2-2026", "بی ایس — دوسرا ٹیسٹ", "نوٹس میں درج چھ شہروں کے مراکز", [
    event("open", "2026-04-15"), event("registration", "2026-06-30", { note: "توسیع کے بعد کی تاریخ۔" }),
    event("test", "2026-07-12", { note: "پہلے 14 جون تھا؛ سرکاری طور پر تبدیل کیا گیا۔" }), event("merit", "2026-07-27"),
  ]),
  programme("pu", "pu-bs-2026", "بی ایس پہلا سمسٹر — عمومی شیڈول", "لاہور؛ پروگرام کی الگ شرائط ممکن ہیں", [
    event("open", "2026-07-02"), event("deadline", "2026-08-04"),
    event("registration", "2026-07-03", { title: "دوسرے ٹیسٹ کی رجسٹریشن", sourceUrl: "https://pu.edu.pk/home/section/exam/17205" }),
    event("test", "2026-07-19", { title: "دوسرا داخلہ ٹیسٹ", certainty: "tentative", sourceUrl: "https://pu.edu.pk/home/section/exam/17205", note: "اس سرکاری خبر میں تاریخ متوقع لکھی گئی ہے۔" }),
  ]),
  programme("lums", "lums-ug-2026", "انڈرگریجویٹ — پہلے سال کے امیدوار", "لاہور", [
    event("deadline", "2026-01-27", { time: "17:00" }), event("documents", "2026-01-28", { title: "دستاویزات اور درخواست فیس", time: "00:00", note: "سرکاری کیلنڈر پر 12:00 AM درج ہے؛ اسے پورے دن کی مہلت نہ سمجھیں۔" }),
    event("test", "2026-02-15", { title: "LCAT" }), event("fee", "2026-02-28", { title: "مالی امداد کی درخواست" }),
    event("merit", "2026-04-15", { endDate: "2026-07-31", title: "داخلے کے فیصلوں کی مدت" }),
  ]),
  programme("uaf", "uaf-test3-2026", "انڈرگریجویٹ — تیسرا داخلہ ٹیسٹ", "فیصل آباد؛ ٹیسٹ مرکز نوٹس کے مطابق", [
    event("open", "2026-08-12", { title: "تیسرے ٹیسٹ کی رجسٹریشن شروع" }), event("registration", "2026-08-24"), event("test", "2026-08-30"),
  ], { sourceUrl: "https://web.uaf.edu.pk/News/NewsDetail/2166", note: "یہ تیسرے ٹیسٹ کی تاریخیں ہیں، تمام پروگراموں کی درخواست یا فیس کی آخری تاریخ نہیں۔" }),
  programme("comsats", "comsats-lahore-2026", "بی ایس — لاہور کیمپس", "صرف لاہور کیمپس", [
    event("open", "2026-05-31"), event("deadline", "2026-07-31"), event("registration", "2026-07-24", { title: "26 جولائی کے NAT کی رجسٹریشن" }), event("test", "2026-07-26", { title: "کیمپس پر NAT — آخری درج سیشن" }), event("merit", "2026-08-10"),
  ], { note: "یہ لاہور کیمپس کا شیڈول ہے؛ اسے اسلام آباد یا دوسرے کیمپس پر لاگو نہ کریں۔ پہلے NAT سیشن 14 جون اور 12 جولائی تھے۔" }),
  programme("gcuf", "gcuf-selected-2026", "منتخب بی ایس پروگرام — اضافی داخلے", "فیصل آباد؛ صرف موجودہ اشتہار کے منتخب پروگرام", [
    event("deadline", "2026-09-28"), event("test", "2026-09-29", { title: "متعلقہ ٹیسٹ / انٹرویو", note: "بی ایس فائن آرٹس اور انجینئرنگ ٹیکنالوجیز؛ ہر بی ایس پروگرام کے لیے نہیں۔" }),
  ], { note: "28 ستمبر کی مہلت منتخب پروگراموں کے لیے ہے؛ یہ تمام پروگرام دوبارہ کھلنے کا اعلان نہیں۔" }),
  programme("uet", "uet-regular-2026", "بی ایس — باقاعدہ داخلہ", "لاہور اور متعلقہ کیمپس؛ اہلیت پروگرام کے مطابق", [
    event("open", "2026-06-08"), event("deadline", "2026-07-15"),
    event("merit", "2026-07-24", { sourceUrl: "https://admission.uet.edu.pk/news/42" }),
  ], { sourceUrl: "https://admission.uet.edu.pk/program/1", note: "ECAT رجسٹریشن اور یونیورسٹی درخواست الگ مراحل ہیں۔ نیچے پروگرام بدل کر ستمبر کے واک اِن داخلے دیکھے جا سکتے ہیں۔" }),
  programme("uet", "uet-walkin-2026", "بی ایس — واک اِن، خالی نشستیں", "متعلقہ ڈسپلن اور کیمپس کی دستیاب نشستیں", [
    event("open", "2026-09-11"), event("deadline", "2026-09-15"),
  ], { note: "چوتھی میرٹ لسٹ کا اختتامی میرٹ پورا کرنا اور نشست دستیاب ہونا ضروری ہے۔ نئے امیدوار بھی درخواست دے سکتے ہیں۔" }),
  programme("aku", "aku-mbbs-2026", "ایم بی بی ایس — 2026–27 سائیکل", "کراچی؛ ٹیسٹ مرکز ایڈمٹ کارڈ کے مطابق", [
    event("open", "2026-03-08"), event("deadline", "2026-05-13"), event("test", "2026-07-05"),
  ], { sourceUrl: "https://www.aku.edu/admissions/Documents/admission-information-MBBS.PDF", note: "ایم بی بی ایس کی تاریخیں ہیں؛ آرٹس اینڈ سائنسز اور نرسنگ کا الگ شیڈول ہے۔" }),
  programme("uol", "uol-ug-2026", "انڈرگریجویٹ — پروگرام منتخب ہونا باقی", "لاہور", [], { coverage: "unverified", note: "انڈرگریجویٹ درخواست کی مشترک آخری تاریخ کی تصدیق نہیں ہو سکی۔ زبانوں کے مختصر کورس کی تاریخ یہاں استعمال نہیں کی گئی۔" }),
  programme("uop", "uop-ug-2026", "انڈرگریجویٹ — پہلا سمسٹر", "پشاور", [
    event("test", "2026-08-02", { sourceUrl: "https://www.uop.edu.pk/news/?q=4133" }),
    event("merit", "2026-08-11", { title: "حتمی میرٹ لسٹ", sourceUrl: "https://www.uop.edu.pk/news/?q=4141" }),
  ], { note: "سرکاری خبروں میں درج ٹیسٹ اور میرٹ لسٹ کی تاریخیں؛ درخواست کی آخری تاریخ کی مکمل تصدیق نہیں ہو سکی۔" }),
];

const upcoming: AdmissionProgramme[] = admissionUniversities.map(u => programme(u.id, `${u.id}-ug-2027`, u.id === "aku" ? "ایم بی بی ایس — اگلا سائیکل" : u.id === "comsats" ? "بی ایس — لاہور کیمپس" : "بی ایس / انڈرگریجویٹ — اگلا سائیکل", u.id === "comsats" ? "لاہور کیمپس" : "پروگرام اور کیمپس کا اگلا شیڈول", [], {
  year: 2027, coverage: ["qau", "uol", "uop"].includes(u.id) ? "unverified" : "awaiting-announcement",
  sourceUrl: u.id === "aku" ? "https://www.aku.edu/admissions/mbbs/Pages/home.aspx" : u.sourceUrl,
  note: "اس جائزے میں اگلے سائیکل کی مکمل تاریخیں دستیاب نہیں ملیں۔ 2026 کی تاریخ کو 2027 کی تاریخ نہیں بنایا گیا۔",
}));

upcoming.push(programme("aku", "aku-fas-2027", "بیچلر آف اسٹڈیز — آرٹس اینڈ سائنسز", "کراچی — فیکلٹی آف آرٹس اینڈ سائنسز", [
  event("open", "2026-09-06"), event("deadline", "2027-01-12"),
  event("fee", "2026-12-10", { title: "رعایتی درخواست فیس کی آخری تاریخ", note: "اختیاری early-bird مہلت؛ عام درخواست کی آخری تاریخ 12 جنوری ہے۔" }),
  event("test", "2027-01-30", { title: "AKU داخلہ ٹیسٹ — آرٹس اینڈ سائنسز" }),
  event("documents", "2027-03-19", { title: "SAT-I اسکور جمع کروانا", note: "SAT کے ذریعے درخواست دینے والوں کے لیے۔" }),
  event("merit", undefined, { certainty: "published", displayText: "اپریل 2027 کا آخر", title: "داخلے کی پہلی پیشکشیں", note: "سرکاری شیڈول میں مخصوص دن درج نہیں؛ اس پر countdown نہیں چلتا۔" }),
], { year: 2027, sourceUrl: "https://www.aku.edu/admissions/Documents/admission-information-fas-bs.pdf", note: "یہ آرٹس اینڈ سائنسز کا 2027 داخلہ ہے، ایم بی بی ایس نہیں۔ انٹرویو مارچ 2027 اور کلاسیں اگست 2027 میں؛ مخصوص دن ابھی درج نہیں۔" }));

export const admissionProgrammes = [...upcoming, ...historical];

export const coreDateKinds: DateKind[] = ["open", "deadline", "registration", "test", "merit"];
export function completeEvents(record: AdmissionProgramme): AdmissionEvent[] {
  const missing: Certainty = record.coverage === "awaiting-announcement" ? "unannounced" : "unverified";
  return [...coreDateKinds.map(kind => record.events.find(e => e.kind === kind) ?? event(kind, undefined, { certainty: missing })), ...record.events.filter(e => !coreDateKinds.includes(e.kind))];
}

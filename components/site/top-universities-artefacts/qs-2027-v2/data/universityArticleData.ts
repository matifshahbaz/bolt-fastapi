export type Accent = "blue" | "red" | "yellow" | "green";

export type MetricKey =
  | "academic"
  | "employer"
  | "facultyStudent"
  | "citations"
  | "internationalFaculty"
  | "internationalStudents"
  | "researchNetwork"
  | "employment"
  | "sustainability";

export type SubjectKey =
  | "business"
  | "computer"
  | "engineering"
  | "mathematics"
  | "pharmacy"
  | "natural";

export type University = {
  id: string;
  position: number;
  worldRank: string;
  shortName: string;
  nameUrdu: string;
  city: string;
  sector: "سرکاری" | "نجی";
  accent: Accent;
  metrics: Record<MetricKey, number | null>;
  subjectRanks: Partial<Record<SubjectKey, number>>;
  costLevel: 1 | 2 | 3;
};

export type FeeRecord = {
  universityId: string;
  programme: string;
  tuition: string;
  feePeriod: string;
  note: string;
  admission: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const palette = {
  blue: "#4285F4",
  red: "#EA4335",
  yellow: "#FBBC05",
  green: "#34A853",
} as const;

export const researchDate = "6 ستمبر 2026";

export const metricMeta: Record<
  MetricKey,
  { label: string; shortLabel: string; detail: string; accent: Accent }
> = {
  academic: {
    label: "علمی شہرت",
    shortLabel: "Academic Reputation",
    detail: "دنیا بھر کے ماہرینِ تعلیم کی رائے میں ادارے کی علمی پہچان۔",
    accent: "blue",
  },
  employer: {
    label: "آجر کی رائے",
    shortLabel: "Employer Reputation",
    detail: "ملازمت دینے والے اداروں کی نظر میں یونیورسٹی اور اس کے پروگراموں کی شہرت۔",
    accent: "red",
  },
  facultyStudent: {
    label: "اساتذہ اور طلبہ کا تناسب",
    shortLabel: "Faculty–Student Ratio",
    detail: "طلبہ کے مقابلے میں دستیاب تدریسی عملے کی مقدار۔",
    accent: "yellow",
  },
  citations: {
    label: "فی فیکلٹی تحقیقی حوالہ جات",
    shortLabel: "Citations per Faculty",
    detail: "ادارے کے حجم کو سامنے رکھتے ہوئے تحقیق کے استعمال اور اثر کی ایک علامت۔",
    accent: "green",
  },
  internationalFaculty: {
    label: "بین الاقوامی اساتذہ",
    shortLabel: "International Faculty",
    detail: "مجموعی فیکلٹی میں بیرونِ ملک سے آنے والے اساتذہ کا تناسب۔",
    accent: "red",
  },
  internationalStudents: {
    label: "بین الاقوامی طلبہ",
    shortLabel: "International Students",
    detail: "مجموعی طلبہ میں بیرونِ ملک سے آنے والے طلبہ کا تناسب۔",
    accent: "blue",
  },
  researchNetwork: {
    label: "عالمی تحقیقی نیٹ ورک",
    shortLabel: "International Research Network",
    detail: "دوسرے ملکوں کے اداروں کے ساتھ مسلسل اور متنوع تحقیقی شراکتیں۔",
    accent: "green",
  },
  employment: {
    label: "روزگار اور سابق طلبہ کے نتائج",
    shortLabel: "Employment Outcomes",
    detail: "گریجویٹس کی employability اور مختلف شعبوں میں کامیاب سابق طلبہ کے اثر کا مجموعہ۔",
    accent: "red",
  },
  sustainability: {
    label: "پائیداری",
    shortLabel: "Sustainability",
    detail: "ماحولیاتی، سماجی اور ادارہ جاتی پائیداری سے متعلق کارکردگی۔",
    accent: "green",
  },
};

export const universities: University[] = [
  {
    id: "qau", position: 1, worldRank: "381", shortName: "QAU", nameUrdu: "قائداعظم یونیورسٹی", city: "اسلام آباد", sector: "سرکاری", accent: "blue", costLevel: 1,
    metrics: { academic: 21, employer: 42, facultyStudent: 5, citations: 97, internationalFaculty: 8, internationalStudents: 3, researchNetwork: 70, employment: 31, sustainability: 48 },
    subjectRanks: { business: 7, computer: 6, engineering: 4, mathematics: 2, pharmacy: 1, natural: 1 },
  },
  {
    id: "nust", position: 2, worldRank: "384", shortName: "NUST", nameUrdu: "نیشنل یونیورسٹی آف سائنسز اینڈ ٹیکنالوجی", city: "اسلام آباد", sector: "سرکاری", accent: "red", costLevel: 2,
    metrics: { academic: 26, employer: 70, facultyStudent: 56, citations: 40, internationalFaculty: 6, internationalStudents: 4, researchNetwork: 78, employment: 5, sustainability: 72 },
    subjectRanks: { business: 3, computer: 1, engineering: 1, mathematics: 4, natural: 2 },
  },
  {
    id: "pieas", position: 3, worldRank: "560", shortName: "PIEAS", nameUrdu: "پاکستان انسٹی ٹیوٹ آف انجینئرنگ اینڈ اپلائیڈ سائنسز", city: "اسلام آباد", sector: "سرکاری", accent: "yellow", costLevel: 1,
    metrics: { academic: 6, employer: 19, facultyStudent: 53, citations: 83, internationalFaculty: 1, internationalStudents: 1, researchNetwork: 23, employment: 16, sustainability: 37 },
    subjectRanks: {},
  },
  {
    id: "pu", position: 4, worldRank: "588", shortName: "PU", nameUrdu: "پنجاب یونیورسٹی", city: "لاہور", sector: "سرکاری", accent: "green", costLevel: 1,
    metrics: { academic: 19, employer: 48, facultyStudent: 4, citations: 29, internationalFaculty: 4, internationalStudents: 2, researchNetwork: 76, employment: 85, sustainability: 50 },
    subjectRanks: { business: 6, computer: 4, engineering: 5, mathematics: 3, pharmacy: 4, natural: 4 },
  },
  {
    id: "lums", position: 5, worldRank: "608", shortName: "LUMS", nameUrdu: "لاہور یونیورسٹی آف مینجمنٹ سائنسز", city: "لاہور", sector: "نجی", accent: "blue", costLevel: 3,
    metrics: { academic: 20, employer: 67, facultyStudent: 31, citations: 14, internationalFaculty: 5, internationalStudents: 3, researchNetwork: 18, employment: 71, sustainability: 55 },
    subjectRanks: { business: 1, computer: 5, engineering: 8 },
  },
  {
    id: "uaf", position: 6, worldRank: "629", shortName: "UAF", nameUrdu: "یونیورسٹی آف ایگریکلچر فیصل آباد", city: "فیصل آباد", sector: "سرکاری", accent: "red", costLevel: 1,
    metrics: { academic: 6, employer: 14, facultyStudent: 2, citations: 90, internationalFaculty: 2, internationalStudents: 1, researchNetwork: 76, employment: 4, sustainability: 54 },
    subjectRanks: {},
  },
  {
    id: "comsats", position: 7, worldRank: "639", shortName: "COMSATS", nameUrdu: "کامسیٹس یونیورسٹی اسلام آباد", city: "اسلام آباد", sector: "سرکاری", accent: "yellow", costLevel: 2,
    metrics: { academic: 16, employer: 35, facultyStudent: 13, citations: 45, internationalFaculty: 1, internationalStudents: 1, researchNetwork: 88, employment: 8, sustainability: 71 },
    subjectRanks: { business: 4, computer: 2, engineering: 3, mathematics: 1, pharmacy: 5, natural: 3 },
  },
  {
    id: "gcuf", position: 8, worldRank: "691", shortName: "GCUF", nameUrdu: "گورنمنٹ کالج یونیورسٹی فیصل آباد", city: "فیصل آباد", sector: "سرکاری", accent: "green", costLevel: 1,
    metrics: { academic: 5, employer: 8, facultyStudent: 8, citations: 78, internationalFaculty: 1, internationalStudents: 1, researchNetwork: 82, employment: 35, sustainability: 40 },
    subjectRanks: { mathematics: 8, pharmacy: 9 },
  },
  {
    id: "uet", position: 9, worldRank: "791–800", shortName: "UET", nameUrdu: "یونیورسٹی آف انجینئرنگ اینڈ ٹیکنالوجی لاہور", city: "لاہور", sector: "سرکاری", accent: "blue", costLevel: 2,
    metrics: { academic: 10, employer: 48, facultyStudent: 16, citations: 18, internationalFaculty: 1, internationalStudents: 2, researchNetwork: 63, employment: 56, sustainability: 61 },
    subjectRanks: { business: 8, computer: 3, engineering: 2, mathematics: 7 },
  },
  {
    id: "aku", position: 10, worldRank: "951–1000", shortName: "AKU", nameUrdu: "آغا خان یونیورسٹی", city: "کراچی", sector: "نجی", accent: "red", costLevel: 3,
    metrics: { academic: 7, employer: 14, facultyStudent: 100, citations: 12, internationalFaculty: 1, internationalStudents: 1, researchNetwork: 24, employment: 24, sustainability: 26 },
    subjectRanks: {},
  },
  {
    id: "uol", position: 10, worldRank: "951–1000", shortName: "UOL", nameUrdu: "یونیورسٹی آف لاہور", city: "لاہور", sector: "نجی", accent: "yellow", costLevel: 3,
    metrics: { academic: 16, employer: 23, facultyStudent: 11, citations: 11, internationalFaculty: 10, internationalStudents: 6, researchNetwork: 86, employment: 4, sustainability: 65 },
    subjectRanks: { business: 5, computer: 7, engineering: 7, mathematics: 5, pharmacy: 3, natural: 5 },
  },
  {
    id: "uop", position: 10, worldRank: "951–1000", shortName: "UoP", nameUrdu: "یونیورسٹی آف پشاور", city: "پشاور", sector: "سرکاری", accent: "green", costLevel: 1,
    metrics: { academic: 8, employer: 16, facultyStudent: 92, citations: 8, internationalFaculty: null, internationalStudents: 2, researchNetwork: 51, employment: 21, sustainability: 32 },
    subjectRanks: { mathematics: 9 },
  },
];

export const externalSubjectUniversities: Partial<Record<SubjectKey, { rank: number; name: string; shortName: string }[]>> = {
  business: [{ rank: 2, name: "انسٹی ٹیوٹ آف بزنس ایڈمنسٹریشن", shortName: "IBA" }],
  computer: [
    { rank: 8, name: "بحریہ یونیورسٹی", shortName: "Bahria" },
    { rank: 9, name: "غلام اسحاق خان انسٹی ٹیوٹ", shortName: "GIK" },
    { rank: 10, name: "ایئر یونیورسٹی", shortName: "Air" },
  ],
  engineering: [{ rank: 6, name: "غلام اسحاق خان انسٹی ٹیوٹ", shortName: "GIK" }],
  mathematics: [
    { rank: 6, name: "انٹرنیشنل اسلامک یونیورسٹی اسلام آباد", shortName: "IIUI" },
    { rank: 10, name: "یونیورسٹی آف مینجمنٹ اینڈ ٹیکنالوجی", shortName: "UMT" },
  ],
  pharmacy: [
    { rank: 2, name: "یونیورسٹی آف کراچی", shortName: "UoK" },
    { rank: 6, name: "اسلامیہ یونیورسٹی بہاولپور", shortName: "IUB" },
    { rank: 7, name: "رفاہ انٹرنیشنل یونیورسٹی", shortName: "Riphah" },
    { rank: 8, name: "عبدالولی خان یونیورسٹی مردان", shortName: "AWKUM" },
  ],
};

export const subjectMeta: Record<SubjectKey, { label: string; english: string; accent: Accent }> = {
  business: { label: "بزنس اور مینجمنٹ", english: "Business & Management", accent: "blue" },
  computer: { label: "کمپیوٹر سائنس", english: "Computer Science & Information Systems", accent: "red" },
  engineering: { label: "انجینئرنگ اور ٹیکنالوجی", english: "Engineering & Technology", accent: "yellow" },
  mathematics: { label: "ریاضی", english: "Mathematics", accent: "green" },
  pharmacy: { label: "فارمیسی اور فارماکولوجی", english: "Pharmacy & Pharmacology", accent: "blue" },
  natural: { label: "نیچرل سائنسز", english: "Natural Sciences", accent: "red" },
};

export const feeRecords: FeeRecord[] = [
  { universityId: "qau", programme: "بی ایس کمپیوٹر سائنس / آئی ٹی", tuition: "68,490 روپے", feePeriod: "ہر سمسٹر", note: "داخلے سمیت پہلی ادائیگی 106,530 روپے؛ پراسیسنگ فیس الگ۔", admission: "تعلیمی میرٹ؛ پروگرام کی تازہ اہلیت داخلہ نوٹس میں دیکھیں۔", sourceLabel: "سرکاری فیس صفحہ", sourceUrl: "https://qau.edu.pk/bachelor-fee-structure/" },
  { universityId: "nust", programme: "انجینئرنگ اور کمپیوٹنگ", tuition: "216,750 روپے", feePeriod: "ہر سمسٹر", note: "متفرق اخراجات الگ؛ داخلہ اور سکیورٹی سمیت پہلی ادائیگی زیادہ ہوگی۔", admission: "NET، HSSC اور SSC کے مقررہ وزن سے میرٹ بنتا ہے۔", sourceLabel: "سرکاری مالی معلومات", sourceUrl: "https://nust.edu.pk/admissions/fee-structure/undergraduate-financial-matters/" },
  { universityId: "pieas", programme: "18 کریڈٹ آور کا مثالی بی ایس سمسٹر", tuition: "72,000 روپے", feePeriod: "ہر سمسٹر کی ٹیوشن", note: "خدمات اور یک وقتی اخراجات الگ ہیں؛ مکمل challan دیکھیں۔", admission: "تحریری ٹیسٹ، HSSC Part-I اور SSC سے انتخاب۔", sourceLabel: "فیس دستاویز", sourceUrl: "https://admissions.pieas.edu.pk/Admissions/Contents/FeeStructure2026.pdf" },
  { universityId: "pu", programme: "FCIT ریگولر / مارننگ پروگرام", tuition: "55,000 روپے", feePeriod: "ہر سمسٹر کی ٹیوشن", note: "سروس، امتحان، رجسٹریشن اور سکیورٹی سمیت پہلی ادائیگی زیادہ ہے۔", admission: "میرٹ اور داخلہ ٹیسٹ کا وزن پروگرام کے مطابق بدلتا ہے۔", sourceLabel: "فیس شیڈول", sourceUrl: "https://pu.edu.pk/downloads/Dues-Fee-Schedule-for-the-Year-2026-27.pdf" },
  { universityId: "lums", programme: "بی ایس کمپیوٹر سائنس", tuition: "1,557,200 روپے", feePeriod: "پہلے تعلیمی سال کی ٹیوشن", note: "دیگر لازمی charges اور ہاسٹل الگ ہیں۔", admission: "SAT/ACT یا LCAT، تعلیمی ریکارڈ اور مکمل درخواست۔", sourceLabel: "پروگرام اور فیس", sourceUrl: "https://lums.edu.pk/programmes/bs-computer-science" },
  { universityId: "uaf", programme: "بی ایس سی آنرز زراعت", tuition: "موجودہ پورٹل / چالان", feePeriod: "پروگرام اور session کے مطابق", note: "فیس کو مستقل عدد نہ سمجھیں؛ جاری کردہ challan حتمی ہے۔", admission: "پروگرام کی اہلیت اور میرٹ تازہ پراسپیکٹس کے مطابق۔", sourceLabel: "داخلہ پورٹل", sourceUrl: "https://admissions.uaf.edu.pk/" },
  { universityId: "comsats", programme: "بی ایس کمپیوٹر سائنس — ساہیوال", tuition: "160,500 روپے", feePeriod: "ہر سمسٹر کا recurring خرچ", note: "داخلہ فیس الگ؛ کیمپس اور پروگرام بدلنے سے رقم بدل سکتی ہے۔", admission: "NTS NAT یا متعلقہ ٹیسٹ؛ campus اور programme merit اہم ہے۔", sourceLabel: "کیمپس فیس صفحہ", sourceUrl: "https://sahiwal.comsats.edu.pk/fee-structure.aspx" },
  { universityId: "gcuf", programme: "انڈرگریجویٹ بی ایس پروگرام", tuition: "موجودہ پورٹل / چالان", feePeriod: "پروگرام اور session کے مطابق", note: "تازہ session کی رقم داخلہ پورٹل یا جاری کردہ challan سے لیں۔", admission: "department، eligibility اور programme merit کے مطابق۔", sourceLabel: "داخلہ صفحہ", sourceUrl: "https://gcuf.edu.pk/admissions/" },
  { universityId: "uet", programme: "سبسڈی شدہ انجینئرنگ / کمپیوٹنگ", tuition: "110,340 روپے", feePeriod: "پہلے سمسٹر کی دو اقساط", note: "ہاسٹل اور دیگر ذاتی اخراجات الگ ہیں۔", admission: "ECAT، تعلیمی میرٹ، domicile اور programme eligibility۔", sourceLabel: "داخلہ اور فیس", sourceUrl: "https://admission.uet.edu.pk/program/1" },
  { universityId: "aku", programme: "بیچلر آف اسٹڈیز", tuition: "2,124,000 روپے", feePeriod: "سالانہ ٹیوشن", note: "یہ Bachelor of Studies ہے، MBBS نہیں؛ دیگر charges الگ ہیں۔", admission: "ہر programme کے tests اور interviews الگ ہوسکتے ہیں۔", sourceLabel: "فیس صفحہ", sourceUrl: "https://www.aku.edu/faspk/study/Pages/fee-structure.aspx" },
  { universityId: "uol", programme: "بی ایس کمپیوٹر سائنس — Fall 2026", tuition: "236,900 روپے", feePeriod: "پہلے سمسٹر کا مجموعہ", note: "20,000 روپے one-time registration؛ پورے پروگرام کی موجودہ مجموعی فیس 1,900,600 روپے۔", admission: "UOL کے موجودہ admission guide اور programme requirements دیکھیں۔", sourceLabel: "سرکاری BSCS فیس", sourceUrl: "https://uol.edu.pk/wp-content/uploads/2026/06/CSIT.pdf" },
  { universityId: "uop", programme: "انڈرگریجویٹ بی ایس پروگرام", tuition: "موجودہ پورٹل / چالان", feePeriod: "پروگرام اور session کے مطابق", note: "تازہ programme page اور جاری کردہ challan حتمی سمجھیں۔", admission: "programme eligibility اور merit تازہ داخلہ نوٹس کے مطابق۔", sourceLabel: "انڈرگریجویٹ داخلہ", sourceUrl: "https://www.uop.edu.pk/admissions/?q=Undergraduate" },
];

export const timelineGroups = [
  {
    id: "early", shortName: "جلد تیاری", accent: "blue" as Accent,
    note: "ٹیسٹ یا مکمل application profile مانگنے والے اداروں کے لیے کئی ماہ پہلے تیاری شروع کریں۔",
    steps: [
      { period: "ستمبر تا دسمبر", title: "ٹیسٹ اور پروفائل", detail: "NUST، LUMS اور دوسرے test-heavy options کی تیاری۔" },
      { period: "جنوری تا اپریل", title: "رجسٹریشن اور درخواست", detail: "دستاویزات، essays، مالی معاونت اور test bookings۔" },
      { period: "مئی تا اگست", title: "نتیجہ، ترجیحات اور فیس", detail: "offer اور merit list پر مقررہ وقت میں عمل۔" },
    ],
  },
  {
    id: "public", shortName: "سرکاری جامعات", accent: "green" as Accent,
    note: "انٹرمیڈیٹ کے نتیجے کا انتظار کیے بغیر portal اور admission notices دیکھنا شروع کریں۔",
    steps: [
      { period: "جنوری تا مارچ", title: "اہلیت اور shortlist", detail: "پروگرام، domicile، subjects اور گزشتہ merit دیکھیں۔" },
      { period: "اپریل تا جولائی", title: "ٹیسٹ اور درخواستیں", detail: "QAU، PU، UAF، GCUF، UET اور UoP کے notices الگ رکھیں۔" },
      { period: "جولائی تا ستمبر", title: "میرٹ لسٹ اور challan", detail: "portal روزانہ دیکھیں؛ فیس کی مدت مختصر ہوسکتی ہے۔" },
    ],
  },
  {
    id: "documents", shortName: "دستاویزات", accent: "yellow" as Accent,
    note: "ایک missing document اچھی تیاری کے باوجود درخواست روک سکتا ہے۔",
    steps: [
      { period: "ابھی", title: "تعلیمی اسناد", detail: "SSC، HSSC، O/A Level اور IBCC equivalence تیار رکھیں۔" },
      { period: "درخواست سے پہلے", title: "شناخت اور domicile", detail: "CNIC/B-Form، تصاویر، domicile اور category proof۔" },
      { period: "offer کے فوراً بعد", title: "اصل کاغذات اور ادائیگی", detail: "verification، medical یا hostel forms بھی دیکھیں۔" },
    ],
  },
];

export const sources = {
  overall: "https://www.topuniversities.com/world-university-rankings?countries=pk",
  methodology: "https://www.topuniversities.com/world-university-rankings/methodology",
  subjects: "https://www.topuniversities.com/subject-rankings",
};

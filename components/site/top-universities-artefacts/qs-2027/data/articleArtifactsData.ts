export type UniversityRank = {
  id: string;
  pakistanRank: string;
  worldRank: string;
  shortName: string;
  nameUrdu: string;
  city: string;
  accent: "gold" | "teal" | "cobalt" | "violet" | "coral";
};

export type MethodologyItem = {
  id: string;
  label: string;
  weight: number;
  detail: string;
  color: string;
};

export type FieldProspect = {
  field: string;
  routes: string[];
};

export type DepartmentCard = {
  universityId: string;
  university: string;
  shortName: string;
  fields: [FieldProspect, FieldProspect, FieldProspect];
};

export type FeeAdmissionRecord = {
  id: string;
  pakistanRank: string;
  worldRank: string;
  university: string;
  shortName: string;
  programme: string;
  tuition: string;
  feePeriod: string;
  note: string;
  admissionSummary: string;
  sourceLabel: string;
  sourceUrl: string;
};

export type TimelineUniversity = {
  id: string;
  shortName: string;
  colour: string;
  planningWindow: string;
  milestones: {
    month: string;
    label: string;
    note: string;
    state: "prepare" | "active" | "decision";
  }[];
};

export type FitProfile = {
  id: string;
  label: string;
  programme: string;
  university: string;
  scores: {
    subject: number;
    department: number;
    affordability: number;
    admission: number;
    location: number;
    career: number;
  };
};

export const rankingResearchDate = "24 اگست 2026";

export const universityRanks: UniversityRank[] = [
  { id: "qau", pakistanRank: "1", worldRank: "381", shortName: "QAU", nameUrdu: "قائداعظم یونیورسٹی", city: "اسلام آباد", accent: "gold" },
  { id: "nust", pakistanRank: "2", worldRank: "384", shortName: "NUST", nameUrdu: "نیشنل یونیورسٹی آف سائنسز اینڈ ٹیکنالوجی", city: "اسلام آباد", accent: "cobalt" },
  { id: "pieas", pakistanRank: "3", worldRank: "560", shortName: "PIEAS", nameUrdu: "پاکستان انسٹی ٹیوٹ آف انجینئرنگ اینڈ اپلائیڈ سائنسز", city: "اسلام آباد", accent: "violet" },
  { id: "pu", pakistanRank: "4", worldRank: "588", shortName: "PU", nameUrdu: "پنجاب یونیورسٹی", city: "لاہور", accent: "coral" },
  { id: "lums", pakistanRank: "5", worldRank: "608", shortName: "LUMS", nameUrdu: "لاہور یونیورسٹی آف مینجمنٹ سائنسز", city: "لاہور", accent: "gold" },
  { id: "uaf", pakistanRank: "6", worldRank: "629", shortName: "UAF", nameUrdu: "یونیورسٹی آف ایگریکلچر فیصل آباد", city: "فیصل آباد", accent: "teal" },
  { id: "comsats", pakistanRank: "7", worldRank: "639", shortName: "COMSATS", nameUrdu: "کامسیٹس یونیورسٹی اسلام آباد", city: "اسلام آباد", accent: "cobalt" },
  { id: "gcuf", pakistanRank: "8", worldRank: "691", shortName: "GCUF", nameUrdu: "گورنمنٹ کالج یونیورسٹی فیصل آباد", city: "فیصل آباد", accent: "violet" },
  { id: "uet", pakistanRank: "9", worldRank: "791–800", shortName: "UET", nameUrdu: "یونیورسٹی آف انجینئرنگ اینڈ ٹیکنالوجی لاہور", city: "لاہور", accent: "coral" },
  { id: "aku", pakistanRank: "مشترکہ 10", worldRank: "951–1000", shortName: "AKU", nameUrdu: "آغا خان یونیورسٹی", city: "کراچی", accent: "teal" },
  { id: "uop", pakistanRank: "مشترکہ 10", worldRank: "951–1000", shortName: "UoP", nameUrdu: "یونیورسٹی آف پشاور", city: "پشاور", accent: "gold" },
];

export const qsMethodology: MethodologyItem[] = [
  { id: "research", label: "تحقیق", weight: 50, detail: "اکیڈمک شہرت 30% اور فی استاد تحقیقی حوالہ جات 20%۔", color: "#16b9a4" },
  { id: "employment", label: "روزگار", weight: 20, detail: "آجر کی رائے 15% اور فارغ التحصیل طلبہ کے نتائج 5%۔", color: "#ff7c52" },
  { id: "global", label: "عالمی روابط", weight: 15, detail: "بین الاقوامی اساتذہ، تحقیقی نیٹ ورک اور طلبہ—ہر اشاریہ 5%۔", color: "#5571f2" },
  { id: "learning", label: "تعلیمی تجربہ", weight: 10, detail: "اساتذہ اور طلبہ کا تناسب، یعنی تدریسی رسائی کی ایک اہم علامت۔", color: "#f1bd43" },
  { id: "sustainability", label: "پائیداری", weight: 5, detail: "ماحولیاتی و سماجی اثر اور ادارے کی پائیداری سے متعلق کارکردگی۔", color: "#9367e8" },
];

export const departmentCards: DepartmentCard[] = [
  {
    universityId: "qau", university: "قائداعظم یونیورسٹی", shortName: "QAU",
    fields: [
      { field: "طبیعی و کیمیائی علوم", routes: ["تحقیق", "اعلیٰ تعلیم", "توانائی و لیبارٹریز"] },
      { field: "حیاتیاتی علوم", routes: ["بایوٹیک", "فارما", "تشخیصی تحقیق"] },
      { field: "سماجی علوم", routes: ["سول سروس", "پالیسی", "تحقیق و میڈیا"] },
    ],
  },
  {
    universityId: "nust", university: "نسٹ", shortName: "NUST",
    fields: [
      { field: "کمپیوٹنگ", routes: ["سافٹ ویئر", "مصنوعی ذہانت", "سائبر سکیورٹی"] },
      { field: "انجینئرنگ", routes: ["ڈیزائن", "مینوفیکچرنگ", "انفراسٹرکچر"] },
      { field: "کاروبار و تعمیرات", routes: ["فنانس", "کنسلٹنگ", "اربن ڈیزائن"] },
    ],
  },
  {
    universityId: "pieas", university: "پیاس", shortName: "PIEAS",
    fields: [
      { field: "الیکٹریکل انجینئرنگ", routes: ["پاور", "کنٹرول", "ایمبیڈڈ سسٹمز"] },
      { field: "مکینیکل و مٹیریلز", routes: ["صنعتی تحقیق", "انرجی سسٹمز", "کوالٹی"] },
      { field: "فزکس و کمپیوٹنگ", routes: ["ماڈلنگ", "ڈیٹا", "ڈیپ ٹیک"] },
    ],
  },
  {
    universityId: "pu", university: "پنجاب یونیورسٹی", shortName: "PU",
    fields: [
      { field: "کمپیوٹنگ", routes: ["سافٹ ویئر", "ڈیٹا", "مصنوعی ذہانت"] },
      { field: "فارمیسی و حیاتیاتی علوم", routes: ["کلینیکل سپورٹ", "کوالٹی", "تحقیق"] },
      { field: "قانون و سماجی علوم", routes: ["قانون", "انتظامیہ", "میڈیا و تحقیق"] },
    ],
  },
  {
    universityId: "lums", university: "لمز", shortName: "LUMS",
    fields: [
      { field: "کاروبار و فنانس", routes: ["بینکنگ", "کنسلٹنگ", "کاروباری قیادت"] },
      { field: "کمپیوٹر سائنس", routes: ["پروڈکٹ", "ڈیٹا", "ٹیکنالوجی کاروبار"] },
      { field: "معاشیات، قانون و سماجی علوم", routes: ["پالیسی", "کارپوریٹ قانون", "اعلیٰ تعلیم"] },
    ],
  },
  {
    universityId: "uaf", university: "یونیورسٹی آف ایگریکلچر فیصل آباد", shortName: "UAF",
    fields: [
      { field: "زرعی و نباتاتی علوم", routes: ["فصلوں کی پیداوار", "بیج", "زرعی تحقیق"] },
      { field: "ویٹرنری و حیوانی علوم", routes: ["کلینیکل پریکٹس", "ڈیری", "پولٹری"] },
      { field: "غذائی و زرعی انجینئرنگ", routes: ["فوڈ سیفٹی", "سپلائی چین", "ایگری ٹیک"] },
    ],
  },
  {
    universityId: "comsats", university: "کامسیٹس یونیورسٹی", shortName: "COMSATS",
    fields: [
      { field: "کمپیوٹنگ", routes: ["سافٹ ویئر", "کلاؤڈ", "ڈیٹا"] },
      { field: "الیکٹریکل و کمپیوٹر انجینئرنگ", routes: ["ٹیلی کام", "آٹومیشن", "ہارڈویئر"] },
      { field: "قدرتی علوم", routes: ["تحقیق", "تدریس", "اعلیٰ تعلیم"] },
    ],
  },
  {
    universityId: "gcuf", university: "گورنمنٹ کالج یونیورسٹی فیصل آباد", shortName: "GCUF",
    fields: [
      { field: "طبیعی و حیاتیاتی علوم", routes: ["لیبارٹری", "تدریس", "تحقیق"] },
      { field: "کمپیوٹنگ", routes: ["سافٹ ویئر", "ڈیٹا", "مقامی و ریموٹ کام"] },
      { field: "کاروبار و سماجی علوم", routes: ["کامرس", "انتظامیہ", "ترقیاتی شعبہ"] },
    ],
  },
  {
    universityId: "uet", university: "یو ای ٹی لاہور", shortName: "UET",
    fields: [
      { field: "سول انجینئرنگ", routes: ["تعمیرات", "ٹرانسپورٹ", "واٹر سسٹمز"] },
      { field: "الیکٹریکل و کمپیوٹر", routes: ["پاور", "آٹومیشن", "ٹیلی کام"] },
      { field: "مکینیکل و صنعتی", routes: ["مینوفیکچرنگ", "آپریشنز", "کوالٹی"] },
    ],
  },
  {
    universityId: "aku", university: "آغا خان یونیورسٹی", shortName: "AKU",
    fields: [
      { field: "میڈیسن", routes: ["کلینیکل پریکٹس", "تخصص", "تحقیق"] },
      { field: "نرسنگ و مڈوائفری", routes: ["مریضوں کی نگہداشت", "ہسپتال قیادت", "عالمی مواقع"] },
      { field: "صحت عامہ", routes: ["وبا شناسی", "ہیلتھ پالیسی", "پروگرام مینجمنٹ"] },
    ],
  },
  {
    universityId: "uop", university: "یونیورسٹی آف پشاور", shortName: "UoP",
    fields: [
      { field: "سماجی علوم", routes: ["سول سروس", "میڈیا", "علاقائی تحقیق"] },
      { field: "قدرتی و حیاتیاتی علوم", routes: ["لیبارٹری", "ماحولیات", "اعلیٰ تعلیم"] },
      { field: "انسانی علوم و انتظام", routes: ["تعلیم", "ابلاغ", "انتظامیہ"] },
    ],
  },
];

export const departmentGroups = {
  A: ["qau", "nust", "pieas", "pu"],
  B: ["lums", "uaf", "comsats", "gcuf"],
  C: ["uet", "aku", "uop"],
} as const;

export const feeAdmissionRecords: FeeAdmissionRecord[] = [
  { id: "qau", pakistanRank: "1", worldRank: "381", university: "قائداعظم یونیورسٹی", shortName: "QAU", programme: "بی ایس کمپیوٹر سائنس / انفارمیشن ٹیکنالوجی", tuition: "68,490 روپے", feePeriod: "ہر سمسٹر", note: "داخلے سمیت پہلی ادائیگی 106,530 روپے؛ 3,090 روپے پراسیسنگ فیس الگ۔", admissionSummary: "تعلیمی میرٹ؛ پروگرام کی تازہ اہلیت اور اضافی شرط داخلہ نوٹس میں دیکھیں۔", sourceLabel: "سرکاری فیس صفحہ", sourceUrl: "https://qau.edu.pk/bachelor-fee-structure/" },
  { id: "nust", pakistanRank: "2", worldRank: "384", university: "نیشنل یونیورسٹی آف سائنسز اینڈ ٹیکنالوجی", shortName: "NUST", programme: "انجینئرنگ اور کمپیوٹنگ", tuition: "216,750 روپے", feePeriod: "ہر سمسٹر", note: "5,000 روپے متفرق اخراجات الگ؛ داخلہ و قابلِ واپسی سکیورٹی سمیت پہلی ادائیگی 266,750 روپے۔", admissionSummary: "NET راستہ: 75% ٹیسٹ، 15% HSSC اور 10% SSC۔", sourceLabel: "سرکاری مالی معلومات", sourceUrl: "https://nust.edu.pk/admissions/fee-structure/undergraduate-financial-matters/" },
  { id: "pieas", pakistanRank: "3", worldRank: "560", university: "پاکستان انسٹی ٹیوٹ آف انجینئرنگ اینڈ اپلائیڈ سائنسز", shortName: "PIEAS", programme: "18 کریڈٹ آور کا مثالی بی ایس سمسٹر", tuition: "72,000 روپے", feePeriod: "ہر سمسٹر", note: "خدمات ملا کر متواتر مثالی خرچ 103,000 روپے؛ 60,000 روپے یک وقتی اخراجات الگ۔", admissionSummary: "بی ایس انتخاب: 60% تحریری ٹیسٹ، 25% HSSC Part-I اور 15% SSC۔", sourceLabel: "فیس دستاویز", sourceUrl: "https://admissions.pieas.edu.pk/Admissions/Contents/FeeStructure2026.pdf" },
  { id: "pu", pakistanRank: "4", worldRank: "588", university: "پنجاب یونیورسٹی", shortName: "PU", programme: "FCIT ریگولر / مارننگ پروگرام", tuition: "55,000 روپے", feePeriod: "ہر سمسٹر", note: "سروس، امتحان، رجسٹریشن اور سکیورٹی شامل کر کے پہلی مجموعی ادائیگی تقریباً 84,950 روپے۔", admissionSummary: "میرٹ اور داخلہ ٹیسٹ کا وزن پروگرام کے مطابق بدلتا ہے۔", sourceLabel: "فیس شیڈول", sourceUrl: "https://pu.edu.pk/downloads/Dues-Fee-Schedule-for-the-Year-2026-27.pdf" },
  { id: "lums", pakistanRank: "5", worldRank: "608", university: "لاہور یونیورسٹی آف مینجمنٹ سائنسز", shortName: "LUMS", programme: "بی ایس کمپیوٹر سائنس", tuition: "1,557,200 روپے", feePeriod: "پہلے تعلیمی سال کی ٹیوشن", note: "34 کریڈٹ آور؛ دیگر لازمی اخراجات سمیت پہلے سال کا مجموعہ 2,182,200 روپے، ہاسٹل الگ۔", admissionSummary: "اسکول کے مطابق SAT/ACT یا LCAT، تعلیمی ریکارڈ، درخواست اور ممکنہ انٹرویو۔", sourceLabel: "پروگرام و فیس", sourceUrl: "https://lums.edu.pk/programmes/bs-computer-science" },
  { id: "uaf", pakistanRank: "6", worldRank: "629", university: "یونیورسٹی آف ایگریکلچر فیصل آباد", shortName: "UAF", programme: "بی ایس سی آنرز زراعت", tuition: "موجودہ پورٹل / چالان", feePeriod: "پروگرام اور سیشن کے مطابق", note: "فیس کو ایک مستقل عدد نہ بنائیں؛ موجودہ آفر لیٹر یا پورٹل سے بنایا گیا چالان استعمال کریں۔", admissionSummary: "پروگرام کی اہلیت اور میرٹ تازہ پراسپیکٹس کے مطابق دیکھیں۔", sourceLabel: "داخلہ پورٹل", sourceUrl: "https://admissions.uaf.edu.pk/" },
  { id: "comsats", pakistanRank: "7", worldRank: "639", university: "کامسیٹس یونیورسٹی", shortName: "COMSATS", programme: "بی ایس کمپیوٹر سائنس — ساہیوال", tuition: "160,500 روپے", feePeriod: "ہر سمسٹر کا مجموعی متواتر خرچ", note: "27,000 روپے داخلہ فیس نئے طالب علم کے لیے الگ؛ کیمپس اور پروگرام بدلنے سے رقم بدل سکتی ہے۔", admissionSummary: "NTS NAT یا متعلقہ ٹیسٹ کا راستہ؛ کیمپس/پروگرام کا میرٹ اہم ہے۔", sourceLabel: "کیمپس فیس صفحہ", sourceUrl: "https://sahiwal.comsats.edu.pk/fee-structure.aspx" },
  { id: "gcuf", pakistanRank: "8", worldRank: "691", university: "گورنمنٹ کالج یونیورسٹی فیصل آباد", shortName: "GCUF", programme: "انڈرگریجویٹ بی ایس پروگرام", tuition: "موجودہ پورٹل / چالان", feePeriod: "پروگرام اور سیشن کے مطابق", note: "تازہ سیشن کی رقم موجودہ داخلہ پورٹل یا جاری کردہ چالان سے لیں۔", admissionSummary: "شعبہ، اہلیت اور پروگرام کے میرٹ کے مطابق انتخاب۔", sourceLabel: "داخلہ صفحہ", sourceUrl: "https://gcuf.edu.pk/admissions/" },
  { id: "uet", pakistanRank: "9", worldRank: "791–800", university: "یونیورسٹی آف انجینئرنگ اینڈ ٹیکنالوجی لاہور", shortName: "UET", programme: "سبسڈی شدہ انجینئرنگ / کمپیوٹنگ", tuition: "110,340 روپے", feePeriod: "پہلے سمسٹر کی دو اقساط", note: "54,050 اور 56,290 روپے کی اقساط؛ ہاسٹل اور دیگر ذاتی اخراجات الگ۔", admissionSummary: "ECAT، تعلیمی میرٹ، ڈومیسائل/زمرہ اور پروگرام کی اہلیت۔", sourceLabel: "داخلہ و فیس", sourceUrl: "https://admission.uet.edu.pk/program/1" },
  { id: "aku", pakistanRank: "مشترکہ 10", worldRank: "951–1000", university: "آغا خان یونیورسٹی", shortName: "AKU", programme: "بیچلر آف اسٹڈیز", tuition: "2,124,000 روپے", feePeriod: "سالانہ ٹیوشن", note: "یہ Bachelor of Studies ہے، MBBS نہیں؛ داخلہ، صحت، سرگرمی، سکیورٹی اور ہاسٹل الگ۔", admissionSummary: "پروگرام کے لحاظ سے مخصوص ٹیسٹ اور انٹرویو؛ ہر پروگرام کا الگ طریقہ۔", sourceLabel: "فیس صفحہ", sourceUrl: "https://www.aku.edu/faspk/study/Pages/fee-structure.aspx" },
  { id: "uop", pakistanRank: "مشترکہ 10", worldRank: "951–1000", university: "یونیورسٹی آف پشاور", shortName: "UoP", programme: "انڈرگریجویٹ بی ایس پروگرام", tuition: "موجودہ پورٹل / چالان", feePeriod: "پروگرام اور سیشن کے مطابق", note: "تازہ پروگرام صفحہ، داخلہ نوٹس اور جاری کردہ چالان کو حتمی سمجھیں۔", admissionSummary: "پروگرام کی اہلیت اور میرٹ تازہ داخلہ نوٹس کے مطابق۔", sourceLabel: "انڈرگریجویٹ داخلہ", sourceUrl: "https://www.uop.edu.pk/admissions/?q=Undergraduate" },
];

export const admissionTimelines: TimelineUniversity[] = [
  { id: "nust", shortName: "NUST", colour: "#5571f2", planningWindow: "کئی NET مراحل کی وجہ سے تیاری پہلے شروع کریں۔", milestones: [
    { month: "ستمبر تا دسمبر", label: "تیاری اور NET رجسٹریشن", note: "پہلا مرحلہ ابتدائی پیمانہ دیتا ہے۔", state: "prepare" },
    { month: "جنوری تا جون", label: "اگلے NET مراحل", note: "بہتر اسکور کے لیے دوبارہ کوشش ممکن۔", state: "active" },
    { month: "جون تا اگست", label: "ترجیحات، میرٹ اور فیس", note: "پروگرام کی ترجیحات اور آفر پر فوری عمل۔", state: "decision" },
  ] },
  { id: "lums", shortName: "LUMS", colour: "#f1bd43", planningWindow: "درخواست اور مالی معاونت کی منصوبہ بندی بہت پہلے کریں۔", milestones: [
    { month: "ستمبر تا نومبر", label: "ٹیسٹ اور پروفائل", note: "SAT/ACT یا LCAT کے راستے سے، تحریری مضامین اور ریکارڈز تیار کریں۔", state: "prepare" },
    { month: "دسمبر تا فروری", label: "درخواست اور مالی معاونت", note: "دونوں آخری تاریخیں الگ ہو سکتی ہیں۔", state: "active" },
    { month: "اپریل تا جولائی", label: "فیصلہ اور ادائیگی", note: "آفر، امدادی پیکج اور پہلے سال کا بجٹ ساتھ دیکھیں۔", state: "decision" },
  ] },
  { id: "uet", shortName: "UET", colour: "#ff7c52", planningWindow: "ECAT، ڈومیسائل اور پروگرام کی اہلیت کو ایک ساتھ منظم کریں۔", milestones: [
    { month: "جنوری تا اپریل", label: "ECAT تیاری", note: "مضامین اور اہلیت پہلے چیک کریں۔", state: "prepare" },
    { month: "مئی تا جولائی", label: "ٹیسٹ اور درخواست", note: "دستاویزات اور زمرے کا ثبوت مکمل رکھیں۔", state: "active" },
    { month: "جولائی تا ستمبر", label: "میرٹ لسٹ اور فیس", note: "متعدد فہرستوں کے دوران اصل دستاویزات تیار ہوں۔", state: "decision" },
  ] },
  { id: "public", shortName: "دیگر سرکاری ادارے", colour: "#16b9a4", planningWindow: "زیادہ تر نوٹسز سال کے وسط میں آتے ہیں، مگر دستاویزات پہلے مکمل کریں۔", milestones: [
    { month: "جنوری تا مارچ", label: "فہرست اور اہلیت", note: "QAU، PIEAS، PU، UAF، COMSATS، GCUF، AKU اور UoP سمیت شارٹ لسٹ بنائیں۔", state: "prepare" },
    { month: "اپریل تا جولائی", label: "درخواستیں اور ٹیسٹ", note: "ہر جامعہ کا الگ پورٹل اور آخری تاریخ محفوظ کریں۔", state: "active" },
    { month: "جولائی تا ستمبر", label: "میرٹ، چالان اور ہاسٹل", note: "آفر کے بعد ادائیگی کی مدت مختصر ہو سکتی ہے۔", state: "decision" },
  ] },
];

export const fitProfiles: FitProfile[] = [
  { id: "qau-sciences", label: "تحقیق اور بنیادی علوم", programme: "طبیعی / حیاتیاتی / سماجی علوم", university: "قائداعظم یونیورسٹی", scores: { subject: 96, department: 96, affordability: 89, admission: 58, location: 82, career: 78 } },
  { id: "nust-computing", label: "ٹیکنالوجی اور صنعت", programme: "کمپیوٹنگ / انجینئرنگ", university: "نسٹ", scores: { subject: 95, department: 94, affordability: 55, admission: 48, location: 80, career: 96 } },
  { id: "pieas-engineering", label: "تحقیق پر مبنی انجینئرنگ", programme: "الیکٹریکل / مکینیکل / فزکس", university: "پیاس", scores: { subject: 92, department: 94, affordability: 78, admission: 42, location: 72, career: 84 } },
  { id: "pu-computing", label: "کم قیمت شہری انتخاب", programme: "کمپیوٹنگ / فارمیسی / قانون", university: "پنجاب یونیورسٹی", scores: { subject: 82, department: 81, affordability: 92, admission: 67, location: 90, career: 80 } },
  { id: "lums-business", label: "کاروبار اور قیادت", programme: "بزنس / اکنامکس / کمپیوٹنگ", university: "لمز", scores: { subject: 94, department: 95, affordability: 18, admission: 37, location: 88, career: 98 } },
  { id: "uaf-agriculture", label: "زراعت اور غذائی نظام", programme: "زراعت / ویٹرنری / فوڈ", university: "یونیورسٹی آف ایگریکلچر فیصل آباد", scores: { subject: 99, department: 96, affordability: 86, admission: 69, location: 76, career: 87 } },
  { id: "comsats-computing", label: "کمپیوٹنگ کا عملی راستہ", programme: "کمپیوٹر سائنس / سافٹ ویئر", university: "کامسیٹس", scores: { subject: 92, department: 88, affordability: 62, admission: 64, location: 80, career: 91 } },
  { id: "gcuf-sciences", label: "فیصل آباد میں قابلِ رسائی انتخاب", programme: "سائنس / کمپیوٹنگ", university: "جی سی یونیورسٹی فیصل آباد", scores: { subject: 78, department: 76, affordability: 90, admission: 82, location: 86, career: 70 } },
  { id: "uet-engineering", label: "روایتی انجینئرنگ", programme: "سول / الیکٹریکل / مکینیکل", university: "یو ای ٹی لاہور", scores: { subject: 95, department: 94, affordability: 82, admission: 53, location: 89, career: 93 } },
  { id: "aku-health", label: "طب اور صحت", programme: "میڈیسن / نرسنگ / صحت عامہ", university: "آغا خان یونیورسٹی", scores: { subject: 100, department: 100, affordability: 15, admission: 26, location: 78, career: 99 } },
  { id: "uop-social", label: "علاقائی و سماجی علوم", programme: "سماجی / قدرتی / انسانی علوم", university: "یونیورسٹی آف پشاور", scores: { subject: 81, department: 79, affordability: 91, admission: 77, location: 75, career: 72 } },
];

export const plannerSeed = [
  { id: "nust-cs", university: "نسٹ", programme: "کمپیوٹر سائنس", bucket: "dream" as const, deadline: "NET / درخواست", feeLink: "https://nust.edu.pk/admissions/" },
  { id: "lums-business", university: "لمز", programme: "مینجمنٹ سائنس", bucket: "dream" as const, deadline: "درخواست / مالی معاونت", feeLink: "https://lums.edu.pk/admissions" },
  { id: "comsats-se", university: "کامسیٹس", programme: "سافٹ ویئر انجینئرنگ", bucket: "target" as const, deadline: "کیمپس داخلہ نوٹس", feeLink: "https://admissions.comsats.edu.pk/" },
  { id: "uet-ee", university: "یو ای ٹی لاہور", programme: "الیکٹریکل انجینئرنگ", bucket: "target" as const, deadline: "ECAT / درخواست", feeLink: "https://admission.uet.edu.pk/" },
  { id: "pu-it", university: "پنجاب یونیورسٹی", programme: "انفارمیشن ٹیکنالوجی", bucket: "safe" as const, deadline: "داخلہ پورٹل", feeLink: "https://admissions.pu.edu.pk/" },
  { id: "gcuf-cs", university: "جی سی یونیورسٹی فیصل آباد", programme: "کمپیوٹر سائنس", bucket: "safe" as const, deadline: "داخلہ نوٹس", feeLink: "https://gcuf.edu.pk/admissions/" },
];

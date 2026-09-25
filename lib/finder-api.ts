import { apiBaseUrl } from '@/lib/api';
import { normalizeFieldGroup } from '@/lib/university-finder-labels';

export type CourseFinderListing = {
  id: number;
  title: string;
  titleEn: string | null;
  provider: string | null;
  subject: string;
  deliveryMode: string | null;
  priceType: 'free' | 'paid';
  priceLabel: string | null;
  durationLabel: string;
  durationBucket: 'short' | 'medium' | 'long';
  description: string | null;
  externalUrl: string | null;
};

export type UniversityProgram = {
  id: number;
  publicId: string;
  universityName: string;
  sector: 'public' | 'private';
  campusName: string;
  city: string;
  province: string;
  degreeLevel: string;
  programNameEn: string;
  programNameUr: string | null;
  fieldGroup: string;
  discipline: string | null;
  durationYears: number | null;
  semesters: number | null;
  shift: string | null;
  genderRestriction: string | null;
  admissionStatus: string | null;
  feeAmountPkr: number | null;
  feeBasisCode: string | null;
  feeBasisLabelUr: string | null;
  feeFilterAmountPkr: number | null;
  includeInMainFeeFilter: boolean;
  feeDisplayUr: string | null;
  feeWarningUr: string | null;
  programUrl: string | null;
  admissionUrl: string | null;
  feeUrl: string | null;
  sourceUrl: string | null;
  lastVerified: string | null;
  confidence: string | null;
};

export type Scholarship = {
  id: number;
  name: string;
  country: string;
  degreeLevel: string;
  fieldOfStudy: string[];
  deadlineDate: string | null;
  deadlineLabel: string | null;
  description: string | null;
  externalUrl: string | null;
};

type ApiCourseFinderListing = {
  id: number;
  title: string;
  title_en: string | null;
  provider: string | null;
  subject: string;
  delivery_mode: string | null;
  price_type: 'free' | 'paid';
  price_label: string | null;
  duration_label: string;
  duration_bucket: 'short' | 'medium' | 'long';
  description: string | null;
  external_url: string | null;
};

type ApiUniversityProgram = {
  id: number;
  public_id: string;
  university_name: string;
  sector: string;
  campus_name: string;
  city: string;
  province: string;
  degree_level: string;
  program_name_en: string;
  program_name_ur: string | null;
  field_group: string;
  discipline: string | null;
  duration_years: number | null;
  semesters: number | null;
  shift: string | null;
  gender_restriction: string | null;
  admission_status: string | null;
  fee_amount_pkr: number | null;
  fee_basis_code: string | null;
  fee_basis_label_ur: string | null;
  fee_filter_amount_pkr: number | null;
  include_in_main_fee_filter: boolean;
  fee_display_ur: string | null;
  fee_warning_ur: string | null;
  program_url: string | null;
  admission_url: string | null;
  fee_url: string | null;
  source_url: string | null;
  last_verified: string | null;
  confidence: string | null;
};

type ApiScholarship = {
  id: number;
  name: string;
  country: string;
  degree_level: string;
  field_of_study: string;
  deadline_date: string | null;
  deadline_label: string | null;
  description: string | null;
  external_url: string | null;
};

async function fetchFinderContent<T>(path: string): Promise<T> {
  // This data only changes when an administrator re-runs an import script (course/university/
  // scholarship finder), not from live user activity, so a short revalidation window avoids a
  // live backend round trip (and its DB query) on every single page load.
  const response = await fetch(`${apiBaseUrl}${path}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Finder request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function splitList(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function mapCourseListing(listing: ApiCourseFinderListing): CourseFinderListing {
  return {
    id: listing.id,
    title: listing.title,
    titleEn: listing.title_en,
    provider: listing.provider,
    subject: listing.subject,
    deliveryMode: listing.delivery_mode,
    priceType: listing.price_type,
    priceLabel: listing.price_label,
    durationLabel: listing.duration_label,
    durationBucket: listing.duration_bucket,
    description: listing.description,
    externalUrl: listing.external_url,
  };
}

function mapUniversityProgram(program: ApiUniversityProgram): UniversityProgram {
  return {
    id: program.id,
    publicId: program.public_id,
    universityName: program.university_name,
    sector: program.sector.toLowerCase() === 'private' ? 'private' : 'public',
    campusName: program.campus_name,
    city: program.city,
    province: program.province,
    degreeLevel: program.degree_level,
    programNameEn: program.program_name_en,
    programNameUr: program.program_name_ur,
    fieldGroup: normalizeFieldGroup(program.field_group),
    discipline: program.discipline,
    durationYears: program.duration_years,
    semesters: program.semesters,
    shift: program.shift,
    genderRestriction: program.gender_restriction,
    admissionStatus: program.admission_status,
    feeAmountPkr: program.fee_amount_pkr,
    feeBasisCode: program.fee_basis_code,
    feeBasisLabelUr: program.fee_basis_label_ur,
    feeFilterAmountPkr: program.fee_filter_amount_pkr,
    includeInMainFeeFilter: program.include_in_main_fee_filter,
    feeDisplayUr: program.fee_display_ur,
    feeWarningUr: program.fee_warning_ur,
    programUrl: program.program_url,
    admissionUrl: program.admission_url,
    feeUrl: program.fee_url,
    sourceUrl: program.source_url,
    lastVerified: program.last_verified,
    confidence: program.confidence,
  };
}

function mapScholarship(scholarship: ApiScholarship): Scholarship {
  return {
    id: scholarship.id,
    name: scholarship.name,
    country: scholarship.country,
    degreeLevel: scholarship.degree_level,
    fieldOfStudy: splitList(scholarship.field_of_study),
    deadlineDate: scholarship.deadline_date,
    deadlineLabel: scholarship.deadline_label,
    description: scholarship.description,
    externalUrl: scholarship.external_url,
  };
}

const fallbackCourseListings: CourseFinderListing[] = [
  {
    id: -1,
    title: 'فری لانسنگ',
    titleEn: 'Freelancing Course',
    provider: 'Innovista LearnEasy',
    subject: 'Freelancing',
    deliveryMode: 'Online recorded',
    priceType: 'free',
    priceLabel: 'مفت',
    durationLabel: '3h 17m listed videos; self-paced',
    durationBucket: 'short',
    description: 'فری لانس پروفائل، سروس کی پیشکش، پروپوزل اور کلائنٹ سے رابطے کی بنیادی مہارتیں۔',
    externalUrl: 'https://learneasy.pk/course/freelancing-course/',
  },
  {
    id: -2,
    title: 'ڈیجیٹل مارکیٹنگ',
    titleEn: 'Digital Marketing',
    provider: 'Bano Qabil Karachi',
    subject: 'Digital marketing',
    deliveryMode: 'Physical classroom',
    priceType: 'free',
    priceLabel: 'مفت',
    durationLabel: '5 months; 4 classroom hours per week',
    durationBucket: 'long',
    description: 'سوشل میڈیا مہم، اشتہارات اور ایس ای او سیکھیں اور مارکیٹنگ پورٹ فولیو بنائیں۔',
    externalUrl: 'https://banoqabil.pk/courses/digital-marketing--694fd45509bbc24151521d1b',
  },
  {
    id: -3,
    title: 'مصنوعی ذہانت بوٹ کیمپ',
    titleEn: 'Artificial Intelligence Bootcamp',
    provider: 'atomcamp',
    subject: 'AI and machine learning',
    deliveryMode: 'Online live',
    priceType: 'paid',
    priceLabel: '75,000 روپے',
    durationLabel: '3 months',
    durationBucket: 'medium',
    description: 'پائتھون، مشین لرننگ اور جنریٹو اے آئی کی ایپلی کیشن بنانا اور چلانا سیکھیں۔',
    externalUrl: 'https://www.atomcamp.com/aibootcamp/',
  },
  {
    id: -4,
    title: 'ڈیٹا اینالیٹکس بوٹ کیمپ',
    titleEn: 'Data Analytics Bootcamp',
    provider: 'atomcamp',
    subject: 'Data and Excel',
    deliveryMode: 'Online live',
    priceType: 'paid',
    priceLabel: '50,000 روپے',
    durationLabel: '3 months',
    durationBucket: 'medium',
    description: 'ایکسل، ایس کیو ایل، پاور بی آئی اور پائتھن سے ڈیٹا کا تجزیہ اور رپورٹنگ سیکھیں۔',
    externalUrl: 'https://www.atomcamp.com/data-analytics-bootcamp/',
  },
  {
    id: -5,
    title: 'ہر شخص کے لیے اے آئی',
    titleEn: 'AI for Everyone',
    provider: 'Enablers',
    subject: 'AI productivity',
    deliveryMode: 'Online or physical classroom',
    priceType: 'paid',
    priceLabel: 'قیمت درج نہیں',
    durationLabel: '1 month on detail page; 6–8 weeks on catalogue',
    durationBucket: 'short',
    description: 'تکنیکی پس منظر کے بغیر لکھائی، تحقیق، منصوبہ بندی اور روزمرہ کاموں میں اے آئی استعمال کریں۔',
    externalUrl: 'https://www.enablers.org/trainings/ai-for-everyone',
  },
  {
    id: -6,
    title: 'کینوا سے ڈیزائن بنانا',
    titleEn: 'Canva Bootcamp / Learn Designing with Canva',
    provider: 'PNY Trainings',
    subject: 'Design',
    deliveryMode: 'Online; live/recorded mix unclear',
    priceType: 'paid',
    priceLabel: '5,000 روپے',
    durationLabel: '1 month',
    durationBucket: 'short',
    description: 'کینوا میں بزنس کارڈ اور سوشل میڈیا ڈیزائن بنائیں اور رنگ، فونٹ اور ترتیب کی بنیادیں سمجھیں۔',
    externalUrl: 'https://www.pnytrainings.com/canva-bootcamp',
  },
];

const fallbackUniversityPrograms: UniversityProgram[] = [
  {
    id: -1,
    publicId: 'SHAMA-P0100',
    universityName: 'COMSATS Institute of Information Technology / COMSATS University Islamabad',
    sector: 'public',
    campusName: 'COMSATS Lahore Campus',
    city: 'Lahore',
    province: 'Punjab',
    degreeLevel: 'BS/Undergraduate',
    programNameEn: 'BS Computer Science',
    programNameUr: null,
    fieldGroup: 'Computer Science & IT',
    discipline: 'Computer Science',
    durationYears: 4,
    semesters: 8,
    shift: null,
    genderRestriction: null,
    admissionStatus: null,
    feeAmountPkr: 160500,
    feeBasisCode: 'FIRST_SEMESTER_TOTAL',
    feeBasisLabelUr: null,
    feeFilterAmountPkr: null,
    includeInMainFeeFilter: false,
    feeDisplayUr: 'فیس ویب سائٹ پر واضح نہیں ملی',
    feeWarningUr: 'اس پروگرام کی فیس ابھی واضح طور پر میپ نہیں ہوئی۔',
    programUrl: 'https://lahore.comsats.edu.pk/undergraduate.aspx',
    admissionUrl: 'https://admissions.comsats.edu.pk/',
    feeUrl: 'https://lahore.comsats.edu.pk/fee-structure.aspx',
    sourceUrl: 'https://lahore.comsats.edu.pk/undergraduate.aspx',
    lastVerified: '2026-09-19',
    confidence: 'High',
  },
  {
    id: -2,
    publicId: 'SHAMA-P0124',
    universityName: 'National University of Sciences and Technology, Islamabad',
    sector: 'public',
    campusName: 'NUST Islamabad Main Campus',
    city: 'Islamabad',
    province: 'Islamabad Capital Territory',
    degreeLevel: 'BS/Undergraduate',
    programNameEn: 'BS Computer Science',
    programNameUr: null,
    fieldGroup: 'Computer Science & IT',
    discipline: 'Computer Science',
    durationYears: 4,
    semesters: 8,
    shift: null,
    genderRestriction: null,
    admissionStatus: null,
    feeAmountPkr: 216750,
    feeBasisCode: 'SEMESTER_TUITION_ONLY',
    feeBasisLabelUr: null,
    feeFilterAmountPkr: null,
    includeInMainFeeFilter: false,
    feeDisplayUr: 'فیس ویب سائٹ پر واضح نہیں ملی',
    feeWarningUr: 'اس پروگرام کی فیس ابھی واضح طور پر میپ نہیں ہوئی۔',
    programUrl: 'https://nust.edu.pk/admissions/undergraduates/list-of-ug-programmes-and-institutions',
    admissionUrl: null,
    feeUrl: null,
    sourceUrl: 'https://nust.edu.pk/admissions/undergraduates/list-of-ug-programmes-and-institutions',
    lastVerified: '2026-09-19',
    confidence: 'High',
  },
  {
    id: -3,
    publicId: 'SHAMA-P0169',
    universityName: 'University of the Punjab, Lahore',
    sector: 'public',
    campusName: 'University of the Punjab Lahore Campus / FCIT',
    city: 'Lahore',
    province: 'Punjab',
    degreeLevel: 'BS/Undergraduate',
    programNameEn: 'BS Computer Science',
    programNameUr: null,
    fieldGroup: 'Computer Science & IT',
    discipline: 'Computer Science',
    durationYears: 4,
    semesters: 8,
    shift: null,
    genderRestriction: null,
    admissionStatus: null,
    feeAmountPkr: null,
    feeBasisCode: 'FEE_NOT_AVAILABLE',
    feeBasisLabelUr: null,
    feeFilterAmountPkr: null,
    includeInMainFeeFilter: false,
    feeDisplayUr: 'فیس ویب سائٹ پر واضح نہیں ملی',
    feeWarningUr: 'اس پروگرام کی فیس ابھی واضح طور پر میپ نہیں ہوئی۔',
    programUrl: 'https://pu.edu.pk/program/show/900097',
    admissionUrl: null,
    feeUrl: null,
    sourceUrl: 'https://pu.edu.pk/program/show/900097',
    lastVerified: '2026-09-19',
    confidence: 'High',
  },
  {
    id: -4,
    publicId: 'SHAMA-P0341',
    universityName: 'National University of Computer and Emerging Sciences, Islamabad',
    sector: 'private',
    campusName: 'FAST-NUCES Chiniot-Faisalabad Campus',
    city: 'Chiniot / Faisalabad',
    province: 'Punjab',
    degreeLevel: 'BS/Undergraduate',
    programNameEn: 'BS Computer Science',
    programNameUr: null,
    fieldGroup: 'Computer Science & IT',
    discipline: 'Computer Science',
    durationYears: 4,
    semesters: 8,
    shift: null,
    genderRestriction: null,
    admissionStatus: null,
    feeAmountPkr: null,
    feeBasisCode: null,
    feeBasisLabelUr: null,
    feeFilterAmountPkr: null,
    includeInMainFeeFilter: false,
    feeDisplayUr: 'فیس ویب سائٹ پر واضح نہیں ملی',
    feeWarningUr: 'اس پروگرام کی فیس ابھی واضح طور پر میپ نہیں ہوئی۔',
    programUrl: null,
    admissionUrl: null,
    feeUrl: null,
    sourceUrl: 'https://cfd.nu.edu.pk/department-of-computer-science/',
    lastVerified: '2026-09-19',
    confidence: 'Medium',
  },
  {
    id: -5,
    publicId: 'SHAMA-P0217',
    universityName: 'University of Agriculture, Faisalabad',
    sector: 'public',
    campusName: 'UAF Main Campus',
    city: 'Faisalabad',
    province: 'Punjab',
    degreeLevel: 'BS/Undergraduate',
    programNameEn: 'B.Sc. (Hons.) Agriculture',
    programNameUr: null,
    fieldGroup: 'Agriculture & Food Sciences',
    discipline: 'Agriculture',
    durationYears: 4,
    semesters: 8,
    shift: null,
    genderRestriction: null,
    admissionStatus: null,
    feeAmountPkr: null,
    feeBasisCode: 'FEE_NOT_AVAILABLE',
    feeBasisLabelUr: null,
    feeFilterAmountPkr: null,
    includeInMainFeeFilter: false,
    feeDisplayUr: 'فیس ویب سائٹ پر واضح نہیں ملی',
    feeWarningUr: 'اس پروگرام کی فیس ابھی واضح طور پر میپ نہیں ہوئی۔',
    programUrl: null,
    admissionUrl: null,
    feeUrl: null,
    sourceUrl: 'https://web.uaf.edu.pk/Downloads/MeritListsView',
    lastVerified: '2026-09-19',
    confidence: 'Medium',
  },
  {
    id: -6,
    publicId: 'SHAMA-P0183',
    universityName: 'Government College University, Faisalabad',
    sector: 'public',
    campusName: 'GCUF Faisalabad Main Campus',
    city: 'Faisalabad',
    province: 'Punjab',
    degreeLevel: 'BS/Undergraduate',
    programNameEn: 'BS History',
    programNameUr: null,
    fieldGroup: 'Arts, Design & Humanities',
    discipline: 'Arts & Humanities',
    durationYears: 4,
    semesters: 8,
    shift: null,
    genderRestriction: null,
    admissionStatus: null,
    feeAmountPkr: null,
    feeBasisCode: 'FEE_NOT_AVAILABLE',
    feeBasisLabelUr: null,
    feeFilterAmountPkr: null,
    includeInMainFeeFilter: false,
    feeDisplayUr: 'فیس ویب سائٹ پر واضح نہیں ملی',
    feeWarningUr: 'اس پروگرام کی فیس ابھی واضح طور پر میپ نہیں ہوئی۔',
    programUrl: null,
    admissionUrl: null,
    feeUrl: null,
    sourceUrl: 'https://gcuf.edu.pk/bs-degree-program-4-year/',
    lastVerified: '2026-09-19',
    confidence: 'Medium',
  },
];

const fallbackScholarships: Scholarship[] = [
  {
    id: -1,
    name: 'فل برائٹ اسکالرشپ',
    country: 'امریکہ',
    degreeLevel: 'ماسٹرز',
    fieldOfStudy: ['تمام شعبے'],
    deadlineDate: null,
    deadlineLabel: 'سالانہ - اکتوبر',
    description: null,
    externalUrl: null,
  },
  {
    id: -2,
    name: 'چیوننگ اسکالرشپ',
    country: 'برطانیہ',
    degreeLevel: 'ماسٹرز',
    fieldOfStudy: ['تمام شعبے'],
    deadlineDate: null,
    deadlineLabel: 'سالانہ - نومبر',
    description: null,
    externalUrl: null,
  },
  {
    id: -3,
    name: 'ڈی اے اے ڈی اسکالرشپ',
    country: 'جرمنی',
    degreeLevel: 'ماسٹرز',
    fieldOfStudy: ['انجینئرنگ', 'سائنس', 'سماجی علوم'],
    deadlineDate: null,
    deadlineLabel: 'سالانہ - اکتوبر',
    description: null,
    externalUrl: null,
  },
  {
    id: -4,
    name: 'ایراسمس منڈس اسکالرشپ',
    country: 'یورپی یونین',
    degreeLevel: 'ماسٹرز',
    fieldOfStudy: ['تمام شعبے'],
    deadlineDate: null,
    deadlineLabel: 'سالانہ - جنوری',
    description: null,
    externalUrl: null,
  },
  {
    id: -5,
    name: 'آسٹریلیا ایوارڈز اسکالرشپ',
    country: 'آسٹریلیا',
    degreeLevel: 'ماسٹرز',
    fieldOfStudy: ['ترقیاتی مطالعہ', 'زراعت', 'صحت'],
    deadlineDate: null,
    deadlineLabel: 'سالانہ - اپریل',
    description: null,
    externalUrl: null,
  },
  {
    id: -6,
    name: 'ترکی برسلری اسکالرشپ',
    country: 'ترکی',
    degreeLevel: 'انڈرگریجویٹ',
    fieldOfStudy: ['تمام شعبے'],
    deadlineDate: null,
    deadlineLabel: 'سالانہ - جنوری',
    description: null,
    externalUrl: null,
  },
];

export async function getCourseFinderListings(): Promise<CourseFinderListing[]> {
  try {
    const listings = await fetchFinderContent<ApiCourseFinderListing[]>('/api/v1/course-finder');
    return listings.map(mapCourseListing);
  } catch {
    return fallbackCourseListings;
  }
}

export async function getUniversityPrograms(): Promise<UniversityProgram[]> {
  try {
    const programs = await fetchFinderContent<ApiUniversityProgram[]>('/api/v1/university-finder');
    return programs.map(mapUniversityProgram);
  } catch {
    return fallbackUniversityPrograms;
  }
}

export async function getScholarships(): Promise<Scholarship[]> {
  try {
    const scholarships = await fetchFinderContent<ApiScholarship[]>('/api/v1/scholarship-finder');
    return scholarships.map(mapScholarship);
  } catch {
    return fallbackScholarships;
  }
}

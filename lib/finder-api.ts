import { apiBaseUrl } from '@/lib/api';

export type CourseFinderListing = {
  id: number;
  title: string;
  provider: string | null;
  subject: string;
  level: string;
  priceType: 'free' | 'paid';
  priceLabel: string | null;
  durationLabel: string;
  durationBucket: 'short' | 'medium' | 'long';
  description: string | null;
  externalUrl: string | null;
};

export type University = {
  id: number;
  name: string;
  city: string;
  sector: 'public' | 'private';
  programs: string[];
  websiteUrl: string | null;
  description: string | null;
  establishedYear: number | null;
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
  provider: string | null;
  subject: string;
  level: string;
  price_type: 'free' | 'paid';
  price_label: string | null;
  duration_label: string;
  duration_bucket: 'short' | 'medium' | 'long';
  description: string | null;
  external_url: string | null;
};

type ApiUniversity = {
  id: number;
  name: string;
  city: string;
  sector: 'public' | 'private';
  programs: string;
  website_url: string | null;
  description: string | null;
  established_year: number | null;
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
  const response = await fetch(`${apiBaseUrl}${path}`, {
    cache: 'no-store',
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
    provider: listing.provider,
    subject: listing.subject,
    level: listing.level,
    priceType: listing.price_type,
    priceLabel: listing.price_label,
    durationLabel: listing.duration_label,
    durationBucket: listing.duration_bucket,
    description: listing.description,
    externalUrl: listing.external_url,
  };
}

function mapUniversity(university: ApiUniversity): University {
  return {
    id: university.id,
    name: university.name,
    city: university.city,
    sector: university.sector,
    programs: splitList(university.programs),
    websiteUrl: university.website_url,
    description: university.description,
    establishedYear: university.established_year,
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
    title: 'ویب ڈویلپمنٹ کا تعارف',
    provider: 'شمع اکیڈمی',
    subject: 'کمپیوٹر سائنس',
    level: 'ابتدائی',
    priceType: 'free',
    priceLabel: 'مفت',
    durationLabel: '4 ہفتے',
    durationBucket: 'short',
    description: 'ویب سائٹس بنانے کی بنیادی مہارتیں سیکھیں۔',
    externalUrl: null,
  },
  {
    id: -2,
    title: 'ڈیجیٹل مارکیٹنگ',
    provider: null,
    subject: 'مارکیٹنگ',
    level: 'درمیانی',
    priceType: 'paid',
    priceLabel: '4,000 روپے',
    durationLabel: '8 ہفتے',
    durationBucket: 'medium',
    description: 'سوشل میڈیا اور آن لائن اشتہارات کی حکمت عملی۔',
    externalUrl: null,
  },
  {
    id: -3,
    title: 'انگریزی بول چال کی مہارت',
    provider: 'شمع اکیڈمی',
    subject: 'زبان کی مہارت',
    level: 'ابتدائی',
    priceType: 'free',
    priceLabel: 'مفت',
    durationLabel: '6 ہفتے',
    durationBucket: 'medium',
    description: 'اعتماد کے ساتھ انگریزی بولنے کی مشق۔',
    externalUrl: null,
  },
  {
    id: -4,
    title: 'پروگرامنگ ود پائتھون',
    provider: null,
    subject: 'کمپیوٹر سائنس',
    level: 'درمیانی',
    priceType: 'paid',
    priceLabel: '5,000 روپے',
    durationLabel: '10 ہفتے',
    durationBucket: 'long',
    description: 'پائتھون زبان میں پروگرامنگ کی بنیادیں اور عملی مشقیں۔',
    externalUrl: null,
  },
  {
    id: -5,
    title: 'فری لانسنگ کا آغاز',
    provider: 'شمع اکیڈمی',
    subject: 'کیریئر مہارتیں',
    level: 'ابتدائی',
    priceType: 'free',
    priceLabel: 'مفت',
    durationLabel: '3 ہفتے',
    durationBucket: 'short',
    description: 'آن لائن فری لانس پلیٹ فارمز پر کام شروع کرنے کا طریقہ۔',
    externalUrl: null,
  },
  {
    id: -6,
    title: 'یو آئی/یو ایکس ڈیزائن',
    provider: null,
    subject: 'ڈیزائن',
    level: 'درمیانی',
    priceType: 'paid',
    priceLabel: '6,000 روپے',
    durationLabel: '9 ہفتے',
    durationBucket: 'medium',
    description: 'صارف دوست ایپ اور ویب سائٹ ڈیزائن کی مہارتیں۔',
    externalUrl: null,
  },
];

const fallbackUniversities: University[] = [
  {
    id: -1,
    name: 'قائداعظم یونیورسٹی',
    city: 'اسلام آباد',
    sector: 'public',
    programs: ['کمپیوٹر سائنس', 'طبیعیات', 'بین الاقوامی تعلقات'],
    websiteUrl: null,
    description: null,
    establishedYear: null,
  },
  {
    id: -2,
    name: 'نسٹ',
    city: 'اسلام آباد',
    sector: 'public',
    programs: ['انجینئرنگ', 'کمپیوٹر سائنس', 'بزنس ایڈمنسٹریشن'],
    websiteUrl: null,
    description: null,
    establishedYear: null,
  },
  {
    id: -3,
    name: 'لمز',
    city: 'لاہور',
    sector: 'private',
    programs: ['بزنس ایڈمنسٹریشن', 'کمپیوٹر سائنس', 'معاشیات', 'سوشل سائنسز'],
    websiteUrl: null,
    description: null,
    establishedYear: null,
  },
  {
    id: -4,
    name: 'آغا خان یونیورسٹی',
    city: 'کراچی',
    sector: 'private',
    programs: ['میڈیسن', 'نرسنگ', 'تعلیم'],
    websiteUrl: null,
    description: null,
    establishedYear: null,
  },
  {
    id: -5,
    name: 'پنجاب یونیورسٹی',
    city: 'لاہور',
    sector: 'public',
    programs: ['قانون', 'معاشیات', 'اردو ادب', 'کمپیوٹر سائنس'],
    websiteUrl: null,
    description: null,
    establishedYear: null,
  },
  {
    id: -6,
    name: 'آئی بی اے کراچی',
    city: 'کراچی',
    sector: 'public',
    programs: ['بزنس ایڈمنسٹریشن', 'اکاؤنٹنگ اینڈ فنانس', 'کمپیوٹر سائنس'],
    websiteUrl: null,
    description: null,
    establishedYear: null,
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

export async function getUniversities(): Promise<University[]> {
  try {
    const universities = await fetchFinderContent<ApiUniversity[]>('/api/v1/university-finder');
    return universities.map(mapUniversity);
  } catch {
    return fallbackUniversities;
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

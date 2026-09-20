// Urdu display labels for raw English values imported from the university finder spreadsheet.
// Campus names and program names are left as-is (proper nouns / not safe to auto-translate).

// Urdu name for each university's main name. Keyed on the exact university_name string from the spreadsheet.
export const universityNameLabelsUr: Record<string, string> = {
  'Air University, Islamabad': 'ایئر یونیورسٹی، اسلام آباد',
  'Bahria University Islamabad': 'بحریہ یونیورسٹی، اسلام آباد',
  'COMSATS Institute of Information Technology / COMSATS University Islamabad': 'کامسیٹس یونیورسٹی، اسلام آباد',
  'Capital University of Science and Technology': 'کیپیٹل یونیورسٹی آف سائنس اینڈ ٹیکنالوجی',
  'Fatima Jinnah Women University Rawalpindi': 'فاطمہ جناح ویمن یونیورسٹی، راولپنڈی',
  'Forman Christian College (A Chartered University)': 'فارمن کرسچن کالج (چارٹرڈ یونیورسٹی)',
  'Foundation University Islamabad': 'فاؤنڈیشن یونیورسٹی، اسلام آباد',
  'Government College University, Faisalabad': 'گورنمنٹ کالج یونیورسٹی، فیصل آباد',
  'Government College University, Lahore': 'گورنمنٹ کالج یونیورسٹی، لاہور',
  'HITEC University Taxila': 'ہائیٹیک یونیورسٹی، ٹیکسلا',
  'International Islamic University Islamabad': 'بین الاقوامی اسلامی یونیورسٹی، اسلام آباد',
  'Lahore College for Women University, Lahore': 'لاہور کالج فار ویمن یونیورسٹی، لاہور',
  'Lahore Garrison University': 'لاہور گیریژن یونیورسٹی',
  'Lahore Leads University': 'لاہور لیڈز یونیورسٹی',
  'Lahore School of Economics': 'لاہور سکول آف اکنامکس',
  'Minhaj University Lahore': 'منہاج یونیورسٹی، لاہور',
  'National Textile University, Faisalabad': 'نیشنل ٹیکسٹائل یونیورسٹی، فیصل آباد',
  'National University of Computer and Emerging Sciences, Islamabad': 'نیشنل یونیورسٹی آف کمپیوٹر اینڈ ایمرجنگ سائنسز',
  'National University of Modern Languages': 'نیشنل یونیورسٹی آف ماڈرن لینگویجز',
  'National University of Sciences and Technology, Islamabad': 'نیشنل یونیورسٹی آف سائنسز اینڈ ٹیکنالوجی، اسلام آباد',
  'Quaid-i-Azam University Islamabad': 'قائداعظم یونیورسٹی، اسلام آباد',
  'Riphah International University, Islamabad': 'ریفاہ انٹرنیشنل یونیورسٹی، اسلام آباد',
  'SZABIST University Islamabad Campus': 'شہید ذوالفقار علی بھٹو انسٹیٹیوٹ آف سائنس اینڈ ٹیکنالوجی، اسلام آباد',
  'The Superior University, Lahore': 'سپیریئر یونیورسٹی، لاہور',
  'The University of Faisalabad': 'یونیورسٹی آف فیصل آباد',
  'University of Agriculture, Faisalabad': 'زرعی یونیورسٹی، فیصل آباد',
  'University of Central Punjab, Lahore': 'یونیورسٹی آف سنٹرل پنجاب، لاہور',
  'University of Education, Lahore': 'یونیورسٹی آف ایجوکیشن، لاہور',
  'University of Engineering and Technology, Lahore': 'یونیورسٹی آف انجینئرنگ اینڈ ٹیکنالوجی، لاہور',
  'University of Lahore, Lahore': 'یونیورسٹی آف لاہور',
  'University of Management and Technology, Lahore': 'یونیورسٹی آف مینجمنٹ اینڈ ٹیکنالوجی، لاہور',
  'University of Wah': 'یونیورسٹی آف واہ',
  'University of the Punjab, Lahore': 'پنجاب یونیورسٹی، لاہور',
};

// English short form / commonly used abbreviation shown alongside the Urdu name.
// Falls back to the original English name when no widely recognized abbreviation exists.
export const universityShortNameEn: Record<string, string> = {
  'Air University, Islamabad': 'Air University',
  'Bahria University Islamabad': 'Bahria University',
  'COMSATS Institute of Information Technology / COMSATS University Islamabad': 'COMSATS University Islamabad',
  'Capital University of Science and Technology': 'CUST',
  'Fatima Jinnah Women University Rawalpindi': 'FJWU',
  'Forman Christian College (A Chartered University)': 'FCCU',
  'Government College University, Faisalabad': 'GCUF',
  'Government College University, Lahore': 'GCU Lahore',
  'HITEC University Taxila': 'HITEC University',
  'International Islamic University Islamabad': 'IIUI',
  'Lahore College for Women University, Lahore': 'LCWU',
  'National Textile University, Faisalabad': 'NTU Faisalabad',
  'National University of Computer and Emerging Sciences, Islamabad': 'FAST-NUCES',
  'National University of Modern Languages': 'NUML',
  'National University of Sciences and Technology, Islamabad': 'NUST',
  'Quaid-i-Azam University Islamabad': 'QAU',
  'SZABIST University Islamabad Campus': 'SZABIST',
  'University of Agriculture, Faisalabad': 'UAF',
  'University of Central Punjab, Lahore': 'UCP',
  'University of Education, Lahore': 'UE Lahore',
  'University of Engineering and Technology, Lahore': 'UET Lahore',
  'University of Lahore, Lahore': 'UOL',
  'University of Management and Technology, Lahore': 'UMT',
  'University of the Punjab, Lahore': 'Punjab University (PU)',
};

export const fieldGroupLabelsUr: Record<string, string> = {
  'Computer Science & IT': 'کمپیوٹر سائنس اور آئی ٹی',
  'Business & Management': 'بزنس اور مینجمنٹ',
  'Social Sciences': 'سماجی علوم',
  'Arts, Design & Humanities': 'آرٹس، ڈیزائن اور انسانیات',
  'Natural Sciences': 'قدرتی علوم',
  'Engineering / Technology': 'انجینئرنگ / ٹیکنالوجی',
  Engineering: 'انجینئرنگ',
  'Health & Allied Sciences': 'صحت اور متعلقہ علوم',
  'Media & Communication': 'میڈیا اور کمیونیکیشن',
  Other: 'دیگر',
  'Medical & Allied Health': 'طب اور متعلقہ صحت',
  'Agriculture & Food Sciences': 'زراعت اور خوراک کے علوم',
  Education: 'تعلیم',
  Law: 'قانون',
  'Arts, Design & Media': 'آرٹس، ڈیزائن اور میڈیا',
  'Arts & Humanities': 'آرٹس اور انسانیات',
  Architecture: 'آرکیٹیکچر',
  'Health & Pharmacy': 'صحت اور فارمیسی',
  'Public Policy & Administration': 'پبلک پالیسی اور انتظامیہ',
};

export const degreeLevelLabelsUr: Record<string, string> = {
  'BS/Undergraduate': 'بی ایس / انڈرگریجویٹ',
};

export const cityLabelsUr: Record<string, string> = {
  Lahore: 'لاہور',
  Faisalabad: 'فیصل آباد',
  Islamabad: 'اسلام آباد',
  Rawalpindi: 'راولپنڈی',
  'Wah Cantt': 'واہ کینٹ',
  Taxila: 'ٹیکسلا',
  Chiniot: 'چنیوٹ',
  'Chiniot / Faisalabad': 'چنیوٹ / فیصل آباد',
  Hafizabad: 'حافظ آباد',
  'Kala Shah Kaku': 'کالا شاہ کاکو',
  Samundri: 'سموندری',
};

export function labelFor(map: Record<string, string>, value: string): string {
  return map[value] ?? value;
}

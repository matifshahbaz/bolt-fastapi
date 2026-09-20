// Source: Shama-Matric-Career-Research-Data.json (editorial research, checked_on 2026-09-19).
// Field names intentionally mirror the source JSON so this file stays easy to diff against
// future updates to that research file.

export type EvidenceStatus =
  | 'institution_example'
  | 'verified_conditional'
  | 'framework_only'
  | 'catalogue_only'
  | 'provider_example'
  | 'editorial_route';

export type MainBranch = { id: string; label_ur: string };

export type Qualification = { id: string; label_ur: string; level: string; duration_years?: number };

export type Programme = { id: string; label_ur: string; kind: string };

export type EligibilityRule = {
  id: string;
  target_id: string;
  origin_ids: string[];
  scope: string;
  conditions: Record<string, unknown>;
  source_period: string;
  evidence_status: EvidenceStatus;
  note_ur?: string;
  programs_en?: string[];
  excludes_from_this_rule?: string[];
  technology_examples?: Record<string, string[]>;
  source_ids: string[];
};

export type Sector = { id: string; label_ur: string };

export type Career = {
  id: string;
  label_ur: string;
  sector_id: string;
  work_example_ur: string;
  possible_work_environment_ur: string;
  preparation_target_ids: string[];
};

export type SourceEntry = { id: string; title: string; url: string };

type CareerResearchData = {
  main_branches: MainBranch[];
  browse_tree: Record<string, string[]>;
  qualifications: Qualification[];
  programmes: Programme[];
  eligibility_rules: EligibilityRule[];
  sectors: Sector[];
  careers: Career[];
  sources: SourceEntry[];
};

export const careerResearchData: CareerResearchData = {
  main_branches: [
    { id: 'education', label_ur: 'تعلیم جاری رکھنا' },
    { id: 'earning', label_ur: 'کمائی کی طرف جانا' },
  ],
  browse_tree: {
    education: [
      'pre_medical',
      'pre_engineering',
      'ics_physics',
      'ics_statistics',
      'general_science',
      'fa_math',
      'fa_other',
      'icom',
      'home_economics',
      'hssc_dars',
      'a_level',
      'dae',
      'foundation_diploma',
      'lad',
    ],
    earning: ['skill_training', 'employment', 'enterprise'],
  },
  qualifications: [
    { id: 'ssc_science', label_ur: 'میٹرک سائنس', level: 'SSC' },
    { id: 'ssc_arts', label_ur: 'میٹرک آرٹس یا جنرل', level: 'SSC' },
    { id: 'pre_medical', label_ur: 'ایف ایس سی پری میڈیکل', level: 'HSSC', duration_years: 2 },
    { id: 'pre_engineering', label_ur: 'ایف ایس سی پری انجینئرنگ', level: 'HSSC', duration_years: 2 },
    { id: 'ics_physics', label_ur: 'آئی سی ایس فزکس کے ساتھ', level: 'HSSC', duration_years: 2 },
    { id: 'ics_statistics', label_ur: 'آئی سی ایس شماریات کے ساتھ', level: 'HSSC', duration_years: 2 },
    { id: 'general_science', label_ur: 'جنرل سائنس ریاضی کے ساتھ', level: 'HSSC', duration_years: 2 },
    { id: 'fa_math', label_ur: 'ایف اے ریاضی کے ساتھ', level: 'HSSC', duration_years: 2 },
    { id: 'fa_other', label_ur: 'ایف اے آرٹس اور ہیومینیٹیز', level: 'HSSC', duration_years: 2 },
    { id: 'icom', label_ur: 'آئی کام', level: 'HSSC', duration_years: 2 },
    { id: 'home_economics', label_ur: 'ایف اے ہوم اکنامکس', level: 'HSSC', duration_years: 2 },
    { id: 'hssc_dars', label_ur: 'ایچ ایس ایس سی درس نظامی', level: 'HSSC', duration_years: 2 },
    { id: 'a_level', label_ur: 'اے لیول یا دوسری غیر ملکی مساوی سند', level: 'equivalence' },
    { id: 'dae', label_ur: 'ڈپلومہ آف ایسوسی ایٹ انجینئرنگ', level: 'diploma', duration_years: 3 },
    { id: 'foundation_diploma', label_ur: 'ACCA Foundation Diploma', level: 'professional_foundation' },
    { id: 'lad', label_ur: 'لائیوسٹاک اسسٹنٹ ڈپلومہ', level: 'diploma' },
    { id: 'short_skill', label_ur: 'مختصر فنی تربیت', level: 'skill' },
    { id: 'associate_degree', label_ur: 'ایسوسی ایٹ ڈگری', level: 'associate', duration_years: 2 },
    { id: 'bs', label_ur: 'بی ایس', level: 'bachelor' },
  ],
  programmes: [
    { id: 'computing', label_ur: 'کمپیوٹنگ اور سافٹ ویئر', kind: 'degree' },
    { id: 'engineering', label_ur: 'انجینئرنگ', kind: 'degree' },
    { id: 'business', label_ur: 'کاروبار اور انتظام', kind: 'degree' },
    { id: 'accounting_finance', label_ur: 'اکاؤنٹنگ اور فنانس', kind: 'degree' },
    { id: 'social_humanities', label_ur: 'سماجی علوم اور ہیومینیٹیز', kind: 'degree' },
    { id: 'law', label_ur: 'قانون', kind: 'degree' },
    { id: 'mathematics', label_ur: 'ریاضی', kind: 'degree' },
    { id: 'architecture', label_ur: 'آرکیٹیکچر اور انڈسٹریل ڈیزائن', kind: 'degree' },
    { id: 'medicine', label_ur: 'ایم بی بی ایس', kind: 'degree' },
    { id: 'dentistry', label_ur: 'بی ڈی ایس', kind: 'degree' },
    { id: 'nursing', label_ur: 'بی ایس نرسنگ', kind: 'degree' },
    { id: 'pharmacy', label_ur: 'فارم ڈی', kind: 'degree' },
    { id: 'veterinary', label_ur: 'ڈی وی ایم', kind: 'degree' },
    { id: 'nutrition', label_ur: 'غذائیت اور ڈائیٹیٹکس', kind: 'degree' },
    { id: 'food_poultry_environment', label_ur: 'فوڈ سائنس پولٹری اور ماحولیات', kind: 'degree' },
    { id: 'dairy', label_ur: 'ڈیری ٹیکنالوجی', kind: 'degree' },
    { id: 'biosciences_mlt', label_ur: 'حیاتی علوم اور میڈیکل لیب ٹیکنالوجی', kind: 'degree' },
    { id: 'allied_health', label_ur: 'دیگر الائیڈ ہیلتھ پروگرام', kind: 'degree' },
    { id: 'agriculture', label_ur: 'زرعی علوم', kind: 'degree' },
    { id: 'design', label_ur: 'آرٹ اور ڈیزائن', kind: 'degree' },
    { id: 'education_languages', label_ur: 'تعلیم اور زبانیں', kind: 'degree' },
    { id: 'engineering_technology', label_ur: 'انجینئرنگ ٹیکنالوجی', kind: 'degree' },
    { id: 'ca', label_ur: 'چارٹرڈ اکاؤنٹنسی', kind: 'professional' },
    { id: 'cma', label_ur: 'کاسٹ اور مینجمنٹ اکاؤنٹنسی', kind: 'professional' },
    { id: 'acca', label_ur: 'ACCA Qualification', kind: 'professional' },
    { id: 'pilot_training', label_ur: 'کمرشل پائلٹ کی تربیت اور لائسنس', kind: 'licensed_training' },
    { id: 'skill_training', label_ur: 'ہنر اور عملی تربیت', kind: 'skill' },
    { id: 'employment', label_ur: 'ملازمت یا اپرنٹس شپ', kind: 'work' },
    { id: 'enterprise', label_ur: 'خدمات تجارت اور چھوٹا کاروبار', kind: 'work' },
  ],
  eligibility_rules: [
    { id: 'R01', target_id: 'pre_medical', origin_ids: ['ssc_science'], scope: 'UHE 2026–28', conditions: { ssc_min_percent: 50, board_group_approval: true, merit_and_seat_selection: true }, source_period: '2026–28', evidence_status: 'institution_example', source_ids: ['S14'] },
    { id: 'R02', target_id: 'pre_engineering', origin_ids: ['ssc_science'], scope: 'UHE 2026–28', conditions: { ssc_min_percent: 50, board_group_approval: true, merit_and_seat_selection: true }, source_period: '2026–28', evidence_status: 'institution_example', source_ids: ['S14'] },
    { id: 'R03', target_id: 'ics_physics', origin_ids: ['ssc_science'], scope: 'UHE 2026–28', conditions: { ssc_min_percent: 50, board_group_approval: true, merit_and_seat_selection: true }, source_period: '2026–28', evidence_status: 'institution_example', source_ids: ['S14'] },
    { id: 'R04', target_id: 'ics_statistics', origin_ids: ['ssc_science'], scope: 'UHE 2026–28', conditions: { ssc_min_percent: 50, board_group_approval: true, merit_and_seat_selection: true }, source_period: '2026–28', evidence_status: 'institution_example', source_ids: ['S14'] },
    { id: 'R05', target_id: 'fa_other', origin_ids: ['ssc_science', 'ssc_arts'], scope: 'AIOU', conditions: { ssc_pass: true, compulsory_subjects: ['English', 'Pakistan Studies', 'Islamiyat'], duration_years: 2, mode: 'ODL' }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', source_ids: ['S16'] },
    { id: 'R06', target_id: 'icom', origin_ids: ['ssc_science', 'ssc_arts'], scope: 'AIOU', conditions: { ssc_or_equivalent_pass: true, duration_years: 2, mode: 'ODL' }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', source_ids: ['S17'] },
    { id: 'R07', target_id: 'home_economics', origin_ids: ['ssc_science', 'ssc_arts'], scope: 'UHE 2026–28', conditions: { ssc_min_percent: 45, merit_and_seat_selection: true }, source_period: '2026–28', evidence_status: 'institution_example', source_ids: ['S14'] },
    { id: 'R08', target_id: 'hssc_dars', origin_ids: ['ssc_science', 'ssc_arts'], scope: 'AIOU', conditions: { accepted_entry: 'Matric General or AIOU SSC Dars or IBCC equivalent', duration_years: 2 }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', source_ids: ['S18'] },
    { id: 'R09', target_id: 'dae', origin_ids: ['ssc_science'], scope: 'GCT Rawalpindi / TEVTA duration', conditions: { matric_science: true, duration_years: 3, institute_intake_rules: true }, source_period: 'Live page checked September 2026', evidence_status: 'institution_example', source_ids: ['S24', 'S22'] },
    { id: 'R10', target_id: 'foundation_diploma', origin_ids: ['ssc_science', 'ssc_arts'], scope: 'ACCA Pakistan', conditions: { matric_or_olevel_entry: true, completion_exams: 7, foundations_in_professionalism: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', source_ids: ['S20'] },
    { id: 'R11', target_id: 'lad', origin_ids: ['ssc_science'], scope: 'UVAS', conditions: { ssc_min_percent: 45, ssc_subjects: ['Biology', 'Physics', 'Chemistry'], domicile: 'Punjab', recognized_board_equivalence: true }, source_period: '2026', evidence_status: 'verified_conditional', source_ids: ['S11'] },
    { id: 'R12', target_id: 'computing', origin_ids: ['pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math'], scope: 'FAST', conditions: { ssc_min_percent: 60, hssc_min_percent: 50, hssc_mathematics: true, prescribed_admission_test_and_merit: true }, source_period: 'Updated 10 August 2026', evidence_status: 'verified_conditional', programs_en: ['BS Artificial Intelligence', 'BS Computer Science', 'BS Cyber Security', 'BS Data Science', 'BS Software Engineering'], source_ids: ['S05'] },
    { id: 'R13', target_id: 'computing', origin_ids: ['pre_medical'], scope: 'FAST', conditions: { ssc_min_percent: 60, hssc_min_percent: 50, additional_mathematics: 'passed or awaiting result', prescribed_admission_test_and_merit: true }, source_period: 'Updated 10 August 2026', evidence_status: 'verified_conditional', programs_en: ['BS Artificial Intelligence', 'BS Computer Science', 'BS Cyber Security', 'BS Data Science', 'BS Software Engineering'], source_ids: ['S05'] },
    { id: 'R14', target_id: 'computing', origin_ids: ['pre_medical'], scope: 'NUST', conditions: { ssc_min_percent: 60, hssc_min_percent: 60, deficient_math_credits: 6, complete_within_years: 1, admission_test_and_merit: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', note_ur: 'Robotics and AI کے مخصوص الگ پروگرام کا آٹھ ہفتے والا قاعدہ اس rule میں شامل نہیں۔', programs_en: ['BS Computer Science', 'BS Data Science', 'BS Artificial Intelligence', 'BS Bioinformatics'], excludes_from_this_rule: ['NUST Software Engineering', 'NUST BS Robotics and Artificial Intelligence'], source_ids: ['S04'] },
    { id: 'R15', target_id: 'computing', origin_ids: ['pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math'], scope: 'NUST', conditions: { ssc_min_percent: 60, hssc_min_percent: 60, hssc_mathematics: true, admission_test_and_merit: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', programs_en: ['BS Computer Science', 'BS Data Science', 'BS Artificial Intelligence', 'BS Bioinformatics'], excludes_from_this_rule: ['NUST Software Engineering', 'NUST BS Robotics and Artificial Intelligence'], source_ids: ['S04'] },
    { id: 'R16', target_id: 'engineering', origin_ids: ['pre_engineering', 'ics_physics'], scope: 'FAST', conditions: { ssc_min_percent: 60, hssc_min_percent: 60, subjects: ['Mathematics', 'Physics', 'Chemistry OR Computer Science'], prescribed_admission_test_and_merit: true }, source_period: 'Updated 10 August 2026', evidence_status: 'verified_conditional', programs_en: ['Civil Engineering', 'Electrical Engineering', 'Computer Engineering'], source_ids: ['S05'] },
    { id: 'R17', target_id: 'engineering', origin_ids: ['pre_engineering'], scope: 'NUST', conditions: { ssc_min_percent: 60, hssc_min_percent: 60, ssc_science: true, admission_test_and_merit: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', source_ids: ['S04'] },
    { id: 'R18', target_id: 'engineering', origin_ids: ['ics_physics'], scope: 'NUST', conditions: { ssc_min_percent: 60, hssc_min_percent: 60, ssc_science: true, remedial_chemistry: 'first semester', admission_test_and_merit: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', source_ids: ['S04'] },
    { id: 'R19', target_id: 'engineering', origin_ids: ['pre_medical'], scope: 'NUST', conditions: { ssc_min_percent: 60, hssc_min_percent: 60, ssc_science: true, math_bridge_weeks: 8, bridge_timing: 'pass before admission if no additional mathematics', admission_test_and_merit: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', source_ids: ['S04'] },
    { id: 'R20', target_id: 'business', origin_ids: ['pre_medical', 'pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math', 'fa_other', 'icom', 'home_economics', 'hssc_dars'], scope: 'FAST', conditions: { ssc_min_percent: 60, hssc_min_percent: 50, prescribed_admission_test_and_merit: true }, source_period: 'Updated 10 August 2026', evidence_status: 'verified_conditional', programs_en: ['BBA', 'BS Business Analytics', 'BS Financial Technology'], source_ids: ['S05'] },
    { id: 'R21', target_id: 'accounting_finance', origin_ids: ['pre_medical', 'pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math', 'fa_other', 'icom', 'home_economics', 'hssc_dars'], scope: 'FAST', conditions: { ssc_min_percent: 60, hssc_min_percent: 50, prescribed_admission_test_and_merit: true }, source_period: 'Updated 10 August 2026', evidence_status: 'verified_conditional', programs_en: ['BS Accounting and Finance'], source_ids: ['S05'] },
    { id: 'R22', target_id: 'accounting_finance', origin_ids: ['pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math', 'icom'], scope: 'NUST', conditions: { ssc_min_percent: 60, hssc_min_percent: 60, mandatory_subject_one_of: ['Mathematics', 'Accounting and Finance', 'Accountancy'], admission_test_and_merit: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', source_ids: ['S04'] },
    { id: 'R23', target_id: 'social_humanities', origin_ids: ['pre_medical', 'pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math', 'fa_other', 'icom', 'home_economics', 'hssc_dars'], scope: 'NUST', conditions: { ssc_min_percent: 60, hssc_min_percent: 60, admission_test_and_merit: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', programs_en: ['Economics', 'Mass Communication', 'Public Administration', 'Psychology', 'Tourism and Hospitality', 'Liberal Arts and Humanities', 'International Relations'], source_ids: ['S04'] },
    { id: 'R24', target_id: 'law', origin_ids: ['pre_medical', 'pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math', 'fa_other', 'icom', 'home_economics', 'hssc_dars'], scope: 'NUST', conditions: { ssc_min_percent: 60, hssc_min_percent: 60, LAT_min_percent: 50, admission_test_and_merit: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', source_ids: ['S04'] },
    { id: 'R25', target_id: 'mathematics', origin_ids: ['pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math'], scope: 'NUST', conditions: { ssc_min_percent: 60, hssc_min_percent: 60, hssc_mathematics: true, admission_test_and_merit: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', source_ids: ['S04'] },
    { id: 'R26', target_id: 'architecture', origin_ids: ['pre_engineering', 'ics_physics'], scope: 'NUST', conditions: { ssc_min_percent: 60, hssc_min_percent: 60, ssc_and_hssc_subjects: ['Mathematics', 'Physics'], admission_test_and_merit: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', source_ids: ['S04'] },
    { id: 'R27', target_id: 'medicine', origin_ids: ['pre_medical'], scope: 'Punjab public medical admissions', conditions: { hssc_min_percent: 60, MDCAT_min_percent: 55, open_merit_domicile: 'Punjab', merit_weights_percent: { ssc: 10, hssc: 40, mdcat: 50 } }, source_period: '2025–26', evidence_status: 'verified_conditional', note_ur: 'مساوی اسناد، کوٹہ اور دوسرے صوبوں کی شرط الگ؛ 2026–27 کی تصدیق نہیں۔', source_ids: ['S08'] },
    { id: 'R28', target_id: 'dentistry', origin_ids: ['pre_medical'], scope: 'Punjab public dental admissions', conditions: { hssc_min_percent: 60, MDCAT_min_percent: 50, open_merit_domicile: 'Punjab', merit_weights_percent: { ssc: 10, hssc: 40, mdcat: 50 } }, source_period: '2025–26', evidence_status: 'verified_conditional', source_ids: ['S08'] },
    { id: 'R29', target_id: 'nursing', origin_ids: ['pre_medical'], scope: 'AKU Pakistan', conditions: { hssc_min_percent: 50, ssc_subjects: ['Biology', 'Chemistry', 'Physics'], age_min: 14, age_max: 35, age_at: '2027-01-01', degree_years: 4, internship_years: 1, licensure_after_internship: true, selection_process: true }, source_period: '2026–27', evidence_status: 'verified_conditional', source_ids: ['S12'] },
    { id: 'R30', target_id: 'pharmacy', origin_ids: ['pre_medical'], scope: 'UVAS', conditions: { hssc_min_percent: 60, age_max: 25, age_at: 'last application date', merit_and_seat_selection: true }, source_period: '2026', evidence_status: 'verified_conditional', source_ids: ['S10'] },
    { id: 'R31', target_id: 'veterinary', origin_ids: ['pre_medical'], scope: 'UVAS', conditions: { hssc_min_percent: 60, age_max: 25, age_at: 'last application date', merit_and_seat_selection: true }, source_period: '2026', evidence_status: 'verified_conditional', source_ids: ['S10'] },
    { id: 'R32', target_id: 'nutrition', origin_ids: ['pre_medical'], scope: 'UVAS', conditions: { hssc_min_percent: 50, age_max: 25, age_at: 'last application date', merit_and_seat_selection: true }, source_period: '2026', evidence_status: 'verified_conditional', source_ids: ['S10'] },
    { id: 'R33', target_id: 'food_poultry_environment', origin_ids: ['pre_medical', 'pre_engineering'], scope: 'UVAS', conditions: { hssc_min_percent: 50, age_max: 25, age_at: 'last application date', merit_and_seat_selection: true }, source_period: '2026', evidence_status: 'verified_conditional', source_ids: ['S10'] },
    { id: 'R34', target_id: 'dairy', origin_ids: ['pre_medical', 'pre_engineering', 'dae'], scope: 'UVAS', conditions: { hssc_or_dae_min_percent: 50, if_dae_technology_in: ['Food Technology', 'Chemical Technology'], age_max: 25, age_at: 'last application date', merit_and_seat_selection: true }, source_period: '2026', evidence_status: 'verified_conditional', source_ids: ['S10'] },
    { id: 'R35', target_id: 'biosciences_mlt', origin_ids: ['pre_medical'], scope: 'UVAS', conditions: { hssc_min_percent: 45, age_max: 25, age_at: 'last application date', merit_and_seat_selection: true }, source_period: '2026', evidence_status: 'verified_conditional', programs_en: ['Biochemistry', 'Biotechnology', 'Applied Microbiology', 'Medical Laboratory Technology', 'Biology', 'Zoology'], source_ids: ['S10'] },
    { id: 'R36', target_id: 'agriculture', origin_ids: ['pre_medical'], scope: 'NUST', conditions: { ssc_min_percent: 60, hssc_min_percent: 60, ssc_science: true, admission_test_and_merit: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', source_ids: ['S04'] },
    { id: 'R37', target_id: 'design', origin_ids: ['pre_medical', 'pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math', 'fa_other', 'icom', 'home_economics', 'hssc_dars'], scope: 'NCA', conditions: { hssc_min_percent: 45, aptitude_and_interview: true, drawing_test: 'Fine Arts and Design', department_specific_test: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', note_ur: 'Architecture میں الگ mathematics test ہے؛ اس rule کا target عام art/design ہے۔', source_ids: ['S13'] },
    { id: 'R38', target_id: 'ca', origin_ids: ['pre_medical', 'pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math', 'fa_other', 'icom', 'home_economics', 'hssc_dars'], scope: 'ICAP', conditions: { direct_PRC_hssc_min_percent: 60, QAT_band_percent: { min_inclusive: 50, max_exclusive: 60 }, practical_training_required: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', source_ids: ['S19'] },
    { id: 'R39', target_id: 'cma', origin_ids: ['pre_medical', 'pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math', 'fa_other', 'icom', 'home_economics', 'hssc_dars'], scope: 'ICMA', conditions: { education_years: 12, HSSC_or_A_Level_pass: true, professional_scheme_requirements: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', source_ids: ['S21'] },
    { id: 'R40', target_id: 'acca', origin_ids: ['foundation_diploma'], scope: 'ACCA Pakistan', conditions: { foundation_exams_passed: 7, professionalism_module_complete: true, first_three_exemptions: true, further_qualification_requirements: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', source_ids: ['S20'] },
    { id: 'R41', target_id: 'pilot_training', origin_ids: ['pre_medical', 'pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math', 'fa_other', 'icom', 'home_economics', 'hssc_dars'], scope: 'Karachi Aero Club', conditions: { age_min: 18, qualification: 'Intermediate or equivalent', English_proficiency: true, medical: 'CAA Class 1', integrated_flying_training_hours: 180, theory_and_skill_tests: true }, source_period: '2026', evidence_status: 'provider_example', note_ur: 'کورس مکمل کرنا airline recruitment کی ضمانت نہیں۔', source_ids: ['S25'] },
    { id: 'R42', target_id: 'engineering', origin_ids: ['dae'], scope: 'NUST', conditions: { ssc_min_percent: 60, dae_min_percent: 60, open_merit: true, match_relevant_technology: true }, source_period: 'Live page checked September 2026', evidence_status: 'verified_conditional', technology_examples: { 'Civil Technology': ['Civil', 'Geoinformatics', 'Environmental'], 'Mechanical Technology': ['Mechanical', 'Mechatronics', 'Environmental', 'Aerospace', 'Metallurgy and Materials'], 'Electrical Technology': ['Electrical', 'Mechatronics', 'Computer', 'Software', 'Environmental', 'Information Security'], 'Chemical Technology': ['Chemical', 'Environmental'] }, source_ids: ['S06'] },
    { id: 'R43', target_id: 'bs', origin_ids: ['associate_degree'], scope: 'HEC policy; receiving university', conditions: { entry_semester: 5, same_discipline: 'no deficiency course under policy', different_discipline: 'bridging semester as determined by university', minimum_cgpa: 2.0, cgpa_scale: 4, university_can_raise_requirement: true, programme_applicability_check: true }, source_period: 'Effective Fall 2023', evidence_status: 'verified_conditional', source_ids: ['S07'] },
    { id: 'R44', target_id: 'associate_degree', origin_ids: ['pre_medical', 'pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math', 'fa_other', 'icom', 'home_economics', 'hssc_dars'], scope: 'HEC programme framework', conditions: { years: 2, semesters: 4, credits_min: 60, credits_max: 72, specific_programme_admission_rules_required: true }, source_period: 'Effective Fall 2023', evidence_status: 'framework_only', source_ids: ['S07'] },
    { id: 'R45', target_id: 'skill_training', origin_ids: ['ssc_science', 'ssc_arts', 'pre_medical', 'pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math', 'fa_other', 'icom', 'home_economics', 'hssc_dars'], scope: 'Provider and batch dependent', conditions: { specific_course_entry_check: true, age_check: true, training_and_assessment: true }, source_period: 'Live page checked September 2026', evidence_status: 'catalogue_only', source_ids: ['S22', 'S23'] },
    { id: 'R46', target_id: 'employment', origin_ids: ['ssc_science', 'ssc_arts', 'dae', 'lad', 'short_skill', 'pre_medical', 'pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math', 'fa_other', 'icom', 'home_economics', 'hssc_dars'], scope: 'Employer dependent', conditions: { specific_advertisement_eligibility: true, age_and_work_conditions_check: true }, source_period: 'Live page checked September 2026', evidence_status: 'editorial_route', source_ids: ['S22'] },
    { id: 'R47', target_id: 'enterprise', origin_ids: ['ssc_science', 'ssc_arts', 'dae', 'lad', 'short_skill', 'pre_medical', 'pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math', 'fa_other', 'icom', 'home_economics', 'hssc_dars'], scope: 'Business dependent', conditions: { skill_customers_costs_and_sector_rules: true }, source_period: 'Live page checked September 2026', evidence_status: 'editorial_route', source_ids: [] },
    { id: 'R48', target_id: 'education_languages', origin_ids: ['pre_medical', 'pre_engineering', 'ics_physics', 'ics_statistics', 'general_science', 'fa_math', 'fa_other', 'icom', 'home_economics', 'hssc_dars'], scope: 'Selected programmes, institution-specific', conditions: { subject_eligibility_not_verified: true }, source_period: '2025', evidence_status: 'catalogue_only', source_ids: ['S29'] },
    { id: 'R49', target_id: 'allied_health', origin_ids: ['pre_medical'], scope: 'UHS catalogue', conditions: { individual_programme_eligibility_not_verified: true }, source_period: 'Live page checked September 2026', evidence_status: 'catalogue_only', source_ids: ['S09'] },
    { id: 'R50', target_id: 'engineering_technology', origin_ids: ['pre_engineering', 'dae'], scope: 'Programme-specific', conditions: { individual_programme_eligibility_not_verified: true, NTC_programme_status_check: true }, source_period: 'Live page checked September 2026', evidence_status: 'catalogue_only', source_ids: ['S22', 'S30'] },
  ],
  sectors: [
    { id: 'digital', label_ur: 'کمپیوٹنگ اور ڈیجیٹل نظام' },
    { id: 'engineering', label_ur: 'انجینئرنگ اور توانائی' },
    { id: 'health', label_ur: 'انسانی صحت' },
    { id: 'rehabilitation', label_ur: 'بحالی اور طبی ٹیکنالوجی' },
    { id: 'agriculture', label_ur: 'زراعت خوراک اور ماحول' },
    { id: 'finance', label_ur: 'مالیات اور اکاؤنٹنسی' },
    { id: 'business', label_ur: 'تجارت اور اداروں کا انتظام' },
    { id: 'creative', label_ur: 'ڈیزائن اور تخلیقی کام' },
    { id: 'social', label_ur: 'تعلیم زبان اور سماجی علوم' },
    { id: 'trades', label_ur: 'صنعتی اور تعمیراتی ہنر' },
    { id: 'hospitality', label_ur: 'خوراک مہمان نوازی اور سیاحت' },
    { id: 'specialised', label_ur: 'قانون ہوا بازی اور دیگر راستے' },
  ],
  careers: [
    { id: 'C01', label_ur: 'سافٹ ویئر ڈویلپر', sector_id: 'digital', work_example_ur: 'ایپ اور سافٹ ویئر کے مسائل حل کرنا', possible_work_environment_ur: 'کمپیوٹر اور ٹیم کے ساتھ مسلسل کام', preparation_target_ids: ['computing'] },
    { id: 'C02', label_ur: 'ڈیٹا اینالسٹ', sector_id: 'digital', work_example_ur: 'اعداد سے کاروباری سوال سمجھنا', possible_work_environment_ur: 'تجزیہ اور رپورٹنگ', preparation_target_ids: ['computing', 'mathematics', 'business'] },
    { id: 'C03', label_ur: 'مصنوعی ذہانت کا ماہر', sector_id: 'digital', work_example_ur: 'ڈیٹا سے سیکھنے والے نظام بنانا', possible_work_environment_ur: 'ریاضی، پروگرامنگ اور تجربات', preparation_target_ids: ['computing'] },
    { id: 'C04', label_ur: 'سائبر سکیورٹی ماہر', sector_id: 'digital', work_example_ur: 'نظام اور معلومات کے تحفظ پر کام', possible_work_environment_ur: 'تحقیق، نگرانی؛ بعض کام میں شفٹ', preparation_target_ids: ['computing'] },
    { id: 'C05', label_ur: 'بایوانفارمیٹکس ماہر', sector_id: 'digital', work_example_ur: 'حیاتیاتی معلومات کا کمپیوٹر سے تجزیہ', possible_work_environment_ur: 'حیاتیات اور کمپیوٹنگ کا امتزاج', preparation_target_ids: ['computing', 'biosciences_mlt'] },
    { id: 'C06', label_ur: 'سول انجینئر', sector_id: 'engineering', work_example_ur: 'عمارت اور بنیادی ڈھانچے کے منصوبے', possible_work_environment_ur: 'دفتر اور تعمیراتی سائٹ', preparation_target_ids: ['engineering'] },
    { id: 'C07', label_ur: 'الیکٹریکل انجینئر', sector_id: 'engineering', work_example_ur: 'بجلی اور کنٹرول نظام پر کام', possible_work_environment_ur: 'ڈیزائن، پلانٹ یا فیلڈ', preparation_target_ids: ['engineering'] },
    { id: 'C08', label_ur: 'مکینیکل انجینئر', sector_id: 'engineering', work_example_ur: 'مشین اور پیداواری نظام بہتر کرنا', possible_work_environment_ur: 'ڈیزائن اور ورکشاپ', preparation_target_ids: ['engineering'] },
    { id: 'C09', label_ur: 'میکاٹرونکس ماہر', sector_id: 'engineering', work_example_ur: 'مشین، الیکٹرانکس اور کنٹرول ملانا', possible_work_environment_ur: 'لیب اور صنعتی ماحول', preparation_target_ids: ['engineering', 'engineering_technology'] },
    { id: 'C10', label_ur: 'انجینئرنگ ٹیکنالوجسٹ', sector_id: 'engineering', work_example_ur: 'صنعتی ٹیکنالوجی کا اطلاق اور عمل چلانا', possible_work_environment_ur: 'تنصیب، پیداوار اور دیکھ بھال', preparation_target_ids: ['engineering_technology'] },
    { id: 'C11', label_ur: 'ڈاکٹر', sector_id: 'health', work_example_ur: 'مریض کی تشخیص اور علاج', possible_work_environment_ur: 'کلینک یا ہسپتال؛ ذمہ داری اور ڈیوٹی', preparation_target_ids: ['medicine'] },
    { id: 'C12', label_ur: 'ڈینٹسٹ', sector_id: 'health', work_example_ur: 'دانت اور منہ کی صحت کا علاج', possible_work_environment_ur: 'کلینک اور عملی مہارت', preparation_target_ids: ['dentistry'] },
    { id: 'C13', label_ur: 'نرس', sector_id: 'health', work_example_ur: 'مریض کی نگہداشت اور طبی ٹیم سے رابطہ', possible_work_environment_ur: 'ہسپتال، کمیونٹی یا شفٹ', preparation_target_ids: ['nursing'] },
    { id: 'C14', label_ur: 'فارماسسٹ', sector_id: 'health', work_example_ur: 'ادویات کے محفوظ استعمال اور معیار پر کام', possible_work_environment_ur: 'ہسپتال، فارمیسی یا صنعت', preparation_target_ids: ['pharmacy'] },
    { id: 'C15', label_ur: 'میڈیکل لیب ٹیکنالوجسٹ', sector_id: 'health', work_example_ur: 'طبی نمونوں کی جانچ میں کام', possible_work_environment_ur: 'لیبارٹری اور درستگی', preparation_target_ids: ['biosciences_mlt'] },
    { id: 'C16', label_ur: 'فزیوتھراپسٹ', sector_id: 'rehabilitation', work_example_ur: 'حرکت اور جسمانی بحالی میں مدد', possible_work_environment_ur: 'مریضوں کے ساتھ عملی کام', preparation_target_ids: ['allied_health'] },
    { id: 'C17', label_ur: 'میڈیکل امیجنگ ٹیکنالوجسٹ', sector_id: 'rehabilitation', work_example_ur: 'تشخیصی تصویروں کے عمل میں کام', possible_work_environment_ur: 'ہسپتال اور مخصوص مشینیں', preparation_target_ids: ['allied_health'] },
    { id: 'C18', label_ur: 'آڈیالوجی ماہر', sector_id: 'rehabilitation', work_example_ur: 'سماعت کی جانچ اور مدد', possible_work_environment_ur: 'کلینک اور آلات', preparation_target_ids: ['allied_health'] },
    { id: 'C19', label_ur: 'اسپیچ اینڈ لینگویج تھراپسٹ', sector_id: 'rehabilitation', work_example_ur: 'بولنے اور رابطے کی مشکلات میں مدد', possible_work_environment_ur: 'انفرادی مریض یا بچے', preparation_target_ids: ['allied_health'] },
    { id: 'C20', label_ur: 'پروسٹھیٹکس اور آرتھوٹس ماہر', sector_id: 'rehabilitation', work_example_ur: 'مصنوعی اعضا اور مددگار آلات پر کام', possible_work_environment_ur: 'ڈیزائن، ورکشاپ اور مریض', preparation_target_ids: ['allied_health'] },
    { id: 'C21', label_ur: 'زرعی تحقیق کا ماہر', sector_id: 'agriculture', work_example_ur: 'فصل یا زرعی طریقہ بہتر کرنے کے تجربات', possible_work_environment_ur: 'کھیت، لیب اور موسم', preparation_target_ids: ['agriculture'] },
    { id: 'C22', label_ur: 'ویٹرنری ڈاکٹر', sector_id: 'agriculture', work_example_ur: 'جانوروں کی صحت اور علاج', possible_work_environment_ur: 'کلینک یا فارم', preparation_target_ids: ['veterinary'] },
    { id: 'C23', label_ur: 'فوڈ ٹیکنالوجسٹ', sector_id: 'agriculture', work_example_ur: 'خوراک کی تیاری اور معیار بہتر کرنا', possible_work_environment_ur: 'فیکٹری اور لیبارٹری', preparation_target_ids: ['food_poultry_environment'] },
    { id: 'C24', label_ur: 'ڈیری ٹیکنالوجسٹ', sector_id: 'agriculture', work_example_ur: 'دودھ کی پروسیسنگ اور معیار پر کام', possible_work_environment_ur: 'پلانٹ اور معیار کی جانچ', preparation_target_ids: ['dairy'] },
    { id: 'C25', label_ur: 'ماحولیاتی سائنس کا ماہر', sector_id: 'agriculture', work_example_ur: 'آلودگی اور ماحول کے مسائل جانچنا', possible_work_environment_ur: 'فیلڈ، نمونے اور رپورٹ', preparation_target_ids: ['food_poultry_environment'] },
    { id: 'C26', label_ur: 'چارٹرڈ اکاؤنٹنٹ', sector_id: 'finance', work_example_ur: 'حساب، آڈٹ اور مالی رپورٹنگ', possible_work_environment_ur: 'اعداد، قوانین اور مقررہ آخری تاریخیں', preparation_target_ids: ['ca'] },
    { id: 'C27', label_ur: 'مینجمنٹ اکاؤنٹنٹ', sector_id: 'finance', work_example_ur: 'لاگت اور کاروباری فیصلوں کا تجزیہ', possible_work_environment_ur: 'ادارے کے اندر مالی تجزیہ', preparation_target_ids: ['cma'] },
    { id: 'C28', label_ur: 'اکاؤنٹنگ اور فنانس افسر', sector_id: 'finance', work_example_ur: 'ادارے کے مالی ریکارڈ پر کام', possible_work_environment_ur: 'دفتر اور درست ریکارڈ', preparation_target_ids: ['accounting_finance', 'acca'] },
    { id: 'C29', label_ur: 'فن ٹیک میں کام', sector_id: 'finance', work_example_ur: 'مالی خدمت میں ڈیجیٹل نظام استعمال کرنا', possible_work_environment_ur: 'مالیات اور ٹیکنالوجی کی مشترک ٹیم', preparation_target_ids: ['business', 'computing'] },
    { id: 'C30', label_ur: 'بزنس اینالسٹ', sector_id: 'finance', work_example_ur: 'کاروباری مسئلے اور عمل کا تجزیہ', possible_work_environment_ur: 'ڈیٹا، گفتگو اور رپورٹ', preparation_target_ids: ['business', 'computing'] },
    { id: 'C31', label_ur: 'سپلائی چین میں کام', sector_id: 'business', work_example_ur: 'خرید، اسٹاک اور ترسیل کا انتظام', possible_work_environment_ur: 'دفتر، گودام اور سپلائر', preparation_target_ids: ['business', 'skill_training'] },
    { id: 'C32', label_ur: 'امپورٹ ایکسپورٹ میں کام', sector_id: 'business', work_example_ur: 'خریدار، دستاویز اور شپمنٹ کا رابطہ', possible_work_environment_ur: 'مختلف منڈیوں اور ضابطوں سے واسطہ', preparation_target_ids: ['business', 'enterprise'] },
    { id: 'C33', label_ur: 'پراجیکٹ کوآرڈینیٹر', sector_id: 'business', work_example_ur: 'کام، وقت اور ٹیم کا رابطہ', possible_work_environment_ur: 'مختلف شعبوں کے ساتھ کام', preparation_target_ids: ['business', 'engineering', 'computing'] },
    { id: 'C34', label_ur: 'سیلز اور مارکیٹنگ میں کام', sector_id: 'business', work_example_ur: 'گاہک کی ضرورت اور فروخت سمجھنا', possible_work_environment_ur: 'لوگوں سے رابطہ؛ کبھی فیلڈ', preparation_target_ids: ['business', 'employment'] },
    { id: 'C35', label_ur: 'چھوٹا کاروبار یا خدمات', sector_id: 'business', work_example_ur: 'گاہک کے لیے چیز یا خدمت فراہم کرنا', possible_work_environment_ur: 'آمدن میں اتار چڑھاؤ اور کاروباری حساب', preparation_target_ids: ['enterprise'] },
    { id: 'C36', label_ur: 'گرافک ڈیزائنر', sector_id: 'creative', work_example_ur: 'بصری ابلاغ کی چیزیں تیار کرنا', possible_work_environment_ur: 'کمپیوٹر، نظر ثانی اور کلائنٹ', preparation_target_ids: ['design', 'skill_training'] },
    { id: 'C37', label_ur: 'ٹیکسٹائل ڈیزائنر', sector_id: 'creative', work_example_ur: 'کپڑے کے پیٹرن اور ڈیزائن بنانا', possible_work_environment_ur: 'اسٹوڈیو اور پیداوار', preparation_target_ids: ['design'] },
    { id: 'C38', label_ur: 'انٹیریئر ڈیزائنر', sector_id: 'creative', work_example_ur: 'اندرونی جگہ کے استعمال اور شکل پر کام', possible_work_environment_ur: 'سائٹ، ڈرائنگ اور کلائنٹ', preparation_target_ids: ['design'] },
    { id: 'C39', label_ur: 'اینیمیشن اور تھری ڈی میں کام', sector_id: 'creative', work_example_ur: 'متحرک یا تین جہتی بصری مواد بنانا', possible_work_environment_ur: 'طویل کمپیوٹر کام اور پورٹ فولیو', preparation_target_ids: ['design', 'skill_training'] },
    { id: 'C40', label_ur: 'فلم اور ویڈیو پروڈکشن میں کام', sector_id: 'creative', work_example_ur: 'کہانی، ریکارڈنگ یا تدوین پر کام', possible_work_environment_ur: 'اسٹوڈیو، فیلڈ اور ٹیم', preparation_target_ids: ['design', 'social_humanities'] },
    { id: 'C41', label_ur: 'استاد یا مضمون کا مدرس', sector_id: 'social', work_example_ur: 'طالب علم کو مضمون سکھانا', possible_work_environment_ur: 'کلاس اور تیاری', preparation_target_ids: ['education_languages'] },
    { id: 'C42', label_ur: 'ابتدائی بچپن کی تعلیم میں کام', sector_id: 'social', work_example_ur: 'چھوٹے بچوں کے سیکھنے میں مدد', possible_work_environment_ur: 'صبر، نگرانی اور کلاس', preparation_target_ids: ['education_languages'] },
    { id: 'C43', label_ur: 'خصوصی تعلیم میں کام', sector_id: 'social', work_example_ur: 'مختلف تعلیمی ضروریات والے طلبہ کی مدد', possible_work_environment_ur: 'تخصص اور انفرادی توجہ', preparation_target_ids: ['education_languages'] },
    { id: 'C44', label_ur: 'زبان اور ترجمے میں کام', sector_id: 'social', work_example_ur: 'مطلب کو دوسری زبان میں درست منتقل کرنا', possible_work_environment_ur: 'مطالعہ، تحقیق اور زبان', preparation_target_ids: ['education_languages'] },
    { id: 'C45', label_ur: 'سماجی تحقیق اور کمیونٹی میں کام', sector_id: 'social', work_example_ur: 'لوگوں کے مسائل اور معلومات سمجھنا', possible_work_environment_ur: 'فیلڈ، انٹرویو اور تجزیہ', preparation_target_ids: ['social_humanities'] },
    { id: 'C46', label_ur: 'CNC مشین آپریٹر', sector_id: 'trades', work_example_ur: 'کمپیوٹر کنٹرول مشین پر پرزے بنانا', possible_work_environment_ur: 'ورکشاپ اور درست پیمائش', preparation_target_ids: ['skill_training', 'dae'] },
    { id: 'C47', label_ur: 'ویلڈر', sector_id: 'trades', work_example_ur: 'دھات کے حصے جوڑنا', possible_work_environment_ur: 'ورکشاپ، حفاظتی تربیت', preparation_target_ids: ['skill_training'] },
    { id: 'C48', label_ur: 'الیکٹریشن', sector_id: 'trades', work_example_ur: 'برقی تنصیب اور خرابی دور کرنا', possible_work_environment_ur: 'سائٹ، ذمہ داری اور عملی مہارت', preparation_target_ids: ['skill_training', 'dae'] },
    { id: 'C49', label_ur: 'HVAC ٹیکنیشن', sector_id: 'trades', work_example_ur: 'ایئر کنڈیشننگ اور کولنگ نظام سنبھالنا', possible_work_environment_ur: 'گاہک کی جگہ یا صنعتی سائٹ', preparation_target_ids: ['skill_training', 'dae'] },
    { id: 'C50', label_ur: 'سروے اور GIS میں کام', sector_id: 'trades', work_example_ur: 'زمین کی پیمائش اور نقشہ جاتی ڈیٹا', possible_work_environment_ur: 'فیلڈ اور کمپیوٹر', preparation_target_ids: ['skill_training', 'engineering'] },
    { id: 'C51', label_ur: 'شیف', sector_id: 'hospitality', work_example_ur: 'کھانا تیار کرنا اور کچن چلانا', possible_work_environment_ur: 'تیز کام اور کھڑے رہنا', preparation_target_ids: ['skill_training'] },
    { id: 'C52', label_ur: 'بیکر', sector_id: 'hospitality', work_example_ur: 'بیکری مصنوعات تیار کرنا', possible_work_environment_ur: 'پیداوار اور وقت کی پابندی', preparation_target_ids: ['skill_training', 'enterprise'] },
    { id: 'C53', label_ur: 'ہوٹل آپریشنز میں کام', sector_id: 'hospitality', work_example_ur: 'مہمان اور روزمرہ انتظام سنبھالنا', possible_work_environment_ur: 'لوگوں سے رابطہ اور شفٹ', preparation_target_ids: ['business', 'social_humanities'] },
    { id: 'C54', label_ur: 'سیاحت میں خدمات', sector_id: 'hospitality', work_example_ur: 'سفر یا سیاحتی خدمت کا انتظام', possible_work_environment_ur: 'زبان، مقامی معلومات اور موسم', preparation_target_ids: ['social_humanities', 'enterprise'] },
    { id: 'C55', label_ur: 'کیٹرنگ کا کاروبار', sector_id: 'hospitality', work_example_ur: 'تقریب کے لیے کھانا اور سروس دینا', possible_work_environment_ur: 'منصوبہ بندی، خرید اور ٹیم', preparation_target_ids: ['skill_training', 'enterprise'] },
    { id: 'C56', label_ur: 'وکیل', sector_id: 'specialised', work_example_ur: 'قانونی معاملات کی تحقیق اور نمائندگی', possible_work_environment_ur: 'مطالعہ، عدالت اور کلائنٹ', preparation_target_ids: ['law'] },
    { id: 'C57', label_ur: 'کمرشل پائلٹ', sector_id: 'specialised', work_example_ur: 'تربیت یافتہ اور لائسنس یافتہ پرواز', possible_work_environment_ur: 'طبی اہلیت، طریقہ کار اور ذمہ داری', preparation_target_ids: ['pilot_training'] },
    { id: 'C58', label_ur: 'لائیوسٹاک اسسٹنٹ', sector_id: 'specialised', work_example_ur: 'فارم اور حیوانی صحت کی خدمات میں معاونت', possible_work_environment_ur: 'فیلڈ اور جانوروں کے ساتھ کام', preparation_target_ids: ['lad'] },
    { id: 'C59', label_ur: 'آٹو مکینک', sector_id: 'specialised', work_example_ur: 'گاڑی کی خرابی اور دیکھ بھال', possible_work_environment_ur: 'ورکشاپ اور تشخیص', preparation_target_ids: ['skill_training', 'dae'] },
    { id: 'C60', label_ur: 'نیوٹریشن اور ڈائیٹیٹکس میں کام', sector_id: 'specialised', work_example_ur: 'غذائیت کی جانچ اور مناسب رہنمائی', possible_work_environment_ur: 'متعلقہ تخصص، صحت یا کمیونٹی', preparation_target_ids: ['nutrition'] },
  ],
  sources: [
    { id: 'S01', title: 'PBS Labour Force Survey 2024–25 Table 16', url: 'https://www.pbs.gov.pk/wp-content/uploads/2020/07/Report-16.pdf' },
    { id: 'S02', title: 'Skilling Pakistan Employer Skill Survey demand', url: 'https://skillingpakistan.gov.pk/demand/stats' },
    { id: 'S03', title: 'WEF Future of Jobs Report 2025 Digest', url: 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/digest/' },
    { id: 'S04', title: 'NUST undergraduate eligibility', url: 'https://nust.edu.pk/admissions/undergraduates/eligibility-criteria-for-ug-programmes/' },
    { id: 'S05', title: 'FAST undergraduate eligibility', url: 'https://nu.edu.pk/Admissions/EligibilityCriteria' },
    { id: 'S06', title: 'NUST DAE eligibility matrix', url: 'https://nust.edu.pk/admissions/undergraduates/dae-eligibility-criteria/' },
    { id: 'S07', title: 'HEC Undergraduate Education Policy V1.1', url: 'https://www.hec.gov.pk/english/services/students/UEP/Documents/UGE-Policy.pdf' },
    { id: 'S08', title: 'UHS public medical and dental admissions prospectus', url: 'https://www.uhs.edu.pk/downloads/Prospectus25-26.pdf' },
    { id: 'S09', title: 'UHS undergraduate programmes', url: 'https://www.uhs.edu.pk/undergraduateprograms.php' },
    { id: 'S10', title: 'UVAS undergraduate eligibility 2026', url: 'https://uvas.edu.pk/Admissions/undergraduate/eligibility/index.htm' },
    { id: 'S11', title: 'UVAS Livestock Assistant Diploma admissions', url: 'https://uvas.edu.pk/Admissions/diplomaCourses/index.htm' },
    { id: 'S12', title: 'AKU BScN admissions', url: 'https://www.aku.edu/admissions/bscn/Pages/home.aspx' },
    { id: 'S13', title: 'National College of Arts admission policy', url: 'https://www.nca.edu.pk/college?name=admission-policy-procedures' },
    { id: 'S14', title: 'UHE intermediate prospectus', url: 'https://www.uhe.edu.pk/wp-content/uploads/2026/06/PROSPECTUS-INTERMEDIATE-HOME-ECONOMICS-2026-2028.pdf' },
    { id: 'S15', title: 'GCU intermediate subject combinations', url: 'https://gcu.edu.pk/admissions.php?pg=FAFSC' },
    { id: 'S16', title: 'AIOU HSSC General Group', url: 'https://www.aiou.edu.pk/higher-secondary-school-certificate-general-group' },
    { id: 'S17', title: 'AIOU HSSC Commerce ICom', url: 'https://www.aiou.edu.pk/higher-secondary-school-certificate-commerce-icom' },
    { id: 'S18', title: 'AIOU HSSC Dars e Nizami', url: 'https://www.aiou.edu.pk/higher-secondary-school-certificate-dars-e-nazami-group' },
    { id: 'S19', title: 'ICAP CA full time entry route', url: 'https://icap.org.pk/learn-about-ca/entry-routes/full-time-scheme/' },
    { id: 'S20', title: 'ACCA Foundation Diploma', url: 'https://www.accaglobal.com/pk/en/qualifications/glance/foundation-diploma/introduction.html' },
    { id: 'S21', title: 'ICMA entry eligibility', url: 'https://www.icmainternational.com/eligibility.aspx' },
    { id: 'S22', title: 'TEVTA technical and vocational education', url: 'https://tevta.gop.pk/' },
    { id: 'S23', title: 'NAVTTC conventional course catalogue', url: 'https://navttc.gov.pk/conventional-courses/' },
    { id: 'S24', title: 'GCT Rawalpindi DAE entry guidance', url: 'https://gctrwp.edu.pk/' },
    { id: 'S25', title: 'Karachi Aero Club integrated CPL and IR course', url: 'https://www.karachiaeroclub.com/integrated-commercial-pilot-license-course-batch-instruction.php' },
    { id: 'S26', title: 'NUST need based financial aid', url: 'https://nust.edu.pk/admissions/scholarships/need-based-financial-aid/' },
    { id: 'S27', title: 'AKU financial assistance Pakistan', url: 'https://www.aku.edu/admissions/fees-and-funding/Pages/financial-assistance-pk.aspx' },
    { id: 'S28', title: 'HEC scholarships directory', url: 'https://www.hec.gov.pk/english/scholarshipsgrants/Pages/default.aspx' },
    { id: 'S29', title: 'UHE undergraduate prospectus', url: 'https://www.uhe.edu.pk/wp-content/uploads/2025/07/UHE-BS-and-MPhil-MS-Prospectus-2025_compressed.pdf' },
    { id: 'S30', title: 'National Technology Council FAQ', url: 'https://ntc-hec.org.pk/faq.php' },
  ],
};

export const mainBranches = careerResearchData.main_branches;
export const browseTree = careerResearchData.browse_tree;
export const qualifications = careerResearchData.qualifications;
export const programmes = careerResearchData.programmes;
export const eligibilityRules = careerResearchData.eligibility_rules;
export const sectors = careerResearchData.sectors;
export const careers = careerResearchData.careers;
export const sources = careerResearchData.sources;

function byId<T extends { id: string }>(list: readonly T[]): Record<string, T> {
  const map: Record<string, T> = {};
  for (const item of list) map[item.id] = item;
  return map;
}

export const qualificationsById = byId(qualifications);
export const programmesById = byId(programmes);
export const sectorsById = byId(sectors);
export const careersById = byId(careers);
export const sourcesById = byId(sources);

/** A rule's target_id can be a programme or (for R40/R43/R44) another qualification. */
export function labelForTargetId(id: string): string {
  return programmesById[id]?.label_ur ?? qualificationsById[id]?.label_ur ?? id;
}

export function labelForOriginId(id: string): string {
  return qualificationsById[id]?.label_ur ?? id;
}

export const evidenceStatusMeta: Record<EvidenceStatus, { label: string; tone: 'strong' | 'medium' | 'weak' }> = {
  institution_example: { label: 'ادارے کی مثال', tone: 'medium' },
  verified_conditional: { label: 'تصدیق شدہ — شرائط کے ساتھ', tone: 'strong' },
  framework_only: { label: 'صرف پالیسی فریم ورک', tone: 'weak' },
  catalogue_only: { label: 'صرف کیٹلاگ میں موجود، تصدیق نہیں', tone: 'weak' },
  provider_example: { label: 'فراہم کنندہ کی مثال', tone: 'medium' },
  editorial_route: { label: 'ادارتی رہنمائی', tone: 'weak' },
};

export const admissionDisclaimer =
  'یہ حتمی داخلے کی ضمانت نہیں اور مکمل چیک لسٹ نہیں — درخواست کے وقت ادارے کی موجودہ اور مکمل شرائط ضرور دیکھیں۔';

const conditionKeyLabels: Record<string, string> = {
  ssc_min_percent: 'میٹرک میں کم از کم نمبر',
  hssc_min_percent: 'انٹرمیڈیٹ میں کم از کم نمبر',
  board_group_approval: 'بورڈ/گروپ کی منظوری درکار',
  merit_and_seat_selection: 'میرٹ اور نشستوں کی بنیاد پر انتخاب',
  ssc_pass: 'میٹرک پاس ہونا لازم',
  compulsory_subjects: 'لازمی مضامین',
  duration_years: 'دورانیہ (سال)',
  mode: 'تدریس کا طریقہ',
  ssc_or_equivalent_pass: 'میٹرک یا مساوی سند پاس',
  accepted_entry: 'قابلِ قبول انٹری',
  matric_science: 'میٹرک سائنس درکار',
  institute_intake_rules: 'ادارے کے داخلہ قواعد لاگو',
  matric_or_olevel_entry: 'میٹرک یا O Level پر داخلہ',
  completion_exams: 'مکمل کرنے کے امتحانات',
  foundations_in_professionalism: 'Foundations in Professionalism ماڈیول',
  ssc_subjects: 'میٹرک کے مضامین',
  domicile: 'ڈومیسائل',
  recognized_board_equivalence: 'تسلیم شدہ بورڈ مساوات درکار',
  hssc_mathematics: 'انٹرمیڈیٹ میں ریاضی درکار',
  prescribed_admission_test_and_merit: 'مقررہ داخلہ ٹیسٹ اور میرٹ',
  additional_mathematics: 'اضافی ریاضی',
  deficient_math_credits: 'ریاضی کے اضافی کریڈٹ آورز',
  complete_within_years: 'مقررہ سالوں میں مکمل کرنا',
  admission_test_and_merit: 'داخلہ ٹیسٹ اور میرٹ',
  subjects: 'مطلوبہ مضامین',
  specific_hssc_subjects: 'مخصوص انٹرمیڈیٹ مضامین',
  mandatory_subject_one_of: 'ان میں سے کوئی ایک لازمی مضمون',
  LAT_min_percent: 'LAT ٹیسٹ میں کم از کم نمبر',
  ssc_and_hssc_subjects: 'میٹرک اور انٹرمیڈیٹ کے مضامین',
  MDCAT_min_percent: 'MDCAT میں کم از کم نمبر',
  open_merit_domicile: 'اوپن میرٹ ڈومیسائل',
  merit_weights_percent: 'میرٹ کا وزن',
  age_min: 'کم از کم عمر',
  age_max: 'زیادہ سے زیادہ عمر',
  age_at: 'عمر کس تاریخ پر شمار ہوگی',
  degree_years: 'ڈگری کا دورانیہ (سال)',
  internship_years: 'انٹرن شپ کا دورانیہ (سال)',
  licensure_after_internship: 'انٹرن شپ کے بعد لائسنس درکار',
  selection_process: 'انتخاب کا عمل موجود',
  hssc_or_dae_min_percent: 'انٹرمیڈیٹ یا DAE میں کم از کم نمبر',
  if_dae_technology_in: 'DAE ٹیکنالوجی انہی میں سے ہو',
  ssc_science: 'میٹرک سائنس درکار',
  remedial_chemistry: 'ابتدائی سمسٹر میں تدارکی کیمسٹری',
  math_bridge_weeks: 'ریاضی کا بریج کورس (ہفتے)',
  bridge_timing: 'بریج کورس کب مکمل کرنا ہے',
  aptitude_and_interview: 'Aptitude ٹیسٹ اور انٹرویو',
  drawing_test: 'ڈرائنگ ٹیسٹ',
  department_specific_test: 'شعبہ وار مخصوص ٹیسٹ',
  direct_PRC_hssc_min_percent: 'براہِ راست PRC کے لیے انٹرمیڈیٹ میں کم از کم نمبر',
  QAT_band_percent: 'QAT کا نمبروں کا بینڈ',
  practical_training_required: 'عملی تربیت لازم',
  education_years: 'تعلیم کے سال',
  HSSC_or_A_Level_pass: 'انٹرمیڈیٹ یا A Level پاس',
  professional_scheme_requirements: 'پیشہ ورانہ اسکیم کی شرائط',
  foundation_exams_passed: 'پاس شدہ Foundation امتحانات',
  professionalism_module_complete: 'Professionalism ماڈیول مکمل',
  first_three_exemptions: 'پہلے تین امتحانات میں چھوٹ',
  further_qualification_requirements: 'آگے کی qualification کی شرائط',
  qualification: 'مطلوبہ تعلیمی قابلیت',
  English_proficiency: 'انگریزی زبان کی مہارت',
  medical: 'طبی معیار',
  integrated_flying_training_hours: 'فلائنگ ٹریننگ کے گھنٹے',
  theory_and_skill_tests: 'نظریاتی اور عملی ٹیسٹ',
  dae_min_percent: 'DAE میں کم از کم نمبر',
  open_merit: 'اوپن میرٹ',
  match_relevant_technology: 'متعلقہ ٹیکنالوجی سے مطابقت',
  entry_semester: 'داخلے کا سمسٹر',
  same_discipline: 'اسی شعبے میں',
  different_discipline: 'مختلف شعبے میں',
  minimum_cgpa: 'کم از کم CGPA',
  cgpa_scale: 'CGPA کا پیمانہ',
  university_can_raise_requirement: 'یونیورسٹی شرط بڑھا سکتی ہے',
  programme_applicability_check: 'پروگرام پر اطلاق چیک کریں',
  years: 'سال',
  semesters: 'سمسٹرز',
  credits_min: 'کم از کم کریڈٹس',
  credits_max: 'زیادہ سے زیادہ کریڈٹس',
  specific_programme_admission_rules_required: 'پروگرام کے مخصوص داخلہ قواعد الگ سے دیکھیں',
  specific_course_entry_check: 'کورس کی مخصوص انٹری شرط چیک کریں',
  age_check: 'عمر کی شرط چیک کریں',
  training_and_assessment: 'تربیت اور تشخیص',
  specific_advertisement_eligibility: 'ہر اشتہار کی الگ اہلیت',
  age_and_work_conditions_check: 'عمر اور کام کی شرائط چیک کریں',
  skill_customers_costs_and_sector_rules: 'ہنر، گاہک، لاگت اور شعبہ وار قواعد الگ الگ',
  subject_eligibility_not_verified: 'مضمون کی اہلیت تصدیق شدہ نہیں',
  individual_programme_eligibility_not_verified: 'انفرادی پروگرام کی اہلیت تصدیق شدہ نہیں',
  NTC_programme_status_check: 'NTC پروگرام کی صورتحال چیک کریں',
};

function formatConditionValue(key: string, value: unknown): string {
  if (key === 'merit_weights_percent' && typeof value === 'object' && value !== null) {
    return Object.entries(value as Record<string, number>)
      .map(([part, weight]) => `${part.toUpperCase()} ${weight}٪`)
      .join('، ');
  }
  if (key === 'QAT_band_percent' && typeof value === 'object' && value !== null) {
    const band = value as { min_inclusive?: number; max_exclusive?: number };
    if (band.min_inclusive != null && band.max_exclusive != null) {
      return `${band.min_inclusive}٪ تا ${band.max_exclusive}٪`;
    }
  }
  if (Array.isArray(value)) {
    return value.join('، ');
  }
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join('، ') : String(v)}`)
      .join(' — ');
  }
  return String(value);
}

/** Turns a rule's raw `conditions` object into Urdu-labelled display lines. */
export function formatConditions(conditions: Record<string, unknown>): string[] {
  return Object.entries(conditions)
    .filter(([, value]) => value !== false && value != null)
    .map(([key, value]) => {
      const label = conditionKeyLabels[key] ?? key;
      if (typeof value === 'boolean') return label;
      const percentSuffix = /percent/i.test(key) && typeof value === 'number' ? '٪' : '';
      return `${label}: ${formatConditionValue(key, value)}${percentSuffix}`;
    });
}

/** R42 has an extra `technology_examples` map alongside `conditions` — format separately. */
export function formatTechnologyExamples(examples: Record<string, readonly string[]>): string[] {
  return Object.entries(examples).map(([technology, disciplines]) => `${technology}: ${disciplines.join('، ')}`);
}

export function sourcesFor(sourceIds: readonly string[]): SourceEntry[] {
  return sourceIds.map((id) => sourcesById[id]).filter((source): source is SourceEntry => Boolean(source));
}

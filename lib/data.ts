import { kahliArticle } from '@/lib/articles/kahli';
import { module2Lecture2NotesArticle } from '@/lib/articles/module2-lecture2-notes';
import { module2Lecture3NotesArticle } from '@/lib/articles/module2-lecture3-notes';
import { module3Lecture3NotesArticle } from '@/lib/articles/module3-lecture3-notes';
import { careerDecisionAfterMatricArticle } from '@/lib/articles/career-decision-after-matric';
import { freeWebsiteWithoutItExperienceArticle } from '@/lib/articles/free-website-without-it-experience';
import { softwareHouseAccountingIssuesArticle } from '@/lib/articles/software-house-accounting-issues';
import { cvMistakesArticle } from '@/lib/articles/cv-mistakes';
import { onlineClothingBusinessArticle } from '@/lib/articles/online-clothing-business';
import { top10PakistaniUniversitiesArticle } from '@/lib/articles/top-10-pakistani-universities';
import { fixAiGeneratedPosterTextArticle } from '@/lib/articles/fix-ai-generated-poster-text';
import { excelFilesToUsefulDashboardsArticle } from '@/lib/articles/excel-files-to-useful-dashboards';
import { systemsLimited50YearJourneyArticle } from '@/lib/articles/systems-limited-50-year-journey';
import { excelDashboardCourse } from '@/lib/courses/excel-dashboard-course';
import { webDevelopmentLearnAndEarnCourse } from '@/lib/courses/web-development-learn-and-earn';
import { featuredCourse } from '@/lib/courses/youth-career-guidance';
export { featuredCourse };

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
};

export type Course = {
  id: string;
  slug: string;
  code?: string;
  title: string;
  subtitle: string;
  description: string;
  seoTitle?: string;
  metaDescription?: string;
  openGraphDescription?: string;
  coverImage: string;
  coverAspect?: 'standard' | 'wide';
  duration: string;
  lessons: number;
  level: string;
  language: string;
  price: string;
  stages?: number;
  instructor: Instructor;
  outcomes: string[];
  modules: CourseModule[];
  availability?: 'available' | 'coming-soon';
  introVideo?: string;
  heroPoints?: string[];
  descriptionParagraphs?: string[];
  audience?: string[];
  audienceIntro?: string;
  audienceNote?: string;
  bonuses?: string[];
  benefits?: CourseBenefit[];
  requirements?: string[];
  notFor?: string[];
  included?: string[];
  curriculumIntro?: string;
  fastTrack?: CourseFastTrack;
  earningPaths?: CourseEarningPath[];
  actionPlan?: string;
  parentMessage?: string;
  certificate?: string;
  earningsDisclaimer?: string;
};

export type CourseBenefit = {
  title: string;
  description: string;
};

export type CourseFastTrack = {
  title: string;
  description: string;
  lessons: string[];
  footer?: string;
};

export type CourseEarningPath = {
  title: string;
  subtitle: string;
  description: string;
};

export type Instructor = {
  name: string;
  title: string;
  bio: string;
};

export type CourseLessonKind = 'video' | 'text';

export type LessonArticle = {
  excerpt: string;
  coverImage?: string;
  content: ArticleSection[];
};

export type CourseLesson = {
  id: string;
  kind: CourseLessonKind;
  title: string;
  duration: string;
  hidden?: boolean;
  comingSoon?: boolean;
  videoUid?: string;
  article?: LessonArticle;
};

export type CourseModule = {
  id: string;
  title: string;
  stage?: string;
  hidden?: boolean;
  lessons: CourseLesson[];
};

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  content: ArticleSection[];
  /** When true, the article stays fully visible to readers but is excluded from search engine indexing (robots noindex) and the sitemap. */
  noIndex?: boolean;
};

export type ArticleSection = {
  type: 'heading' | 'subheading' | 'paragraph' | 'list' | 'quote' | 'image' | 'callout' | 'checklist' | 'table' | 'component';
  text?: string;
  src?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  tone?: 'research' | 'highlight' | 'tip';
  footer?: string;
  /** For a 'paragraph' section: wraps the paragraph text in a link to this URL. */
  href?: string;
  componentKey?:
    | 'CompetitionInfographic'
    | 'FourStagesTimeline'
    | 'BenefitsChallenges'
    | 'FinancialROI'
    | 'AlternativeFields'
    | 'HeroBannerBlue'
    | 'EngineeringFieldsBlue'
    | 'SalaryGrowthBlue'
    | 'RoadmapCareerBlue'
    | 'RoadmapSkillsBlue'
    | 'BusinessImpactBlue'
    | 'Hero'
    | 'Tameed'
    | 'CareerTabs'
    | 'PersonalitySection'
    | 'IkigaiDiagram'
    | 'SwotGrid'
    | 'timeline'
    | 'Footer'
    | 'GeminiConfusion'
    | 'GeminiPressure'
    | 'GeminiDetailed'
    | 'LectureTitleHero'
    | 'OnlineEarningDreams'
    | 'FraudWarningSigns'
    | 'FakeJobsOverseas'
    | 'NetworkMarketingTrap'
    | 'GamblingTradingTrap'
    | 'FakeSuccessHeroes'
    | 'FreelancingReality'
    | 'SafetyTips'
    | 'FinalMessage'
    | 'ComputerScienceITBanner'
    | 'ComputerScienceCareerInfographic'
    | 'BusinessMyths'
    | 'LearningPath'
    | 'LowCapitalStart'
    | 'PracticalStartSteps'
    | 'RealisticBalance'
    | 'SmallRisk'
    | 'TrustCompass'
    | 'BusinessCaseHeroBanner'
    | 'BusinessCaseVsPlan'
    | 'NineStepsTimeline'
    | 'CustomerMarketEdge'
    | 'FinancialSnapshot'
    | 'RisksMitigation'
    | 'ThirtyDayPlan'
    | 'CommonMistakes'
    | 'OnePageTemplate'
    | 'UniversalExample'
    | 'TheFundingLadder'
    | 'FraudAlert'
    | 'FundingSourcesComparison'
    | 'PitchingChecklist'
    | 'ShamaArticleHeroBanner'
    | 'ScopeDecision'
    | 'AdviceCost'
    | 'SalesHero'
    | 'SalesShameReasons'
    | 'SalesOpenDoor'
    | 'SalesFastGrowth'
    | 'SalesClosing'
    | 'CvVisualQuote'
    | 'LizRyanQuote'
    | 'Mistake5Infographic'
    | 'OnlineClothingBusinessArticle'
    | 'UniversityFieldMatrix'
    | 'CampusPersonalityTiles'
    | 'UniversityStrengthDashboard'
    | 'IndustrySectorGrid'
    | 'AdmissionsTimelineInfographic'
    | 'UniversityClassSizeSpectrum'
    | 'QsPerformanceExplorer2027'
    | 'SubjectRankingExplorer2026'
    | 'FeesAdmissionsComparison'
    | 'AdmissionTimeline2027'
    | 'UniversityCardWall'
    | 'UniversityDecisionTool';
};

export const categories: Category[] = [
  {
    id: '1',
    name: 'کیریئر رہنمائی',
    slug: 'career-guidance',
    icon: 'Compass',
    color: 'text-blue-600',
  },
  {
    id: '2',
    name: 'کاروبار',
    slug: 'entrepreneurship',
    icon: 'Rocket',
    color: 'text-orange-500',
  },
  {
    id: '3',
    name: 'نوکری تلاش',
    slug: 'job-search',
    icon: 'Briefcase',
    color: 'text-green-600',
  },
  {
    id: '4',
    name: 'مہارتیں',
    slug: 'skills',
    icon: 'Sparkles',
    color: 'text-purple-600',
  },
];

export const courses: Course[] = [
  excelDashboardCourse,
  webDevelopmentLearnAndEarnCourse,
  featuredCourse,
];

export const articles: Article[] = [
  softwareHouseAccountingIssuesArticle,
  freeWebsiteWithoutItExperienceArticle,
  careerDecisionAfterMatricArticle,
  kahliArticle,
  module2Lecture2NotesArticle,
  module2Lecture3NotesArticle,
  {
    id: 'm3-l3-notes',
    title: 'فری لانسنگ جیمنی — ماڈیول 3 لیکچر 3 نوٹس',
    excerpt: module3Lecture3NotesArticle.excerpt,
    coverImage: module3Lecture3NotesArticle.coverImage!,
    category: 'نوکری تلاش',
    author: 'شمع.pk',
    publishedAt: '31 جولائی 2026',
    readingTime: '20 منٹ',
    content: module3Lecture3NotesArticle.content,
  },
  {
    id: '1',
    title: 'توجہ کی معیشت: اسکرین، عادت، اور اپنی توجہ واپس لینے کا طریقہ',
    excerpt:
      'کیا اسکرین آپ کے وقت پر قبضہ کر رہی ہے؟ یہ مضمون توجہ کی معیشت، سوشل میڈیا کے دباؤ، اور توجہ واپس لینے کے عملی طریقوں کو تین الگ کارڈز میں سادہ انداز سے سمجھاتا ہے۔',
    coverImage:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'مہارتیں',
    author: 'شمع.pk',
    publishedAt: '26 جولائی 2026',
    readingTime: '9 منٹ',
    content: [
      { type: 'heading', text: 'تعارف' },
      {
        type: 'paragraph',
        text: 'آج کے دور میں مسئلہ صرف یہ نہیں کہ ہمارے پاس وقت کم ہے۔ اصل مسئلہ یہ ہے کہ ہماری توجہ بار بار ٹوٹتی ہے۔ نوٹیفکیشن، شارٹ ویڈیوز، اور endless scroll ہمارے فیصلوں کو اس حد تک متاثر کر دیتے ہیں کہ اصل کام پیچھے رہ جاتا ہے۔',
      },
      {
        type: 'paragraph',
        text: 'یہ مضمون اسی مسئلے کو تین مختصر لیکن واضح حصوں میں توڑتا ہے تاکہ آپ سمجھ سکیں کہ توجہ کیوں بکھرتی ہے، سوشل میڈیا کہاں مدد کرتا ہے اور کہاں نقصان، اور پھر توجہ واپس کیسے لائی جائے۔',
      },
      { type: 'heading', text: 'توجہ کی معیشت کیا ہے؟' },
      {
        type: 'paragraph',
        text: 'جب کوئی ایپ آپ کی توجہ زیادہ دیر تک پکڑ لیتی ہے تو وہ اپنے اشتہار، اپنی فروخت، یا اپنی مصروفیت بڑھاتی ہے۔ اسی لیے پلیٹ فارم ایسے فیچرز بناتے ہیں جو آپ کو بار بار واپس لائیں۔',
      },
      {
        type: 'callout',
        title: 'Card 01 — توجہ کہاں خرچ ہو رہی ہے؟',
        tone: 'highlight',
        text: 'توجہ کی معیشت میں ہر نوٹیفکیشن، ہر autoplay، اور ہر endless feed ایک چھوٹا سا دعویٰ ہے کہ آپ کا اگلا منٹ بھی اسی جگہ گزرے۔ یہ کارڈ دکھاتا ہے کہ وقت کے ساتھ ساتھ توجہ کی عادت بھی بدلتی ہے۔',
      },
      {
        type: 'paragraph',
        text: 'اس کو سمجھنے کے بعد اگلا سوال یہ بنتا ہے: اگر پلیٹ فارم توجہ کھینچ رہے ہیں، تو صارف کے طور پر ہم کیا کر سکتے ہیں؟ جواب کا پہلا حصہ سوشل میڈیا کی صحیح اور غلط جگہوں کو الگ کرنا ہے۔',
      },
      { type: 'heading', text: 'سوشل میڈیا: ذریعہ بھی، آزمائش بھی' },
      {
        type: 'paragraph',
        text: 'سوشل میڈیا بذاتِ خود برا نہیں۔ مسئلہ اس وقت بنتا ہے جب ہم اسے ارادے کے بغیر کھولتے ہیں اور اپنے دن کا پہلا اور آخری گھنٹہ اسی میں گنوا دیتے ہیں۔',
      },
      {
        type: 'paragraph',
        text: 'پوسٹس، ریلس، اور فیڈز بعض اوقات سیکھنے، جڑنے، اور کاروباری مواقع تک پہنچنے کا ذریعہ بنتے ہیں۔ لیکن اگر استعمال کا کوئی مقصد نہ ہو تو یہی پلیٹ فارم وقت، ذہنی توانائی، اور توجہ تینوں کھا جاتے ہیں۔',
      },
      {
        type: 'callout',
        title: 'Card 02 — ایک ہی موبائل: دو راستے',
        tone: 'research',
        text: 'اہم سوال: یہ رسائی نوجوان کو علم و روزگار کی طرف لے جا رہی ہے یا وقت گزاری کی طرف؟',
        subtitle: 'الگورتھم آپ کی کمزوری نہیں ڈھونڈتا، وہ آپ کی عادت ڈھونڈتا ہے۔ جس چیز پر آپ تھوڑی دیر رکتے ہیں، پلیٹ فارم اسے اور بڑھا دیتا ہے۔',
      },
      {
        type: 'paragraph',
        text: 'ایک واضح حد یہ ہو سکتی ہے کہ سوشل ایپس دن میں صرف دو مرتبہ کھولی جائیں: ایک بار دوپہر میں اور ایک بار شام کو۔ اس سے آپ user بھی رہتے ہیں اور machine کے ہاتھوں driven بھی نہیں بنتے۔',
      },
      { type: 'heading', text: 'اپنی توجہ واپس لینے کے عملی طریقے' },
      {
        type: 'paragraph',
        text: 'توجہ واپس لینا کسی بڑے عزم سے زیادہ ایک چھوٹے سسٹم کی ضرورت ہے۔ اگر ماحول بکھرا ہو، فون سامنے ہو، اور نوٹیفکیشن آن ہوں، تو صرف ارادے پر انحصار کافی نہیں ہوتا۔',
      },
      {
        type: 'checklist',
        title: 'عملی چیک لسٹ: اپنی توجہ واپس لینے کے 5 قدم',
        text: 'روزمرہ میں توجہ واپس لینے کے لیے ایک سادہ، ادارتی فریم ورک۔',
        items: [
          'روزانہ 30 منٹ کے لیے ایک ہی کام پر توجہ مرکوز کریں',
          'غیر ضروری نوٹیفکیشن بند کریں',
          'سوشل میڈیا کو مخصوص وقت تک محدود کریں',
          'بغیر سوچے موبائل اٹھانے کی عادت کم کریں',
          'ہر دن کے آخر میں اپنی پیش رفت کا جائزہ لیں',
        ],
        footer: 'فرق نیت، وقت کی حد اور مقصد کے واضح ہونے سے پیدا ہوتا ہے۔',
      },
      { type: 'heading', text: 'نتیجہ' },
      {
        type: 'paragraph',
        text: 'توجہ کوئی مبہم چیز نہیں۔ آپ اسے محفوظ بھی کر سکتے ہیں اور آہستہ آہستہ واپس بھی لا سکتے ہیں۔ چھوٹے فیصلے، واضح حدیں، اور ایک سادہ روزمرہ سسٹم اس کا اصل حل ہیں۔',
      },
    ],
  },
  {
    id: '2',
    title: 'کاروبار شروع کرنے کے 10 ضروری اقدامات',
    excerpt:
      'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ اسی طرح کاروبار شروع کرنے کے لیے...',
    coverImage:
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'کاروبار',
    author: 'عاطف شہباز',
    publishedAt: '10 جنوری 2025',
    readingTime: '10 منٹ',
    content: [
      { type: 'heading', text: 'تعارف' },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ اسی طرح کاروبار شروع کرنے کے لیے درست منصوبہ بندی ضروری ہے۔',
      },
      {
        type: 'quote',
        text: 'بڑے کاروبار چھوٹے اقدامات سے شروع ہوتے ہیں۔',
      },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ اسی طرح کاروبار شروع کرنے کے لیے درست منصوبہ بندی ضروری ہے۔',
      },
      { type: 'heading', text: 'بجٹ اور مالی منصوبہ بندی' },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ اسی طرح کاروبار شروع کرنے کے لیے درست منصوبہ بندی ضروری ہے۔',
      },
      {
        type: 'image',
        src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        alt: 'کاروبار',
      },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ اسی طرح کاروبار شروع کرنے کے لیے درست منصوبہ بندی ضروری ہے۔',
      },
      { type: 'heading', text: 'نتیجہ' },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ اسی طرح کاروبار شروع کرنے کے لیے درست منصوبہ بندی ضروری ہے۔',
      },
    ],
  },
  {
    id: '3',
    title: 'کامیاب انٹرویو کے لیے مکمل تیاری گائیڈ',
    excerpt:
      'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ انٹرویو کی تیاری میں...',
    coverImage:
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'نوکری تلاش',
    author: 'عاطف شہباز',
    publishedAt: '5 جنوری 2025',
    readingTime: '7 منٹ',
    content: [
      { type: 'heading', text: 'تعارف' },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ انٹرویو کی تیاری میں پہلے سے منصوبہ بندی ضروری ہے۔',
      },
      {
        type: 'quote',
        text: 'انٹرویو ایک مہارت ہے، جو مشق سے بہتر ہوتی ہے۔',
      },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ انٹرویو کی تیاری میں پہلے سے منصوبہ بندی ضروری ہے۔',
      },
      { type: 'heading', text: 'عام سوالات' },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ انٹرویو کی تیاری میں پہلے سے منصوبہ بندی ضروری ہے۔',
      },
      {
        type: 'image',
        src: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        alt: 'انٹرویو کی تیاری',
      },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ انٹرویو کی تیاری میں پہلے سے منصوبہ بندی ضروری ہے۔',
      },
      { type: 'heading', text: 'نتیجہ' },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ انٹرویو کی تیاری میں پہلے سے منصوبہ بندی ضروری ہے۔',
      },
    ],
  },
  {
    id: '4',
    title: 'ڈیجیٹل مہارتیں: نوجوانوں کے لیے ضروری ہیں',
    excerpt:
      'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ آج کے دور میں ڈیجیٹل مہارتیں...',
    coverImage:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'مہارتیں',
    author: 'عاطف شہباز',
    publishedAt: '2 جنوری 2025',
    readingTime: '6 منٹ',
    content: [
      { type: 'heading', text: 'تعارف' },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ آج کے دور میں ڈیجیٹل مہارتیں ضروری ہیں۔',
      },
      {
        type: 'quote',
        text: 'ڈیجیٹل مہارت آج کا نئی پڑھائی ہے۔',
      },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ آج کے دور میں ڈیجیٹل مہارتیں ضروری ہیں۔',
      },
      { type: 'heading', text: 'نتیجہ' },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ آج کے دور میں ڈیجیٹل مہارتیں ضروری ہیں۔',
      },
    ],
  },
  {
    id: '5',
    title: 'فری لانسنگ: گھر بیٹھے آمدنی کمانے کا طریقہ',
    excerpt:
      'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ فری لانسنگ کے ذریعے...',
    coverImage:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'کاروبار',
    author: 'عاطف شہباز',
    publishedAt: '28 دسمبر 2024',
    readingTime: '9 منٹ',
    content: [
      { type: 'heading', text: 'تعارف' },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ فری لانسنگ کے ذریعے گھر بیٹھے آمدنی کما سکتے ہیں۔',
      },
      {
        type: 'quote',
        text: 'فری لانسنگ آزادی اور آمدنی دونوں دیتی ہے۔',
      },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ فری لانسنگ کے ذریعے گھر بیٹھے آمدنی کما سکتے ہیں۔',
      },
      { type: 'heading', text: 'نتیجہ' },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ فری لانسنگ کے ذریعے گھر بیٹھے آمدنی کما سکتے ہیں۔',
      },
    ],
  },
  {
    id: '6',
    title: 'ذاتی برانڈ بنانا: ڈیجیٹل دور میں اپنی پہچان',
    excerpt:
      'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ ذاتی برانڈ کی اہمیت...',
    coverImage:
      'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'کیریئر رہنمائی',
    author: 'عاطف شہباز',
    publishedAt: '20 دسمبر 2024',
    readingTime: '5 منٹ',
    content: [
      { type: 'heading', text: 'تعارف' },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ ذاتی برانڈ کی اہمیت آج کے دور میں بہت زیادہ ہے۔',
      },
      {
        type: 'quote',
        text: 'آپ کا برانڈ، آپ کا کردار ہے۔',
      },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ ذاتی برانڈ کی اہمیت آج کے دور میں بہت زیادہ ہے۔',
      },
      { type: 'heading', text: 'نتیجہ' },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ ذاتی برانڈ کی اہمیت آج کے دور میں بہت زیادہ ہے۔',
      },
    ],
  },
];

export const publishedArticles: Article[] = [
  systemsLimited50YearJourneyArticle,
  excelFilesToUsefulDashboardsArticle,
  fixAiGeneratedPosterTextArticle,
  top10PakistaniUniversitiesArticle,
  onlineClothingBusinessArticle,
  cvMistakesArticle,
  softwareHouseAccountingIssuesArticle,
  freeWebsiteWithoutItExperienceArticle,
  careerDecisionAfterMatricArticle,
];

export const navLinks = [
  { label: 'کورسز', href: '/courses' },
  { label: 'مضامین', href: '/articles' },
  { label: 'ہمارے بارے میں', href: '/about' },
  { label: 'رابطہ', href: '/contact' },
];

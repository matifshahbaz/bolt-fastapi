import { kahliArticle } from '@/lib/articles/kahli';
import { module1Lecture1NotesArticle } from '@/lib/articles/module1-lecture1-notes';
import { module1Lecture2NotesArticle } from '@/lib/articles/module1-lecture2-notes';
import { module1Lecture3NotesArticle } from '@/lib/articles/module1-lecture3-notes';
import { module2Lecture1NotesArticle } from '@/lib/articles/module2-lecture1-notes';
import { module2Lecture2NotesArticle } from '@/lib/articles/module2-lecture2-notes';
import { module2Lecture3NotesArticle } from '@/lib/articles/module2-lecture3-notes';
import { module3Lecture1NotesArticle } from '@/lib/articles/module3-lecture1-notes';
import { module3Lecture2NotesArticle } from '@/lib/articles/module3-lecture2-notes';
import { module5Lecture1NotesArticle } from '@/lib/articles/module5-lecture1-notes';
import { module5Lecture2NotesArticle } from '@/lib/articles/module5-lecture2-notes';
import { module5Lecture3NotesArticle } from '@/lib/articles/module5-lecture3-notes';
import { module3Lecture4NotesArticle } from '@/lib/articles/module3-lecture4-notes';
import { module3Lecture3NotesArticle } from '@/lib/articles/module3-lecture3-notes';
import { module4Lecture1NotesArticle } from '@/lib/articles/module4-lecture1-notes';
import { module4Lecture2NotesArticle } from '@/lib/articles/module4-lecture2-notes';
import { module4Lecture3NotesArticle } from '@/lib/articles/module4-lecture3-notes';
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
import { COURSE_PRICE } from '@/lib/course-policy';

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
    | 'UniversityClassSizeSpectrum';
};

const courseLessonImages = [
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1181326/pexels-photo-1181326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
];

function createLessonArticle(moduleTitle: string, lessonTitle: string, focus: string, imageIndex: number): LessonArticle {
  const imageUrl = courseLessonImages[imageIndex % courseLessonImages.length];
  return {
    excerpt: `${moduleTitle} کے اس سبق میں ${focus} کے لیے ایک سادہ اور عملی فریم ورک دیا گیا ہے۔`,
    coverImage: imageUrl,
    content: [
      { type: 'heading', text: 'اس سبق کا خلاصہ' },
      {
        type: 'paragraph',
        text: `${lessonTitle} میں ہم ${focus} کو عملی مثالوں کے ساتھ دیکھتے ہیں تاکہ طلبہ اسے فوراً اپنے کورس یا کیریئر پلان میں استعمال کر سکیں۔`,
      },
      {
        type: 'quote',
        text: 'پہلے سمجھیں، پھر دیکھیں، پھر خود آزما کر دیکھیں۔',
      },
      {
        type: 'image',
        src: imageUrl,
        alt: `${moduleTitle} — ${lessonTitle}`,
      },
      { type: 'heading', text: 'اہم نکات' },
      {
        type: 'callout',
        title: 'فوری عملی استعمال',
        tone: 'highlight',
        text: `${focus} کو چھوٹے اقدامات میں تقسیم کریں: سمجھیں، نوٹ کریں، پھر ایک چھوٹا سا عمل آج ہی مکمل کریں۔`,
      },
      {
        type: 'checklist',
        title: 'اس سبق کے بعد چیک لسٹ',
        items: [
          `${lessonTitle} کے تین اہم نکات لکھیں`,
          `${focus} کے لیے ایک مثال اپنے الفاظ میں بنائیں`,
          'اگلے سبق سے پہلے 1 چھوٹا عملی قدم مکمل کریں',
        ],
      },
      { type: 'heading', text: 'اگلا قدم' },
      {
        type: 'paragraph',
        text: 'یہ ایک placeholder text lesson ہے۔ بعد میں آپ یہاں اصل آڈیو، اسکرین شاٹس، نوٹس، یا مکمل مضمون replace کر سکتے ہیں۔',
      },
    ],
  };
}

function createVideoLesson(
  moduleId: string,
  index: number | string,
  title: string,
  duration: string,
  videoUid: string,
): CourseLesson {
  return {
    id: `${moduleId}-v${index}`,
    kind: 'video',
    title,
    duration,
    videoUid,
  };
}

function createTextLesson(
  moduleId: string,
  index: number,
  moduleTitle: string,
  lessonTitle: string,
  focus: string,
  imageIndex: number,
): CourseLesson {
  return {
    id: `${moduleId}-t${index}`,
    kind: 'text',
    title: `${lessonTitle} — نوٹس`,
    duration: '2 منٹ پڑھائی',
    article: createLessonArticle(moduleTitle, lessonTitle, focus, imageIndex),
  };
}

function createComingSoonLesson(moduleId: string, index: number, title: string): CourseLesson {
  return {
    id: `${moduleId}-t${index}`,
    kind: 'text',
    title,
    duration: 'جلد دستیاب',
    comingSoon: true,
    article: {
      excerpt: 'یہ مواد جلد دستیاب ہوگا۔',
      content: [],
    },
  };
}

function createModuleLessons(
  moduleId: string,
  moduleTitle: string,
  videos: Array<{ title: string; duration: string; focus: string; videoUid: string }>,
): CourseLesson[] {
  return videos.flatMap((video, index) => [
    createVideoLesson(moduleId, index + 1, video.title, video.duration, video.videoUid),
    createTextLesson(moduleId, index + 1, moduleTitle, video.title, video.focus, index),
  ]);
}

function createModule3Lessons(): CourseLesson[] {
  const moduleId = 'm3';
  const moduleTitle = 'ڈیجیٹل معیشت اور آن لائن کمائی';
  const lessons = createModuleLessons(moduleId, moduleTitle, [
    { title: 'سی وی بنانے کا فن', duration: '45 سیکنڈ', focus: 'CV structure and clarity', videoUid: '072336982e4f8759249c1d02edf14aba' },
    { title: 'لیکچر 3.2: ویب سائٹ بنانے کا شعبہ', duration: '1 منٹ', focus: 'website development foundations', videoUid: 'd589d0b83800d7bafe30ead9c07a8980' },
    { title: 'لیکچر 3.3: فری لانسنگ: حقیقت، مواقع اور چیلنجز', duration: '2 منٹ', focus: 'job portals and applications', videoUid: '3d66a6a2dcbfd91ce07affe6ed64654b' },
    { title: 'ڈیجیٹل مارکیٹنگ', duration: 'جلد دستیاب', focus: 'digital marketing careers', videoUid: 'placeholder-m3-v4' },
  ]);

  lessons.forEach((lesson) => {
    if (lesson.id === 'm3-v4' || lesson.id === 'm3-t4') {
      lesson.hidden = true;
    }
  });

  const courseLessons = [
    createVideoLesson(moduleId, '1-1', 'لیکچر 3.1: ڈیجیٹل معیشت اور آن لائن کمائی — حصہ 1: ڈیجیٹل معیشت کا مطلب', '45 سیکنڈ', '072336982e4f8759249c1d02edf14aba'),
    createVideoLesson(moduleId, '1-2', 'لیکچر 3.1: ڈیجیٹل معیشت اور آن لائن کمائی — حصہ 2: آن لائن کام کے طریقے', '52 سیکنڈ', 'd24d8a9a8b651147fd80bada011a38b2'),
    createVideoLesson(moduleId, '1-3', 'لیکچر 3.1: ڈیجیٹل معیشت اور آن لائن کمائی — حصہ 3: مقامی ڈیجیٹل کلائنٹس', '36 سیکنڈ', '0c6ef060e7232246ef0a823111883fed'),
    lessons[1],
    ...lessons.slice(2),
  ];

  return courseLessons;
}

function createModule5Lessons(): CourseLesson[] {
  const moduleId = 'm5';
  const moduleTitle = 'کاروبار اور نئے مواقع کی تخلیق';
  const lessons = createModuleLessons(moduleId, moduleTitle, [
    { title: 'لیکچر 5.1: نوجوانی میں کاروبار بطور کیریئر', duration: '3 منٹ', focus: 'business mindset', videoUid: '178a4245e678061087e7d28f2b4a7783' },
    { title: 'لیکچر 5.2: کاروباری منصوبہ اور بزنس کیس', duration: '3 منٹ', focus: 'finding a business idea', videoUid: '460b8d57c1ac1b8db9fc0173b6c099fb' },
    { title: 'لیکچر 5.3: اپنے اسٹارٹ اپ کے لیے سرمایہ کیسے حاصل کریں؟', duration: '3 منٹ', focus: 'budgeting and planning', videoUid: 'f69acb71aeefb5bc48170bd9ae5cd289' },
  ]);

  return [
    ...lessons.slice(0, 4),
    createVideoLesson(moduleId, '3-1', 'لیکچر 5.3: اپنے اسٹارٹ اپ کے لیے سرمایہ کیسے حاصل کریں؟ — حصہ 1', '3 منٹ', 'f69acb71aeefb5bc48170bd9ae5cd289'),
    createVideoLesson(moduleId, '3-2', 'لیکچر 5.3: اپنے اسٹارٹ اپ کے لیے سرمایہ کیسے حاصل کریں؟ — حصہ 2', '3 منٹ', '5cf10ad82447c00e5a56ad5e89e95a4d'),
    ...lessons.slice(5),
  ];
}

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

export const featuredCourse: Course = {
  id: 'career-guidance-for-pakistani-youth',
  slug: 'youth-career-guidance',
  title: 'نوجوانوں کے لیے کیریئر رہنمائی کورس: مستقبل کی کامیابی',
  subtitle: 'اپنے کیریئر کی سمت میں واضح رہنمائی حاصل کریں',
  description:
    'یہ کورس پاکستان کے نوجوانوں کے لیے بنایا گیا ہے جو اپنے مستقبل کے بارے میں سنجیدہ ہیں۔ آپ سیکھیں گے کہ کیسے اپنی صلاحیتوں کو پہچانیں، صحیح کیریئر کا انتخاب کریں، نوکری تلاش کریں، اور کاروبار شروع کریں۔ مکمل رہنمائی اردو میں۔',
  coverImage: '/career-guidance-course-banner.png',
  duration: '2 گھنٹے',
  lessons: 31,
  level: 'ابتدائی سے متوسط',
  language: 'اردو',
  price: COURSE_PRICE,
  introVideo: '/videos/shama-course-intro-v1.mp4',
  instructor: {
    name: 'عاطف شہباز',
    title: 'بانی، شمع.pk',
    bio: 'عاطف شہباز نے شمع.pk کا آغاز اردو میں عملی کیریئر مواد فراہم کرنے کے لیے کیا۔ یہ پلیٹ فارم اپنے ابتدائی مرحلے میں ہے اور حقیقی طلبہ کی رائے کے ساتھ اسے مسلسل بہتر بنایا جائے گا۔',
  },
  outcomes: [
    'کیریئر کا بہتر انتخاب کیسے کیا جائے',
    'مختلف شعبوں کی حقیقت، مواقع اور مشکلات',
    'اپنی صلاحیت اور حالات کے مطابق راستہ',
    'غلط دعووں اور وقتی رجحانات کی پہچان',
    'تعلیم، مہارت، ملازمت اور کاروبار کے امکانات',
    'اگلا عملی قدم کیسے طے کیا جائے',
  ],
  modules: [
    {
      id: 'm1',
      title: 'کیریئر کی الجھنیں، شور اور حقیقتیں',
      lessons: (() => {
        const lessons = createModuleLessons('m1', 'کیریئر کی الجھنیں، شور اور حقیقتیں', [
          { title: 'لیکچر 1.1: کیریئر کا انتخاب اتنا مشکل کیوں ہے؟', duration: '1 منٹ', focus: 'کیریئر کے فیصلے میں درپیش چیلنجز', videoUid: 'a30413716856e9e07b95bf258096fd9c' },
          { title: 'لیکچر 1.2: کامیابی کے نام پر شور، غلط دعوے اور دھوکے', duration: '51 سیکنڈ', focus: 'آن لائن کمائی کے فراڈ کی پہچان اور ان سے بچاؤ', videoUid: '9969875f3e936e738e6ef28f8762c98c' },
          { title: 'لیکچر 1.3: درست راستوں کے اپنے مسائل ہوتے ہیں', duration: 'جلد دستیاب', focus: 'interest-skill fit', videoUid: 'placeholder-m1-v3' },
          { title: 'روٹین اور وقت کی منصوبہ بندی', duration: 'جلد دستیاب', focus: 'daily planning system', videoUid: 'placeholder-m1-v4' },
        ]);

        const introTextLesson = lessons.find((lesson) => lesson.kind === 'text' && lesson.id === 'm1-t1');
        if (introTextLesson) {
          introTextLesson.duration = '4 منٹ پڑھائی';
          introTextLesson.article = module1Lecture1NotesArticle;
        }

        const lecture2TextLesson = lessons.find((lesson) => lesson.kind === 'text' && lesson.id === 'm1-t2');
        if (lecture2TextLesson) {
          lecture2TextLesson.duration = '5 منٹ پڑھائی';
          lecture2TextLesson.article = module1Lecture2NotesArticle;
        }

        const lecture3TextLesson = lessons.find((lesson) => lesson.kind === 'text' && lesson.id === 'm1-t3');
        if (lecture3TextLesson) {
          lecture3TextLesson.duration = '6 منٹ پڑھائی';
          lecture3TextLesson.article = module1Lecture3NotesArticle;
        }

        lessons.slice(4).forEach((lesson) => {
          lesson.hidden = true;
        });

        return lessons;
      })(),
    },
    {
      id: 'm2',
      title: 'مستحکم اور آزمودہ کیریئرز',
      lessons: (() => {
        const lessons = createModuleLessons('m2', 'مستحکم اور آزمودہ کیریئرز', [
          { title: 'لیکچر 2.1: کمپیوٹر سائنس میں کیریئر', duration: '1 منٹ', focus: 'کمپیوٹر سائنس میں تعلیم اور کیریئر کے راستے', videoUid: 'ddbb12252d982b5ef19eb42ca07e5eec' },
          { title: 'لیکچر 2.2: طب اور ایم بی بی ایس میں کیریئر', duration: '3 منٹ', focus: 'میڈیکل کے شعبے میں تعلیم اور کیریئر کے راستے', videoUid: '701a6ffd173193628347d31f422f9018' },
          { title: 'لیکچر 2.3: انجینئرنگ میں کیریئر', duration: '3 منٹ', focus: 'انجینئرنگ میں تعلیم، مہارت اور کیریئر کے راستے', videoUid: '9aa90aefeb75e46b25a274047b559106' },
        ]);

        const lecture1TextLesson = lessons.find((lesson) => lesson.kind === 'text' && lesson.id === 'm2-t1');
        if (lecture1TextLesson) {
          lecture1TextLesson.duration = '8 منٹ پڑھائی';
          lecture1TextLesson.article = module2Lecture1NotesArticle;
        }

        const lecture2TextLesson = lessons.find((lesson) => lesson.kind === 'text' && lesson.id === 'm2-t2');
        if (lecture2TextLesson) {
          lecture2TextLesson.duration = '5 منٹ پڑھائی';
          lecture2TextLesson.article = module2Lecture2NotesArticle;
        }

        const lecture3TextLesson = lessons.find((lesson) => lesson.kind === 'text' && lesson.id === 'm2-t3');
        if (lecture3TextLesson) {
          lecture3TextLesson.duration = '6 منٹ پڑھائی';
          lecture3TextLesson.article = module2Lecture3NotesArticle;
        }

        return lessons;
      })(),
    },
    {
      id: 'm3',
      title: 'ڈیجیٹل معیشت اور آن لائن کمائی',
      lessons: (() => {
        const lessons = createModule3Lessons();

        const lecture1TextLesson = lessons.find((lesson) => lesson.kind === 'text' && lesson.id === 'm3-t1');
        if (lecture1TextLesson) {
          lecture1TextLesson.title = 'لیکچر 3.1: ڈیجیٹل معیشت اور آن لائن کمائی — نوٹس';
          lecture1TextLesson.duration = '15 منٹ پڑھائی';
          lecture1TextLesson.article = module3Lecture1NotesArticle;
        }

        const lecture2TextLesson = lessons.find((lesson) => lesson.kind === 'text' && lesson.id === 'm3-t2');
        if (lecture2TextLesson) {
          lecture2TextLesson.duration = '12 منٹ پڑھائی';
          lecture2TextLesson.article = module3Lecture2NotesArticle;
        }

        const lecture4TextLesson = lessons.find((lesson) => lesson.kind === 'text' && lesson.id === 'm3-t4');
        if (lecture4TextLesson) {
          lecture4TextLesson.duration = '7 منٹ پڑھائی';
          lecture4TextLesson.article = module3Lecture4NotesArticle;
        }

        const lecture3TextLesson = lessons.find((lesson) => lesson.kind === 'text' && lesson.id === 'm3-t3');
        if (lecture3TextLesson) {
          lecture3TextLesson.duration = '5 منٹ پڑھائی';
          lecture3TextLesson.article = module3Lecture3NotesArticle;
        }

        return lessons;
      })(),
    },
    {
      id: 'm4',
      title: 'کیریئر کے لیے دیگر اہم شعبے',
      lessons: [
        createVideoLesson('m4', 1, 'لیکچر 4.1: زراعت اور زرعی کاروبار میں کیریئر', '53 سیکنڈ', '5afcbd3069127022f70f0bd768c60276'),
        {
          id: 'm4-t1',
          kind: 'text',
          title: 'لیکچر 4.1: زراعت اور زرعی کاروبار میں کیریئر — نوٹس',
          duration: '8 منٹ پڑھائی',
          article: module4Lecture1NotesArticle,
        },
        {
          id: 'm4-t2',
          kind: 'text',
          title: 'لیکچر 4.2: سرکاری ملازمت کے نشیب و فراز — نوٹس',
          duration: '9 منٹ پڑھائی',
          article: module4Lecture2NotesArticle,
        },
        {
          id: 'm4-t3',
          kind: 'text',
          title: 'لیکچر 4.3: سیلز ڈیپارٹمنٹ کی طاقت — نوٹس',
          duration: '9 منٹ پڑھائی',
          article: module4Lecture3NotesArticle,
        },
      ],
    },
    {
      id: 'm5',
      title: 'کاروبار اور نئے مواقع کی تخلیق',
      lessons: (() => {
        const lessons = createModule5Lessons();

        const lecture1TextLesson = lessons.find((lesson) => lesson.kind === 'text' && lesson.id === 'm5-t1');
        if (lecture1TextLesson) {
          lecture1TextLesson.duration = '8 منٹ پڑھائی';
          lecture1TextLesson.article = module5Lecture1NotesArticle;
        }

        const lecture2TextLesson = lessons.find((lesson) => lesson.kind === 'text' && lesson.id === 'm5-t2');
        if (lecture2TextLesson) {
          lecture2TextLesson.duration = '9 منٹ پڑھائی';
          lecture2TextLesson.article = module5Lecture2NotesArticle;
        }

        const lecture3TextLesson = lessons.find((lesson) => lesson.kind === 'text' && lesson.id === 'm5-t3');
        if (lecture3TextLesson) {
          lecture3TextLesson.duration = '10 منٹ پڑھائی';
          lecture3TextLesson.article = module5Lecture3NotesArticle;
        }

        return lessons;
      })(),
    },
    {
      id: 'm6',
      title: 'ذاتی ترقی اور نیٹ ورکنگ',
      hidden: true,
      lessons: createModuleLessons('m6', 'ذاتی ترقی اور نیٹ ورکنگ', [
        { title: 'ذاتی برانڈ کی تعمیر', duration: '18 منٹ', focus: 'personal branding', videoUid: 'placeholder-m6-v1' },
        { title: 'نیٹ ورکنگ کی اہمیت', duration: '15 منٹ', focus: 'professional networking', videoUid: 'placeholder-m6-v2' },
        { title: 'مسلسل سیکھنے کی عادت', duration: '20 منٹ', focus: 'lifelong learning habits', videoUid: 'placeholder-m6-v3' },
      ]),
    },
  ],
};

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

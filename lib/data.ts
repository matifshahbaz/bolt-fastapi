import { kahliArticle } from '@/lib/articles/kahli';

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
};

export type Course = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  duration: string;
  lessons: number;
  level: string;
  language: string;
  rating: number;
  reviewCount: number;
  learnerCount: string;
  price: string;
  instructor: Instructor;
  outcomes: string[];
  modules: CourseModule[];
};

export type Instructor = {
  name: string;
  title: string;
  bio: string;
  avatar: string;
};

export type CourseLessonKind = 'video' | 'text';

export type LessonArticle = {
  excerpt: string;
  coverImage: string;
  content: ArticleSection[];
};

export type CourseLesson = {
  id: string;
  kind: CourseLessonKind;
  title: string;
  duration: string;
  videoUid?: string;
  article?: LessonArticle;
};

export type CourseModule = {
  id: string;
  title: string;
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
  type: 'heading' | 'paragraph' | 'quote' | 'image' | 'callout' | 'checklist';
  text?: string;
  src?: string;
  alt?: string;
  title?: string;
  items?: string[];
  tone?: 'research' | 'highlight' | 'tip';
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
  index: number,
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
    duration: '8 منٹ پڑھائی',
    article: createLessonArticle(moduleTitle, lessonTitle, focus, imageIndex),
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

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
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
    name: 'کاروباری',
    slug: 'entrepreneurship',
    icon: 'Rocket',
    color: 'text-orange-500',
  },
  {
    id: '3',
    name: 'نوکوری تلاش',
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
  title: 'نوجوانوں کے لیے کیریئر رہنمائی کورس: مستقبل کی کامیابی',
  subtitle: 'اپنے کیریئر کی سمت میں واضح رہنمائی حاصل کریں',
  description:
    'یہ کورس پاکستان کے نوجوانوں کے لیے بنایا گیا ہے جو اپنے مستقبل کے بارے میں سنجیدہ ہیں۔ آپ سیکھیں گے کہ کیسے اپنی صلاحیتوں کو پہچانیں، صحیح کیریئر کا انتخاب کریں، نوکوری تلاش کریں، اور کاروبار شروع کریں۔ مکمل رہنمائی اردو میں۔',
  coverImage:
    'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  duration: '12 ہفتے',
  lessons: 42,
  level: 'ابتدائی سے متوسط',
  language: 'اردو',
  rating: 4.8,
  reviewCount: 1240,
  learnerCount: '5,000+',
  price: 'Rs. 500',
  instructor: {
    name: 'ڈاکٹر عامر خان',
    title: 'کیریئر ماہر اور مصنف',
    bio: 'ڈاکٹر عامر خان پچھلے 15 سال سے نوجوانوں کی کیریئر رہنمائی کر رہے ہیں۔ انہوں نے 10,000 سے زائد نوجوانوں کو اپنے کیریئر میں کامیاب ہونے میں مدد کی ہے۔',
    avatar:
      'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  },
  outcomes: [
    'اپنی صلاحیتوں اور دلچسپیاں پہچانیں',
    'صحیح کیریئر کا انتخاب کرنا سیکھیں',
    'پروفیشنل سی وی اور کور لیٹر بنائیں',
    'انٹرویو کی تیاری اور مہارت حاصل کریں',
    'نوکوری تلاش کرنے کے جدید طریقے سیکھیں',
    'کاروبار شروع کرنے کی بنیادی رہنمائی',
    'نیٹ ورکنگ اور تعلقات بنانا',
    'ذاتی برانڈ بنانا سیکھیں',
  ],
  modules: [
    {
      id: 'm1',
      title: 'بنیادیں: خود کو پہچانیں',
      lessons: createModuleLessons('m1', 'بنیادیں: خود کو پہچانیں', [
        { title: 'تعارف: کیریئر رہنمائی کی اہمیت', duration: '12 منٹ', focus: 'کیریئر رہنمائی کا بنیادی مقصد', videoUid: '05364cb45c1b5ac9bc091c709da5e527' },
        { title: 'اپنی صلاحیتوں کی شناخت', duration: '18 منٹ', focus: 'strengths اور interests map کرنے کا طریقہ', videoUid: 'placeholder-m1-v2' },
        { title: 'دلچسپی اور مہارت کا توازن', duration: '15 منٹ', focus: 'interest-skill fit', videoUid: 'placeholder-m1-v3' },
        { title: 'روٹین اور وقت کی منصوبہ بندی', duration: '14 منٹ', focus: 'daily planning system', videoUid: 'placeholder-m1-v4' },
      ]),
    },
    {
      id: 'm2',
      title: 'کیریئر کا انتخاب',
      lessons: createModuleLessons('m2', 'کیریئر کا انتخاب', [
        { title: 'مختلف کیریئر کے راستے', duration: '20 منٹ', focus: 'career tracks overview', videoUid: 'fb6e5f113a4ad665c7130baaf685a3e9' },
        { title: 'پاکستان میں ابھرتے ہوئے شعبے', duration: '25 منٹ', focus: 'emerging sectors in Pakistan', videoUid: 'placeholder-m2-v2' },
        { title: 'صحیح فیصلہ کیسے کریں', duration: '18 منٹ', focus: 'decision-making framework', videoUid: 'placeholder-m2-v3' },
      ]),
    },
    {
      id: 'm3',
      title: 'نوکوری تلاش اور درخواست',
      lessons: createModuleLessons('m3', 'نوکوری تلاش اور درخواست', [
        { title: 'سی وی بنانے کا فن', duration: '22 منٹ', focus: 'CV structure and clarity', videoUid: 'placeholder-m3-v1' },
        { title: 'کور لیٹر لکھنا', duration: '16 منٹ', focus: 'cover letter personalization', videoUid: 'placeholder-m3-v2' },
        { title: 'آن لائن جاب پورٹلز کا استعمال', duration: '14 منٹ', focus: 'job portals and applications', videoUid: 'placeholder-m3-v3' },
        { title: 'نوکوری کی تلاش کی حکمت عملی', duration: '20 منٹ', focus: 'job search system', videoUid: 'placeholder-m3-v4' },
      ]),
    },
    {
      id: 'm4',
      title: 'انٹرویو کی تیاری',
      lessons: createModuleLessons('m4', 'انٹرویو کی تیاری', [
        { title: 'انٹرویو سے پہلے کی تیاری', duration: '18 منٹ', focus: 'pre-interview checklist', videoUid: 'placeholder-m4-v1' },
        { title: 'عام سوالات اور جوابات', duration: '25 منٹ', focus: 'question and answer practice', videoUid: 'placeholder-m4-v2' },
        { title: 'پریزنٹیشن اور باڈی لینگویج', duration: '16 منٹ', focus: 'presentation and body language', videoUid: 'placeholder-m4-v3' },
      ]),
    },
    {
      id: 'm5',
      title: 'کاروبار شروع کرنا',
      lessons: createModuleLessons('m5', 'کاروبار شروع کرنا', [
        { title: 'کاروباری ذہن کی تعمیر', duration: '20 منٹ', focus: 'business mindset', videoUid: 'placeholder-m5-v1' },
        { title: 'بزنس آئیڈیا کی پہچان', duration: '18 منٹ', focus: 'finding a business idea', videoUid: 'placeholder-m5-v2' },
        { title: 'بجٹ اور منصوبہ بندی', duration: '22 منٹ', focus: 'budgeting and planning', videoUid: 'placeholder-m5-v3' },
        { title: 'مارکیٹنگ کی بنیادیں', duration: '16 منٹ', focus: 'basic marketing system', videoUid: 'placeholder-m5-v4' },
      ]),
    },
    {
      id: 'm6',
      title: 'ذاتی ترقی اور نیٹ ورکنگ',
      lessons: createModuleLessons('m6', 'ذاتی ترقی اور نیٹ ورکنگ', [
        { title: 'ذاتی برانڈ کی تعمیر', duration: '18 منٹ', focus: 'personal branding', videoUid: 'placeholder-m6-v1' },
        { title: 'نیٹ ورکنگ کی اہمیت', duration: '15 منٹ', focus: 'professional networking', videoUid: 'placeholder-m6-v2' },
        { title: 'مسلسل سیکھنے کی عادت', duration: '20 منٹ', focus: 'lifelong learning habits', videoUid: 'placeholder-m6-v3' },
      ]),
    },
  ],
};

export const articles: Article[] = [
  kahliArticle,
  {
    id: '1',
    title: 'پاکستان میں نوجوانوں کے لیے بہترین کیریئر آپشنز 2025',
    excerpt:
      'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ اسی طرح ہمارے معاشرے میں...',
    coverImage:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'کیریئر رہنمائی',
    author: 'ڈاکٹر عامر خان',
    publishedAt: '15 جنوری 2025',
    readingTime: '8 منٹ',
    content: [
      { type: 'heading', text: 'تعارف' },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ اسی طرح ہمارے معاشرے میں نوجوانوں کو کیریئر کے حوالے سے درست رہنمائی کی ضرورت ہے تاکہ وہ اپنی صلاحیتوں کو بہترین طریقے سے استعمال کر سکیں۔',
      },
      {
        type: 'quote',
        text: 'کامیابی وہ نہیں جو آپ حاصل کرتے ہیں، بلکہ وہ ہے جو آپ بن جاتے ہیں۔',
      },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ اسی طرح ہمارے معاشرے میں نوجوانوں کو کیریئر کے حوالے سے درست رہنمائی کی ضرورت ہے تاکہ وہ اپنی صلاحیتوں کو بہترین طریقے سے استعمال کر سکیں۔',
      },
      { type: 'heading', text: 'ابھرتے ہوئے شعبے' },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ اسی طرح ہمارے معاشرے میں نوجوانوں کو کیریئر کے حوالے سے درست رہنمائی کی ضرورت ہے۔',
      },
      {
        type: 'image',
        src: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        alt: 'کیریئر رہنمائی',
      },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ اسی طرح ہمارے معاشرے میں نوجوانوں کو کیریئر کے حوالے سے درست رہنمائی کی ضرورت ہے تاکہ وہ اپنی صلاحیتوں کو بہترین طریقے سے استعمال کر سکیں۔',
      },
      { type: 'heading', text: 'نتیجہ' },
      {
        type: 'paragraph',
        text: 'جن خاندانوں میں اولاد کی پرورش کے ساتھ ساتھ تعلیم پر بھی توجہ دی جاتی ہے، وہاں بچے زیادہ قابل بن کر ابھرتے ہیں۔ اسی طرح ہمارے معاشرے میں نوجوانوں کو کیریئر کے حوالے سے درست رہنمائی کی ضرورت ہے۔',
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
    category: 'کاروباری',
    author: 'ڈاکٹر عامر خان',
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
    category: 'نوکوری تلاش',
    author: 'ڈاکٹر عامر خان',
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
    author: 'ڈاکٹر عامر خان',
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
    category: 'کاروباری',
    author: 'ڈاکٹر عامر خان',
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
    author: 'ڈاکٹر عامر خان',
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

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'علی احمد',
    role: 'سافٹ ویئر انجینئر، لاہور',
    avatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    quote:
      'شمع.pk کا کورس میرے کیریئر کا موڑ ثابت ہوا۔ میں نے صاف رہنمائی پائی اور آج میں ایک اچھی نوکوری پر ہوں۔',
  },
  {
    id: '2',
    name: 'فاطمہ خان',
    role: 'فری لانسر، کراچی',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    quote:
      'اردو میں کیریئر رہنمائی ملنا ایک نیا تجربہ تھا۔ شمع.pk کے مواد نے مجھے اپنا کاروبار شروع کرنے کا اعتماد دیا۔',
  },
  {
    id: '3',
    name: 'حسن رضا',
    role: 'گریجویٹ طالب علم، اسلام آباد',
    avatar:
      'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    quote:
      'کورس کے بعد میرا انٹرویو کا خوف ختم ہو گیا۔ میں نے پہلی کوشش میں نوکوری حاصل کر لی۔',
  },
];

export const navLinks = [
  { label: 'کورس', href: '/course' },
  { label: 'مضامین', href: '/articles' },
  { label: 'ہمارے بارے میں', href: '/about' },
  { label: 'رابطہ', href: '/contact' },
];

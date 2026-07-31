import { kahliArticle } from '@/lib/articles/kahli';
import { module2Lecture2NotesArticle } from '@/lib/articles/module2-lecture2-notes';

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
  type: 'heading' | 'paragraph' | 'quote' | 'image' | 'callout' | 'checklist' | 'component';
  text?: string;
  src?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  items?: string[];
  tone?: 'research' | 'highlight' | 'tip';
  footer?: string;
  componentKey?:
    | 'CompetitionInfographic'
    | 'FourStagesTimeline'
    | 'BenefitsChallenges'
    | 'FinancialROI'
    | 'AlternativeFields';
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

const module1IntroNotesArticle: LessonArticle = {
  excerpt:
    'یہ نوٹس پاکستانی نوجوانوں کو فوری دولت کے فریب سے بچتے ہوئے حقیقی مہارت، عملی منصوبہ بندی اور پائیدار کیریئر کامیابی کی طرف رہنمائی دیتے ہیں۔',
  coverImage:
    'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  content: [
    { type: 'heading', text: 'Module 1 تعارف: کیریئر رہنمائی کی اہمیت — نوٹس' },
    {
      type: 'paragraph',
      text: 'پاکستانی نوجوان کے لیے اصل کامیابی جلد امیر بننے کے خواب نہیں، بلکہ مہارت، محنت، دیانت داری، صبر اور حقیقت پسندانہ منصوبہ بندی ہے۔ آن لائن دنیا میں مواقع بھی موجود ہیں اور دھوکے بھی؛ فرق صرف اس نوجوان کو سمجھ آتا ہے جو پہلے تحقیق، پھر فیصلہ اور آخر میں عمل کرتا ہے۔',
    },
    {
      type: 'paragraph',
      text: 'سوشل میڈیا پر "گھر بیٹھے روزانہ ہزاروں روپے" اور "صرف موبائل سے لاکھوں" جیسے دعوے نوجوان کی بے روزگاری، مالی دباؤ اور بہتر مستقبل کی خواہش کو نشانہ بناتے ہیں۔ اسی لیے جذباتی فیصلے کے بجائے یہ سمجھنا ضروری ہے کہ آمدن کہاں سے آ رہی ہے اور ذمہ داری کس کی ہوگی۔',
    },
    {
      type: 'quote',
      text: 'پائیدار کامیابی جوئے، شارٹ کٹ اور فریب سے نہیں بلکہ علم، ہنر اور محنت سے حاصل ہوتی ہے۔',
    },
    { type: 'heading', text: 'آن لائن کمائی کے نام پر دھوکا کیسے پہچانیں؟' },
    {
      type: 'paragraph',
      text: 'بہت سی اسکیمیں نوجوانوں کی مجبوری، لالچ، بے صبری اور کم معلومات سے فائدہ اٹھاتی ہیں۔ دھوکے باز عموماً فوری منافع کا وعدہ، کم یا صفر محنت کا دعویٰ، اور پہلے رقم جمع کروانے کا مطالبہ کرتے ہیں۔',
    },
    {
      type: 'checklist',
      title: 'عام فراڈ اسکیموں کی نشانیاں',
      items: [
        '"پہلے 5 ہزار جمع کرو، پھر روزانہ 2 ہزار کماؤ"',
        '"دو لوگوں کو شامل کرو اور بونس حاصل کرو"',
        '"خودکار ٹریڈنگ سے منافع کی گارنٹی"',
        '"سرمایہ لگاؤ، روزانہ منافع لو"',
        '"VIP ممبرشپ خرید کر کمائی شروع کرو"',
      ],
    },
    {
      type: 'callout',
      title: 'ایک طاقتور اصول',
      tone: 'tip',
      text: 'اگر کوئی شخص بغیر مہارت، بغیر محنت، بغیر خطرے اور بغیر واضح کاروباری ماڈل کے غیر معمولی منافع کا وعدہ کرے تو اسے موقع نہیں بلکہ خطرے کی گھنٹی سمجھیں۔',
    },
    { type: 'heading', text: 'آن لائن جوئے اور بیٹنگ ایپس کا جال' },
    {
      type: 'paragraph',
      text: 'بیٹنگ ایپس اور نام نہاد فینٹسی یا فوری منافع پلیٹ فارمز اکثر گیم یا تفریح کے نام پر نوجوان کو پیسہ لگانے کی عادت میں مبتلا کرتے ہیں۔ ابتدائی جیت ایک نفسیاتی جال بنتی ہے جس کے بعد نقصان بڑھتا جاتا ہے۔',
    },
    {
      type: 'checklist',
      title: 'آن لائن جوئے کے نمایاں نقصانات',
      items: [
        'مالی نقصان اور قرضوں میں اضافہ',
        'ذہنی دباؤ اور شرمندگی',
        'تعلیم اور کام سے غفلت',
        'خاندانی مسائل',
        'مزید پیسے جیتنے کی خطرناک نفسیاتی خواہش',
      ],
    },
    {
      type: 'paragraph',
      text: 'جوئے کی بنیادی حقیقت یہ ہے کہ نظام ہمیشہ آپریٹر کے فائدے کے لیے ڈیزائن کیا جاتا ہے۔ یہ نوجوان کو محنت کے بجائے قسمت پر انحصار کرنا سکھاتا ہے، جو طویل مدت میں تباہ کن ثابت ہو سکتا ہے۔',
    },
    { type: 'heading', text: 'فری لانسنگ: موقع حقیقی ہے، مگر جادو نہیں' },
    {
      type: 'paragraph',
      text: 'فائیور اور دیگر پلیٹ فارمز پر کامیابی کے لیے مہارت، پورٹ فولیو، مسلسل رابطہ، مناسب قیمت، وقت کی پابندی اور کلائنٹ کا اعتماد ضروری ہے۔ صرف اکاؤنٹ بنا لینے سے آرڈرز خود بخود نہیں آتے۔',
    },
    {
      type: 'checklist',
      title: 'فری لانسنگ کے ابتدائی چیلنجز',
      items: [
        'شدید عالمی مقابلہ',
        'ابتدائی آرڈر حاصل کرنے میں وقت',
        'مسلسل سیکھنے اور کمیونیکیشن کی ضرورت',
        'کلائنٹس کی سخت توقعات اور ڈیڈ لائنز',
      ],
    },
    {
      type: 'paragraph',
      text: 'بہتر حکمتِ عملی یہ ہے کہ ایک سروس منتخب کریں (مثلاً لوگو ڈیزائن، ویڈیو ایڈیٹنگ یا ترجمہ)، پانچ سے دس مضبوط نمونے تیار کریں، پھر چھوٹے کلائنٹس کے ساتھ اعتماد بناتے ہوئے آگے بڑھیں۔',
    },
    { type: 'heading', text: 'یوٹیوب کے بڑے دعوے اور حقیقت' },
    {
      type: 'paragraph',
      text: '"ایک مہینے میں لاکھوں"، "24 گھنٹوں میں آمدن" یا "خفیہ طریقہ" جیسے عنوانات اکثر سنسنی پیدا کرنے کے لیے ہوتے ہیں۔ حقیقی کامیابی میں وقت، ناکامیوں سے سیکھنا، اور مستقل مزاجی لازمی ہوتی ہے۔',
    },
    {
      type: 'callout',
      title: 'توجہ بیچنے کا کاروبار',
      tone: 'research',
      text: 'بہت سے کریئیٹرز کا اصل مقصد تعلیم نہیں بلکہ آپ کی توجہ، کلک اور واچ ٹائم حاصل کرنا ہوتا ہے۔ ہر دکھائی جانے والی کامیابی حقیقت نہیں ہوتی۔',
    },
    { type: 'heading', text: 'اصل راستہ: پہلے مہارت، پھر آمدن' },
    {
      type: 'paragraph',
      text: 'مستقل اور جائز کمائی ایسی مہارتوں سے آتی ہے جن کی مارکیٹ میں حقیقی ضرورت ہو، جیسے گرافک ڈیزائن، ویب ڈویلپمنٹ، پروگرامنگ، ڈیجیٹل مارکیٹنگ، ویڈیو ایڈیٹنگ، کنٹینٹ رائٹنگ، ڈیٹا اینالسز اور ای کامرس۔',
    },
    {
      type: 'checklist',
      title: '3 سے 6 ماہ کا حقیقت پسندانہ پلان',
      items: [
        'ایک وقت میں صرف ایک مہارت منتخب کریں',
        'روزانہ 1 سے 2 گھنٹے سیکھنے اور مشق کے لیے مقرر کریں',
        'ہر ہفتے ایک چھوٹا پراجیکٹ مکمل کریں',
        'تیسرے مہینے تک سادہ پورٹ فولیو اور واضح سروس آفر تیار کریں',
        'ابتدا چھوٹے یا مقامی کلائنٹس سے کریں',
      ],
    },
    { type: 'heading', text: 'خود کو محفوظ رکھنے کی عملی چیک لسٹ' },
    {
      type: 'checklist',
      title: 'کسی بھی آن لائن موقع سے پہلے یہ سوال ضرور کریں',
      items: [
        'کیا کمپنی یا شخص کی شناخت واضح ہے؟',
        'کیا آمدن کا ذریعہ واضح ہے یا صرف دعویٰ کیا جا رہا ہے؟',
        'کیا پہلے پیسے جمع کروانے کا مطالبہ ہے؟',
        'کیا منافع کی گارنٹی دی جا رہی ہے؟',
        'کیا معتبر ذرائع پر اس موقع کے خلاف شکایات یا وارننگز موجود ہیں؟',
        'کیا آپ پر جلد فیصلہ کرنے کا دباؤ ڈالا جا رہا ہے؟',
      ],
    },
    {
      type: 'callout',
      title: 'محفوظ عادتیں',
      tone: 'highlight',
      text: 'آن لائن جوئے، بیٹنگ ایپس اور گارنٹیڈ منافع اسکیموں سے دور رہیں۔ ذاتی معلومات اور بینک تفصیلات غیر معتبر افراد کو نہ دیں۔ فری لانسنگ کو پیشے کی طرح لیں اور روزانہ مہارت بہتر بنائیں۔',
    },
    { type: 'heading', text: 'اختتامیہ' },
    {
      type: 'paragraph',
      text: 'پاکستانی نوجوان کے پاس آج عالمی مواقع موجود ہیں، مگر ان مواقع کے درمیان فریب بھی ہے۔ جو نوجوان سوشل میڈیا کے شور سے اوپر اٹھ کر مہارت، دیانت، کردار اور مسلسل محنت کو اختیار کرتا ہے، وہ آہستہ آہستہ مضبوط اور خودمختار مستقبل بناتا ہے۔',
    },
  ],
};

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
      lessons: (() => {
        const lessons = createModuleLessons('m1', 'بنیادیں: خود کو پہچانیں', [
          { title: 'تعارف: کیریئر رہنمائی کی اہمیت', duration: '12 منٹ', focus: 'کیریئر رہنمائی کا بنیادی مقصد', videoUid: '05364cb45c1b5ac9bc091c709da5e527' },
          { title: 'اپنی صلاحیتوں کی شناخت', duration: '18 منٹ', focus: 'strengths اور interests map کرنے کا طریقہ', videoUid: 'placeholder-m1-v2' },
          { title: 'دلچسپی اور مہارت کا توازن', duration: '15 منٹ', focus: 'interest-skill fit', videoUid: 'placeholder-m1-v3' },
          { title: 'روٹین اور وقت کی منصوبہ بندی', duration: '14 منٹ', focus: 'daily planning system', videoUid: 'placeholder-m1-v4' },
        ]);

        const introTextLesson = lessons.find((lesson) => lesson.kind === 'text' && lesson.id === 'm1-t1');
        if (introTextLesson) {
          introTextLesson.duration = '15 منٹ پڑھائی';
          introTextLesson.article = module1IntroNotesArticle;
        }

        return lessons;
      })(),
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
  module2Lecture2NotesArticle,
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

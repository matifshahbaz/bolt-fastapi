import type { Course, CourseLesson } from '@/lib/data';
import { COURSE_PRICE } from '@/lib/course-policy';
import { webDevelopmentModule1Lesson1Notes } from '@/lib/articles/web-development-module1-lesson1-notes';
import { webDevelopmentModule1Lesson2Notes } from '@/lib/articles/web-development-module1-lesson2-notes';
import { webDevelopmentModule2Lesson1Notes } from '@/lib/articles/web-development-module2-lesson1-notes';
import { webDevelopmentModule2Lesson2Notes } from '@/lib/articles/web-development-module2-lesson2-notes';
import { webDevelopmentModule2Lesson3Notes } from '@/lib/articles/web-development-module2-lesson3-notes';
import { webDevelopmentModule3Lesson1Notes } from '@/lib/articles/web-development-module3-lesson1-notes';
import { webDevelopmentModule3Lesson2Notes } from '@/lib/articles/web-development-module3-lesson2-notes';
import { webDevelopmentModule3Lesson3Notes } from '@/lib/articles/web-development-module3-lesson3-notes';
import { webDevelopmentModule4Lesson1Notes } from '@/lib/articles/web-development-module4-lesson1-notes';
import { webDevelopmentModule4Lesson2Notes } from '@/lib/articles/web-development-module4-lesson2-notes';

function comingSoonLesson(moduleId: string, lessonNumber: number, title: string, duration = '20 منٹ'): CourseLesson {
  return {
    id: `${moduleId}-t${lessonNumber}`,
    kind: 'text',
    title,
    duration,
    comingSoon: true,
  };
}

function videoLesson(moduleId: string, lessonNumber: number, title: string, duration: string, videoUid: string): CourseLesson {
  return {
    id: `${moduleId}-v${lessonNumber}`,
    kind: 'video',
    title,
    duration,
    videoUid,
  };
}

export const webDevelopmentLearnAndEarnCourse: Course = {
  id: 'web-development-learn-and-earn',
  slug: 'web-development-learn-and-earn',
  code: 'SHAMA-WEB101-EARN',
  title: 'اپنی پہلی ویب سائٹ بناؤ اور کمانا شروع کرو',
  subtitle: 'ایک ہنر جو آپ کو ڈگری سے پہلے کمانا سکھا دے',
  description:
    'یہ کوئی بورنگ کتاب والا کورس نہیں۔ ہم پاکستانی مثالوں سے بالکل صفر سے سیکھیں گے کہ کوڈ سے ویب سائٹ کیسے بنتی ہے۔ آخر میں آپ کے پاس اپنی ذاتی لائیو ویب سائٹ ہوگی جس کا لنک آپ اپنے WhatsApp Status، CV اور فری لانسنگ پروفائل پر لگا سکیں گے۔',
  coverImage: '/courses/web-development-learn-and-earn-cover.png',
  introVideo: '/videos/web-development-course-intro.mp4',
  duration: 'تقریباً 1 گھنٹہ',
  lessons: 17,
  level: 'Zero to Hero — کوئی سابقہ تجربہ ضروری نہیں',
  language: 'آسان اردو',
  price: COURSE_PRICE,
  availability: 'available',
  instructor: {
    name: 'عاطف شہباز',
    title: 'بانی، شمع.pk',
    bio: 'عاطف شہباز شمع.pk پر پاکستانی نوجوانوں کے لیے اردو میں عملی کیریئر، کاروبار اور ڈیجیٹل مہارتوں کی رہنمائی فراہم کرتے ہیں۔',
  },
  heroPoints: [
    'پاکستان دنیا کی نمایاں فری لانسنگ مارکیٹوں میں شامل ہے۔',
    'فیصل آباد کی کپڑے کی دکان ہو، لاہور کی بریانی شاپ ہو، یا کراچی کا سکول — ہر کاروبار کو آج ایک مؤثر ویب موجودگی چاہیے۔',
    'ایک سادہ کاروباری ویب سائٹ مقامی اور عالمی مارکیٹ میں قابلِ فروخت خدمت بن سکتی ہے۔',
    'یہ کورس آپ کو صرف ویب سائٹ بنانا نہیں، بلکہ اس ہنر سے پہلی کمائی کی تیاری کرنا سکھائے گا۔ لیپ ٹاپ اور انٹرنیٹ ہے تو آپ تیار ہیں۔',
  ],
  audience: [
    'بالکل صفر سے ویب ڈویلپمنٹ سیکھنا چاہتے ہیں',
    'اپنی پہلی پروفیشنل ویب سائٹ بنانا چاہتے ہیں',
    'تعلیم کے ساتھ ایک قابلِ فروخت ہنر حاصل کرنا چاہتے ہیں',
    'لوکل کاروباروں کے لیے ویب سائٹس بنانا چاہتے ہیں',
    'Fiverr یا Upwork پر ویب ڈویلپمنٹ شروع کرنا چاہتے ہیں',
    'اپنا پورٹ فولیو، CV اور یونیورسٹی پروفائل مضبوط بنانا چاہتے ہیں',
  ],
  audienceNote: 'لیپ ٹاپ، انٹرنیٹ اور روزانہ پریکٹس کے لیے وقت کافی ہے۔ پہلے سے کوڈنگ جاننا ضروری نہیں۔',
  bonuses: [
    'فری لانسنگ پروفائل بنانے کی ٹیمپلیٹ',
    'کلائنٹ سے بات کرنے کے 3 تیار شدہ میسج',
    'قیمت طے کرنے کا سادہ فارمولا',
  ],
  included: [
    'رجسٹرڈ طلبہ کو خصوصی واٹس ایپ گروپ میں شامل کیا جائے گا، جہاں گروپ کے اندر انسٹرکٹر کی جانب سے رہنمائی اور معاونت فراہم کی جائے گی۔',
  ],
  outcomes: [
    'کسی بھی کاروبار کے لیے پروفیشنل ویب سائٹ کا HTML ڈھانچہ اور CSS ڈیزائن بنانا',
    'ویب سائٹ کو موبائل اور کمپیوٹر دونوں پر خوب صورت اور قابلِ استعمال بنانا',
    'JavaScript سے بٹن، نام اور چھوٹا سکور بورڈ جیسی انٹرایکشن بنانا',
    'اپنی ویب سائٹ کو مفت میں دنیا بھر کے لیے لائیو کرنا',
    'اپنا پورٹ فولیو تیار کرکے لوکل کلائنٹس کو کام دکھانا',
    'Fiverr پر پہلا Gig اور کلائنٹ میسج تیار کرنا',
  ],
  earningPaths: [
    {
      title: 'راستہ 1',
      subtitle: 'لوکل بزنس — سب سے جلدی کمائی',
      description: 'اپنے شہر کی بیکری، بوتیک، اکیڈمی یا موبائل شاپ کو نمونہ ویب سائٹ دکھائیں۔ کورس میں کلائنٹ ڈھونڈنے، ضرورت سمجھنے اور قیمت پیش کرنے کا طریقہ شامل ہوگا۔',
    },
    {
      title: 'راستہ 2',
      subtitle: 'فری لانسنگ — ڈالرز میں کمائی',
      description: 'Fiverr اور Upwork پروفائل، پورٹ فولیو، Gig اور پہلا کلائنٹ میسج تیار کرنا سیکھیں۔',
    },
    {
      title: 'راستہ 3',
      subtitle: 'ماہانہ آمدنی',
      description: 'ویب سائٹ کی اپڈیٹس، مواد اور بنیادی دیکھ بھال کے لیے ماہانہ سروس پیکیج بنانا سیکھیں۔',
    },
    {
      title: 'راستہ 4',
      subtitle: 'اپنی خود کی ویب سائٹ',
      description: 'عید کارڈز، بلاگ، مقامی معلومات یا کرکٹ کی خبروں کی اپنی ویب سائٹ بنا کر audience اور اشتہاری آمدنی کے امکانات سمجھیں۔',
    },
    {
      title: 'راستہ 5',
      subtitle: 'CV اور یونیورسٹی میں برتری',
      description: 'صرف “MS Word آتا ہے” کے بجائے لائیو پروجیکٹ اور Web Developer پورٹ فولیو کے ساتھ اپنی عملی صلاحیت دکھائیں۔',
    },
  ],
  actionPlan: 'ہفتہ 4 تک اپنی ویب سائٹ تیار کریں، ہفتہ 5 میں فری لانسنگ پروفائل بنائیں، اور ہفتہ 6 میں پہلے 3 لوکل کلائنٹس کو اپنا کام بھیجیں۔',
  parentMessage: 'یہ کورس آپ کے بچے کو صرف گیم کھیلنے والا نہیں، ڈیجیٹل چیزیں بنانے والا بنائے گا۔ یہ ایک محفوظ اور عزت والا ہنر ہے جس کی پریکٹس گھر بیٹھے کی جا سکتی ہے اور جو مستقبل میں تعلیم کے اخراجات میں مدد دینے کی صلاحیت پیدا کر سکتا ہے۔',
  certificate: 'کورس مکمل کرنے پر شمع.pk کا Learn & Earn Web Developer تکمیل سرٹیفکیٹ اور اپنی لائیو ویب سائٹ کا لنک ملے گا، جسے نوکری، یونیورسٹی یا کلائنٹ کے سامنے پیش کیا جا سکے گا۔',
  earningsDisclaimer: 'آمدنی کی مثالیں ضمانت نہیں ہیں۔ اصل کمائی مہارت، پورٹ فولیو، مارکیٹ، مستقل مزاجی اور کلائنٹ حاصل کرنے کی صلاحیت پر منحصر ہوگی۔',
  modules: [
    {
      id: 'web-m1',
      title: 'بنیاد — ویب کیا ہے؟',
      lessons: [
        videoLesson('web-m1', 1, 'سبق 1.1: انٹرنیٹ کیا ہے؟ اور Hello Pakistan والی پہلی ویب سائٹ', '38 سیکنڈ', '0b00c32d618e1d06775ff2717f7e2ea3'),
        {
          id: 'web-m1-t1',
          kind: 'text',
          title: 'سبق 1.1: انٹرنیٹ کیا ہے؟ اور Hello Pakistan والی پہلی ویب سائٹ',
          duration: '7 منٹ پڑھائی',
          article: webDevelopmentModule1Lesson1Notes,
        },
        videoLesson('web-m1', 2, 'سبق 1.2: اپنا ورکشاپ VS Code پر تیار کرو اور موبائل سیٹ اپ', '1 منٹ 33 سیکنڈ', 'a9ca7bfc2add3fbd5c737dba838b1a26'),
        {
          id: 'web-m1-t2',
          kind: 'text',
          title: 'سبق 1.2: اپنا ورکشاپ VS Code پر تیار کرو اور موبائل سیٹ اپ',
          duration: '6 منٹ پڑھائی',
          article: webDevelopmentModule1Lesson2Notes,
        },
      ],
    },
    {
      id: 'web-m2',
      title: 'HTML — ویب سائٹ کی اینٹیں',
      lessons: [
        videoLesson('web-m2', 1, 'سبق 2.1: بریانی شاپ کا مینو بناتے ہیں — HTML کی لسٹیں', '1 منٹ 10 سیکنڈ', '3fade0897fe1e03317646f109e7f72c5'),
        {
          id: 'web-m2-t1',
          kind: 'text',
          title: 'سبق 2.1: بریانی شاپ کا مینو بناتے ہیں — HTML کی لسٹیں',
          duration: '7 منٹ پڑھائی',
          article: webDevelopmentModule2Lesson1Notes,
        },
        videoLesson('web-m2', 2, 'سبق 2.2: تصویر اور لنک لگانا — دکان کو اصلی بناؤ', '1 منٹ 41 سیکنڈ', '44f93a35e03cfdf845607c3ab1bda47e'),
        {
          id: 'web-m2-t2',
          kind: 'text',
          title: 'سبق 2.2: تصویر اور لنک لگانا — دکان کو اصلی بناؤ',
          duration: '6 منٹ پڑھائی',
          article: webDevelopmentModule2Lesson2Notes,
        },
        videoLesson('web-m2', 3, 'سبق 2.3: آرڈر فارم بنانا — گاہک سے ڈیٹا لینا', '2 منٹ 47 سیکنڈ', 'c400fd0d1bcc802e5e74c41ae13231a2'),
        {
          id: 'web-m2-t3',
          kind: 'text',
          title: 'سبق 2.3: آرڈر فارم بنانا — گاہک سے ڈیٹا لینا',
          duration: '7 منٹ پڑھائی',
          article: webDevelopmentModule2Lesson3Notes,
        },
      ],
    },
    {
      id: 'web-m3',
      title: 'CSS — ڈیزائن اور خوبصورتی',
      lessons: [
        videoLesson('web-m3', 1, 'سبق 3.1: ویب سائٹ کو رنگین بنانا — CSS کا جادو', '2 منٹ 53 سیکنڈ', 'de1e6755bcafee342d7755664f909426'),
        {
          id: 'web-m3-t1',
          kind: 'text',
          title: 'سبق 3.1: ویب سائٹ کو رنگین بنانا — CSS کا جادو',
          duration: '9 منٹ پڑھائی',
          article: webDevelopmentModule3Lesson1Notes,
        },
        videoLesson('web-m3', 2, 'سبق 3.2: Box Model اور Layout — دکان کو ترتیب دینا', '4 منٹ 29 سیکنڈ', '884b678f334ed266b884b025c096bed0'),
        {
          id: 'web-m3-t2',
          kind: 'text',
          title: 'سبق 3.2: Box Model اور Layout — دکان کو ترتیب دینا',
          duration: '9 منٹ پڑھائی',
          article: webDevelopmentModule3Lesson2Notes,
        },
        {
          id: 'web-m3-t3',
          kind: 'text',
          title: 'سبق 3.3: موبائل فرینڈلی ویب سائٹ — Responsive ڈیزائن',
          duration: '9 منٹ پڑھائی',
          article: webDevelopmentModule3Lesson3Notes,
        },
      ],
    },
    {
      id: 'web-js',
      title: 'JavaScript — ویب سائٹ میں انٹرایکشن شامل کرنا',
      lessons: [
        videoLesson('web-js', 1, 'سبق 4.1: بریانی کیلکولیٹر بناتے ہیں — JavaScript کا تعارف (حصہ 1)', '3 منٹ 48 سیکنڈ', '44b4314b226d00b21ff0e5cec50a3408'),
        videoLesson('web-js', 2, 'سبق 4.2: بریانی کیلکولیٹر مکمل کرتے ہیں — JavaScript فنکشنلٹی (حصہ 2)', '3 منٹ 44 سیکنڈ', '122564897bfbc034175aeb5fada92267'),
      ],
    },
    {
      id: 'web-m4',
      title: 'ویب سائٹ لائیو کریں اور پہلا کلائنٹ حاصل کریں',
      hidden: true,
      lessons: [
        {
          id: 'web-m4-t1',
          kind: 'text',
          title: 'سبق 4.1: ویب سائٹ کو انٹرنیٹ پر لائیو کرنا — ڈومین اور ہوسٹنگ',
          duration: '8 منٹ پڑھائی',
          article: webDevelopmentModule4Lesson1Notes,
        },
        {
          id: 'web-m4-t2',
          kind: 'text',
          title: 'سبق 4.2: پہلا کلائنٹ کیسے لیں؟ — Fiverr اور لوکل مارکیٹنگ',
          duration: '9 منٹ پڑھائی',
          article: webDevelopmentModule4Lesson2Notes,
        },
      ],
    },
    {
      id: 'web-m5',
      title: 'فائنل پراجیکٹ — میرا پاکستان پورٹ فولیو',
      hidden: true,
      lessons: [
        comingSoonLesson('web-m5', 1, 'پورٹ فولیو کی منصوبہ بندی اور مواد'),
        comingSoonLesson('web-m5', 2, 'پورٹ فولیو بنانا: تعارف، مہارتیں اور پراجیکٹس'),
        comingSoonLesson('web-m5', 3, 'موبائل ٹیسٹنگ، اصلاح اور آخری جائزہ'),
      ],
    },
    {
      id: 'web-m6',
      title: 'لائیو کرو اور لوکل کمائی شروع کرو — EARN MODULE 1',
      hidden: true,
      lessons: [
        comingSoonLesson('web-m6', 1, 'Domain اور Hosting کیا ہے؟ — پلاٹ اور گھر کی مثال'),
        comingSoonLesson('web-m6', 2, 'اپنی ویب سائٹ مفت میں لائیو کیسے کریں'),
        comingSoonLesson('web-m6', 3, 'پہلا لوکل کلائنٹ: Facebook گروپس اور WhatsApp'),
        comingSoonLesson('web-m6', 4, 'کلائنٹ کی ضرورت سمجھنا اور کام کی حد طے کرنا'),
        comingSoonLesson('web-m6', 5, 'کلائنٹ کو کتنا بل بھیجنا ہے؟ — قیمت کا فارمولا'),
      ],
    },
    {
      id: 'web-m7',
      title: 'فری لانسنگ سے ڈالر کماؤ — EARN MODULE 2',
      hidden: true,
      lessons: [
        comingSoonLesson('web-m7', 1, 'Fiverr پروفائل جو اعتماد پیدا کرے'),
        comingSoonLesson('web-m7', 2, 'اپنا پہلا Web Development Gig بنائیں'),
        comingSoonLesson('web-m7', 3, 'پہلا میسج، سوالات اور پہلا آرڈر'),
        comingSoonLesson('web-m7', 4, 'JazzCash، Easypaisa اور Payoneer سے رقم وصول کرنا'),
        comingSoonLesson('web-m7', 5, 'بونس: کلائنٹ میسج کے 3 تیار شدہ ٹیمپلیٹ'),
      ],
    },
  ],
};
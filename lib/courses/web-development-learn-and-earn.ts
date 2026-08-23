import type { Course, CourseLesson } from '@/lib/data';
import { COURSE_PRICE } from '@/lib/course-policy';

function comingSoonLesson(moduleId: string, lessonNumber: number, title: string, duration = '20 منٹ'): CourseLesson {
  return {
    id: `${moduleId}-t${lessonNumber}`,
    kind: 'text',
    title,
    duration,
    comingSoon: true,
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
  duration: 'تقریباً 4 گھنٹے',
  lessons: 24,
  level: 'Zero to Hero — کوئی سابقہ تجربہ ضروری نہیں',
  language: 'آسان اردو',
  price: COURSE_PRICE,
  availability: 'coming-soon',
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
        comingSoonLesson('web-m1', 1, 'انٹرنیٹ کیسے کام کرتا ہے؟ — ڈاک خانے کی مثال'),
        comingSoonLesson('web-m1', 2, 'اپنا سسٹم تیار کرنا — براؤزر، VS Code اور فولڈر'),
      ],
    },
    {
      id: 'web-m2',
      title: 'HTML — ویب سائٹ کی اینٹیں',
      lessons: [
        comingSoonLesson('web-m2', 1, 'HTML کا تعارف اور پہلا ویب صفحہ'),
        comingSoonLesson('web-m2', 2, 'لاہور فوڈ سٹریٹ کا مینو بناتے ہیں'),
        comingSoonLesson('web-m2', 3, 'تصویری گیلری اور عید دعوت کا فارم'),
      ],
    },
    {
      id: 'web-m3',
      title: 'CSS — ڈیزائن اور خوبصورتی',
      lessons: [
        comingSoonLesson('web-m3', 1, 'رنگ، فونٹ، فاصلے اور Box Model'),
        comingSoonLesson('web-m3', 2, 'ٹرک آرٹ سے متاثر Responsive ڈیزائن'),
        comingSoonLesson('web-m3', 3, 'پراجیکٹ: عید مبارک کارڈ ویب سائٹ'),
      ],
    },
    {
      id: 'web-m4',
      title: 'JavaScript — ویب سائٹ میں جان ڈالنا',
      lessons: [
        comingSoonLesson('web-m4', 1, 'JavaScript کی بنیاد: Variables، Functions اور Events'),
        comingSoonLesson('web-m4', 2, 'بٹن پر کلک سے نام ظاہر کرنا'),
        comingSoonLesson('web-m4', 3, 'پراجیکٹ: PSL کا چھوٹا سکور بورڈ'),
      ],
    },
    {
      id: 'web-m5',
      title: 'فائنل پراجیکٹ — میرا پاکستان پورٹ فولیو',
      lessons: [
        comingSoonLesson('web-m5', 1, 'پورٹ فولیو کی منصوبہ بندی اور مواد'),
        comingSoonLesson('web-m5', 2, 'پورٹ فولیو بنانا: تعارف، مہارتیں اور پراجیکٹس'),
        comingSoonLesson('web-m5', 3, 'موبائل ٹیسٹنگ، اصلاح اور آخری جائزہ'),
      ],
    },
    {
      id: 'web-m6',
      title: 'لائیو کرو اور لوکل کمائی شروع کرو — EARN MODULE 1',
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
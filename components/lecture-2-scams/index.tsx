import type { ReactNode } from 'react';
import {
  AlertTriangle,
  BadgeDollarSign,
  BriefcaseBusiness,
  Check,
  CircleDollarSign,
  LockKeyhole,
  SearchCheck,
  ShieldCheck,
  TrendingDown,
  Users,
  X,
} from 'lucide-react';

type PanelProps = {
  children: ReactNode;
  className: string;
};

function Panel({ children, className }: PanelProps) {
  return (
    <section
      dir="rtl"
      data-lecture-2-artifact
      className={`overflow-hidden rounded-lg p-5 shadow-xl sm:p-8 ${className}`}
    >
      {children}
    </section>
  );
}

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`inline-flex rounded-full px-4 py-1 text-base font-bold ${dark ? 'bg-slate-950 text-amber-200' : 'bg-white text-slate-900'}`}>
      shama.pk
    </span>
  );
}

const fraudSigns = [
  'کام شروع کرنے سے پہلے “رجسٹریشن فیس” یا “سیکیورٹی ڈپازٹ” مانگا جائے',
  'کسی ایپ کو پلے اسٹور کے بجائے صرف مخصوص لنک سے ڈاؤن لوڈ کرنے کو کہا جائے',
  'واٹس ایپ یا ٹیلیگرام گروپ میں مسلسل “کامیابی کی کہانیاں” دکھائی جائیں',
  'دوسروں کو ریفر کرنے پر اضافی کمائی کا لالچ دیا جائے',
  'بغیر مہارت یا کام کے روزانہ کی گارنٹیڈ آمدنی کا وعدہ ہو',
  'چند دنوں میں امیر بننے یا زندگی بدل جانے کے دعوے ہوں',
];

const fakeJobSigns = [
  'جعلی جاب ایجنسیاں جو سرکاری رجسٹریشن کے بغیر کام کرتی ہیں',
  'نوکری کی تصدیق سے پہلے ویزا، میڈیکل یا پروسیسنگ فیس کا مطالبہ',
  'بغیر تجربے کے غیر معمولی تنخواہ، اعلیٰ عہدہ یا فوری ویزا',
  'ایسی سوشل پوسٹس جن میں کمپنی کا باضابطہ نام یا ویب سائٹ نہ ہو',
];

const freelancingSteps = [
  'ایک واضح اور محدود مہارت منتخب کریں',
  'پلیٹ فارم پر جانے سے پہلے اس مہارت میں قابلیت حاصل کریں',
  'مقامی یا کم قیمت کام سے ایک مضبوط پورٹ فولیو بنائیں',
  'پیشہ ورانہ رابطہ رکھیں، وقت پر کام دیں اور اچھے ریویوز حاصل کریں',
  'مسلسل سیکھیں اور مارکیٹ کی بدلتی ضروریات سمجھیں',
];

const safetyTips = [
  'کمپنی یا پلیٹ فارم کا نام “scam” یا “reviews” کے ساتھ تلاش کریں',
  'OTP، بینک تفصیل، CNIC تصویر یا موبائل بینکنگ پاس ورڈ شیئر نہ کریں',
  'رجسٹریشن، سیکیورٹی یا ایکٹیویشن فیس مانگی جائے تو رک جائیں',
  '“صرف آج” جیسی پیشکش پر فوری فیصلہ نہ کریں',
  'رقم یا بیرون ملک ملازمت کے معاملے میں قابل اعتماد بڑے سے مشورہ کریں',
  'دھوکہ ہونے پر NCCIA ہیلپ لائن 1799 یا آن لائن پورٹل پر رپورٹ کریں',
];

export function LectureTitleHero() {
  return (
    <Panel className="min-h-[520px] bg-[#21133f] text-white sm:min-h-[600px]">
      <div className="flex items-start justify-between gap-4">
        <Brand />
        <span className="rounded-full bg-amber-300 px-4 py-1 text-base font-bold text-[#21133f]">لیکچر 2</span>
      </div>
      <div className="mx-auto mt-16 max-w-3xl text-center sm:mt-24">
        <p className="text-xl text-amber-200 sm:text-2xl">آن لائن کیریئر گائیڈنس سیریز</p>
        <h2 className="mt-4 text-4xl font-bold leading-[1.55] sm:text-6xl">آن لائن فراڈ اور جھوٹے وعدے</h2>
        <p className="mt-4 text-2xl leading-[1.6] text-amber-200 sm:text-4xl">اپنا وقت اور پیسہ کیسے بچائیں</p>
        <div className="mx-auto mt-7 h-1 w-28 bg-amber-300" />
        <p className="mt-9 text-xl leading-[2] text-white/80 sm:text-2xl">
          فیک وائسز کو پہچاننا، سنہرے خوابوں کی حقیقت سمجھنا، اور محفوظ کیریئر کی طرف قدم بڑھانا
        </p>
      </div>
      <div className="mt-12 flex justify-center">
        <span className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 text-lg">
          <LockKeyhole className="h-5 w-5 text-amber-300" /> محفوظ رہنمائی
        </span>
      </div>
    </Panel>
  );
}

export function OnlineEarningDreams() {
  return (
    <Panel className="bg-[#104b46] text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl leading-[1.6] text-amber-200 sm:text-4xl">آن لائن کمائی کے سنہرے خواب اور حقیقت</h2>
        <Brand />
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="border-r-4 border-red-400 bg-black/20 p-5">
          <h3 className="flex items-center gap-2 text-2xl text-red-200"><X className="h-6 w-6" /> جھوٹا دعویٰ</h3>
          <p className="mt-3 text-xl leading-[2]">“گھر بیٹھے، موبائل سے، بغیر کسی مہارت کے، روزانہ ہزاروں روپے کمائیں”</p>
        </div>
        <div className="border-r-4 border-emerald-300 bg-black/20 p-5">
          <h3 className="flex items-center gap-2 text-2xl text-emerald-200"><Check className="h-6 w-6" /> اصل حقیقت</h3>
          <p className="mt-3 text-xl leading-[2]">حقیقی کمائی مہارت، وقت، محنت، صبر اور اعتماد کے بغیر نہیں بنتی۔ شارٹ کٹ اکثر نقصان پر ختم ہوتا ہے۔</p>
        </div>
      </div>
      <p className="mt-7 border border-white/15 bg-white/10 p-5 text-xl leading-[2] text-white/90">
        اگر کوئی سسٹم واقعی اتنی آسانی سے پیسہ دیتا، تو ہر شخص اپنی نوکری چھوڑ کر وہی کام کر رہا ہوتا۔
      </p>
    </Panel>
  );
}

export function FraudWarningSigns() {
  return (
    <Panel className="bg-[#991b1b] text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 text-3xl leading-[1.6] sm:text-4xl"><AlertTriangle className="h-9 w-9 text-amber-300" /> خطرے کی علامات</h2>
        <Brand />
      </div>
      <div className="mt-7 grid gap-4">
        {fraudSigns.map((sign, index) => (
          <div key={sign} className="flex items-start gap-4 border border-white/20 bg-black/15 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-300 font-bold text-red-950">{index + 1}</span>
            <p className="text-xl leading-[1.9]">{sign}</p>
          </div>
        ))}
      </div>
      <p className="mt-7 border-r-4 border-amber-300 bg-black/25 p-5 text-xl leading-[2] text-amber-100">
        حقیقی مواقع آپ سے پہلے پیسے نہیں مانگتے؛ وہ کام مکمل ہونے کے بعد آپ کو ادائیگی کرتے ہیں۔
      </p>
    </Panel>
  );
}

export function FakeJobsOverseas() {
  return (
    <Panel className="bg-[#173b73] text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl leading-[1.6] sm:text-4xl">جعلی نوکریاں اور بیرونِ ملک روزگار کے دھوکے</h2>
        <BriefcaseBusiness className="h-10 w-10 text-amber-300" />
      </div>
      <p className="mt-6 border border-white/15 bg-white/10 p-5 text-xl leading-[2] text-cyan-50">
        “دبئی میں فوری نوکری، صرف پروسیسنگ فیس جمع کروائیں” جیسے دعوے پورے خاندان کی جمع پونجی نگل سکتے ہیں۔
      </p>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {fakeJobSigns.map((sign) => (
          <p key={sign} className="border-r-4 border-amber-300 bg-white p-5 text-xl leading-[1.9] text-slate-900">{sign}</p>
        ))}
      </div>
      <div className="mt-7 bg-amber-300 p-5 text-slate-950">
        <h3 className="flex items-center gap-2 text-2xl font-bold"><SearchCheck className="h-6 w-6" /> محفوظ رہنے کا اصول</h3>
        <p className="mt-2 text-xl leading-[1.9]">BE&OE پر ایجنسی، اور کمپنی کو اس کی ویب سائٹ اور LinkedIn پر تصدیق کریں۔ جائز نوکری پہلے رقم نہیں مانگتی۔</p>
      </div>
    </Panel>
  );
}

export function NetworkMarketingTrap() {
  return (
    <Panel className="bg-[#086044] text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl leading-[1.6] sm:text-4xl">نیٹ ورک مارکیٹنگ اور “بزنس اپرچیونٹی” کا دھوکہ</h2>
        <Brand />
      </div>
      <p className="mt-6 border border-white/15 bg-black/20 p-5 text-xl leading-[2]">
        MLM اکثر “فنانشل فریڈم” کے نام پر مہنگی مصنوعات اور نئے ممبر شامل کرنے کا نظام پیش کرتا ہے۔ اصل خطرہ تب ہے جب کمائی فروخت کے بجائے لوگوں کو جوائن کروانے سے آئے۔
      </p>
      <div className="mx-auto mt-7 max-w-xl border border-white/20 bg-black/20 p-6 text-center">
        <Users className="mx-auto h-14 w-14 text-amber-300" />
        <p className="mt-3 text-2xl text-amber-200">پیرامڈ ماڈل</p>
        <div className="mx-auto mt-4 grid max-w-sm grid-cols-2 gap-3">
          <span className="bg-white/15 p-3">نئے ممبر</span><span className="bg-white/15 p-3">نئے ممبر</span>
          <span className="bg-red-300/30 p-3">نقصان</span><span className="bg-red-300/30 p-3">نقصان</span>
        </div>
      </div>
      <p className="mt-7 border-r-4 border-amber-300 bg-white p-5 text-xl leading-[1.9] text-emerald-950">
        اگر زور پروڈکٹ کے معیار کے بجائے “نیچے لوگ جوڑنے” اور مہنگی اسٹارٹر کٹ خریدنے پر ہو تو یہ خطرے کی واضح علامت ہے۔
      </p>
    </Panel>
  );
}

export function GamblingTradingTrap() {
  const stages = [
    ['شروع میں چھوٹی جیت', 'پانچ سو لگائیں، سات سو واپس؛ اعتماد بنتا ہے کہ یہ واقعی کام کر رہا ہے۔'],
    ['پھر بڑی رقم', 'ادھار لے کر یا گھر کے اخراجات سے بچا کر زیادہ رقم لگائی جاتی ہے۔'],
    ['نقصان کا جال', '“بس ایک اور کوشش” کی سوچ انسان کو مزید نقصان تک لے جاتی ہے۔'],
  ];

  return (
    <Panel className="bg-[#34205f] text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl leading-[1.6] sm:text-4xl">آن لائن جوئے اور ٹریڈنگ کے چمکدار جال</h2>
        <CircleDollarSign className="h-10 w-10 text-amber-300" />
      </div>
      <p className="mt-3 text-xl leading-[1.9] text-fuchsia-100">بیٹنگ ایپس، کلر پریڈکشن اور “ماہرانہ سگنلز” یقینی منافع کا لبادہ اوڑھتے ہیں۔</p>
      <div className="mt-7 grid gap-4">
        {stages.map(([title, text], index) => (
          <div key={title} className="flex items-start gap-4 border border-white/15 bg-black/20 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-300 font-bold text-slate-950">{index + 1}</span>
            <div><h3 className="text-2xl text-amber-200">{title}</h3><p className="mt-1 text-xl leading-[1.9] text-white/85">{text}</p></div>
          </div>
        ))}
      </div>
      <p className="mt-7 flex items-start gap-3 bg-white p-5 text-xl leading-[1.9] text-slate-950">
        <TrendingDown className="mt-2 h-7 w-7 shrink-0 text-red-600" /> حقیقی سرمایہ کاری ریگولیٹ ہوتی ہے۔ بغیر لائسنس “یقینی منافع” سے فاصلہ رکھیں۔
      </p>
    </Panel>
  );
}

export function FakeSuccessHeroes() {
  const warnings = [
    ['جعلی ثبوت', 'صرف اسکرین شاٹس، کوئی قابل تصدیق ثبوت نہیں'],
    ['من گھڑت کہانیاں', 'طلبہ کی کامیابی کے منظم یا بنائے ہوئے ریویوز'],
    ['فوری فیصلے کا دباؤ', '“صرف اگلے چوبیس گھنٹے” تاکہ تحقیق کا وقت نہ ملے'],
  ];

  return (
    <Panel className="bg-[#7e246f] text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl leading-[1.6] sm:text-4xl">سوشل میڈیا کے جعلی “کامیابی کے ہیرو”</h2>
        <Brand />
      </div>
      <p className="mt-6 border border-white/20 bg-black/15 p-5 text-xl leading-[2]">مہنگی گاڑیوں اور ہوٹلوں کے ساتھ “ایک راز” بیچنے والے خود ساختہ گرو اکثر اپنی اصل کمائی کورس فروخت کر کے بناتے ہیں۔</p>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {warnings.map(([title, text]) => (
          <div key={title} className="bg-white p-5 text-slate-900"><h3 className="text-2xl font-bold text-fuchsia-900">{title}</h3><p className="mt-2 text-lg leading-[1.9]">{text}</p></div>
        ))}
      </div>
      <p className="mt-7 bg-amber-200 p-5 text-xl font-bold leading-[1.9] text-fuchsia-950">جو شخص بار بار اپنی امارت دکھا کر آپ سے پیسے مانگے، اس کے دعوے کی آزاد ذرائع سے تصدیق کریں۔</p>
    </Panel>
  );
}

export function FreelancingReality() {
  return (
    <Panel className="bg-[#16467d] text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl leading-[1.6] sm:text-4xl">فری لانسنگ کی حقیقت: موقع بھی، مقابلہ بھی</h2>
        <BadgeDollarSign className="h-10 w-10 text-cyan-200" />
      </div>
      <p className="mt-6 border border-white/15 bg-black/15 p-5 text-xl leading-[2]">فائیور اور اپ ورک حقیقی مواقع دیتے ہیں، مگر نیا اکاؤنٹ بنتے ہی آرڈر نہیں لیتا۔ مقابلہ عالمی ہے اور نتیجہ وقت مانگتا ہے۔</p>
      <h3 className="mt-7 text-2xl text-cyan-200">اصل کامیابی کا راستہ</h3>
      <div className="mt-4 grid gap-4">
        {freelancingSteps.map((step, index) => (
          <div key={step} className="flex items-start gap-4 bg-white p-4 text-slate-900"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-700 font-bold text-white">{index + 1}</span><p className="text-xl leading-[1.9]">{step}</p></div>
        ))}
      </div>
      <p className="mt-7 bg-cyan-200 p-5 text-xl font-bold leading-[1.9] text-slate-950">اصل سرمایہ قابل اعتماد مہارت اور مستقل مزاجی ہے، فوری کمائی کا وعدہ نہیں۔</p>
    </Panel>
  );
}

export function SafetyTips() {
  return (
    <Panel className="bg-[#166534] text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 text-3xl leading-[1.6] sm:text-4xl"><ShieldCheck className="h-10 w-10 text-amber-300" /> خود کو کیسے محفوظ رکھیں</h2>
        <Brand />
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {safetyTips.map((tip, index) => (
          <div key={tip} className="flex items-start gap-3 border-t-4 border-amber-300 bg-white p-5 text-green-950"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-800">{index + 1}</span><p className="text-lg leading-[1.9]">{tip}</p></div>
        ))}
      </div>
      <p className="mt-7 border border-white/20 bg-black/20 p-5 text-center text-xl leading-[1.9]">چوکنا رہنا، سوال پوچھنا اور دو بار سوچنا آپ کی بہترین حفاظت ہے۔</p>
    </Panel>
  );
}

export function FinalMessage() {
  return (
    <Panel className="border border-amber-300 bg-[#fff4c7] text-amber-950">
      <div className="flex justify-end"><Brand dark /></div>
      <div className="mx-auto mt-8 max-w-4xl text-center">
        <p className="text-xl text-amber-800">آخری بات، نوجوان ساتھیو</p>
        <h2 className="mt-3 text-4xl font-bold leading-[1.55] sm:text-5xl">کوئی شارٹ کٹ آپ کے مستقبل کی جگہ نہیں لے سکتا</h2>
        <p className="mt-7 text-xl leading-[2]">آن لائن دنیا میں حقیقی مواقع بھی ہیں اور فائدہ اٹھانے والی آوازیں بھی۔ فرق تحقیق، مہارت اور صبر سے واضح ہوتا ہے۔</p>
        <div className="mt-7 grid gap-4 text-right md:grid-cols-2">
          <div className="border-r-4 border-red-500 bg-white p-5"><h3 className="flex items-center gap-2 text-2xl font-bold text-red-800"><X className="h-6 w-6" /> فاصلہ رکھیں</h3><p className="mt-2 text-lg leading-[1.9] text-red-900">پہلے رقم، یقینی نتیجہ اور فوری فیصلے کا دباؤ مانگنے والے راستے سے۔</p></div>
          <div className="border-r-4 border-green-600 bg-white p-5"><h3 className="flex items-center gap-2 text-2xl font-bold text-green-800"><Check className="h-6 w-6" /> اصل راستہ</h3><p className="mt-2 text-lg leading-[1.9] text-green-900">مہارت، وقت، مسلسل محنت اور قابل تصدیق رہنمائی مانگنے والا راستہ۔</p></div>
        </div>
        <p className="mt-7 bg-[#21133f] p-6 text-2xl leading-[1.9] text-amber-200">چوکنا رہیں، سوال پوچھیں، اور کسی “سنہرے موقع” پر یقین کرنے سے پہلے دو بار سوچیں۔</p>
      </div>
    </Panel>
  );
}
import type { ReactNode } from 'react';
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  CheckCircle2,
  DoorOpen,
  GraduationCap,
  Handshake,
  KeyRound,
  MessageCircle,
  Scale,
  Stethoscope,
  Store,
  TrendingUp,
  Wrench,
} from 'lucide-react';

function Artifact({ children, className }: { children: ReactNode; className: string }) {
  return (
    <section
      dir="rtl"
      data-sales-artifact
      className={`w-full overflow-hidden rounded-lg border shadow-xl ${className}`}
    >
      {children}
    </section>
  );
}

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`inline-flex rounded-full px-4 py-1 text-sm font-bold ${dark ? 'bg-slate-950 text-amber-200' : 'bg-white text-slate-900'}`}>
      shama.pk
    </span>
  );
}

export function SalesHero() {
  const highlights = [
    ['سب سے بڑی تنخواہیں اور بونس', BadgeDollarSign],
    ['کمپنی کی آمدن کا بنیادی راستہ', BriefcaseBusiness],
    ['ترقی کے واضح اور قابلِ پیمائش مواقع', TrendingUp],
  ] as const;

  return (
    <Artifact className="border-amber-200 bg-[#fff8ed] p-5 text-slate-950 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Brand />
        <span className="rounded-full bg-slate-950 px-4 py-1 text-sm font-bold text-amber-200">لیکچر 4.3</span>
      </div>
      <div className="mx-auto mt-8 max-w-3xl text-center">
        <p className="text-lg text-amber-800 sm:text-xl">بیس سال کا مشاہدہ</p>
        <h2 className="mt-2 text-3xl font-bold leading-[1.7] sm:text-5xl">ہر کمپنی میں سب سے زیادہ کون کماتا ہے؟</h2>
        <p className="mt-3 text-2xl font-bold text-amber-700 sm:text-3xl">سیلز ڈیپارٹمنٹ کی طاقت</p>
      </div>
      <div className="mt-8 bg-slate-950 p-5 text-xl leading-[2] text-white sm:p-7 sm:text-2xl">
        جو پیسہ کمپنی کے اندر لاتا ہے، طاقت اور پیسہ دونوں اسی کے پاس جاتے ہیں۔
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {highlights.map(([text, Icon]) => (
          <div key={text} className="flex items-start gap-3 border border-amber-200 bg-white p-4">
            <Icon className="mt-1 h-6 w-6 shrink-0 text-amber-700" />
            <p className="text-lg leading-[1.9]">{text}</p>
          </div>
        ))}
      </div>
    </Artifact>
  );
}

export function SalesShameReasons() {
  const reasons = [
    ['ہم نے سیلز کو دکانداری سمجھ لیا ہے', 'ہنر کے بجائے طبقے کا فیصلہ'],
    ['پرانا تصور اب بھی گھروں میں موجود ہے', 'دنیا بدل گئی مگر تصویر نہیں بدلی'],
    ['کارکردگی سب کے سامنے نظر آتی ہے', 'ناکامی چھپانے کی جگہ نہیں ملتی'],
    ['سماجی حیثیت کا غیر ضروری دباؤ', 'رشتے کے کاغذ پر سیلز اچھا نہیں لگتا'],
  ];

  return (
    <Artifact className="border-orange-200 bg-orange-50">
      <div className="bg-[#3f2519] p-5 text-white sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full border border-amber-200/40 px-4 py-1 text-sm text-amber-100">سیکشن 1</span>
          <Brand />
        </div>
        <h2 className="mt-5 text-3xl font-bold leading-[1.7] sm:text-4xl">ہم سیلز سے شرماتے کیوں ہیں؟</h2>
      </div>
      <div className="grid gap-3 p-5 sm:p-7">
        {reasons.map(([title, detail], index) => (
          <div key={title} className="flex items-start gap-4 border-r-4 border-orange-700 bg-white p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-800 font-bold text-white">{index + 1}</span>
            <div>
              <h3 className="text-xl font-bold leading-[1.8] text-slate-950">{title}</h3>
              <p className="text-lg leading-[1.8] text-slate-600">{detail}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="bg-[#3f2519] p-5 text-lg leading-[2] text-orange-100 sm:px-7">
        اس شرم کی قیمت یہ ہے کہ ہزاروں نوجوان ایک کھلے دروازے کے سامنے سے خاموشی سے گزر جاتے ہیں۔
      </p>
    </Artifact>
  );
}

export function SalesOpenDoor() {
  return (
    <Artifact className="border-emerald-800 bg-[#123f39] p-5 text-white sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full border border-emerald-100/30 px-4 py-1 text-sm text-emerald-100">سیکشن 2</span>
        <DoorOpen className="h-9 w-9 text-amber-200" />
      </div>
      <h2 className="mt-5 text-3xl font-bold leading-[1.7] text-white sm:text-5xl">وہ دروازہ جو کبھی بند نہیں ہوتا</h2>
      <div className="mt-7 bg-[#fffaf0] p-5 text-center text-2xl font-bold leading-[2] text-emerald-950 sm:p-7 sm:text-3xl">
        مجھے تنخواہ نہ دیں، میں آپ کا مال بیچوں گا، جتنا بیچوں اس کا کمیشن دے دیں۔
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
        <KeyRound className="h-12 w-12 text-amber-200" />
        <p className="text-xl leading-[2] text-emerald-50">
          آپ مانگ نہیں رہے، کمپنی کو آمدن دے رہے ہیں۔ اگر فروخت نہ ہو تو کمپنی کا خطرہ کم، اور فروخت ہو تو دونوں کا فائدہ ہے۔
        </p>
      </div>
    </Artifact>
  );
}

export function SalesFastGrowth() {
  return (
    <Artifact className="border-slate-200 bg-white">
      <div className="bg-[#102a43] p-5 text-white sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold leading-[1.7] sm:text-4xl">ترقی سب سے تیز یہیں ہوتی ہے</h2>
            <p className="mt-1 text-lg text-blue-100">فیصلہ رائے سے نہیں، ہندسے سے ہوتا ہے</p>
          </div>
          <TrendingUp className="h-10 w-10 shrink-0 text-amber-300" />
        </div>
      </div>
      <div className="grid md:grid-cols-2">
        <div className="border-b p-5 md:border-b-0 md:border-l sm:p-7">
          <h3 className="text-2xl font-bold text-emerald-800">سیلز میں ہندسہ بولتا ہے</h3>
          <p className="mt-2 text-xl leading-[2] text-slate-700">کارکردگی ہر مہینے ایک واضح عدد میں سب کے سامنے ہوتی ہے۔</p>
        </div>
        <div className="p-5 sm:p-7">
          <h3 className="text-2xl font-bold text-orange-800">باقی شعبوں میں رائے چلتی ہے</h3>
          <p className="mt-2 text-xl leading-[2] text-slate-700">باس کی رائے، ٹیم کے تعلقات اور سفارش فیصلہ متاثر کرسکتے ہیں۔</p>
        </div>
      </div>
      <p className="m-5 bg-[#102a43] p-5 text-center text-2xl font-bold leading-[1.8] text-amber-300 sm:m-7">
        ہندسے کے سامنے سفارش کمزور پڑ جاتی ہے۔
      </p>
    </Artifact>
  );
}

export function SalesClosing() {
  const professions = [
    ['ڈاکٹر', 'مریض کو علاج مکمل کرنے پر قائل کرتا ہے', Stethoscope],
    ['وکیل', 'جج کے سامنے اپنا مقدمہ پیش کرتا ہے', Scale],
    ['انجینئر', 'اپنا ڈیزائن منظور کرواتا ہے', Wrench],
    ['استاد', 'علم کی قدر طلبہ تک پہنچاتا ہے', GraduationCap],
    ['فری لانسر', 'کلائنٹ کو اپنی مہارت پر قائل کرتا ہے', Handshake],
    ['سرکاری افسر', 'اپنی تجویز اور فائل آگے بڑھاتا ہے', BriefcaseBusiness],
  ] as const;

  return (
    <Artifact className="border-amber-200 bg-[#fff8ed] p-5 text-slate-950 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Brand dark />
        <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-bold text-amber-900">آخری سبق</span>
      </div>
      <h2 className="mt-6 text-center text-3xl font-bold leading-[1.7] sm:text-5xl">سیلز مین آپ کو بننا ہی پڑے گا</h2>
      <p className="mt-3 text-center text-xl leading-[2] text-amber-900 sm:text-2xl">دنیا میں کوئی پیشہ ایسا نہیں جس میں آپ بیچنے سے بچ جائیں۔</p>
      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {professions.map(([title, detail, Icon]) => (
          <div key={title} className="border border-amber-200 bg-white p-4 text-center">
            <Icon className="mx-auto h-8 w-8 text-amber-700" />
            <h3 className="mt-2 text-xl font-bold">{title}</h3>
            <p className="mt-1 text-base leading-[1.9] text-slate-600">{detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 bg-slate-950 p-5 text-white sm:p-7">
        <div className="flex items-start gap-4">
          <MessageCircle className="mt-1 h-8 w-8 shrink-0 text-amber-300" />
          <p className="text-xl leading-[2]">آپ انٹرویو میں خود کو، تنخواہ کی بات میں اپنا کام، اور کیریئر کے فیصلے میں اپنا راستہ پیش کرتے ہیں۔</p>
        </div>
      </div>
      <div className="mt-5 flex items-start gap-4 border-2 border-amber-300 bg-amber-50 p-5">
        <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-amber-800" />
        <p className="text-xl font-bold leading-[2] text-amber-950">سوال یہ نہیں کہ آپ بیچیں گے یا نہیں؛ سوال یہ ہے کہ آپ اسے اچھا کریں گے یا برا۔</p>
      </div>
    </Artifact>
  );
}
import type { ReactNode } from 'react';
import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  CheckCircle2,
  Clock3,
  Coins,
  Compass,
  FileCheck2,
  GraduationCap,
  Heart,
  Laptop,
  PhoneCall,
  Scale,
  Search,
  Sparkles,
  Wrench,
} from 'lucide-react';

const paths = [
  { label: 'پری میڈیکل', icon: GraduationCap },
  { label: 'پری انجینئرنگ', icon: Wrench },
  { label: 'کمپیوٹر سائنس', icon: Laptop },
  { label: 'کامرس', icon: Calculator },
  { label: 'ہیومینٹیز', icon: BookOpen },
  { label: 'ٹیکنیکل ہنر', icon: BriefcaseBusiness },
];

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <section
      className="relative w-full overflow-hidden rounded-lg border border-[#12355b]/15 bg-[#f7f9fc] p-5 text-right shadow-[0_18px_46px_rgba(18,53,91,0.12)] sm:p-8"
      dir="rtl"
      aria-label={label}
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-[#1fa971]" />
      {children}
      <div className="mt-7 flex items-center justify-end gap-2 border-t border-[#12355b]/10 pt-4" dir="ltr">
        <span className="font-sans text-sm font-bold text-[#12355b]">shama.pk</span>
        <span className="h-1 w-8 bg-[#f5b700]" />
      </div>
    </section>
  );
}

function Factor({ icon: Icon, children }: { icon: typeof Heart; children: ReactNode }) {
  return (
    <div className="flex min-h-20 items-center gap-3 rounded-lg border border-[#12355b]/10 bg-white p-4 text-[#082a52] shadow-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e7f6ef] text-[#0d8657]">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-lg font-bold leading-relaxed">{children}</span>
    </div>
  );
}

export function ShamaArticleHeroBanner() {
  return (
    <Frame label="میٹرک کے بعد تعلیم اور کیریئر کے راستے">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="mb-2 text-base font-bold text-[#0d8657]">فیصلہ معلومات کی بنیاد پر کریں</p>
          <h2 className="text-3xl font-nastaliq leading-[1.7] text-[#082a52] sm:text-4xl">
            میٹرک کے بعد کیا کریں؟
          </h2>
          <p className="mt-3 text-xl leading-[2] text-[#40566a]">
            رزلٹ ایک نمبر بتاتا ہے، منزل نہیں۔ اپنی قابلیت، دلچسپی اور حالات کو سمجھ کر راستہ منتخب کریں۔
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="rounded-lg border-2 border-[#1fa971]/40 bg-white p-4 text-center">
            <FileCheck2 className="mx-auto h-10 w-10 text-[#0d8657]" />
            <p className="mt-2 text-xl font-bold text-[#082a52]">میٹرک رزلٹ</p>
            <p className="text-base text-[#627485]">آغاز کی معلومات</p>
          </div>
          <Compass className="h-9 w-9 text-[#f5b700]" />
          <div className="grid grid-cols-2 gap-2">
            {paths.map(({ label, icon: Icon }) => (
              <div key={label} className="rounded-lg border border-[#12355b]/10 bg-white p-3 text-center">
                <Icon className="mx-auto h-5 w-5 text-[#1fa971]" />
                <span className="mt-1 block text-sm font-bold leading-relaxed text-[#082a52]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function ScopeDecision() {
  return (
    <Frame label="صرف اسکوپ کے بجائے مکمل معلومات سے فیصلہ">
      <h2 className="text-3xl font-nastaliq leading-[1.7] text-[#082a52] sm:text-4xl">صرف اسکوپ کافی نہیں</h2>
      <div className="mt-6 grid items-center gap-5 lg:grid-cols-[0.7fr_1.6fr_0.7fr]">
        <div className="rounded-lg bg-[#1fa971] p-6 text-center text-white">
          <Search className="mx-auto h-10 w-10" />
          <strong className="mt-2 block text-2xl">اسکوپ؟</strong>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Factor icon={Heart}>دلچسپی</Factor>
          <Factor icon={Sparkles}>صلاحیت</Factor>
          <Factor icon={FileCheck2}>داخلے کی شرائط</Factor>
          <Factor icon={Coins}>اخراجات</Factor>
          <Factor icon={BriefcaseBusiness}>کام کی نوعیت</Factor>
          <Factor icon={BarChart3}>روزگار کے مواقع</Factor>
        </div>
        <div className="rounded-lg bg-[#12355b] p-6 text-center text-white">
          <Compass className="mx-auto h-10 w-10 text-[#f5b700]" />
          <strong className="mt-2 block text-2xl">باخبر فیصلہ</strong>
        </div>
      </div>
      <p className="mt-6 rounded-lg border-2 border-[#f5b700] bg-[#082a52] p-4 text-center text-xl font-bold leading-relaxed text-white">
        اچھی فیلڈ وہ ہے جو <span className="text-[#f5b700]">آپ کے لیے بھی موزوں</span> ہو
      </p>
    </Frame>
  );
}

export function AdviceCost() {
  return (
    <Frame label="مفت مشورے اور کیریئر فیصلے کی حقیقی قیمت">
      <h2 className="text-3xl font-nastaliq leading-[1.7] text-[#082a52] sm:text-4xl">بیٹا، آگے کیا کرنا ہے؟</h2>
      <div className="mt-6 grid items-center gap-5 lg:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-lg border border-[#12355b]/10 bg-white p-5">
          <PhoneCall className="mx-auto h-10 w-10 text-[#1fa971]" />
          <div className="mt-4 space-y-2 text-center text-lg text-[#082a52]">
            <p className="rounded-lg bg-[#e7f6ef] p-2">میڈیکل کرلو</p>
            <p className="rounded-lg bg-[#eef2f7] p-2">کمپیوٹر میں بہت اسکوپ ہے</p>
            <p className="rounded-lg bg-[#fff6d6] p-2">سرکاری نوکری بہتر ہے</p>
          </div>
        </div>

        <Scale className="mx-auto h-12 w-12 text-[#f5b700]" />

        <div className="grid grid-cols-2 gap-3">
          <Factor icon={Sparkles}>مفت مشورہ</Factor>
          <Factor icon={Clock3}>وقت</Factor>
          <Factor icon={BookOpen}>محنت</Factor>
          <Factor icon={Coins}>پیسہ</Factor>
        </div>
      </div>
      <div className="mt-6 flex items-start gap-3 rounded-lg bg-[#e7f6ef] p-4 text-[#082a52]">
        <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-[#0d8657]" />
        <p className="text-xl font-bold leading-relaxed">فیصلہ معلومات، تجزیے اور سوچ بچار سے کریں۔</p>
      </div>
      <p className="mt-4 rounded-lg border-2 border-[#f5b700] bg-[#082a52] p-4 text-center text-xl font-bold leading-relaxed text-white">
        مشورہ مفت ہوسکتا ہے، مگر <span className="text-[#f5b700]">وقت، محنت اور پیسہ</span> مفت نہیں ہوتا
      </p>
    </Frame>
  );
}
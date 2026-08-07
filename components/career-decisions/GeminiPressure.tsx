import { Award, Briefcase, Compass, Heart, ShieldAlert, Users } from 'lucide-react';

const innerFactors = [
  {
    title: 'نوجوان کی دلچسپی (Passion)',
    text: 'جس کام کو کرنے کا شوق دل میں ہو، اسے دباؤ کے نیچے مکمل طور پر دفن کر دیا جاتا ہے۔',
    icon: Compass,
    color: '#FF6B00',
  },
  {
    title: 'قدرتی صلاحیت (Skill & Talent)',
    text: 'ہر انسان کا دماغ الگ بنا ہے، مگر دباؤ میں اس کے اصل ٹیلنٹ کو پرکھا ہی نہیں جاتا۔',
    icon: Award,
    color: '#D97706',
  },
  {
    title: 'حقیقی حالات (Practical Reality)',
    text: 'مالی وسائل، وقت اور خاندانی ذمہ داریوں جیسے زمینی حقائق کو یکسر نظر انداز کر دیا جاتا ہے۔',
    icon: Briefcase,
    color: '#B45309',
  },
];

const externalFactors = [
  {
    title: 'محبت (گھر والوں کی خواہش)',
    text: 'والدین محبت میں اپنے ادھورے خواب یا اپنی پسند نوجوان پر تھوپ دیتے ہیں۔',
    icon: Heart,
    color: '#E11D48',
  },
  {
    title: 'خوف (مستقبل کی عدم تحفظ)',
    text: 'ناکام ہونے کا ڈر یا کسی مخصوص شعبے میں رزق نہ ملنے کا وہم غلط فیصلہ کرواتا ہے۔',
    icon: ShieldAlert,
    color: '#BE123C',
  },
  {
    title: 'معاشرتی دباؤ (لوگ کیا کہیں گے؟)',
    text: 'رشتہ داروں، دوستوں اور برادری کے طعنے اور مخصوص ڈگریوں کی جھوٹی شان کا دباؤ۔',
    icon: Users,
    color: '#9F1239',
  },
];

function FactorList({
  title,
  subtitle,
  accent,
  factors,
}: {
  title: string;
  subtitle: string;
  accent: string;
  factors: typeof innerFactors;
}) {
  return (
    <div className="space-y-6">
      <div className="border-r-4 pr-4" style={{ borderColor: accent }}>
        <h3 className="text-2xl font-bold" style={{ color: accent }}>{title}</h3>
        <p className="mt-1 text-base text-[#666]">{subtitle}</p>
      </div>
      {factors.map((factor) => {
        const Icon = factor.icon;
        return (
          <article key={factor.title} className="flex items-center gap-5 rounded-lg border bg-white p-5 shadow-sm">
            <div className="shrink-0 rounded-lg p-3.5 text-white shadow-sm" style={{ backgroundColor: factor.color }}>
              <Icon size={28} />
            </div>
            <div>
              <h4 className="mb-1 text-xl font-bold text-[#1A1A1A]">{factor.title}</h4>
              <p className="text-base leading-[1.8] text-[#4A4A4A] sm:text-lg">{factor.text}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function GeminiPressure() {
  return (
    <section className="relative w-full overflow-hidden border-y-4 border-[#E11D48] bg-[#FFFBF7] px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-[#E11D48]/20 bg-[#E11D48]/10 px-4 py-1.5 text-lg font-bold text-[#E11D48]">
            بنیادی مسئلہ اور ٹکراؤ
          </span>
          <h2 className="mx-auto max-w-4xl text-3xl font-extrabold leading-[1.8] text-[#1A1A1A] sm:text-4xl lg:text-5xl">
            مسئلہ اس وقت پیدا ہوتا ہے جب <span className="text-[#E11D48]">محبت، خوف یا معاشرتی دباؤ</span> مل کر نوجوان کی اپنی <span className="text-[#FF6B00]">دلچسپی، صلاحیت اور حالات</span> کو نظر انداز کر دیتے ہیں۔
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <FactorList
            title="نظر انداز ہونے والی اندرونی حقیقت"
            subtitle="جنہیں کچلنے سے مستقبل تاریک ہو جاتا ہے"
            accent="#FF6B00"
            factors={innerFactors}
          />
          <FactorList
            title="دباؤ ڈالنے والے بیرونی عوامل"
            subtitle="جو نادانستہ طور پر فیصلے پر حاوی ہو جاتے ہیں"
            accent="#E11D48"
            factors={externalFactors}
          />
        </div>

        <div className="mt-16 rounded-lg bg-gradient-to-r from-[#E11D48] to-[#FF6B00] p-6 text-center text-white shadow-lg">
          <p className="text-xl font-bold leading-[1.8] sm:text-2xl">
            نتیجہ: جب بیرونی دباؤ اندرونی صلاحیتوں پر غالب آ جائے، تو کیریئر کا غلط انتخاب یقینی ہو جاتا ہے۔
          </p>
          <p className="mt-2 text-lg font-medium opacity-90">
            شمع ڈاٹ پی کے (shama.pk) — آئیے مل کر اس ٹکراؤ کو ختم کریں
          </p>
        </div>
      </div>
    </section>
  );
}
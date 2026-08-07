const pathways = [
  {
    number: '۱',
    title: 'روایتی تعلیمی راستہ (ڈگری)',
    text: 'انٹرمیڈیٹ (ICS/FSc) کے بعد کسی تسلیم شدہ یونیورسٹی سے 4 سالہ بی ایس کمپیوٹر سائنس (BSCS) یا آئی ٹی ڈگری حاصل کریں۔',
    detailLabel: 'بہترین آپشن برائے:',
    detail: 'مستقل کیریئر، ریسرچ، اور بیرون ملک ملازمت کے مواقع۔',
    accent: 'teal',
  },
  {
    number: '۲',
    title: 'شارٹ کورسز اور ڈپلومہ',
    text: 'اگر 4 سالہ ڈگری ممکن نہ ہو تو 6 ماہ سے 1 سال کے پروفیشنل ڈپلومہ کورسز، جیسے ویب ڈویلپمنٹ اور ڈیٹا سائنس، کا انتخاب کریں۔',
    detailLabel: 'سرکاری پروگرامز:',
    detail: 'DigiSkills، نیوٹیک (NAVTTC) اور پی آئی اے آئی سی (PIAIC)۔',
    accent: 'indigo',
  },
  {
    number: '۳',
    title: 'خود آموزی (Self-Learning)',
    text: 'انٹرنیٹ کی مدد سے گھر بیٹھے مفت یا سستے داموں کوڈنگ اور جدید ٹیکنالوجیز سیکھیں اور خود کو بااختیار بنائیں۔',
    detailLabel: 'مفید پلیٹ فارمز:',
    detail: 'YouTube، Coursera، Udemy، اور Khan Academy۔',
    accent: 'amber',
  },
  {
    number: '۴',
    title: 'بوٹ کیمپس (Bootcamps)',
    text: 'مستند اداروں کے 3 سے 4 ماہ کے سخت تربیتی پروگرامز جو براہ راست انڈسٹری کی ضروریات کے مطابق تیار کرتے ہیں۔',
    detailLabel: 'بنیادی فائدہ:',
    detail: 'عملی پراجیکٹس، نیٹ ورکنگ اور فوری جاب کی تیاری۔',
    accent: 'rose',
  },
] as const;

const accentClasses = {
  teal: 'border-teal-500/30 text-teal-300 bg-teal-500/15',
  indigo: 'border-indigo-500/30 text-indigo-300 bg-indigo-500/15',
  amber: 'border-amber-500/30 text-amber-300 bg-amber-500/15',
  rose: 'border-rose-500/30 text-rose-300 bg-rose-500/15',
};

export function ComputerScienceCareerInfographic() {
  return (
    <section
      dir="rtl"
      data-computer-science-artifact="career-paths"
      className="mx-auto w-full max-w-4xl overflow-hidden rounded-lg border border-indigo-500/20 bg-gradient-to-br from-slate-900 to-indigo-950 p-5 text-white shadow-2xl sm:p-8"
    >
      <header className="mb-8 border-b border-indigo-500/30 pb-6 text-center sm:mb-10">
        <span className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/20 px-4 py-1.5 text-sm font-semibold text-indigo-300">
          کامیاب مستقبل کی گائیڈ
        </span>
        <h2 className="mt-4 text-3xl font-bold leading-[1.7] text-teal-300 sm:text-5xl">
          کمپیوٹر سائنس کی دنیا میں داخلے کے راستے
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg leading-[2] text-slate-300 sm:text-xl">
          پاکستانی نوجوانوں کے لیے آئی ٹی اور کمپیوٹر سائنس فیلڈ میں شمولیت اختیار کرنے کے 4 بہترین اور عملی طریقے
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {pathways.map((pathway) => (
          <article key={pathway.number} className="rounded-lg border border-slate-700 bg-slate-800/60 p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border text-2xl font-bold ${accentClasses[pathway.accent]}`}>
                {pathway.number}
              </span>
              <h3 className="min-w-0 break-words text-2xl font-bold leading-[1.7] text-white">{pathway.title}</h3>
            </div>
            <p className="mt-4 text-lg leading-[2] text-slate-300">{pathway.text}</p>
            <div className="mt-4 rounded-lg border border-slate-700/60 bg-slate-950/50 p-4">
              <span className="block text-sm font-semibold text-indigo-300">{pathway.detailLabel}</span>
              <span className="mt-1 block text-base leading-[1.8] text-slate-300">{pathway.detail}</span>
            </div>
          </article>
        ))}
      </div>

      <footer className="mt-8 rounded-lg border border-indigo-500/30 bg-indigo-950/60 p-5 text-center sm:p-6">
        <h3 className="text-xl font-bold leading-[1.8] text-indigo-200">
          یاد رکھیں: آئی ٹی فیلڈ میں ڈگری سے زیادہ آپ کی مہارت (Skills) معنی رکھتی ہے!
        </h3>
        <p className="mt-2 text-base leading-[1.9] text-slate-400">
          آج ہی کسی ایک راستے کا انتخاب کریں، پورٹ فولیو بنائیں، اور فری لانسنگ یا لوکل مارکیٹ سے اپنے کیریئر کا آغاز کریں۔
        </p>
      </footer>
    </section>
  );
}
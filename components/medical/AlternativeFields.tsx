export default function AlternativeFields() {
  const fields = [
    {
      name: 'BDS',
      urdu: 'ڈینٹل سرجن',
      scope: 'اپنا کلینک، بہترین اوقات، کم ایمرجنسی',
      tag: 'آزاد پریکٹس',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      name: 'DPT',
      urdu: 'فزیوتھراپی',
      scope: 'جوڑ، پٹھوں کا علاج، سپورٹس انجری',
      tag: 'دبئی میں ہائی ڈیمانڈ',
      color: 'bg-emerald-50 border-emerald-200',
    },
    {
      name: 'Pharm-D',
      urdu: 'فارمیسی',
      scope: 'ادویات، اپنی فارمیسی، کمپنی جاب',
      tag: 'انڈسٹری میں گروتھ',
      color: 'bg-violet-50 border-violet-200',
    },
    {
      name: 'BSN',
      urdu: 'نرسنگ',
      scope: 'ہسپتال + بیرون ملک، بہترین تنخواہ',
      tag: 'UK/Canada ویزا',
      color: 'bg-rose-50 border-rose-200',
    },
    {
      name: 'MLT/MIT',
      urdu: 'لیب ٹیکنالوجی',
      scope: 'لیب، ایکس رے، الٹرا ساؤنڈ',
      tag: 'کم سرمایہ، اپنا لیب',
      color: 'bg-amber-50 border-amber-200',
    },
  ];

  return (
    <div dir="rtl" className="w-full max-w-[900px] rounded-lg border-2 border-slate-100 bg-white p-5 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.18)] sm:p-10 md:p-12">
      <div className="mb-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="rounded-full bg-slate-900 px-5 py-2 text-xl font-bold text-white sm:text-[22px]">shama.pk</div>
        <div className="text-xl font-medium text-slate-500 sm:text-[24px]">MBBS کے علاوہ بہترین راستے</div>
      </div>
      <h2 className="mb-3 text-4xl font-bold leading-[1.4] text-slate-900 sm:text-[46px] md:text-[54px]">اگر MBBS میں داخلہ نہ ہو تو؟</h2>
      <p className="mb-8 text-xl leading-[1.8] text-slate-500 sm:mb-10 sm:text-[28px]">طب کا سمندر بہت وسیع ہے - یہ 5 شعبے آج سب سے زیادہ کامیاب ہیں</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((f, i) => (
          <div key={i} className={`flex min-w-0 flex-col items-start gap-4 rounded-lg border-2 p-5 shadow-sm sm:flex-row sm:justify-between sm:p-7 ${f.color}`}>
            <div className="min-w-0">
              <div className="flex min-w-0 flex-wrap items-center gap-3">
                <span className="shrink-0 rounded-full bg-slate-900 px-3 py-1 text-base font-bold text-white sm:text-[18px]">{f.name}</span>
                <h3 className="min-w-0 text-2xl font-bold leading-[1.5] text-slate-900 sm:text-[32px]">{f.urdu}</h3>
              </div>
              <p className="mt-3 break-words text-xl leading-[1.7] text-slate-700 sm:text-[24px]">{f.scope}</p>
            </div>
            <div className="shrink-0 self-start rounded-full border-2 bg-white px-4 py-1.5 text-base font-bold shadow-sm sm:text-[18px]">{f.tag}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-slate-900 text-white rounded-[20px] p-6 text-center text-[26px] leading-[1.5]">منزل انسانیت کی خدمت ہے، راستہ کوئی بھی ہو - <span className="text-teal-300 font-bold">shama.pk</span></div>
    </div>
  );
}

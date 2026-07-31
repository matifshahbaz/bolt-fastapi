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
    <div dir="rtl" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif" }} className="w-full max-w-[900px] bg-white rounded-[36px] border-2 border-slate-100 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.18)] p-10 md:p-12">
      <div className="flex justify-between items-center mb-3">
        <div className="bg-slate-900 text-white px-5 py-2 rounded-full text-[22px] font-bold">shama.pk</div>
        <div className="text-[24px] text-slate-500 font-medium">MBBS کے علاوہ بہترین راستے</div>
      </div>
      <h2 className="text-[46px] md:text-[54px] font-bold text-slate-900 leading-[1.2] mb-3">اگر MBBS میں داخلہ نہ ہو تو؟</h2>
      <p className="text-[28px] text-slate-500 mb-10 leading-[1.5]">طب کا سمندر بہت وسیع ہے - یہ 5 شعبے آج سب سے زیادہ کامیاب ہیں</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((f, i) => (
          <div key={i} className={`rounded-[24px] border-2 p-7 ${f.color} flex justify-between items-start shadow-sm`}>
            <div>
              <div className="flex items-center gap-3">
                <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-[18px] font-bold">{f.name}</span>
                <h3 className="text-[32px] font-bold text-slate-900 leading-[1.2]">{f.urdu}</h3>
              </div>
              <p className="text-[24px] text-slate-700 mt-3 leading-[1.5]">{f.scope}</p>
            </div>
            <div className="bg-white px-4 py-1.5 rounded-full text-[18px] font-bold border-2 shadow-sm whitespace-nowrap">{f.tag}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-slate-900 text-white rounded-[20px] p-6 text-center text-[26px] leading-[1.5]">منزل انسانیت کی خدمت ہے، راستہ کوئی بھی ہو - <span className="text-teal-300 font-bold">shama.pk</span></div>
    </div>
  );
}

export default function FourStagesTimeline() {
  const stages = [
    {
      age: 'عمر 16-18',
      title: 'مرحلہ 1: انٹرمیڈیٹ',
      desc: 'FSc پری میڈیکل + MDCAT کی بنیاد۔ یہ دو سال آپ کی پوری زندگی کا رخ طے کرتے ہیں۔ محنت، قربانی اور فوکس کا وقت۔',
      color: 'from-blue-500 to-indigo-600',
      icon: '📚',
    },
    {
      age: 'عمر 18-23',
      title: 'مرحلہ 2: ایم بی بی ایس کے 5 سال',
      desc: 'پہلے 2 سال تھیوری - ہڈیاں، نسیں، پھر 3 سال وارڈز میں۔ نیند کم، کتابیں زیادہ، مگر ڈاکٹر بننے کا احساس۔',
      color: 'from-teal-500 to-emerald-600',
      icon: '🩺',
    },
    {
      age: 'عمر 24-35',
      title: 'مرحلہ 3: سپیشلائزیشن',
      desc: 'ہاؤس جاب + FCPS / PLAB۔ کم آمدن، 36 گھنٹے ڈیوٹی۔ یہی اصل سرمایہ کاری ہے جو بعد میں رنگ لاتی ہے۔',
      color: 'from-orange-500 to-red-500',
      icon: '🎯',
    },
    {
      age: 'عمر 35+',
      title: 'مرحلہ 4: عملی زندگی',
      desc: 'کنسلٹنٹ، اپنا کلینک، گلف میں 30-40 لاکھ پیکج۔ عزت، سکون اور مالی تحفظ عروج پر۔',
      color: 'from-violet-500 to-purple-600',
      icon: '🌟',
    },
  ];

  return (
    <div dir="rtl" className="w-full max-w-[800px] rounded-lg border border-slate-100 bg-white p-5 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.18)] sm:p-10 md:p-12">
      <div className="mb-8 flex flex-col items-start gap-3 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="rounded-full bg-slate-900 px-5 py-2 text-xl font-bold text-white sm:text-[22px]">shama.pk</div>
        <div className="text-xl font-medium text-slate-400 sm:text-[24px]">4 مراحل کی مکمل جھلک</div>
      </div>
      <h2 className="mb-8 text-4xl font-bold leading-[1.4] text-slate-900 sm:mb-10 sm:text-[44px] md:text-[54px]">ڈاکٹر بننے کے 4 اہم مراحل<br /><span className="text-teal-600">آپ کا اگلا 15 سال</span></h2>

      <div className="relative">
        <div className="absolute bottom-6 right-6 top-6 w-1 rounded-full bg-slate-100 sm:right-9 sm:w-[5px]" />
        <div className="space-y-5 sm:space-y-8">
          {stages.map((s, i) => (
            <div key={i} className="relative flex min-w-0 gap-3 sm:gap-6">
              <div className={`z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-2xl shadow-xl sm:h-[72px] sm:w-[72px] sm:text-[36px] ${s.color}`}>{s.icon}</div>
              <div className="min-w-0 flex-1 rounded-lg border-2 border-slate-100 bg-slate-50 p-4 sm:p-7">
                <div className="mb-3 flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="min-w-0 text-2xl font-bold leading-[1.5] text-slate-900 sm:text-[32px]">{s.title}</h3>
                  <span className="shrink-0 rounded-full border-2 bg-white px-3 py-1 text-base font-bold text-slate-700 sm:px-4 sm:text-[20px]">{s.age}</span>
                </div>
                <p className="break-words text-xl leading-[1.8] text-slate-700 sm:text-[26px]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 text-center text-[20px] text-slate-400">ماخذ: shama.pk - کیرئیر گائیڈ بائے عاطف شہباز</div>
    </div>
  );
}

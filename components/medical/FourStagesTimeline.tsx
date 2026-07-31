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
    <div dir="rtl" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif" }} className="w-full max-w-[800px] bg-white rounded-[36px] border border-slate-100 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.18)] p-10 md:p-12">
      <div className="flex justify-between items-center mb-10">
        <div className="bg-slate-900 text-white px-5 py-2 rounded-full text-[22px] font-bold">shama.pk</div>
        <div className="text-[24px] text-slate-400 font-medium">4 مراحل کی مکمل جھلک</div>
      </div>
      <h2 className="text-[44px] md:text-[54px] font-bold leading-[1.2] text-slate-900 mb-10">ڈاکٹر بننے کے 4 اہم مراحل<br /><span className="text-teal-600">آپ کا اگلا 15 سال</span></h2>

      <div className="relative">
        <div className="absolute right-[36px] top-6 bottom-6 w-[5px] bg-slate-100 rounded-full" />
        <div className="space-y-8">
          {stages.map((s, i) => (
            <div key={i} className="relative flex gap-6">
              <div className={`w-[72px] h-[72px] rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center text-[36px] shadow-xl z-10 shrink-0`}>{s.icon}</div>
              <div className="flex-1 bg-slate-50 rounded-[24px] p-7 border-2 border-slate-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-[32px] font-bold text-slate-900 leading-[1.2]">{s.title}</h3>
                  <span className="bg-white border-2 px-4 py-1 rounded-full text-[20px] font-bold text-slate-700">{s.age}</span>
                </div>
                <p className="text-[26px] leading-[1.7] text-slate-700">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 text-center text-[20px] text-slate-400">ماخذ: shama.pk - کیرئیر گائیڈ بائے عاطف شہباز</div>
    </div>
  );
}

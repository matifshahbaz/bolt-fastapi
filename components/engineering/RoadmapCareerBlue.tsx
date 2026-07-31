import React from 'react';

export default function RoadmapCareerBlue() {
  const steps = [
    { title: 'میٹرک -', subtitle: 'بنیاد مضبوط', desc: 'سائنس اور ریاضی پر مضبوط بنیاد', icon: '📚' },
    { title: 'انٹرمیڈیٹ -', subtitle: 'ہنر سیکھیں', desc: 'فزکس، کیمسٹری اور تکنیکی ہنر', icon: '⚙️' },
    { title: 'یونیورسٹی -', subtitle: 'ڈگری اور عملی کام', desc: 'بی ای انجینئرنگ، لیب اور پروجیکٹس', icon: '🎓' },
    { title: 'تربیت -', subtitle: 'فیکٹری میں تجربہ', desc: 'انٹرنشپ اور صنعتی ماحول میں کام', icon: '🏭' },
    { title: 'پہلی نوکری -', subtitle: 'عملی تجربہ', desc: 'جونیئر انجینئر کے طور پر تجربہ', icon: '🔩' },
    { title: 'مہارت -', subtitle: 'ماہر انجینئر', desc: 'قیادت اور مشورہ کا مقام', icon: '📈' },
  ];

  return (
    <div dir="rtl" className="w-full bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb] rounded-[2rem] p-8 md:p-10 border border-blue-300/30 relative overflow-hidden" style={{fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif"}}>
      <div className="absolute top-5 left-6 bg-white text-blue-800 px-3 py-1 rounded-full text-[10px] font-bold font-sans">shama.pk</div>
      <div className="text-center mb-10 mt-4">
        <h1 className="text-4xl font-black text-white">انجینئرنگ کیریئر روڈ میپ</h1>
        <p className="text-blue-100 mt-2">قدم بہ قدم - انجینئر بننے کا کامیاب سفر - shama.pk</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 relative">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-[40px] -left-3 z-10">
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-blue-800 text-sm font-bold">←</span>
                </div>
              </div>
            )}
            <div className="bg-white rounded-2xl p-4 h-full border border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-2xl">
                {step.icon}
              </div>
              <h3 className="font-bold text-blue-900 text-[14px]">{step.title}</h3>
              <h4 className="font-bold text-blue-700 text-[13px]">{step.subtitle}</h4>
              <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <span className="text-white/70 text-xs font-sans tracking-widest">shama.pk - پاکستانی طلباء کے لیے</span>
      </div>
    </div>
  );
}

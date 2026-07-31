import React from 'react';

export default function RoadmapSkillsBlue() {
  const steps = [
    { num: '1.', title: 'ریاضی اور طبیعیات میں مہارت', desc: 'بنیادی تصورات مضبوط کریں', icon: '🧮' },
    { num: '2.', title: 'لیب اور ورکشاپ میں ہاتھ کالا کرنا', desc: 'عملی کام اور تکنیکی مہارت', icon: '🔨' },
    { num: '3.', title: 'آٹوکیڈ اور پروگرامنگ سیکھنا', desc: 'ڈیزائن اور کوڈنگ کی صلاحیت', icon: '💻' },
    { num: '4.', title: 'حفاظتی تربیت اور اصول', desc: 'حفاظتی قواعد اور پروٹوکول', icon: '⛑️' },
    { num: '5.', title: 'کاروباری سمجھ اور رپورٹنگ', desc: 'منصوبہ بندی اور رپورٹ تیاری', icon: '📊' },
    { num: '6.', title: 'مسلسل سیکھتے رہنا', desc: 'نئی ٹیکنالوجی اور علم', icon: '💡' },
  ];

  return (
    <div dir="rtl" className="w-full bg-gradient-to-br from-[#1e3a8a] to-[#3730a3] rounded-[2rem] p-8 md:p-10 border border-blue-300/30 relative overflow-hidden" style={{fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif"}}>
      <div className="absolute top-5 left-6 bg-white text-blue-800 px-3 py-1 rounded-full text-[10px] font-bold font-sans">shama.pk</div>
      <div className="text-center mb-8 mt-4">
        <h1 className="text-4xl font-black text-white">انجینئرنگ میں کامیابی کا راستہ</h1>
        <p className="text-blue-100 mt-2 text-sm">چھ مراحل پر مشتمل مہارت کی روڈ میپ - shama.pk</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-[45%] -left-2 z-10 text-white/60">←</div>
            )}
            <div className="bg-white rounded-[1.2rem] p-4 h-full shadow-xl border border-white/60 hover:shadow-2xl transition-all text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-xl">
                {step.icon}
              </div>
              <h3 className="font-bold text-blue-900 text-[13px] leading-tight">{step.num} {step.title}</h3>
              <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2">
          <span className="text-white text-xs font-sans tracking-widest">shama.pk</span>
        </div>
      </div>
    </div>
  );
}

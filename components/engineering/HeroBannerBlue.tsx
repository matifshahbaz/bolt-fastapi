import React from 'react';

export default function HeroBannerBlue() {
  return (
    <div dir="rtl" className="relative w-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6] p-8 md:p-12 text-white border border-blue-300/30" style={{fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif"}}>
      <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] bg-white/10 rounded-full blur-[60px]" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] bg-cyan-200/20 rounded-full blur-[60px]" />
      
      <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1 rounded-full text-xs font-bold tracking-widest font-sans">shama.pk</div>

      <div className="relative grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-1 text-sm mb-5 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            پاکستانی طلباء کے لیے خصوصی گائیڈ
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-[1.2] mb-5">
            انجینئرنگ:
            <br />
            <span className="text-cyan-100">ڈگری نہیں، سوچ ہے</span>
          </h1>
          <p className="text-white/90 text-[18px] leading-relaxed mb-6">
            کم وسائل میں بہترین حل نکالنے کا نام انجینئرنگ ہے۔ یہی سوچ آپ کو نوکری نہیں، عزت دلاتی ہے۔
          </p>
          <div className="flex flex-wrap gap-3 font-sans">
            <span className="px-4 py-2 bg-white text-blue-800 rounded-full font-bold text-sm">۴۰۰۰ الفاظ کی مکمل گائیڈ</span>
            <span className="px-4 py-2 bg-white/20 border border-white/30 rounded-full text-sm">میٹرک سے ماہر تک</span>
          </div>
        </div>
        <div className="relative">
          <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-[1.5rem] p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-white/80">پاکستان میں مواقع</span>
              <span className="text-xs bg-white text-blue-700 px-3 py-1 rounded-full font-bold font-sans">نئی سوچ</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>سولر انڈسٹری</span><span className="font-bold">↑ بہت زیادہ</span></div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden"><div className="w-[85%] h-full bg-white" /></div>
              <div className="flex justify-between"><span>فیکٹری آٹومیشن</span><span className="font-bold">↑ تیزی سے</span></div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden"><div className="w-[70%] h-full bg-cyan-100" /></div>
              <div className="mt-4 p-3 bg-white rounded-xl text-blue-900 text-sm leading-relaxed">
                <span className="font-bold">اصل فائدہ:</span> ہنر مند انجینئر کبھی بے روزگار نہیں رہتا - shama.pk
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

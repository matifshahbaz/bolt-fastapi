import React from 'react';
export default function BusinessCaseVsPlan() {
  return (
    <div dir="rtl" style={{ fontFamily: 'Jameel Noori Nastaleeq', direction: 'rtl', lineHeight: 2.6 }} className="business-case-artifact w-full max-w-5xl mx-auto">
      <style>{`
@font-face {
  font-family: 'Jameel Noori Nastaleeq';
  src: url('https://fonts.cdnfonts.com/s/14821/JameelNooriNastaleeq.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
.business-case-artifact, .business-case-artifact * { font-family: 'Jameel Noori Nastaleeq' !important; }
`}</style>
      <div className="rounded-[2.5rem] bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 p-[3px]">
        <div className="bg-[#FFFBF0] rounded-[2.4rem] p-10 md:p-12 relative overflow-hidden">
          <div className="flex justify-between items-center mb-10 relative">
            <h2 className="text-[44px] font-bold text-slate-900 leading-[2.2]">بزنس کیس بمقابلہ بزنس پلان</h2>
            <div className="px-4 py-2 rounded-full bg-slate-900 text-white text-[16px]">shama.pk</div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 relative">
            <div className="rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-600 p-[2px] shadow-xl">
              <div className="bg-white rounded-[1.9rem] p-8 h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-[24px] font-bold mb-6">1</div>
                <h3 className="text-[32px] font-bold text-emerald-900 leading-[2.2] mb-5">بزنس کیس ڈاکومنٹ</h3>
                <ul className="space-y-5">
                  {["1 سے 2 صفحے کا رنگین خاکہ","سوال: کیا آئیڈیا قابلِ عمل ہے؟","گھر والوں کا اعتماد جیتنے کے لیے","1-2 گھنٹے میں مکمل","سوچ کو صاف کرنے کے لیے"].map((t,i)=>(
                    <li key={i} className="flex gap-4 text-[22px] leading-[2.8] text-slate-800"><span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 text-[16px]">✓</span>{t}</li>
                  ))}
                </ul>
                <div className="mt-8 px-6 py-3 rounded-full bg-emerald-900 text-white text-[18px] inline-block">آپ کا پہلا قدم</div>
              </div>
            </div>
            <div className="rounded-[2rem] bg-gradient-to-br from-slate-200 to-slate-300 p-[2px]">
              <div className="bg-white/80 backdrop-blur rounded-[1.9rem] p-8 h-full">
                <div className="w-14 h-14 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-700 text-[24px] font-bold mb-6">2</div>
                <h3 className="text-[32px] font-bold text-slate-700 leading-[2.2] mb-5">بزنس پلان</h3>
                <ul className="space-y-5">
                  {["20 سے 30 صفحے","بینک، سرمایہ کار کے لیے","تفصیلی مالیاتی تجزیہ","ہفتوں میں تیار","بعد کا مرحلہ"].map((t,i)=>(
                    <li key={i} className="flex gap-4 text-[22px] leading-[2.8] text-slate-600"><span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">○</span>{t}</li>
                  ))}
                </ul>
                <div className="mt-8 px-6 py-3 rounded-full bg-slate-200 text-slate-700 text-[18px] inline-block">بعد میں</div>
              </div>
            </div>
          </div>
          <div className="mt-10 rounded-[1.5rem] bg-gradient-to-l from-violet-600 to-indigo-600 p-6 text-white flex justify-between items-center">
            <p className="text-[24px] leading-[2.8]">کاغذ پر لکھی بات ذہن کی الجھن سے کہیں زیادہ روشن ہوتی ہے</p>
            <span className="text-[14px] opacity-80">shama.pk</span>
          </div>
        </div>
      </div>
    </div>
  );
}
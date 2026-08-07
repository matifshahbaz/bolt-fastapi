import React from 'react';
export default function OnePageTemplate() {
  const qs = ["مسئلہ اور حل کیا ہے؟","کسٹمر کون ہے؟","مقابلہ کیسا ہے؟","میں کیوں مختلف ہوں؟","شروعاتی اخراجات؟","ماہانہ اخراجات؟","متوقع آمدنی؟","بریک ایون کب؟","کیا غلط ہو سکتا ہے؟","پہلے 30 دن کیا کروں گا؟"];
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
      <div className="rounded-[2.5rem] bg-gradient-to-br from-violet-500 via-fuchsia-400 to-amber-300 p-[4px] shadow-[0_30px_80px_-20px_rgba(139,92,246,0.4)]">
        <div className="bg-[#FFFEF8] rounded-[2.4rem] p-10 md:p-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-10 pb-8 border-b-[3px] border-dashed border-violet-200">
            <div><div className="inline-block px-5 py-2 rounded-full bg-gradient-to-l from-violet-600 to-fuchsia-600 text-white text-[18px] font-bold mb-4">قابلِ پرنٹ — ایک صفحہ</div><h2 className="text-[48px] font-bold text-slate-900 leading-[2.2]">سب کچھ ایک صفحے پر</h2><p className="text-[24px] leading-[2.8] text-slate-600 mt-2">اپنا بزنس کیس ابھی مکمل کریں</p></div>
            <div className="rounded-[1.8rem] bg-white border-2 border-violet-100 p-6 shadow-sm"><div className="text-[18px] text-slate-500 leading-[2.6]">برائے</div><div className="text-[28px] font-bold text-violet-900 leading-[2.2]">میرا آئیڈیا: ___________</div><div className="text-[14px] text-slate-400 mt-2">shama.pk</div></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {qs.map((q,i)=>(
              <div key={i} className="rounded-[1.8rem] bg-white border-2 border-slate-100 p-6 hover:border-violet-300 hover:shadow-lg transition group">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center font-bold text-[20px] flex-shrink-0 shadow-md">{i+1}</div>
                  <div className="flex-1"><div className="text-[24px] font-bold text-slate-900 leading-[2.2]">{q}</div><div className="mt-4 h-[72px] rounded-xl bg-gradient-to-br from-slate-50 to-violet-50/50 border-2 border-dashed border-slate-300 flex items-center pr-5 text-[18px] leading-[2.6] text-slate-400 group-hover:border-violet-300 transition">یہاں جواب لکھیں...</div></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-[2rem] bg-gradient-to-l from-violet-700 via-indigo-700 to-violet-700 p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
            <div><div className="text-[28px] font-bold leading-[2.2]">✓ اگر ان 10 سوالوں کے جواب لکھ لیے، تو بزنس کیس مکمل!</div><div className="text-[22px] leading-[2.8] text-violet-100 mt-2">ایک کاغذ، ایک قلم، اور آدھا گھنٹہ — بس</div></div>
            <div className="px-8 py-3 rounded-full bg-white text-violet-700 font-bold text-[20px] shadow-lg">shama.pk</div>
          </div>
        </div>
      </div>
    </div>
  );
}
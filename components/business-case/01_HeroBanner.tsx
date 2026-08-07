import React from 'react';
export default function HeroBanner() {
  return (
    <div dir="rtl" style={{ fontFamily: 'Jameel Noori Nastaleeq', direction: 'rtl', lineHeight: 2.6 }} className="business-case-artifact w-full max-w-5xl mx-auto p-3">
      <style>{`
@font-face {
  font-family: 'Jameel Noori Nastaleeq';
  src: url('https://fonts.cdnfonts.com/s/14821/JameelNooriNastaleeq.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
.business-case-artifact, .business-case-artifact * { font-family: 'Jameel Noori Nastaleeq' !important; }
`}</style>
      <div className="relative rounded-[3rem] bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 p-[3px] shadow-[0_30px_80px_-20px_rgba(124,58,237,0.5)]">
        <div className="rounded-[2.8rem] bg-[#FFFEFB] overflow-hidden relative">
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-violet-200 via-pink-200 to-amber-200 rounded-full blur-3xl opacity-70" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-200 via-emerald-200 to-yellow-200 rounded-full blur-3xl opacity-60" />
          <div className="relative p-12 md:p-16">
            <div className="flex justify-between items-center mb-10">
              <div className="px-6 py-3 rounded-full bg-gradient-to-l from-violet-700 to-fuchsia-600 text-white text-[22px] font-bold shadow-lg">Module 5</div>
              <div className="px-5 py-2 rounded-full bg-gradient-to-l from-amber-400 to-orange-400 text-slate-900 text-[18px] font-bold shadow-md">shama.pk</div>
            </div>
            <h1 className="text-[52px] md:text-[64px] leading-[2] font-bold text-slate-900">
              اپنے نئے کاروبار کا آغاز
              <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-l from-violet-600 via-fuchsia-600 to-orange-500 leading-[2] pb-4">
                بزنس کیس ڈاکومنٹ کیسے بنائیں
              </span>
            </h1>
            <p className="text-[28px] leading-[2.8] text-slate-700 mt-6 max-w-3xl">
              لمبی رپورٹ نہیں — صرف <span className="px-3 py-1 rounded-xl bg-gradient-to-l from-violet-100 to-fuchsia-100 text-violet-900 font-bold">1 سے 2 صفحے</span> کا رنگین خاکہ جو آپ کے آئیڈیا کو قابلِ عمل ثابت کرے
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { v: "1-2 صفحے", l: "صرف خاکہ", c: "from-violet-500 to-purple-600", n:"1" },
                { v: "1-2 گھنٹے", l: "تیاری کا وقت", c: "from-fuchsia-500 to-pink-600", n:"2" },
                { v: "سوچ صاف", l: "فیصلہ آسان", c: "from-orange-400 to-amber-500", n:"3" },
              ].map((it,i)=>(
                <div key={i} className="rounded-[1.8rem] bg-white border border-slate-100 p-7 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] text-center">
                  <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${it.c} flex items-center justify-center text-white text-[24px] font-bold mb-4`}>{it.n}</div>
                  <div className="text-[32px] font-bold text-slate-900 leading-[2.2]">{it.v}</div>
                  <div className="text-[20px] text-slate-600 leading-[2.6] mt-1">{it.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center text-[18px] text-slate-400 tracking-widest">ilm, amal, kamyabi — shama.pk</div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
export default function ThirtyDayPlan() {
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
      <div className="rounded-[2.5rem] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[3px]">
        <div className="bg-[#FFFEFB] rounded-[2.4rem] p-10 md:p-12 relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <div><h2 className="text-[46px] font-bold text-slate-900 leading-[2.2]">پہلے 30 دن کا رنگین نقشہ</h2><p className="text-[24px] leading-[2.8] text-slate-600 mt-2">کاغذ سے حقیقت تک</p></div>
            <div className="px-5 py-2 rounded-full bg-gradient-to-l from-violet-600 to-indigo-600 text-white text-[16px] font-bold">shama.pk</div>
          </div>
          <div className="relative">
            <div className="space-y-8">
              {[
                { n:"1", w:"پہلا ہفتہ", t:"جگہ تیار", d:"کمرہ صاف، وائٹ بورڈ، کرسیاں، سامان", c:"from-violet-600 to-indigo-600" },
                { n:"2", w:"دوسرا ہفتہ", t:"تشہیر", d:"پمفلٹ، تقسیم، فیس بک گروپس میں اعلان", c:"from-blue-500 to-cyan-500" },
                { n:"3", w:"تیسرا ہفتہ", t:"مفت ٹرائل", d:"ڈیمو کلاس، اعتماد، والدین سے ملاقات", c:"from-emerald-500 to-teal-600" },
                { n:"4", w:"چوتھا ہفتہ", t:"باقاعدہ آغاز", d:"داخلے، فیس، حاضری کا نظام", c:"from-orange-500 to-pink-600" },
              ].map((s,i)=>(
                <div key={i} className="relative flex gap-8 group">
                  <div className={`hidden md:flex w-16 h-16 rounded-2xl bg-gradient-to-br ${s.c} text-white items-center justify-center text-[26px] font-bold shadow-xl z-10 flex-shrink-0`}>{s.n}</div>
                  <div className="flex-1 rounded-[2rem] bg-white border-2 border-slate-100 p-7 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] group-hover:shadow-xl transition flex justify-between items-center gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`md:hidden w-10 h-10 rounded-xl bg-gradient-to-br ${s.c} text-white flex items-center justify-center font-bold`}>{s.n}</span>
                        <span className="px-4 py-1 rounded-full bg-slate-100 text-[18px] leading-[2.6]">{s.w}</span>
                        <h3 className="text-[30px] font-bold text-slate-900 leading-[2.2]">{s.t}</h3>
                      </div>
                      <p className="text-[22px] leading-[2.8] text-slate-600 mt-2">{s.d}</p>
                    </div>
                    <div className="text-[14px] font-bold text-slate-400">shama.pk</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 rounded-[2rem] bg-gradient-to-l from-amber-100 to-orange-100 border-2 border-amber-200 p-7 flex gap-5 items-start">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[20px] font-bold flex-shrink-0">5</div>
            <div><div className="text-[26px] font-bold leading-[2.2] text-slate-900">سنہری عادت</div><p className="text-[22px] leading-[2.8] text-slate-700 mt-2">ہر ہفتے کاپی میں لکھیں: دلچسپی، داخلے، خرچہ۔ یہی ڈیٹا اگلے مہینے کو حقیقت بنائے گا۔</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
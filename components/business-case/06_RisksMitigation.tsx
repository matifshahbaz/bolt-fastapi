import React from 'react';
const risks = [
  { n:"1", r:"توقع سے کم طلبہ", s:"پمفلٹ، دوستوں کو بتائیں، فیس بک گروپ", c:"from-blue-500 to-cyan-500", bg:"from-blue-50 to-cyan-50", border:"border-blue-200" },
  { n:"2", r:"امتحانات میں کمی", s:"عارضی ہے، ریویژن کلاسز، گھبرانا نہیں", c:"from-amber-400 to-orange-500", bg:"from-amber-50 to-orange-50", border:"border-amber-200" },
  { n:"3", r:"نئی اکیڈمی", s:"معیار، انفرادی توجہ، والدین سے رابطہ", c:"from-emerald-500 to-teal-600", bg:"from-emerald-50 to-teal-50", border:"border-emerald-200" },
  { n:"4", r:"وقت / صحت", s:"پہلے سے بیک اپ، چھٹی کا پلان", c:"from-violet-500 to-purple-600", bg:"from-violet-50 to-purple-50", border:"border-violet-200" },
];
export default function Risks() {
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
      <div className="rounded-[2.5rem] bg-gradient-to-br from-orange-300 via-pink-300 to-violet-300 p-[3px]">
        <div className="bg-[#FFFEFB] rounded-[2.4rem] p-10 relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[44px] font-bold text-slate-900 leading-[2.2]">کیا غلط ہو سکتا ہے؟ اور حل؟</h2>
            <span className="px-4 py-2 rounded-full bg-slate-900 text-white text-[16px]">shama.pk</span>
          </div>
          <div className="grid md:grid-cols-2 gap-7">
            {risks.map((it,i)=>(
              <div key={i} className={`rounded-[2rem] bg-gradient-to-br ${it.c} p-[2px] shadow-lg`}>
                <div className={`bg-gradient-to-br ${it.bg} rounded-[1.9rem] p-7 border-2 ${it.border} h-full`}>
                  <div className="flex gap-4 items-start">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${it.c} flex items-center justify-center text-white text-[20px] font-bold shadow-md flex-shrink-0`}>{it.n}</div>
                    <div className="flex-1">
                      <div className="text-[16px] font-bold text-slate-500">مسئلہ {it.n}</div>
                      <div className="text-[28px] font-bold text-slate-900 leading-[2.2]">{it.r}</div>
                      <div className="mt-4 pt-4 border-t-2 border-dashed border-black/10">
                        <div className="text-[16px] font-bold text-slate-500">حل</div>
                        <div className="text-[22px] leading-[2.8] text-slate-800">{it.s}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[2rem] bg-slate-900 p-8 text-white flex gap-6 items-start">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[20px] font-bold flex-shrink-0">!</div>
            <div>
              <div className="text-[28px] font-bold leading-[2.2]">ایئر لفٹ سے سبق</div>
              <p className="text-[22px] leading-[2.8] text-slate-300 mt-2">اندازوں پر بھروسا کر کے بڑا خرچ نہ کریں — پہلے چھوٹے پیمانے پر آزمائیں۔ بزنس کیس کے نمبر صرف اندازے ہیں۔</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
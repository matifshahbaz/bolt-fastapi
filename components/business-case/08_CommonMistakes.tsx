import React from 'react';
const mistakes = [
  { n:"1", t:"بہت زیادہ پرامید", d:"پہلے ہفتے 50 کسٹمر؟ ہمیشہ کم ترین اندازے سے شروع کریں", c:"from-red-500 to-orange-500" },
  { n:"2", t:"چھوٹے خرچے بھولنا", d:"چائے، پرنٹنگ، موبائل، رکشہ — یہی بجٹ بگاڑتے ہیں", c:"from-amber-500 to-yellow-500" },
  { n:"3", t:"دوسرے شہر کے نمبر", d:"لاہور کی قیمت آپ کے محلے میں نہیں — مقامی تحقیق", c:"from-blue-500 to-cyan-500" },
  { n:"4", t:"مجھے پسند تو سب کو پسند", d:"اپنی رائے اور کسٹمر کی رائے میں فرق رکھیں", c:"from-violet-500 to-purple-600" },
  { n:"5", t:"صرف ذہن میں سوچنا", d:"جو لکھا نہیں وہ ادھورا رہتا ہے — کاغذ پر لائیں", c:"from-emerald-500 to-teal-600" },
  { n:"6", t:"پرفیکٹ کا انتظار", d:"یہ سوچنے میں مدد ہے، بہانہ نہیں — آج ہی شروع کریں", c:"from-pink-500 to-rose-500" },
];
export default function Mistakes() {
  return (
    <div dir="rtl" style={{ fontFamily: 'Jameel Noori Nastaleeq', direction: 'rtl', lineHeight: 2.6 }} className="business-case-artifact w-full max-w-6xl mx-auto">
      <style>{`
@font-face {
  font-family: 'Jameel Noori Nastaleeq';
  src: url('https://fonts.cdnfonts.com/s/14821/JameelNooriNastaleeq.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
.business-case-artifact, .business-case-artifact * { font-family: 'Jameel Noori Nastaleeq' !important; }
`}</style>
      <div className="rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 p-[3px]">
        <div className="bg-[#0f0f0f] rounded-[2.4rem] p-10 md:p-12 relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[46px] font-bold text-white leading-[2.2]">6 عام غلطیاں — رنگین تنبیہ</h2>
            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[16px]">shama.pk</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {mistakes.map((m,i)=>(
              <div key={i} className="rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-[1px] backdrop-blur">
                <div className="bg-[#1e1e1e] rounded-[1.9rem] p-7 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.c} flex items-center justify-center text-white font-bold text-[22px] shadow-lg mb-5`}>{m.n}</div>
                  <h3 className="text-[26px] font-bold text-white leading-[2.2] mb-3">{m.t}</h3>
                  <p className="text-[20px] leading-[2.8] text-slate-300">{m.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="rounded-[1.8rem] bg-gradient-to-l from-emerald-500 to-teal-600 p-7 text-white"><div className="text-[26px] font-bold leading-[2.2]">✓ کامیابی کا اصول</div><p className="text-[22px] leading-[2.8] mt-2">حقیقت پسندانہ، مقامی، لکھا ہوا، چھوٹے سے شروع</p></div>
            <div className="rounded-[1.8rem] bg-white/5 border border-white/10 p-7 text-white flex justify-between items-center"><div className="text-[22px] leading-[2.6] text-slate-300">کامل نہیں، صاف سوچ چاہیے</div><span className="text-[14px] opacity-50">shama.pk</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
const steps = [
  { n:"1", t:"مسئلہ اور حل", d:"مسئلہ کیا؟ حل کیا؟", c:"from-violet-500 to-purple-600" },
  { n:"2", t:"کسٹمر کون؟", d:"عمر، علاقہ، ضرورت", c:"from-blue-500 to-cyan-600" },
  { n:"3", t:"مارکیٹ اور مقابلہ", d:"کتنے لوگ؟ مقابلہ؟", c:"from-fuchsia-500 to-pink-600" },
  { n:"4", t:"آپ مختلف کیوں؟", d:"قیمت، معیار، رویہ", c:"from-orange-400 to-red-500" },
  { n:"5", t:"لاگت کا حساب", d:"شروعاتی + ماہانہ", c:"from-emerald-500 to-teal-600" },
  { n:"6", t:"آمدنی اور قیمت", d:"فیس x تعداد", c:"from-amber-400 to-orange-500" },
  { n:"7", t:"منافع کب؟", d:"بریک ایون", c:"from-lime-500 to-emerald-600" },
  { n:"8", t:"رسک کیا؟", d:"مسئلہ + حل", c:"from-rose-500 to-orange-500" },
  { n:"9", t:"پہلے 30 دن", d:"ہفتہ وار پلان", c:"from-indigo-500 to-violet-600" },
];
export default function NineSteps() {
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
      <div className="rounded-[2.5rem] bg-gradient-to-br from-yellow-200 via-pink-200 to-violet-300 p-[3px]">
        <div className="bg-white rounded-[2.4rem] p-10 md:p-12 relative overflow-hidden">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-l from-violet-600 to-fuchsia-600 text-white text-[18px] font-bold mb-4">shama.pk — مکمل نقشہ</div>
            <h2 className="text-[48px] font-bold leading-[2.2] text-slate-900">9 رنگین قدم — ایک مکمل بزنس کیس</h2>
            <p className="text-[26px] leading-[2.8] text-slate-600 mt-3">ٹیوشن سینٹر کی زندہ مثال کے ساتھ</p>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {steps.map((s,i)=>(
              <div key={i} className="group rounded-[2rem] bg-white border-2 border-slate-50 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.15)] p-7 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] hover:-translate-y-2 transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.c} text-white flex items-center justify-center text-[28px] font-bold shadow-lg mb-6`}>{s.n}</div>
                <h3 className="text-[28px] font-bold text-slate-900 leading-[2.2]">{s.t}</h3>
                <p className="text-[22px] leading-[2.8] text-slate-600 mt-3">{s.d}</p>
                <div className="mt-5 flex justify-between items-center"><div className="h-1 w-16 rounded-full bg-gradient-to-l from-slate-200 to-transparent group-hover:w-full transition-all" /><span className="text-[12px] text-slate-400">shama.pk</span></div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center text-[20px] leading-[2.8] text-slate-500">ایک بار سیکھ لیں، ہر آئیڈیے پر لاگو کریں — shama.pk</div>
        </div>
      </div>
    </div>
  );
}
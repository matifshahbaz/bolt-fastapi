import React from 'react';
export default function UniversalExample() {
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
      <div className="rounded-[2.5rem] bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-[3px]">
        <div className="bg-gradient-to-br from-[#FFFBEB] to-[#FFF7ED] rounded-[2.4rem] p-10 relative overflow-hidden">
          <div className="flex justify-between items-center mb-8"><h2 className="text-[42px] font-bold text-slate-900 leading-[2.2]">یہی فارمولا — ہر کاروبار کے لیے</h2><span className="px-4 py-2 rounded-full bg-slate-900 text-white text-[14px]">shama.pk</span></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-600 p-[2px]"><div className="bg-white rounded-[1.9rem] p-8 h-full"><div className="flex items-center gap-4 mb-6"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-[20px] font-bold">1</div><h3 className="text-[30px] font-bold leading-[2.2]">ٹیوشن سینٹر</h3></div><div className="space-y-4 text-[22px] leading-[2.8] text-slate-700"><div><b>مسئلہ:</b> مہنگی، دور اکیڈمیاں</div><div><b>حل:</b> سستی، قریب، انفرادی توجہ</div><div><b>کسٹمر:</b> محلے کے والدین</div><div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold">آمدنی: 10 x 2000 = 20,000</div></div></div></div>
            <div className="rounded-[2rem] bg-gradient-to-br from-fuchsia-500 to-orange-400 p-[2px]"><div className="bg-white rounded-[1.9rem] p-8 h-full relative"><div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-l from-amber-400 to-orange-400 text-[14px] font-bold">2</div><div className="flex items-center gap-4 mb-6"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-orange-400 flex items-center justify-center text-white text-[20px] font-bold">2</div><h3 className="text-[30px] font-bold leading-[2.2]">آن لائن دکان</h3></div><div className="space-y-4 text-[22px] leading-[2.8] text-slate-700"><div><b>مسئلہ:</b> اچھے، مناسب کپڑے نہیں</div><div><b>حل:</b> انسٹا پر ہول سیل ریٹ</div><div><b>کسٹمر:</b> انسٹا والی خواتین</div><div className="px-4 py-2 rounded-xl bg-fuchsia-50 text-fuchsia-800 font-bold">آمدنی: منافع x فروخت</div></div></div></div>
          </div>
          <div className="mt-8 rounded-[2rem] bg-slate-900 p-7 text-center"><p className="text-[30px] font-bold text-white leading-[2.2]">وہی 9 سوالات — بس جواب بدلتے ہیں</p><p className="text-[20px] leading-[2.8] text-slate-400 mt-2">ایک بار سیکھ لیں، ہر نئے آئیڈیے پر لاگو کریں — shama.pk</p></div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
export default function FinancialSnapshot() {
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
      <div className="rounded-[2.5rem] bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 p-[3px] shadow-[0_20px_60px_-20px_rgba(6,182,212,0.4)]">
        <div className="bg-white rounded-[2.4rem] overflow-hidden">
          <div className="bg-gradient-to-l from-slate-900 via-violet-900 to-indigo-900 p-10 text-white relative overflow-hidden">
            <div className="relative flex justify-between items-start">
              <div>
                <h2 className="text-[46px] font-bold leading-[2.2]">لاگت، آمدنی، اور منافع</h2>
                <p className="text-[24px] leading-[2.8] text-violet-200 mt-3">ٹیوشن سینٹر — رنگین عملی حساب</p>
              </div>
              <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[16px]">shama.pk</div>
            </div>
          </div>
          <div className="p-10 grid md:grid-cols-2 gap-10">
            <div className="space-y-7">
              <h3 className="text-[28px] font-bold text-slate-900 leading-[2.2] flex items-center gap-3"><span className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[20px] font-bold">1</span> لاگت</h3>
              <div className="rounded-[1.8rem] bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-100 p-6">
                <div className="text-[18px] text-amber-800 font-bold">شروعاتی لاگت (ایک بار)</div>
                <div className="text-[26px] leading-[2.6] font-bold text-slate-900 mt-2">وائٹ بورڈ، کرسیاں، بینر</div>
                <div className="text-[30px] font-bold text-orange-600 leading-[2.2]">5,000 سے 10,000</div>
                <div className="mt-3 inline-block px-4 py-1 rounded-full bg-white text-emerald-700 text-[16px] leading-[2.6]">گھر سے شروع کریں تو تقریبا صفر</div>
              </div>
              <div className="rounded-[1.8rem] bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 p-6">
                <div className="text-[18px] text-slate-600 font-bold">ماہانہ اخراجات</div>
                <div className="text-[22px] leading-[2.8] text-slate-800 mt-2">بجلی، پرنٹنگ، چائے، موبائل، رکشہ</div>
                <div className="text-[30px] font-bold text-slate-900 leading-[2.2]">2,000 سے 3,000</div>
              </div>
            </div>
            <div className="space-y-7">
              <h3 className="text-[28px] font-bold text-slate-900 leading-[2.2] flex items-center gap-3"><span className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-[20px] font-bold">2</span> آمدنی</h3>
              <div className="rounded-[1.8rem] bg-gradient-to-br from-emerald-500 to-teal-600 p-[2px]">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-[1.7rem] p-7">
                  <div className="text-[20px] leading-[2.6] text-slate-700">محتاط اندازہ:</div>
                  <div className="text-[40px] font-bold leading-[2.2] text-emerald-900 mt-2">10 x 2,000 = 20,000</div>
                  <div className="text-[20px] leading-[2.6] text-slate-600">ماہانہ آمدنی</div>
                  <div className="mt-6 space-y-3 bg-white rounded-2xl p-5 border">
                    <div className="flex justify-between text-[22px] leading-[2.6]"><span>آمدنی</span><span className="font-bold">20,000</span></div>
                    <div className="flex justify-between text-[22px] leading-[2.6]"><span>خرچ</span><span className="font-bold">3,000</span></div>
                    <div className="h-px bg-slate-200" />
                    <div className="flex justify-between text-[28px] font-bold text-emerald-700 leading-[2.2]"><span>منافع</span><span>17,000 روپے</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-10 pb-10">
            <div className="rounded-[1.8rem] bg-gradient-to-l from-violet-600 via-indigo-600 to-blue-600 p-6 text-white flex justify-between items-center">
              <div className="flex gap-4 items-center"><div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white text-[20px] font-bold">3</div><div><div className="text-[26px] font-bold leading-[2.2]">بریک ایون: پہلے مہینے میں</div><div className="text-[20px] leading-[2.6] text-violet-100">چھوٹے سے آغاز کی برکت</div></div></div>
              <div className="text-[14px] opacity-70">shama.pk</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
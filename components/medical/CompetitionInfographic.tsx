export default function CompetitionInfographic() {
  return (
    <div dir="rtl" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif" }} className="w-full max-w-[800px] bg-white rounded-[36px] border border-slate-100 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.18)] p-10 md:p-12">
      <div className="flex justify-between items-center mb-10">
        <div className="bg-teal-50 text-teal-800 px-5 py-2 rounded-full text-[26px] font-bold tracking-wide">shama.pk | میڈیکل گائیڈ</div>
        <div className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[18px]">Infographic 01</div>
      </div>

      <h2 className="text-[46px] md:text-[56px] leading-[1.25] font-bold text-slate-900 mb-3">ایم بی بی ایس میں داخلے کا اصل مقابلہ</h2>
      <p className="text-[28px] leading-[1.7] text-slate-500 mb-10">سیٹیں کم ہیں، خواب دیکھنے والے لاکھوں میں ہیں</p>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-[28px] p-8 text-white shadow-lg">
          <div className="text-[26px] opacity-90 mb-2">کل درخواستیں</div>
          <div className="text-[58px] font-bold leading-none tracking-tight">+180,000</div>
          <div className="mt-5 bg-white/30 rounded-full h-3 w-full"><div className="bg-white h-3 rounded-full w-[90%]" /></div>
          <div className="text-[24px] mt-3 font-medium">MDCAT امیدوار 2024</div>
        </div>
        <div className="bg-slate-50 rounded-[28px] p-8 border-2 border-slate-100">
          <div className="text-[26px] text-slate-500 mb-2">کل MBBS سیٹیں</div>
          <div className="text-[58px] font-bold text-slate-900 leading-none">~22,000</div>
          <div className="mt-5 bg-slate-200 rounded-full h-3 w-full"><div className="bg-slate-900 h-3 rounded-full w-[28%]" /></div>
          <div className="text-[24px] mt-3 text-slate-600">سرکاری + پرائیویٹ ملا کر</div>
        </div>
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-[24px] p-7 flex gap-5 items-center">
        <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center text-[40px] shadow">⚠️</div>
        <div>
          <div className="text-[32px] font-bold text-amber-900 leading-[1.2]">ایک سیٹ پر 9 طلبہ کی دوڑ</div>
          <div className="text-[26px] text-amber-800 leading-[1.5] mt-1">سرکاری کالج میں یہ مقابلہ 1 سیٹ پر 15 طلبہ تک پہنچ جاتا ہے</div>
        </div>
      </div>

      <div className="mt-10 text-center text-[20px] text-slate-400 tracking-widest font-medium">shama.pk - آپ کے کیرئیر کی رہنما ویب سائٹ</div>
    </div>
  );
}

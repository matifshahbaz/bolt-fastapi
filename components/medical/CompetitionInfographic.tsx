export default function CompetitionInfographic() {
  return (
    <div dir="rtl" className="w-full max-w-[800px] rounded-lg border border-slate-100 bg-white p-5 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.18)] sm:p-10 md:p-12">
      <div className="mb-8 flex flex-col items-start gap-3 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="rounded-full bg-teal-50 px-4 py-2 text-xl font-bold text-teal-800 sm:px-5 sm:text-[26px]">shama.pk | میڈیکل گائیڈ</div>
        <div className="rounded-full bg-slate-900 px-4 py-1.5 text-base text-white sm:text-[18px]">Infographic 01</div>
      </div>

      <h2 className="mb-3 text-4xl font-bold leading-[1.4] text-slate-900 sm:text-[46px] md:text-[56px]">ایم بی بی ایس میں داخلے کا اصل مقابلہ</h2>
      <p className="mb-8 text-xl leading-[1.8] text-slate-500 sm:mb-10 sm:text-[28px]">سیٹیں کم ہیں، خواب دیکھنے والے لاکھوں میں ہیں</p>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:mb-10 sm:grid-cols-2 sm:gap-6">
        <div className="rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 p-5 text-white shadow-lg sm:p-8">
          <div className="mb-2 text-xl opacity-90 sm:text-[26px]">کل درخواستیں</div>
          <div className="text-4xl font-bold leading-none sm:text-[58px]">+180,000</div>
          <div className="mt-5 bg-white/30 rounded-full h-3 w-full"><div className="bg-white h-3 rounded-full w-[90%]" /></div>
          <div className="mt-3 text-xl font-medium sm:text-[24px]">MDCAT امیدوار 2024</div>
        </div>
        <div className="rounded-lg border-2 border-slate-100 bg-slate-50 p-5 sm:p-8">
          <div className="mb-2 text-xl text-slate-500 sm:text-[26px]">کل MBBS سیٹیں</div>
          <div className="text-4xl font-bold leading-none text-slate-900 sm:text-[58px]">~22,000</div>
          <div className="mt-5 bg-slate-200 rounded-full h-3 w-full"><div className="bg-slate-900 h-3 rounded-full w-[28%]" /></div>
          <div className="mt-3 text-xl text-slate-600 sm:text-[24px]">سرکاری + پرائیویٹ ملا کر</div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 rounded-lg border-2 border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-7">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-400 text-3xl shadow sm:h-20 sm:w-20 sm:text-[40px]">⚠️</div>
        <div className="min-w-0">
          <div className="text-2xl font-bold leading-[1.5] text-amber-900 sm:text-[32px]">ایک سیٹ پر 9 طلبہ کی دوڑ</div>
          <div className="mt-1 text-xl leading-[1.7] text-amber-800 sm:text-[26px]">سرکاری کالج میں یہ مقابلہ 1 سیٹ پر 15 طلبہ تک پہنچ جاتا ہے</div>
        </div>
      </div>

      <div className="mt-10 text-center text-[20px] text-slate-400 tracking-widest font-medium">shama.pk - آپ کے کیرئیر کی رہنما ویب سائٹ</div>
    </div>
  );
}

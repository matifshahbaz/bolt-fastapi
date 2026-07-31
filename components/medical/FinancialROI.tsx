export default function FinancialROI() {
  const steps = [
    { label: 'طالب علم', income: '0 آمدن', height: 'h-[24px]', color: 'bg-slate-200' },
    { label: 'ہاؤس جاب', income: '60-80 ہزار', height: 'h-[56px]', color: 'bg-blue-300' },
    { label: 'سپیشلائزیشن', income: '1-1.5 لاکھ', height: 'h-[96px]', color: 'bg-blue-400' },
    { label: 'کنسلٹنٹ پاکستان', income: '5-20 لاکھ', height: 'h-[160px]', color: 'bg-teal-500' },
    { label: 'کنسلٹنٹ گلف', income: '30-40 لاکھ', height: 'h-[240px]', color: 'bg-emerald-600' },
  ];

  return (
    <div dir="rtl" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif" }} className="w-full max-w-[800px] bg-slate-900 rounded-[36px] shadow-[0_25px_80px_-20px_rgba(0,0,0,0.5)] p-10 md:p-12 text-white">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-[46px] font-bold leading-[1.2]">پیسے کا سفر<br /><span className="text-teal-300">میرا فنانس والا حساب</span></h2>
          <p className="text-[26px] text-slate-400 mt-3">شروع میں صبر، آخر میں بہترین ROI</p>
        </div>
        <div className="bg-white text-slate-900 px-5 py-2 rounded-full text-[22px] font-bold">shama.pk</div>
      </div>

      <div className="flex items-end gap-4 md:gap-5 h-[380px] mb-10 px-2">
        {steps.map((s, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-4">
            <div className="text-[22px] font-bold text-teal-300 leading-[1.2] text-center">{s.income}</div>
            <div className={`w-full rounded-t-[20px] ${s.color} ${s.height} transition-all shadow-lg`} />
            <div className="text-[24px] text-center leading-[1.3] text-slate-300 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur rounded-[20px] p-6 flex gap-4 items-center border border-white/10">
        <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-[28px]">💡</div>
        <p className="text-[26px] leading-[1.6]">میں نے 20 سال میں سیکھا: میڈیکل واحد فیلڈ ہے جہاں گراف کبھی نیچے نہیں آتا، صرف اوپر جاتا ہے۔</p>
      </div>
      <div className="mt-6 text-center text-[18px] text-slate-500">shama.pk | فنانس اور کیرئیر تجزیہ</div>
    </div>
  );
}

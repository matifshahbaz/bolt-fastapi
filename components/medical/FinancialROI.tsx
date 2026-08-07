export default function FinancialROI() {
  const steps = [
    { label: 'طالب علم', income: '0 آمدن', height: 'h-[24px]', width: 'w-[12%]', color: 'bg-slate-200' },
    { label: 'ہاؤس جاب', income: '60-80 ہزار', height: 'h-[56px]', width: 'w-[28%]', color: 'bg-blue-300' },
    { label: 'سپیشلائزیشن', income: '1-1.5 لاکھ', height: 'h-[96px]', width: 'w-[45%]', color: 'bg-blue-400' },
    { label: 'کنسلٹنٹ پاکستان', income: '5-20 لاکھ', height: 'h-[160px]', width: 'w-[72%]', color: 'bg-teal-500' },
    { label: 'کنسلٹنٹ گلف', income: '30-40 لاکھ', height: 'h-[240px]', width: 'w-full', color: 'bg-emerald-600' },
  ];

  return (
    <div dir="rtl" className="w-full max-w-[800px] rounded-lg bg-slate-900 p-5 text-white shadow-[0_25px_80px_-20px_rgba(0,0,0,0.5)] sm:p-10 md:p-12">
      <div className="mb-8 flex flex-col items-start gap-4 sm:mb-10 sm:flex-row sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-4xl font-bold leading-[1.4] sm:text-[46px]">پیسے کا سفر<br /><span className="text-teal-300">میرا فنانس والا حساب</span></h2>
          <p className="mt-3 text-xl text-slate-400 sm:text-[26px]">شروع میں صبر، آخر میں بہترین ROI</p>
        </div>
        <div className="shrink-0 rounded-full bg-white px-5 py-2 text-xl font-bold text-slate-900 sm:text-[22px]">shama.pk</div>
      </div>

      <div className="mb-8 space-y-4 sm:hidden">
        {steps.map((step) => (
          <div key={step.label}>
            <div className="mb-2 flex items-center justify-between gap-3 text-lg">
              <span className="min-w-0 text-slate-300">{step.label}</span>
              <span className="shrink-0 font-bold text-teal-300">{step.income}</span>
            </div>
            <div className="h-3 w-full rounded-full bg-white/10">
              <div className={`h-3 rounded-full ${step.color} ${step.width}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="mb-10 hidden h-[380px] items-end gap-4 px-2 sm:flex md:gap-5">
        {steps.map((s, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-4">
            <div className="text-[22px] font-bold text-teal-300 leading-[1.2] text-center">{s.income}</div>
            <div className={`w-full rounded-t-[20px] ${s.color} ${s.height} transition-all shadow-lg`} />
            <div className="text-[24px] text-center leading-[1.3] text-slate-300 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start gap-4 rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur sm:flex-row sm:items-center sm:p-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[28px]">💡</div>
        <p className="text-xl leading-[1.8] sm:text-[26px]">میں نے 20 سال میں سیکھا: میڈیکل واحد فیلڈ ہے جہاں گراف کبھی نیچے نہیں آتا، صرف اوپر جاتا ہے۔</p>
      </div>
      <div className="mt-6 text-center text-[18px] text-slate-500">shama.pk | فنانس اور کیرئیر تجزیہ</div>
    </div>
  );
}

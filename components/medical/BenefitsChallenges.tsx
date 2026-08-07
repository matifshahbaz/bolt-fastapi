export default function BenefitsChallenges() {
  return (
    <div dir="rtl" className="w-full max-w-[900px] rounded-lg border border-slate-100 bg-white p-10 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.18)] md:p-12">
      <div className="flex justify-between mb-10">
        <h2 className="text-[44px] font-bold text-slate-900 leading-[1.2]">فائدے اور مشکلات<br /><span className="text-[28px] font-normal text-slate-500">ایک نظر میں موازنہ</span></h2>
        <div className="bg-slate-900 text-white px-5 py-2 rounded-full text-[22px] h-fit font-bold">shama.pk</div>
      </div>

      <div className="grid md:grid-cols-2 gap-7">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-[28px] p-8 border-2 border-emerald-100">
          <div className="flex items-center gap-4 mb-7">
            <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[30px]">✓</div>
            <h3 className="text-[36px] font-bold text-emerald-900">بڑے فائدے</h3>
          </div>
          <ul className="space-y-5">
            {[
              'نوکری کی 100% گارنٹی، کبھی ریٹائرمنٹ نہیں',
              'دل سے عزت، جو پیسے سے نہیں خریدی جا سکتی',
              'گلوبل پاسپورٹ - دبئی، UK، امریکہ میں مواقع',
              'آمدنی ہر سال بڑھتی ہے، 60 سال تک عروج',
            ].map((t, i) => (
              <li key={i} className="flex gap-4 text-[26px] leading-[1.6] text-emerald-900"><span className="mt-3 w-3 h-3 bg-emerald-500 rounded-full shrink-0" />{t}</li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-[28px] p-8 border-2 border-orange-100">
          <div className="flex items-center gap-4 mb-7">
            <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white text-[30px]">!</div>
            <h3 className="text-[36px] font-bold text-orange-900">کڑوی حقیقتیں</h3>
          </div>
          <ul className="space-y-5">
            {[
              '10-12 سال کی لمبی پڑھائی اور صبر کا امتحان',
              'ذہنی دباؤ، مریض کی جان کا بوجھ',
              'شروع میں کم آمدن، 36 گھنٹے ڈیوٹی',
              'سوشل لائف اور فیملی ٹائم کی قربانی',
            ].map((t, i) => (
              <li key={i} className="flex gap-4 text-[26px] leading-[1.6] text-orange-900"><span className="mt-3 w-3 h-3 bg-orange-500 rounded-full shrink-0" />{t}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-[20px] text-slate-400">تفصیلی مضمون shama.pk پر پڑھیں - عاطف شہباز</div>
    </div>
  );
}

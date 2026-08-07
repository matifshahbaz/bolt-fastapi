import React from 'react';
export default function CustomerMarketEdge() {
  return (
    <div dir="rtl" style={{ fontFamily: 'Jameel Noori Nastaleeq', direction: 'rtl', lineHeight: 2.6 }} className="business-case-artifact w-full max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
      <style>{`
@font-face {
  font-family: 'Jameel Noori Nastaleeq';
  src: url('https://fonts.cdnfonts.com/s/14821/JameelNooriNastaleeq.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
.business-case-artifact, .business-case-artifact * { font-family: 'Jameel Noori Nastaleeq' !important; }
`}</style>
      {[
        { n:"1", icon:"🎯", title:"کسٹمر کون ہے؟", grad:"from-violet-600 to-indigo-600", bad:"غلط: میرا کسٹمر ہر کوئی ہے", good:"صحیح: محلے کے والدین جن کے بچے 9 سے 12 میں ہیں، سستی معیاری ٹیوشن چاہتے ہیں", tip:"متوازن دائرہ چنیں" },
        { n:"2", icon:"🔍", title:"مارکیٹ اور مقابلہ", grad:"from-cyan-500 to-blue-600", bad:"خوش فہمی: کوئی مقابلہ نہیں", good:"حقیقت: ہلکا مقابلہ اچھی نشانی ہے — لوگ پہلے سے پیسے دے رہے ہیں", tip:"خود جا کر فیس، تعداد پوچھیں" },
        { n:"3", icon:"💎", title:"آپ کیوں مختلف؟", grad:"from-amber-500 to-orange-600", bad:"صرف سستا ہونا نقصان ہے", good:"چھوٹی کلاس، انفرادی توجہ، مناسب فیس، وقت کی پابندی", tip:"قیمت + معیار + رویہ" },
      ].map((card,i)=>(
        <div key={i} className={`rounded-[2.2rem] bg-gradient-to-br ${card.grad} p-[3px] shadow-xl`}>
          <div className="bg-white rounded-[2rem] p-8 h-full flex flex-col">
            <div className="flex justify-between items-start mb-7">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.grad} flex items-center justify-center text-white text-[24px] font-bold shadow-lg`}>{card.n}</div>
              <span className="px-3 py-1 rounded-full bg-slate-50 border text-[14px]">shama.pk</span>
            </div>
            <h3 className="text-[32px] font-bold text-slate-900 leading-[2.2] mb-6">{card.title}</h3>
            <div className="space-y-5 flex-1">
              <div className="rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-100 p-5">
                <div className="text-[16px] font-bold text-red-600 mb-2">❌ عام غلطی</div>
                <div className="text-[22px] leading-[2.8] text-red-900">{card.bad}</div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-100 p-5">
                <div className="text-[16px] font-bold text-emerald-700 mb-2">✓ درست طریقہ</div>
                <div className="text-[22px] leading-[2.8] text-emerald-900">{card.good}</div>
              </div>
            </div>
            <div className="mt-6 pt-5 border-t-2 border-dashed border-slate-100 flex gap-3 text-[20px] leading-[2.6] text-slate-600"><span>💡</span>{card.tip}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
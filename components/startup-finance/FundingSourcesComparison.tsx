import React from 'react';

const FundingMatrix = () => {
  const sources = [
    { title: 'ذاتی بچت', advantage: 'مکمل آزادی، کسی کو جواب نہیں دینا پڑتا۔', disadvantage: 'رقم محدود ہوتی ہے، ذاتی نقصان کا ڈر۔' },
    { title: 'گھر والے اور دوست', advantage: 'آسانی سے دستیاب، نرم شرائط۔', disadvantage: 'کاروبار خراب ہونے پر رشتہ متاثر ہو سکتا ہے۔' },
    { title: 'مائیکروفنانس (اخوت)', advantage: 'سود سے پاک، غریبوں کے لیے آسان۔', disadvantage: 'رقم چھوٹی ہوتی ہے، ضامن لازمی ہے۔' },
    { title: 'سرکاری اسکیمیں', advantage: 'کم شرح سود، منظم طریقہ کار۔', disadvantage: 'زیادہ کاغذی کارروائی، منظوری میں تاخیر۔' },
    { title: 'کراؤڈ فنڈنگ', advantage: 'مارکیٹ کی تصدیق اور فنڈز ایک ساتھ۔', disadvantage: 'صرف خاص مصنوعات (Products) کے لیے کارآمد۔' },
    { title: 'سرمایہ کار', advantage: 'بہت بڑا سرمایہ اور نیٹ ورک۔', disadvantage: 'ملکیت کا نقصان، تیز رفتار ترقی کا دباؤ۔' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 p-6 bg-slate-50 rounded-2xl shadow-xl border border-slate-200 text-right font-['Jameel_Noori_Nastaleeq',sans-serif]" dir="rtl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">سرمائے کے ذرائع: خوبیاں اور خامیاں</h2>
        <p className="text-slate-600 text-lg">اپنے حالات کے مطابق بہترین فنڈنگ ماڈل کا انتخاب کریں۔</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-inner">
        <table className="w-full text-right border-collapse bg-white">
          <thead>
            <tr className="bg-emerald-600 text-white text-xl">
              <th className="p-4 font-bold border-b border-emerald-700 w-1/4">سرمائے کا ذریعہ</th>
              <th className="p-4 font-bold border-b border-emerald-700 w-3/8">سب سے بڑی خوبی (Advantage)</th>
              <th className="p-4 font-bold border-b border-emerald-700 w-3/8">سب سے بڑی خامی (Disadvantage)</th>
            </tr>
          </thead>
          <tbody className="text-lg md:text-xl text-slate-700">
            {sources.map((src, index) => (
              <tr key={index} className={`border-b border-slate-100 transition-colors ${index % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'} hover:bg-emerald-50/30`}>
                <td className="p-4 font-bold text-emerald-800 border-l border-slate-100">{src.title}</td>
                <td className="p-4 text-emerald-700 bg-emerald-50/20">{src.advantage}</td>
                <td className="p-4 text-rose-700 bg-rose-50/10">{src.disadvantage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-left text-sm text-slate-400 italic">
        shama.pk
      </div>
    </div>
  );
};

export default FundingMatrix;

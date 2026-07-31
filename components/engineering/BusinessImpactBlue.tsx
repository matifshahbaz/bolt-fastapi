import React from 'react';

export default function BusinessImpactBlue() {
  return (
    <div dir="rtl" className="w-full bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-[2rem] p-8 border border-blue-300/30 relative overflow-hidden" style={{fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif"}}>
      <div className="absolute top-5 left-6 bg-white text-blue-800 px-3 py-1 rounded-full text-[10px] font-bold font-sans">shama.pk</div>
      <h2 className="text-2xl font-black text-white text-center mb-2 mt-6">انجینئر کے تین بڑے چیلنج</h2>
      <p className="text-center text-blue-100 text-sm mb-8">ہر فیکٹری میں یہی تین مسائل زیر بحث آتے ہیں - shama.pk</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center bg-white rounded-[1.5rem] p-6 border border-blue-100 shadow-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">💸</div>
          <h3 className="font-bold text-slate-900">۱۔ لاگت</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">ایک ٹن کی لاگت کیوں بڑھی؟ خام مال اور بجلی کا حساب</p>
          <div className="mt-4 text-[11px] bg-blue-50 border border-blue-100 rounded-full px-3 py-1 inline-block font-bold text-blue-800">پیمانہ: روپے فی ٹن</div>
        </div>
        <div className="text-center bg-white rounded-[1.5rem] p-6 border border-blue-100 shadow-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">⏸️</div>
          <h3 className="font-bold text-slate-900">۲۔ بندش</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">مشین رکی، بھٹی رکی، پیداوار رکی</p>
          <div className="mt-4 text-[11px] bg-blue-50 border border-blue-100 rounded-full px-3 py-1 inline-block font-bold text-blue-800">پیمانہ: دستیابی کا وقت</div>
        </div>
        <div className="text-center bg-white rounded-[1.5rem] p-6 border border-blue-100 shadow-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">🦺</div>
          <h3 className="font-bold text-slate-900">۳۔ حفاظت</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">ایک غلطی جان لے سکتی ہے، حفاظت لازمی</p>
          <div className="mt-4 text-[11px] bg-blue-50 border border-blue-100 rounded-full px-3 py-1 inline-block font-bold text-blue-800">پیمانہ: صفر حادثہ</div>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-2xl p-4 text-center text-sm text-blue-900 font-bold">
        جو انجینئر ان تینوں کو قابو کر لیتا ہے، وہی ماہر کہلاتا ہے - shama.pk
      </div>
    </div>
  );
}

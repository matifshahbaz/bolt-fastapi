import React from 'react';

export default function SalaryGrowthBlue() {
  return (
    <div dir="rtl" className="w-full grid md:grid-cols-2 gap-6" style={{fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif"}}>
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-[2rem] p-8 text-white relative overflow-hidden border border-blue-300/30 shadow-xl">
        <div className="absolute top-4 left-5 bg-white text-blue-800 px-3 py-1 rounded-full text-[10px] font-bold font-sans">shama.pk</div>
        <h3 className="text-xl font-bold mb-6 mt-6">پاکستان میں انجینئر کی ترقی</h3>
        <div className="space-y-4 font-sans">
          <div className="flex justify-between items-center bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <span className="text-sm">ابتدائی سطح (صفر سے ایک سال)</span>
            <span className="font-bold">۵۰ ہزار سے ۸۰ ہزار</span>
          </div>
          <div className="flex justify-between items-center bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <span className="text-sm">تین سال کا تجربہ</span>
            <span className="font-bold">ایک لاکھ بیس ہزار سے دو لاکھ</span>
          </div>
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border shadow-lg">
            <span className="text-sm font-bold text-blue-900">پانچ سال اور مہارت کے ساتھ</span>
            <span className="font-black text-blue-800">اڑھائی سے چار لاکھ</span>
          </div>
        </div>
        <p className="text-[11px] text-blue-100 mt-4 leading-relaxed">فائدہ: کم وسائل میں کام سے تخلیقی صلاحیت بڑھتی ہے - shama.pk</p>
      </div>

      <div className="bg-white rounded-[2rem] p-8 border border-blue-200 relative overflow-hidden shadow-xl">
        <div className="absolute top-4 left-5 bg-blue-800 text-white px-3 py-1 rounded-full text-[10px] font-bold font-sans">shama.pk</div>
        <h3 className="text-xl font-bold mb-6 text-blue-900 mt-6">تنخواہ بڑھانے والے ہنر</h3>
        <div className="space-y-4 font-sans">
          <div className="flex justify-between items-center bg-blue-50 p-4 rounded-2xl border border-blue-100">
            <span className="text-sm text-slate-700">حفاظتی تربیت اور سرٹیفیکیشن</span>
            <span className="font-bold text-blue-800 text-xs bg-white border px-2 py-1 rounded-full">بہت اہم</span>
          </div>
          <div className="flex justify-between items-center bg-blue-50 p-4 rounded-2xl border border-blue-100">
            <span className="text-sm text-slate-700">آٹومیشن اور پی ایل سی پروگرامنگ</span>
            <span className="font-bold text-blue-800 text-xs bg-white border px-2 py-1 rounded-full">آمدنی میں اضافہ</span>
          </div>
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded-2xl border shadow-lg">
            <span className="text-sm font-bold text-white">کاروباری سمجھ اور رپورٹنگ</span>
            <span className="font-black text-white text-xs">مینجر بننے کا راستہ</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">جو انجینئر کاروبار کی زبان سمجھتا ہے، وہی آگے جاتا ہے - shama.pk</p>
      </div>
    </div>
  );
}

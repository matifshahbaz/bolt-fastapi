import React from 'react';

const fields = [
  { title: 'مکینیکل انجینئرنگ', desc: 'فیکٹریوں کی ریڑھ کی ہڈی، ہر گھومنے والی مشین', kpi: 'سب سے زیادہ نوکریاں', icon: '⚙️' },
  { title: 'الیکٹریکل انجینئرنگ', desc: 'سولر، بجلی اور آٹومیشن کا انقلاب', kpi: 'سب سے تیزی سے ترقی', icon: '⚡' },
  { title: 'سول انجینئرنگ', desc: 'مکان، پل اور ہائی رائز کی تعمیر', kpi: 'دیرپا روزگار', icon: '🏗️' },
  { title: 'کیمیکل انجینئرنگ', desc: 'کھاد، سیمنٹ اور آئل ریفائنری', kpi: 'زیادہ تنخواہ', icon: '🧪' },
  { title: 'سافٹ ویئر انجینئرنگ', desc: 'گھر بیٹھے دنیا کے لیے کام', kpi: 'فری لانسنگ', icon: '💻' },
  { title: 'میکاٹرونکس', desc: 'روبوٹ اور خودکار مشینوں کا امتزاج', kpi: 'مستقبل کی فیلڈ', icon: '🔧' },
];

export default function EngineeringFieldsBlue() {
  return (
    <div dir="rtl" className="w-full bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-[2rem] p-6 md:p-8 border border-blue-400/30 relative overflow-hidden" style={{fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif"}}>
      <div className="absolute top-4 left-6 bg-white text-blue-800 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest font-sans">shama.pk</div>
      <div className="mb-8 mt-8">
        <h2 className="text-3xl font-black text-white">پاکستان میں انجینئرنگ کی اہم اقسام</h2>
        <p className="text-blue-100 mt-2 text-sm">ہر شعبے کا اپنا مزاج اور اپنی مارکیٹ</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((f, i) => (
          <div key={i} className="group relative bg-white rounded-[1.5rem] p-5 border border-blue-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-xl text-white shadow-lg">
                {f.icon}
              </div>
              <span className="text-[8px] font-bold text-blue-800 bg-blue-50 px-2 py-1 rounded-full font-sans">shama.pk</span>
            </div>
            <h3 className="text-[17px] font-bold text-slate-900 leading-snug">{f.title}</h3>
            <p className="text-[13px] text-slate-600 mt-2 leading-relaxed">{f.desc}</p>
            <div className="mt-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[11px] font-bold border border-blue-100">📌 {f.kpi}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

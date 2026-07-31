import React from 'react';

const cards = [
  {
    title: 'توانائی کا منبع',
    desc: 'کیا آپ لوگوں میں رہ کر توانائی پاتے ہیں یا تنہائی میں؟ Extrovert کو سیلز، تدریس، صحافت پسند جبکہ Introvert کو تحقیق، تحریر، پروگرامنگ میں سکون ملتا ہے۔',
    icon: '⚡',
    color: 'bg-[#E8F5E9]',
  },
  {
    title: 'معلومات کی پرکھ',
    desc: 'حقائق، اعداد و شمار پر یقین یا خیالات، امکانات پر توجہ؟ پہلے والے آپریشنز اور انجینئرنگ میں بہترین، دوسرے تخلیقی شعبوں میں۔',
    icon: '🔍',
    color: 'bg-[#F1F8E9]',
  },
  {
    title: 'فیصلہ سازی کا انداز',
    desc: 'منطق اور انصاف کو ترجیح یا انسانی احساسات کو؟ منطقی افراد فنانس، عدلیہ میں، احساسات والے تدریس اور کونسلنگ میں کامیاب۔',
    icon: '⚖️',
    color: 'bg-[#E8F5E9]',
  },
  {
    title: 'قدروں کا نظام',
    desc: 'آپ کے لیے آزادی اہم ہے یا تحفظ، خدمت یا شہرت؟ آزادی والوں کے لیے کاروبار، تحفظ والوں کے لیے مستحکم نوکری بہترین۔',
    icon: '💎',
    color: 'bg-[#DCEDC8]',
  },
];

export default function PersonalitySection() {
  return (
    <section className="max-w-[1100px] mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">پہلا ستون: اپنی شخصیت کا جائزہ</h2>
        <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#C8E6C9]">Big Five + MBTI + Holland</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {cards.map((c) => (
          <div
            key={c.title}
            className={`rounded-[20px] p-6 border border-[#C8E6C9] shadow-sm hover:shadow-md transition ${c.color}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white grid place-items-center shadow-sm text-lg">{c.icon}</div>
              <h3 className="font-bold text-lg">{c.title}</h3>
            </div>
            <p className="text-[14px] leading-7 mt-3 text-[#2E7D32]/70">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

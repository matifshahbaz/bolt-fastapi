"use client";

import React, { useState } from 'react';

const tabs = {
  analytic: {
    title: 'تجزیاتی + تنہائی پسند',
    desc: 'پہیلیاں حل کرنے کا شوق، ریاضی میں مہارت',
    careers: ['سافٹ ویئر انجینئر', 'ڈیٹا سائنسدان', 'چارٹرڈ اکاؤنٹنٹ', 'ریسرچ سائنسدان'],
  },
  social: {
    title: 'ملنسار + کہانی گو',
    desc: 'کہانیاں سنانے کا شوق، رابطے کی بہترین مہارت',
    careers: ['استاد', 'صحافی / یوٹیوبر', 'مارکیٹنگ مینیجر', 'وکیل / HR مینیجر'],
  },
  creative: {
    title: 'تخلیقی + ڈیزائن پسند',
    desc: 'رنگوں اور ڈیزائن کا شوق، فوٹوشاپ میں مہارت',
    careers: ['گرافک ڈیزائنر', 'UI/UX ڈیزائنر', 'آرکیٹیکٹ', 'فیشن / انٹیریئر ڈیزائنر'],
  },
  service: {
    title: 'خدمت گزار + صبر والا',
    desc: 'دوسروں کی مدد میں خوشی، صبر اور ہمدردی',
    careers: ['ڈاکٹر / نرس', 'سائیکالوجسٹ / کونسلر', 'سماجی کارکن', 'کسٹمر سپورٹ لیڈ'],
  },
};

export default function CareerTabs() {
  const [active, setActive] = useState<keyof typeof tabs>('analytic');

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">مختلف شعبوں میں آپ کی شخصیت کا اطلاق</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(tabs).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key as any)}
            className={`px-5 py-2.5 rounded-full text-sm border transition ${
              active === key ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-md' : 'bg-white border-[#C8E6C9] hover:bg-[#F1F8E9]'
            }`}
          >
            {tabs[key as keyof typeof tabs].title}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[24px] border border-[#C8E6C9] p-8 shadow-sm">
        <p className="text-sm opacity-60">خصوصیت</p>
        <h3 className="text-xl font-bold mt-1">{tabs[active].title}</h3>
        <p className="text-[15px] leading-7 mt-2 opacity-70">{tabs[active].desc}</p>
        <div className="grid md:grid-cols-4 gap-3 mt-6">
          {tabs[active].careers.map((c) => (
            <div key={c} className="bg-[#F1F8E9] rounded-xl p-4 border border-[#DCEDC8] text-center text-sm font-medium hover:bg-[#E8F5E9] transition">
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

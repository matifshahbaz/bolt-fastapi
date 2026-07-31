import React from 'react';
const steps = [
  'خود کلامی کا ہفتہ - اپنی قدریں، خوبیاں، خامیاں لکھیں۔',
  'تحقیق کا مہینہ - دلچسپی کے 3 شعبوں میں 5 لوگوں سے ملیں۔',
  'چھوٹے تجربات - بڑی چھلانگ سے پہلے فری لانس، چھوٹا کورس۔',
  'مہارت کا فرق ختم کریں - Coursera, DigiSkills پر 6 ماہ کا پلان۔',
  'رہنما تلاش کریں - سینئر سے رہنمائی۔',
  'فیصلہ اور عہد - 2 سال قائم رہنے کا عہد۔',
  'مسلسل جائزہ - ہر 6 ماہ بعد جائزہ۔',
];
export default function Timeline() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h2 className="text-3xl font-bold mb-10 text-center">سات مرحلہ عملی منصوبہ</h2>
      <div className="relative border-r-2 border-[#C8E6C9] pr-8 space-y-6">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <div className="absolute -right-3 top-2 h-6 w-6 rounded-full border-4 border-[#F1F8E9] bg-[#2E7D32]"></div>
            <div className="bg-white rounded-2xl p-5 border border-[#E8F5E9] shadow-sm">
              <span className="rounded-full border bg-[#F1F8E9] px-3 py-1 text-sm font-semibold text-[#2E7D32]">مرحلہ {i + 1}</span>
              <p className="mt-3 text-base font-medium text-[#1F2937]">{step}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
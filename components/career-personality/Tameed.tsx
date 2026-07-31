import React from 'react';
import { Leaf } from 'lucide-react';

export default function Tameed() {
  return (
    <section id="tameed" className="fade-up py-8 md:py-10 scroll-mt-24">
      <div className="bg-white rounded-[24px] border border-green-100 shadow-sm p-7 md:p-9">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#E8F5E9] grid place-items-center">
            <Leaf className="w-4 h-4 text-[#2E7D32]" />
          </span>
          <h3 className="text-[24px] md:text-[28px] font-bold text-[#1B5E20]">تمہید</h3>
        </div>

        <p className="text-[18px] leading-[2.15] text-[#344E36] font-[Noto_Nastaliq_Urdu]">
          ہر انسان کے اندر قدرت نے کچھ خاص صلاحیتیں، رجحانات اور دلچسپیاں ودیعت کی ہیں۔ کیریئر کا انتخاب دراصل ان چھپی ہوئی صلاحیتوں کو پہچاننے، نکھارنے اور دنیا کی ضرورت سے جوڑنے کا نام ہے۔ جلد بازی یا خاندانی دباؤ میں کیا گیا فیصلہ برسوں کی بے اطمینانی بن سکتا ہے، جبکہ سوچ سمجھ کر کیا گیا انتخاب زندگی بھر کی توانائی کا سرچشمہ بنتا ہے۔
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-[15px] leading-7">
          {[
            "خود شناسی کامیابی کی پہلی سیڑھی",
            "مارکیٹ کی سمجھ دوسرا ستون",
            "مستقل مزاجی آخری کنجی",
          ].map((t) => (
            <div
              key={t}
              className="bg-[#F1F8E9] rounded-2xl px-4 py-3 border border-[#E8F5E9] flex gap-2 items-start hover:shadow-sm transition"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2E7D32] shrink-0" />
              <span className="text-[#2E7D32] font-medium">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

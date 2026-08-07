import React from 'react';

export default function Hero() {
  return (
    <section className="max-w-[1100px] mx-auto px-6 pt-16 pb-10">
      <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
        <div className="space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#2E7D32] text-white text-xs tracking-widest shadow-sm">
            خود شناسی سے خود کفالت تک
          </span>
          <h1 className="text-[40px] md:text-[56px] leading-[1.15] font-extrabold text-[#1B5E20]">
            اپنے کیریئر کا انتخاب
            <span className="block text-[#388E3C] font-normal mt-3 text-[32px] md:text-[42px]">
              شخصیت، شوق اور مہارت کی روشنی میں
            </span>
          </h1>
          <p className="text-[17px] leading-8 text-[#33691E]/80 max-w-[60ch]">
            یہ ویب سائٹ آپ کے 4000 الفاظ کے تفصیلی مضمون کو ایک خوبصورت، انٹرایکٹو تجربے میں بدل دیتی ہے۔
            ہلکا سبز رنگ سکون، ترقی اور امید کی علامت ہے۔ یہاں آپ اپنی شخصیت، اقدار اور مہارتوں کو سمجھ کر بہترین فیصلہ کر سکیں گے۔
          </p>
          <div className="flex gap-3 pt-2">
            <button className="px-7 py-3 rounded-full bg-[#2E7D32] text-white shadow-lg shadow-green-200 hover:bg-[#1B5E20] transition">
              سفر شروع کریں
            </button>
            <button className="px-7 py-3 rounded-full bg-white border border-[#C8E6C9] hover:bg-green-50 transition">
              مضمون پڑھیں
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#A5D6A7]/40 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#C8E6C9]/50 rounded-full blur-3xl"></div>
          <div className="relative bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(46,125,50,0.12)] border border-[#E8F5E9]">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F1F8E9] rounded-2xl p-5 border border-[#DCEDC8]">
                <p className="text-3xl font-bold">4</p>
                <p className="text-sm mt-1 opacity-70">بنیادی ستون</p>
              </div>
              <div className="bg-[#E8F5E9] rounded-2xl p-5 border border-[#C8E6C9]">
                <p className="text-3xl font-bold">12k+</p>
                <p className="text-sm mt-1 opacity-70">پیشے دنیا میں</p>
              </div>
              <div className="col-span-2 bg-[#2E7D32] text-white rounded-2xl p-5 shadow-md">
                <p className="font-bold">اکیگائی فارمولا</p>
                <p className="text-sm opacity-80 mt-1 leading-6">پسند + مہارت + ضرورت + معاوضہ = مثالی کیریئر</p>
              </div>
              <div className="col-span-2 bg-[#FAFAFA] rounded-2xl p-4 border border-[#EEEEEE] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F1F8E9] grid place-items-center">💡</div>
                <p className="text-xs leading-5 opacity-70">آپ کا بہترین کیریئر آپ کے اندر چھپا ہوا ہے، بس دریافت کرنے کی دیر ہے۔</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

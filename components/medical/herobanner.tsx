import React from 'react';
import heroBackground from './mbbs_flatlay_medical.webp';

export default function HeroBanner() {
  return (
    <div dir="rtl" style={{fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif"}} className="relative w-full h-[480px] md:h-[580px] rounded-[36px] overflow-hidden shadow-2xl">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground.src})` }}
      />

      <div className="relative z-10 h-full flex flex-col justify-center p-10 md:p-16 max-w-[650px]">
        <div className="w-fit max-w-full rounded-3xl bg-white/65 px-6 py-5 backdrop-blur-[1px]">
          <h1 className="text-[52px] md:text-[68px] font-bold leading-[1.15] text-primary">
            <span>ایم بی بی ایس</span>
            <br />
            <span>ڈاکٹر بننے کا خواب</span>
          </h1>
          <p className="text-[30px] md:text-[36px] leading-[1.4] text-teal-800 mt-4">
            ایک مکمل، غیر کتابی رہنما
          </p>
          <p className="text-[22px] md:text-[26px] font-semibold text-slate-800 mt-4">shama.pk</p>
        </div>
      </div>
    </div>
  )
}
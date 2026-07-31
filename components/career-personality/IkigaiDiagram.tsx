import React from 'react';

export default function IkigaiDiagram() {
  return (
    <section className="max-w-[1100px] mx-auto px-6 py-12">
      <div className="bg-white rounded-[28px] border border-[#C8E6C9] p-8 md:p-12 shadow-sm">
        <div className="text-center max-w-[600px] mx-auto">
          <h2 className="text-3xl font-bold">اکیگائی - جاپانی فلسفہ برائے زندگی کا مقصد</h2>
          <p className="text-sm leading-7 mt-3 opacity-60">
            جاپان کے اوکیناوا جزیرے کے لوگ سب سے لمبی عمر پاتے ہیں، راز ان کا اکیگائی ہے۔ چار دائروں کا سنگم ہی آپ کا مثالی کیرئیر ہے۔
          </p>
        </div>

        <div className="relative h-[380px] md:h-[420px] max-w-[560px] mx-auto mt-12">
          {/* Circles */}
          <div className="absolute top-0 left-[22%] md:left-[26%] w-[200px] md:w-[230px] h-[200px] md:h-[230px] rounded-full bg-[#A5D6A7]/50 border border-[#81C784] backdrop-blur-[1px] flex items-center justify-center text-center p-4">
            <span className="font-bold text-[14px]">وہ جو آپ کو<br />پسند ہے</span>
          </div>
          <div className="absolute top-0 right-[22%] md:right-[26%] w-[200px] md:w-[230px] h-[200px] md:h-[230px] rounded-full bg-[#C8E6C9]/70 border border-[#A5D6A7] backdrop-blur-[1px] flex items-center justify-center text-center p-4">
            <span className="font-bold text-[14px]">وہ جس میں آپ<br />ماہر ہیں</span>
          </div>
          <div className="absolute bottom-0 left-[22%] md:left-[26%] w-[200px] md:w-[230px] h-[200px] md:h-[230px] rounded-full bg-[#DCEDC8]/80 border border-[#C8E6C9] flex items-center justify-center text-center p-4">
            <span className="font-bold text-[14px]">وہ جس کی دنیا<br />کو ضرورت ہے</span>
          </div>
          <div className="absolute bottom-0 right-[22%] md:right-[26%] w-[200px] md:w-[230px] h-[200px] md:h-[230px] rounded-full bg-[#66BB6A]/25 border border-[#66BB6A]/50 flex items-center justify-center text-center p-4">
            <span className="font-bold text-[14px]">وہ جس کا معاوضہ<br />مل سکتا ہے</span>
          </div>

          {/* Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] h-[130px] rounded-full bg-[#2E7D32] text-white grid place-items-center text-center text-sm font-bold shadow-xl shadow-green-200 border-4 border-white z-10">
            مثالی
            <br />
            کیرئیر
            <span className="text-[10px] font-normal opacity-80 mt-1">IKIGAI</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 text-[12px]">
          <div className="bg-[#F1F8E9] rounded-xl p-3 text-center border">شوق = پسند + مہارت</div>
          <div className="bg-[#E8F5E9] rounded-xl p-3 text-center border">مشن = پسند + ضرورت</div>
          <div className="bg-[#DCEDC8] rounded-xl p-3 text-center border">پیشہ = ضرورت + معاوضہ</div>
          <div className="bg-[#C8E6C9] rounded-xl p-3 text-center border">بزنس = مہارت + معاوضہ</div>
        </div>
      </div>
    </section>
  );
}

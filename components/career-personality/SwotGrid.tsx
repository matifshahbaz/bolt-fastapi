import React from 'react';

export default function SwotGrid() {
  return (
    <section className="max-w-[1100px] mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">ذات کا سواٹ تجزیہ (SWOT)</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[#E8F5E9] rounded-[20px] p-6 border border-[#A5D6A7] hover:shadow-md transition">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#2E7D32] text-white grid place-items-center text-xs font-bold">S</span>
            <h4 className="font-bold">طاقتیں (Strengths)</h4>
          </div>
          <ul className="mt-3 text-sm leading-7 opacity-70 list-disc pr-5">
            <li>جلدی سیکھنے کی صلاحیت</li>
            <li>ایمانداری اور فرض شناسی</li>
            <li>زبانوں پر عبور یا تکنیکی مہارت</li>
          </ul>
        </div>

        <div className="bg-[#FFF8E1] rounded-[20px] p-6 border border-[#FFE082] hover:shadow-md transition">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#F9A825] text-white grid place-items-center text-xs font-bold">W</span>
            <h4 className="font-bold">کمزوریاں (Weaknesses)</h4>
          </div>
          <ul className="mt-3 text-sm leading-7 opacity-70 list-disc pr-5">
            <li>عوام میں بولنے کا خوف</li>
            <li>وقت کا انتظام کمزور</li>
            <li>تیز غصہ یا جلد مایوس ہونا</li>
          </ul>
        </div>

        <div className="bg-[#E3F2FD] rounded-[20px] p-6 border border-[#90CAF9] hover:shadow-md transition">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#1976D2] text-white grid place-items-center text-xs font-bold">O</span>
            <h4 className="font-bold">مواقع (Opportunities)</h4>
          </div>
          <ul className="mt-3 text-sm leading-7 opacity-70 list-disc pr-5">
            <li>فری لانسنگ اور ریموٹ جابز</li>
            <li>ڈیجی اسکلز، کورسیرا مفت کورسز</li>
            <li>نئی ٹیکنالوجیز - AI، ڈیجیٹل مارکیٹنگ</li>
          </ul>
        </div>

        <div className="bg-[#FFEBEE] rounded-[20px] p-6 border border-[#EF9A9A] hover:shadow-md transition">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#D32F2F] text-white grid place-items-center text-xs font-bold">T</span>
            <h4 className="font-bold">خطرات (Threats)</h4>
          </div>
          <ul className="mt-3 text-sm leading-7 opacity-70 list-disc pr-5">
            <li>سخت مقابلہ اور آٹومیشن</li>
            <li>خاندانی مالی دباؤ</li>
            <li>غلط معلومات اور جلد بازی کے فیصلے</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

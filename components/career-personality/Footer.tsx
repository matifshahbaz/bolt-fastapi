import React from 'react';
export default function Footer() {
  return (
    <footer className="mt-16 bg-[#2E7D32] text-[#E8F5E9]">
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-lg">کیریئر رہنما</h4>
            <p className="text-sm opacity-70 mt-2 leading-6">اپنی شخصیت، شوق، دلچسپی اور مہارت کی روشنی میں بہترین کیریئر کا انتخاب کریں۔</p>
          </div>
          <div>
            <h4 className="font-bold">اہم لنکس</h4>
            <ul className="text-sm opacity-70 mt-2 space-y-1">
              <li>شخصیت کا جائزہ</li>
              <li>اکیگائی ماڈل</li>
              <li>سواٹ تجزیہ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">رابطہ</h4>
            <p className="text-xs opacity-50 mt-4">© 2026 کیریئر رہنما - Light Green Theme #F1F8E9</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

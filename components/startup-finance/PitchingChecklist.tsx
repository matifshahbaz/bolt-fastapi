'use client';

import React, { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';

const PitchingChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const items = [
    { id: 1, text: 'بزنس کیس ڈاکومنٹ (مسئلہ، حل، متوقع آمدنی ایک صفحے پر لکھ لی ہے؟)' },
    { id: 2, text: 'رقم کی ضرورت کا درست تخمینہ (کتنا پیسہ کس کام پر لگے گا، تفصیل تیار ہے؟)' },
    { id: 3, text: 'واپسی کا واضح پلان (اگر قرض ہے تو ماہانہ قسط منافع سے کیسے نکلے گی؟)' },
    { id: 4, text: 'ذاتی اور کاروباری فنڈز کا الگ اکاؤنٹ / لفافہ تیار کر لیا ہے؟' },
    { id: 5, text: 'گھر والے یا دوست کے سامنے پچ (Pitch) کی مشق کر لی ہے؟' },
  ];

  const toggleItem = (id: number) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-12 p-6 bg-gradient-to-tr from-teal-900 to-emerald-950 text-white rounded-2xl shadow-xl border border-emerald-500/30 text-right font-['Jameel_Noori_Nastaleeq',sans-serif]" dir="rtl">
      <div className="mb-6 border-b border-emerald-800 pb-3">
        <h2 className="text-3xl font-bold text-amber-400">چیک لسٹ: سرمایہ مانگنے سے پہلے کی تیاری</h2>
        <p className="text-emerald-200 text-lg mt-1">چاہے والد ہوں یا کوئی بینک، ان کے پاس جانے سے پہلے ان پانچ خانوں کو ٹک کریں۔</p>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${
              checkedItems[item.id]
                ? 'bg-emerald-800/60 border border-emerald-500 text-emerald-200 line-through opacity-80'
                : 'bg-slate-800/80 border border-slate-700 text-slate-100 hover:bg-slate-700'
            }`}
          >
            <button className="mt-1 shrink-0 text-amber-400 focus:outline-none">
              {checkedItems[item.id] ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
            </button>
            <span className="text-xl md:text-2xl leading-relaxed pt-1">{item.text}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-between items-center text-xs text-emerald-400 border-t border-emerald-900 pt-4">
        <span>© کورس آرٹیکل ماڈیول ۵</span>
        <span className="font-sans">shama.pk</span>
      </div>
    </div>
  );
};

export default PitchingChecklist;

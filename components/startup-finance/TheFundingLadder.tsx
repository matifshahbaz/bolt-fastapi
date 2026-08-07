'use client';

import React, { useState } from 'react';
import { ChevronUp, Shield, HelpCircle, Briefcase, Award } from 'lucide-react';

const FundingLadder = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { id: 1, title: 'ذاتی بچت', desc: 'سب سے محفوظ اور آسان ذریعہ۔ کسی کو جواب نہیں دینا پڑتا۔', risk: 'بہت کم', capital: 'کم' },
    { id: 2, title: 'گھر والے اور دوست', desc: 'باہمی اعتماد پر مبنی۔ تحفہ، قرض یا شراکت داری واضح کرنا لازمی ہے۔', risk: 'کم سے درمیانہ', capital: 'کم سے درمیانہ' },
    { id: 3, title: 'مائیکروفنانس', desc: 'اخوت فاؤنڈیشن جیسے اداروں سے سود سے پاک قرضِ حسنہ۔', risk: 'درمیانہ', capital: 'درمیانہ' },
    { id: 4, title: 'بینک و سرکاری اسکیمیں', desc: 'کامیاب جوان پروگرام جیسے سستے قرضے۔ کاغذی کارروائی زیادہ ہوتی ہے۔', risk: 'زیادہ', capital: 'زیادہ' },
    { id: 5, title: 'کراؤڈ فنڈنگ', desc: 'دنیا بھر سے یا پیشگی آرڈر (Pre-orders) کے ذریعے فنڈز کا حصول۔', risk: 'درمیانہ', capital: 'زیادہ' },
    { id: 6, title: 'سرمایہ کار (Investors)', desc: 'بڑی رقم، لیکن بدلے میں کاروبار میں شراکت داری اور تیز رفتار ترقی کا دباؤ۔', risk: 'بہت زیادہ', capital: 'بہت زیادہ' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-6 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl shadow-2xl border border-indigo-500/2xl text-right dir-rtl font-['Jameel_Noori_Nastaleeq',sans-serif]" dir="rtl">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300 mb-2">سرمائے کا زینہ (چھوٹے سے شروع کریں)</h2>
        <p className="text-slate-300 text-lg md:text-xl">ہر قدم اوپر جاتے ہوئے سرمایہ بڑھے گا، مگر ساتھ ہی ذمہ داری بھی۔ نیچے سے شروع کریں!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Ladder Steps */}
        <div className="md:col-span-5 flex flex-col-reverse gap-3">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`w-full p-4 rounded-xl text-right transition-all duration-300 flex items-center justify-between border ${
                activeStep === idx
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] transform -translate-x-2'
                  : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${activeStep === idx ? 'bg-slate-950 text-amber-400' : 'bg-slate-700 text-amber-400'}`}>
                  {step.id}
                </span>
                <span className="text-xl md:text-2xl pt-1">{step.title}</span>
              </div>
              <ChevronUp className={`w-5 h-5 ${activeStep === idx ? 'text-slate-950' : 'text-slate-400'}`} />
            </button>
          ))}
        </div>

        {/* Dynamic Display Details */}
        <div className="md:col-span-7 bg-slate-800/50 rounded-xl p-6 border border-slate-700/60 min-h-[320px] flex flex-col justify-between backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-3">
              <Briefcase className="text-amber-400 w-6 h-6" />
              <h3 className="text-2xl md:text-3xl font-bold text-amber-400 pt-1">{steps[activeStep].title}</h3>
            </div>
            <p className="text-slate-200 text-lg md:text-xl leading-relaxed mb-6">
              {steps[activeStep].desc}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/40">
              <span className="text-sm text-slate-400 block">سرمائے کی حد:</span>
              <span className="text-xl text-emerald-400 font-semibold">{steps[activeStep].capital}</span>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/40">
              <span className="text-sm text-slate-400 block">ذمہ داری / خطرہ:</span>
              <span className="text-xl text-rose-400 font-semibold">{steps[activeStep].risk}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-xs text-slate-500 border-t border-slate-800 pt-4">
        shama.pk • کاروباری کورس ماڈیول ۵
      </div>
    </div>
  );
};

export default FundingLadder;

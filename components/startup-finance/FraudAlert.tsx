import React from 'react';
import { ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

const FraudAlertCard = () => {
  return (
    <div className="w-full max-w-3xl mx-auto my-10 bg-rose-50 border-2 border-rose-300 rounded-2xl shadow-lg p-6 text-right font-['Jameel_Noori_Nastaleeq',sans-serif]" dir="rtl">
      <div className="flex items-center gap-3 border-b border-rose-200 pb-3 mb-4">
        <ShieldAlert className="w-8 h-8 text-rose-600 animate-pulse shrink-0" />
        <h2 className="text-2xl md:text-3xl font-bold text-rose-800 pt-1">انتہائی ضروری معلومات: آن لائن فراڈ سے بچیں!</h2>
      </div>
      
      <p className="text-slate-700 text-lg md:text-xl leading-relaxed mb-6">
        اخوت فاؤنڈیشن یا وزیرِ اعظم کی کامیاب جوان اسکیم جیسی مشہور فنڈنگ کے نام پر سوشل میڈیا پر کئی جعلی گروپس اور ویب سائٹس متحرک ہیں۔ دھوکہ دہی سے بچنے کے لیے درج ذیل اصولوں پر سختی سے عمل کریں:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Safe Actions */}
        <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xl mb-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>صحیح طریقہ کار:</span>
          </div>
          <ul className="text-slate-700 text-lg space-y-2 list-inside list-disc">
            <li>ہمیشہ ادارے کی اصل برانچ خود وزٹ کریں۔</li>
            <li>صرف <span className="underline font-sans text-sm">.gov.pk</span> والی سرکاری ویب سائٹس دیکھیں۔</li>
            <li>بزنس کیس کا کاغذ خود لے کر جائیں۔</li>
          </ul>
        </div>

        {/* Red Flags */}
        <div className="bg-rose-100/50 p-4 rounded-xl border border-rose-200">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-xl mb-2">
            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>خطرہ کی گھنٹی (Red Flags):</span>
          </div>
          <ul className="text-slate-700 text-lg space-y-2 list-inside list-disc">
            <li>قرض دینے کے نام پر پہلے فارم فیس مانگنا۔</li>
            <li>واٹس ایپ یا فیس بک پر شناختی کارڈ مانگنا۔</li>
            <li>&quot;یقینی اور فوری منافع&quot; کا لالچ دینا۔</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-4 text-center text-xs text-rose-400">
        محفوظ پاکستان، کامیاب کاروبار • shama.pk
      </div>
    </div>
  );
};

export default FraudAlertCard;

import { Sparkles } from "lucide-react";

export default function LizRyanQuote() {
  return (
    <div className="relative rounded-[24px] p-[1.5px] bg-gradient-to-br from-[#7C3AED]/30 via-[#7C3AED]/20 to-[#06B6D4]/30 shadow-[0_20px_60px_-20px_rgba(124,58,237,0.25),0_8px_24px_-8px_rgba(6,182,214,0.15)] max-w-[640px] mx-auto">
      <div className="relative rounded-[22.5px] overflow-hidden bg-gradient-to-br from-[#F5F3FF] via-[#F5F3FF] to-[#ECFEFF] p-8 md:p-10 pb-16 md:pb-[72px]">
        <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-gradient-to-b from-[#7C3AED] via-[#8B5CF6] to-[#06B6D4]" />

        {/* Confetti dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-violet-300/40" />
          <div className="absolute top-[28%] left-[88%] w-1.5 h-1.5 rounded-full bg-cyan-300/50" />
          <div className="absolute top-[62%] left-[18%] w-2.5 h-2.5 rounded-full bg-fuchsia-300/30" />
        </div>

        <div className="relative ml-4 md:ml-2">
          <div className="absolute -top-6 -left-2 text-[84px] leading-none font-serif font-black bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent opacity-[0.14] select-none">“</div>
        </div>

        <div className="relative pl-4 md:pl-5 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white shadow border border-violet-100">
              <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            </div>
            <span className="text-[12px] tracking-[0.12em] font-bold uppercase text-violet-600/80" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif" }}>
              دنیا کی معروف کیریئر کوچ
            </span>
          </div>

          {/* Quote - Increased spacing */}
          <div dir="rtl" className="flex flex-col gap-[24px] text-right" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif" }}>
            <p className="font-bold text-[#0F172A] text-[26px] md:text-[28px]" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif", lineHeight: "2.8", wordSpacing: "4px", letterSpacing: "0.5px" }}>
              ہمیں یہ مت بتائیں کہ اس نوکری میں آپ کی ذمہ داریاں کیا تھیں۔
            </p>
            <p className="font-bold text-[#0F172A] text-[26px] md:text-[28px]" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif", lineHeight: "2.8", wordSpacing: "4px", letterSpacing: "0.5px" }}>
              ہمیں یہ بتائیں کہ آپ نے کیا کر دکھایا۔
            </p>
          </div>

          <div className="flex justify-end pt-2" dir="ltr">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-violet-100 shadow">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-white">L</div>
              <span className="text-[13px] font-semibold text-[#7C3AED]">Liz Ryan</span>
              <span className="text-[11px] text-slate-400">— Career Coach</span>
            </div>
          </div>
        </div>

        {/* Bright shama.pk */}
        <div className="absolute bottom-5 right-6">
          <div className="inline-flex items-center gap-1.5 px-[14px] py-[6px] rounded-full bg-white shadow-[0_4px_16px_rgba(124,58,237,0.18)] border border-violet-100">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
            <span className="text-[14px] font-black tracking-[0.02em] text-[#7C3AED]">shama.pk</span>
          </div>
        </div>
      </div>

    </div>
  );
}

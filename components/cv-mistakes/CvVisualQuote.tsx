import { Eye } from "lucide-react";

export default function CvVisualQuote() {
  return (
    <div className="relative rounded-[24px] p-[1.5px] bg-gradient-to-br from-[#FF6B35]/25 via-[#FF6B35]/15 to-[#EC4899]/25 shadow-[0_20px_60px_-20px_rgba(255,107,53,0.25),0_8px_24px_-8px_rgba(236,72,153,0.15)] max-w-[640px] mx-auto">
      <div className="relative rounded-[22.5px] overflow-hidden bg-gradient-to-br from-[#FFF7ED] via-[#FFF7ED] to-[#FDF2F8] p-8 md:p-10 pb-16 md:pb-[72px]">
        <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-gradient-to-b from-[#FF6B35] via-[#F97316] to-[#EC4899]" />

        <div className="relative pl-4 md:pl-5 flex flex-col gap-7">
          <div className="flex justify-end" dir="rtl">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#EC4899] rounded-full blur-[14px] opacity-30 scale-110" />
              <div className="relative w-[64px] h-[64px] rounded-full bg-gradient-to-br from-[#FF6B35] to-[#EC4899] shadow-[0_8px_20px_rgba(255,107,53,0.25)] flex items-center justify-center">
                <Eye className="w-7 h-7 text-white" strokeWidth={2.2} />
              </div>
            </div>
          </div>

          {/* Quote - Exactly 2 Lines */}
          <div dir="rtl" className="flex flex-col items-center text-center gap-[16px]" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif" }}>
            <p className="font-bold text-[#0F172A] text-[24px] md:text-[28px] w-full" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif", lineHeight: "2.5", wordSpacing: "3px" }}>
              کوئی بھی شخص آپ کی CV کو پڑھتا بعد میں ہے،
            </p>
            <p className="font-black text-[30px] md:text-[38px] w-full relative" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif", lineHeight: "2.5", wordSpacing: "3px" }}>
              <span className="bg-gradient-to-r from-[#FF6B35] via-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
                دیکھتا پہلے ہے۔
              </span>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[140px] h-[8px] bg-gradient-to-r from-orange-200/70 to-pink-200/70 rounded-full -z-10" />
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <div className="flex items-center gap-2">
              <div className="h-[2px] w-12 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#EC4899]" />
              <div className="h-[2px] w-2 rounded-full bg-pink-300/60" />
            </div>
          </div>
        </div>

        {/* Bright shama.pk */}
        <div className="absolute bottom-5 right-6">
          <div className="inline-flex items-center gap-1.5 px-[14px] py-[6px] rounded-full bg-white shadow-[0_4px_16px_rgba(255,107,53,0.22)] border border-orange-100">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
            <span className="text-[14px] font-black tracking-[0.02em] text-[#FF6B35]">shama.pk</span>
          </div>
        </div>
      </div>

    </div>
  );
}

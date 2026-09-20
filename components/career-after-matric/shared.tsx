import type { ReactNode } from 'react';
import type { Heart } from 'lucide-react';

export function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <section
      className="relative w-full overflow-hidden rounded-lg border border-[#12355b]/15 bg-[#f7f9fc] p-5 text-right shadow-[0_18px_46px_rgba(18,53,91,0.12)] sm:p-8"
      dir="rtl"
      aria-label={label}
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-[#1fa971]" />
      {children}
      <div className="mt-7 flex items-center justify-end gap-2 border-t border-[#12355b]/10 pt-4" dir="ltr">
        <span className="font-sans text-sm font-bold text-[#12355b]">shama.pk</span>
        <span className="h-1 w-8 bg-[#f5b700]" />
      </div>
    </section>
  );
}

export function Factor({ icon: Icon, children }: { icon: typeof Heart; children: ReactNode }) {
  return (
    <div className="flex min-h-20 items-center gap-3 rounded-lg border border-[#12355b]/10 bg-white p-4 text-[#082a52] shadow-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e7f6ef] text-[#0d8657]">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-lg font-bold leading-relaxed">{children}</span>
    </div>
  );
}

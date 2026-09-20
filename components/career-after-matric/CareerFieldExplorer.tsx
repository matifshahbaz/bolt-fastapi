'use client';

import { useMemo, useState } from 'react';
import {
  Activity,
  Briefcase,
  Coins,
  Compass,
  GraduationCap,
  Hammer,
  Heart,
  Laptop,
  Palette,
  Scale,
  Sprout,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Frame } from './shared';
import { careers, labelForTargetId, sectors, type Sector } from './careerData';

const sectorIcons: Record<string, LucideIcon> = {
  digital: Laptop,
  engineering: Wrench,
  health: Heart,
  rehabilitation: Activity,
  agriculture: Sprout,
  finance: Coins,
  business: Briefcase,
  creative: Palette,
  social: GraduationCap,
  trades: Hammer,
  hospitality: UtensilsCrossed,
  specialised: Scale,
};

function SectorChip({ sector, active, onClick }: { sector: Sector; active: boolean; onClick: () => void }) {
  const Icon = sectorIcons[sector.id] ?? Compass;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-base font-bold leading-relaxed transition-colors ${
        active
          ? 'border-[#1fa971] bg-[#1fa971] text-white'
          : 'border-[#12355b]/15 bg-white text-[#082a52] hover:border-[#1fa971]/50'
      }`}
    >
      <Icon className="h-4 w-4" />
      {sector.label_ur}
    </button>
  );
}

export function CareerFieldExplorer() {
  const [sectorId, setSectorId] = useState<string>('digital');

  const sectorCareers = useMemo(() => careers.filter((career) => career.sector_id === sectorId), [sectorId]);

  return (
    <Frame label="روزگار کی دنیا کھول کر دیکھیں">
      <h2 className="text-3xl font-nastaliq leading-[1.7] text-[#082a52] sm:text-4xl">
        کسی شعبے پر کلک کریں، پھر اس کے اندر پیشے دیکھیں
      </h2>

      <div className="mt-6 flex flex-wrap gap-2">
        {sectors.map((sector) => (
          <SectorChip key={sector.id} sector={sector} active={sector.id === sectorId} onClick={() => setSectorId(sector.id)} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2" aria-live="polite">
        {sectorCareers.map((career) => (
          <div key={career.id} className="rounded-lg border border-[#12355b]/10 bg-white p-4 shadow-sm">
            <h3 className="text-xl font-bold leading-relaxed text-[#082a52]">{career.label_ur}</h3>
            <p className="mt-2 text-base leading-relaxed text-[#40566a]">{career.work_example_ur}</p>
            <p className="mt-1 text-sm leading-relaxed text-[#627485]">{career.possible_work_environment_ur}</p>
            <p className="mt-3 border-t border-[#12355b]/10 pt-2 text-sm font-bold text-[#0d8657]">
              تیاری کے لیے: {career.preparation_target_ids.map((id) => labelForTargetId(id)).join('، ')}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-[#627485]">
        یہ پیشوں کی تعارفی مثالیں ہیں تاکہ کام کی دنیا کا اندازہ ہو — کسی ملازمت، آمدن یا بھرتی کی ضمانت نہیں۔
      </p>
    </Frame>
  );
}

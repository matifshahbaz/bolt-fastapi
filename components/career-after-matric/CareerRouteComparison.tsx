'use client';

import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { Frame } from './shared';
import {
  careers,
  careersById,
  eligibilityRules,
  evidenceStatusMeta,
  formatConditions,
  labelForTargetId,
  sectorsById,
  sectors,
} from './careerData';

const MAX_SELECTED = 3;

const toneClass: Record<'strong' | 'medium' | 'weak', string> = {
  strong: 'bg-[#e7f6ef] text-[#0d8657]',
  medium: 'bg-[#fff6d6] text-[#8a6d00]',
  weak: 'bg-[#eef2f7] text-[#40566a]',
};

function bestRuleFor(careerId: string) {
  const career = careersById[careerId];
  if (!career) return null;
  const targets = new Set(career.preparation_target_ids);
  return eligibilityRules.find((rule) => targets.has(rule.target_id)) ?? null;
}

export function CareerRouteComparison() {
  const [selected, setSelected] = useState<string[]>(['C01', 'C11', 'C46']);
  const [sectorId, setSectorId] = useState('digital');

  const sectorCareers = useMemo(() => careers.filter((career) => career.sector_id === sectorId), [sectorId]);

  function toggle(careerId: string) {
    setSelected((current) => {
      if (current.includes(careerId)) return current.filter((id) => id !== careerId);
      if (current.length >= MAX_SELECTED) return current;
      return [...current, careerId];
    });
  }

  const comparisonCareers = selected.map((id) => careersById[id]).filter(Boolean);

  return (
    <Frame label="منتخب راستوں کا موازنہ">
      <h2 className="text-3xl font-nastaliq leading-[1.7] text-[#082a52] sm:text-4xl">دو یا تین راستے ساتھ رکھ کر دیکھیں</h2>

      <div className="mt-5 flex flex-wrap gap-2">
        {sectors.map((sector) => (
          <button
            key={sector.id}
            type="button"
            aria-pressed={sector.id === sectorId}
            onClick={() => setSectorId(sector.id)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-bold ${
              sector.id === sectorId
                ? 'border-[#1fa971] bg-[#1fa971] text-white'
                : 'border-[#12355b]/15 bg-white text-[#082a52] hover:border-[#1fa971]/50'
            }`}
          >
            {sector.label_ur}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {sectorCareers.map((career) => {
          const isSelected = selected.includes(career.id);
          const disabled = !isSelected && selected.length >= MAX_SELECTED;
          return (
            <button
              key={career.id}
              type="button"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => toggle(career.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors ${
                isSelected
                  ? 'border-[#12355b] bg-[#12355b] text-white'
                  : disabled
                    ? 'border-[#12355b]/10 bg-[#f0f2f5] text-[#a3adb8]'
                    : 'border-[#12355b]/15 bg-white text-[#082a52] hover:border-[#12355b]/40'
              }`}
            >
              {career.label_ur}
            </button>
          );
        })}
      </div>

      <p className="mt-2 text-sm text-[#627485]">زیادہ سے زیادہ {MAX_SELECTED} راستے منتخب کریں — {selected.length}/{MAX_SELECTED} منتخب شدہ۔</p>

      <div
        className="mt-5 grid gap-4"
        style={{ gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))` }}
        aria-live="polite"
      >
        {comparisonCareers.map((career) => {
          const rule = bestRuleFor(career.id);
          const sector = sectorsById[career.sector_id];
          const status = rule ? evidenceStatusMeta[rule.evidence_status] : null;
          const conditionLines = rule ? formatConditions(rule.conditions).slice(0, 3) : [];

          return (
            <div key={career.id} className="relative rounded-lg border border-[#12355b]/10 bg-white p-4 shadow-sm">
              <button
                type="button"
                onClick={() => toggle(career.id)}
                aria-label={`${career.label_ur} ہٹائیں`}
                className="absolute left-3 top-3 text-[#8a96a3] hover:text-[#082a52]"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="pl-6 text-sm font-bold text-[#0d8657]">{sector?.label_ur}</p>
              <h3 className="mt-1 text-xl font-bold leading-relaxed text-[#082a52]">{career.label_ur}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#40566a]">{career.work_example_ur}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#627485]">{career.possible_work_environment_ur}</p>

              <div className="mt-3 border-t border-[#12355b]/10 pt-3">
                <p className="text-sm font-bold text-[#082a52]">
                  اگلا قدم: {career.preparation_target_ids.map((id) => labelForTargetId(id)).join('، ')}
                </p>
                {rule && status ? (
                  <>
                    <span className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-bold ${toneClass[status.tone]}`}>
                      {rule.scope} · {status.label}
                    </span>
                    {conditionLines.length > 0 ? (
                      <ul className="mt-2 space-y-1 text-xs leading-relaxed text-[#40566a]">
                        {conditionLines.map((line) => (
                          <li key={line}>• {line}</li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                ) : (
                  <p className="mt-2 text-xs text-[#627485]">اس راستے کی تفصیل ابھی اس ڈیٹا سیٹ میں شامل نہیں۔</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-[#627485]">
        مکمل شرائط اور ذرائع اوپر "اپنا اگلا قدم دیکھیں" ٹول میں دیکھیں۔ یہ صرف تیز موازنہ ہے، حتمی فیصلے کی بنیاد نہیں۔
      </p>
    </Frame>
  );
}

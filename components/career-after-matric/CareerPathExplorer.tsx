'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Frame } from './shared';
import {
  admissionDisclaimer,
  careers,
  careersById,
  eligibilityRules,
  evidenceStatusMeta,
  formatConditions,
  formatTechnologyExamples,
  labelForTargetId,
  qualifications,
  sectors,
  sourcesFor,
  type EligibilityRule,
} from './careerData';

type Mode = 'forward' | 'backward';

const toneClass: Record<'strong' | 'medium' | 'weak', string> = {
  strong: 'bg-[#e7f6ef] text-[#0d8657]',
  medium: 'bg-[#fff6d6] text-[#8a6d00]',
  weak: 'bg-[#eef2f7] text-[#40566a]',
};

function RuleCard({ rule }: { rule: EligibilityRule }) {
  const status = evidenceStatusMeta[rule.evidence_status];
  const conditionLines = formatConditions(rule.conditions);
  const relatedSources = sourcesFor(rule.source_ids);

  return (
    <div className="rounded-lg border border-[#12355b]/10 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h4 className="text-lg font-bold leading-relaxed text-[#082a52]">{labelForTargetId(rule.target_id)}</h4>
          <p className="text-sm text-[#627485]">{rule.scope}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${toneClass[status.tone]}`}>{status.label}</span>
      </div>

      {rule.programs_en ? (
        <p className="mt-2 text-sm leading-relaxed text-[#40566a]">پروگرام: {rule.programs_en.join('، ')}</p>
      ) : null}

      {conditionLines.length > 0 ? (
        <ul className="mt-3 space-y-1 text-sm leading-relaxed text-[#082a52]">
          {conditionLines.map((line) => (
            <li key={line} className="flex items-start gap-1.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#1fa971]" />
              {line}
            </li>
          ))}
        </ul>
      ) : null}

      {rule.technology_examples ? (
        <ul className="mt-2 space-y-1 text-sm leading-relaxed text-[#627485]">
          {formatTechnologyExamples(rule.technology_examples).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : null}

      {rule.excludes_from_this_rule ? (
        <p className="mt-2 text-sm leading-relaxed text-[#a33]">اس اصول میں شامل نہیں: {rule.excludes_from_this_rule.join('، ')}</p>
      ) : null}

      {rule.note_ur ? <p className="mt-2 text-sm leading-relaxed text-[#627485]">{rule.note_ur}</p> : null}

      {relatedSources.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-[#12355b]/10 pt-2">
          {relatedSources.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-[#0d8657] hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              {source.title}
            </a>
          ))}
        </div>
      ) : null}

      <p className="mt-2 text-xs leading-relaxed text-[#8a96a3]">{admissionDisclaimer}</p>
    </div>
  );
}

export function CareerPathExplorer() {
  const [mode, setMode] = useState<Mode>('forward');
  const [qualificationId, setQualificationId] = useState('ssc_science');
  const [sectorId, setSectorId] = useState('digital');
  const [careerId, setCareerId] = useState('C01');

  const sectorCareers = useMemo(() => careers.filter((career) => career.sector_id === sectorId), [sectorId]);
  const selectedCareer = careersById[careerId] ?? sectorCareers[0];

  const forwardRules = useMemo(
    () => eligibilityRules.filter((rule) => rule.origin_ids.includes(qualificationId)),
    [qualificationId]
  );

  const backwardRules = useMemo(() => {
    if (!selectedCareer) return [];
    const targets = new Set(selectedCareer.preparation_target_ids);
    return eligibilityRules.filter((rule) => targets.has(rule.target_id));
  }, [selectedCareer]);

  return (
    <Frame label="تعلیم سے آگے یا پیشے سے پیچھے دیکھیں">
      <h2 className="text-3xl font-nastaliq leading-[1.7] text-[#082a52] sm:text-4xl">اپنا اگلا قدم دیکھیں</h2>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          aria-pressed={mode === 'forward'}
          onClick={() => setMode('forward')}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-4 py-2.5 text-base font-bold ${
            mode === 'forward' ? 'border-[#1fa971] bg-[#1fa971] text-white' : 'border-[#12355b]/15 bg-white text-[#082a52]'
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          تعلیم سے آگے
        </button>
        <button
          type="button"
          aria-pressed={mode === 'backward'}
          onClick={() => setMode('backward')}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-4 py-2.5 text-base font-bold ${
            mode === 'backward' ? 'border-[#1fa971] bg-[#1fa971] text-white' : 'border-[#12355b]/15 bg-white text-[#082a52]'
          }`}
        >
          پیشے سے پیچھے
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {mode === 'forward' ? (
        <div className="mt-5">
          <p className="mb-2 text-base font-bold text-[#082a52]">آپ کی موجودہ یا زیرِ غور قابلیت؟</p>
          <div className="flex flex-wrap gap-2">
            {qualifications.map((qualification) => (
              <button
                key={qualification.id}
                type="button"
                aria-pressed={qualification.id === qualificationId}
                onClick={() => setQualificationId(qualification.id)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-bold ${
                  qualification.id === qualificationId
                    ? 'border-[#12355b] bg-[#12355b] text-white'
                    : 'border-[#12355b]/15 bg-white text-[#082a52] hover:border-[#12355b]/40'
                }`}
              >
                {qualification.label_ur}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2" aria-live="polite">
            {forwardRules.length > 0 ? (
              forwardRules.map((rule) => <RuleCard key={rule.id} rule={rule} />)
            ) : (
              <p className="text-base text-[#627485]">اس قابلیت کے لیے اس ڈیٹا سیٹ میں کوئی مثال موجود نہیں — یہ راستہ غلط نہیں، صرف یہاں شامل نہیں۔</p>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-5">
          <p className="mb-2 text-base font-bold text-[#082a52]">پہلے شعبہ، پھر پیشہ منتخب کریں</p>
          <div className="flex flex-wrap gap-2">
            {sectors.map((sector) => (
              <button
                key={sector.id}
                type="button"
                aria-pressed={sector.id === sectorId}
                onClick={() => {
                  setSectorId(sector.id);
                  const firstCareer = careers.find((career) => career.sector_id === sector.id);
                  if (firstCareer) setCareerId(firstCareer.id);
                }}
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
            {sectorCareers.map((career) => (
              <button
                key={career.id}
                type="button"
                aria-pressed={career.id === careerId}
                onClick={() => setCareerId(career.id)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-bold ${
                  career.id === careerId
                    ? 'border-[#12355b] bg-[#12355b] text-white'
                    : 'border-[#12355b]/15 bg-white text-[#082a52] hover:border-[#12355b]/40'
                }`}
              >
                {career.label_ur}
              </button>
            ))}
          </div>

          {selectedCareer ? (
            <p className="mt-3 text-sm text-[#627485]">
              اہداف: {selectedCareer.preparation_target_ids.map((id) => labelForTargetId(id)).join('، ')}
            </p>
          ) : null}

          <div className="mt-5 grid gap-4 sm:grid-cols-2" aria-live="polite">
            {backwardRules.length > 0 ? (
              backwardRules.map((rule) => <RuleCard key={rule.id} rule={rule} />)
            ) : (
              <p className="text-base text-[#627485]">اس پیشے کے لیے اس ڈیٹا سیٹ میں کوئی مخصوص مثال موجود نہیں۔</p>
            )}
          </div>
        </div>
      )}

      <p className="mt-6 text-sm leading-relaxed text-[#627485]">
        {mode === 'forward'
          ? 'یہ ادارہ وار مثالیں ہیں، پورے پاکستان کا یکساں قاعدہ نہیں۔'
          : 'اوپر دکھائی گئی قابلیتوں کے علاوہ دوسرے راستے بھی اسی پیشے تک لے جاسکتے ہیں — یہ صرف اس ڈیٹا سیٹ کی مثالیں ہیں۔'}
      </p>
    </Frame>
  );
}

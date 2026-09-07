"use client";

import { useMemo, useState } from "react";
import {
  externalSubjectUniversities,
  palette,
  subjectMeta,
  universities,
  type SubjectKey,
} from "../data/universityArticleData";
import { ArtifactShell } from "./ArtifactShell";
import styles from "./UniversityArtefacts.module.css";

const subjectOrder: SubjectKey[] = [
  "business",
  "computer",
  "engineering",
  "mathematics",
  "pharmacy",
  "natural",
];

export function SubjectRankingExplorer2026() {
  const [subject, setSubject] = useState<SubjectKey>("computer");
  const meta = subjectMeta[subject];

  const results = useMemo(() => {
    const overallEntries = universities
      .filter((item) => item.subjectRanks[subject])
      .map((item) => ({
        rank: item.subjectRanks[subject] as number,
        name: item.nameUrdu,
        shortName: item.shortName,
        overallPosition: item.position,
      }));
    const extraEntries = (externalSubjectUniversities[subject] ?? []).map((item) => ({
      ...item,
      overallPosition: null,
    }));
    return [...overallEntries, ...extraEntries].sort((a, b) => a.rank - b.rank);
  }, [subject]);

  return (
    <ArtifactShell
      eyebrow="QS Subject Rankings 2026"
      title="مضمون بدلیں، بہترین یونیورسٹی بھی بدل سکتی ہے"
      description="چھ منتخب شعبوں میں پاکستانی اداروں کی ترتیب دیکھیں۔ مجموعی رینک اور مضمون کی رینک ایک ہی چیز نہیں۔"
      componentId="SubjectRankingExplorer2026"
    >
      <div className={styles.subjectTabs} role="tablist" aria-label="مضمون منتخب کریں">
        {subjectOrder.map((key) => (
          <button
            type="button"
            role="tab"
            aria-selected={key === subject}
            className={key === subject ? styles.activeSubject : ""}
            onClick={() => setSubject(key)}
            key={key}
          >
            <span style={{ background: palette[subjectMeta[key].accent] }} />
            {subjectMeta[key].label}
          </button>
        ))}
      </div>

      <div className={styles.subjectHeading} style={{ "--subject-accent": palette[meta.accent] } as React.CSSProperties}>
        <div>
          <small dir="ltr">{meta.english}</small>
          <h3>{meta.label}</h3>
        </div>
        <span>{results.length} پاکستانی ادارے</span>
      </div>

      <ol className={styles.subjectResults} role="tabpanel" aria-live="polite">
        {results.map((item) => (
          <li key={`${subject}-${item.rank}-${item.shortName}`}>
            <span className={styles.subjectRank}>{item.rank}</span>
            <div>
              <h4>{item.name}</h4>
              <p>
                <b dir="ltr">{item.shortName}</b>
                {item.overallPosition ? <> · مجموعی پاکستانی پوزیشن {item.overallPosition}</> : <> · مجموعی پہلی 10 پوزیشنز سے باہر</>}
              </p>
            </div>
            {item.rank <= 3 ? <strong className={styles.topThree}>TOP {item.rank}</strong> : null}
          </li>
        ))}
      </ol>

      <footer className={styles.dataFooter}>
        <span>پاکستانی ترتیب QS کی عالمی subject lists سے اخذ کی گئی ہے۔</span>
      </footer>
    </ArtifactShell>
  );
}

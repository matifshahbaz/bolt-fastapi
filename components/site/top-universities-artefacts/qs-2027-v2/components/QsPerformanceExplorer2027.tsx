"use client";

import { useMemo, useState } from "react";
import {
  metricMeta,
  palette,
  universities,
  type MetricKey,
} from "../data/universityArticleData";
import { ArtifactShell } from "./ArtifactShell";
import styles from "./UniversityArtefacts.module.css";

const metricOrder: MetricKey[] = [
  "citations",
  "employer",
  "facultyStudent",
  "researchNetwork",
  "employment",
  "sustainability",
  "academic",
  "internationalFaculty",
  "internationalStudents",
];

export function QsPerformanceExplorer2027() {
  const [metric, setMetric] = useState<MetricKey>("citations");
  const meta = metricMeta[metric];
  const ordered = useMemo(
    () => [...universities].sort((a, b) => (b.metrics[metric] ?? -1) - (a.metrics[metric] ?? -1)),
    [metric],
  );
  const leader = ordered.find((item) => item.metrics[metric] !== null);

  return (
    <ArtifactShell
      eyebrow="QS اسکور ایک نظر میں"
      title="ہر یونیورسٹی کی اصل طاقت کہاں ہے؟"
      description="کسی ایک پیمانے کو منتخب کریں۔ تمام جامعات اسی QS اسکور کے مطابق دوبارہ ترتیب پائیں گی۔"
      componentId="QsPerformanceExplorer2027"
    >
      <div className={styles.metricTabs} role="tablist" aria-label="QS پیمانہ منتخب کریں">
        {metricOrder.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={metric === key}
            className={metric === key ? styles.activeMetric : ""}
            style={{ "--tab-accent": palette[metricMeta[key].accent] } as React.CSSProperties}
            onClick={() => setMetric(key)}
          >
            {metricMeta[key].label}
          </button>
        ))}
      </div>

      <div className={styles.metricSummary} style={{ "--metric-accent": palette[meta.accent] } as React.CSSProperties}>
        <div>
          <small dir="ltr">{meta.shortLabel}</small>
          <h3>{meta.label}</h3>
          <p>{meta.detail}</p>
        </div>
        {leader ? (
          <div className={styles.metricLeader}>
            <span>سب سے زیادہ اسکور</span>
            <strong>{leader.metrics[metric]}</strong>
            <small>{leader.nameUrdu}</small>
          </div>
        ) : null}
      </div>

      <div className={styles.scoreList} role="tabpanel" aria-live="polite">
        {ordered.map((university, index) => {
          const score = university.metrics[metric];
          return (
            <article className={styles.scoreRow} key={university.id}>
              <span className={styles.scoreOrder}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.scoreName}>
                <strong>{university.nameUrdu}</strong>
                <small dir="ltr">{university.shortName}</small>
              </div>
              <div className={styles.scoreBar} aria-label={`${university.nameUrdu}: ${score ?? "اسکور دستیاب نہیں"}`}>
                <i style={{ width: `${score ?? 0}%`, background: palette[meta.accent] }} />
              </div>
              <output>{score ?? "—"}</output>
            </article>
          );
        })}
      </div>

      <footer className={styles.dataFooter}>
        <span>یہ indicator scores ہیں؛ انہیں عالمی یا پاکستانی rank نہ سمجھیں۔</span>
      </footer>
    </ArtifactShell>
  );
}

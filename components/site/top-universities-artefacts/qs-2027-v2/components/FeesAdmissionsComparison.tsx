"use client";

import { useMemo, useState } from "react";
import { feeRecords, palette, researchDate, universities } from "../data/universityArticleData";
import { ArtifactShell } from "./ArtifactShell";
import styles from "./UniversityArtefacts.module.css";

type Filter = "تمام" | "سرکاری" | "نجی";

export function FeesAdmissionsComparison() {
  const [filter, setFilter] = useState<Filter>("تمام");
  const records = useMemo(
    () => feeRecords
      .map((fee) => ({ fee, university: universities.find((item) => item.id === fee.universityId)! }))
      .filter(({ university }) => filter === "تمام" || university.sector === filter),
    [filter],
  );

  return (
    <ArtifactShell
      eyebrow="فیس اور داخلہ — programme examples"
      title="صرف ایک عدد دیکھ کر فیس کا فیصلہ نہ کریں"
      description="ہر رقم ایک مخصوص پروگرام اور مدت کی مثال ہے۔ داخلہ، سکیورٹی، ہاسٹل اور دوسرے charges الگ ہوسکتے ہیں۔"
      componentId="FeesAdmissionsComparison"
    >
      <div className={styles.filterBar} role="group" aria-label="ادارے کی قسم منتخب کریں">
        {(["تمام", "سرکاری", "نجی"] as Filter[]).map((item) => (
          <button
            type="button"
            key={item}
            className={filter === item ? styles.activeFilter : ""}
            onClick={() => setFilter(item)}
          >
            {item} ادارے
          </button>
        ))}
      </div>

      <div className={styles.feeGrid} aria-live="polite">
        {records.map(({ fee, university }) => (
          <article
            className={styles.feeCard}
            key={fee.universityId}
            style={{ "--item-accent": palette[university.accent] } as React.CSSProperties}
          >
            <header>
              <span className={styles.feePosition}>{university.position}</span>
              <div>
                <small>{university.sector} · {university.city}</small>
                <h3>{university.nameUrdu}</h3>
                <p dir="ltr">QS {university.worldRank}</p>
              </div>
            </header>
            <div className={styles.feeAmount}>
              <small>{fee.programme}</small>
              <strong>{fee.tuition}</strong>
              <span>{fee.feePeriod}</span>
            </div>
            <p className={styles.feeNote}>{fee.note}</p>
            <p className={styles.admissionNote}><b>داخلہ:</b> {fee.admission}</p>
          </article>
        ))}
      </div>

      <footer className={styles.dataFooter}>
        <span>تحقیق کی تاریخ: {researchDate}</span>
        <span>حتمی ادائیگی کے لیے موجودہ offer letter یا portal-generated challan دیکھیں۔</span>
      </footer>
    </ArtifactShell>
  );
}

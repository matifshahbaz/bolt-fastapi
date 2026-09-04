"use client";

import { useState } from "react";
import { admissionTimelines } from "../data/articleArtifactsData";
import { ArtifactShell } from "./ArtifactShell";
import styles from "./Artifacts.module.css";

export function AdmissionTimeline2027() {
  const [activeId, setActiveId] = useState(admissionTimelines[0].id);
  const active = admissionTimelines.find((item) => item.id === activeId) ?? admissionTimelines[0];

  return (
    <ArtifactShell
      eyebrow="داخلہ منصوبہ بندی کیلنڈر"
      title="درخواست، ٹیسٹ، میرٹ اور مالی معاونت کی ٹائم لائن"
      description="2027 کی قطعی تاریخوں کا انتظار کرتے ہوئے تیاری روکنے کے بجائے گزشتہ دور کی ترتیب سے اپنا منصوبہ بندی کا دورانیہ بنائیں۔"
      componentId="AdmissionTimeline2027"
      tone="cobalt"
    >
      <div className={styles.timelineTabs} role="tablist" aria-label="یونیورسٹی ٹائم لائن منتخب کریں">
        {admissionTimelines.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === active.id}
            className={item.id === active.id ? styles.isActive : ""}
            onClick={() => setActiveId(item.id)}
          >
            <i style={{ background: item.colour }} />
            {item.shortName}
          </button>
        ))}
      </div>

      <p className={styles.timelineIntro}>{active.planningWindow}</p>

      <div className={styles.timelineTrack} role="tabpanel">
        {active.milestones.map((milestone, index) => (
          <article className={`${styles.timelineStep} ${styles[`state_${milestone.state}`]}`} key={`${active.id}-${milestone.label}`}>
            <div className={styles.timelineMarker}>
              <span>{index + 1}</span>
            </div>
            <small>{milestone.month}</small>
            <h3>{milestone.label}</h3>
            <p>{milestone.note}</p>
          </article>
        ))}
      </div>

      <div className={styles.timelineLegend}>
        <span><i className={styles.legendPrepare} /> تیاری</span>
        <span><i className={styles.legendActive} /> درخواست / ٹیسٹ</span>
        <span><i className={styles.legendDecision} /> میرٹ / فیصلہ</span>
      </div>
    </ArtifactShell>
  );
}

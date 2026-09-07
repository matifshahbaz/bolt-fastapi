"use client";

import { useState } from "react";
import { palette, timelineGroups } from "../data/universityArticleData";
import { ArtifactShell } from "./ArtifactShell";
import styles from "./UniversityArtefacts.module.css";

export function AdmissionTimeline2027() {
  const [activeId, setActiveId] = useState(timelineGroups[0].id);
  const active = timelineGroups.find((item) => item.id === activeId) ?? timelineGroups[0];

  return (
    <ArtifactShell
      eyebrow="داخلہ planning calendar"
      title="انٹرمیڈیٹ کے نتیجے سے پہلے تیاری شروع کریں"
      description="یہ قطعی deadlines نہیں بلکہ planning windows ہیں۔ ہر یونیورسٹی کی اصل تاریخ اس کے سرکاری admission notice سے چیک کریں۔"
      componentId="AdmissionTimeline2027"
    >
      <div className={styles.timelineTabs} role="tablist" aria-label="ٹائم لائن منتخب کریں">
        {timelineGroups.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === active.id}
            className={item.id === active.id ? styles.activeTimeline : ""}
            onClick={() => setActiveId(item.id)}
          >
            <i style={{ background: palette[item.accent] }} />
            {item.shortName}
          </button>
        ))}
      </div>

      <p className={styles.timelineNote} style={{ "--timeline-accent": palette[active.accent] } as React.CSSProperties}>
        {active.note}
      </p>

      <div className={styles.timelineTrack} role="tabpanel" aria-live="polite">
        {active.steps.map((step, index) => (
          <article key={`${active.id}-${step.title}`}>
            <div className={styles.timelineMarker} style={{ background: palette[active.accent] }}>
              {index + 1}
            </div>
            <small>{step.period}</small>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </article>
        ))}
      </div>
    </ArtifactShell>
  );
}

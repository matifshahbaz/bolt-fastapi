"use client";

import { useMemo, useState } from "react";
import { qsMethodology } from "../data/articleArtifactsData";
import { ArtifactShell } from "./ArtifactShell";
import styles from "./Artifacts.module.css";

export function QsMethodologyWheel() {
  const [activeId, setActiveId] = useState(qsMethodology[0].id);
  const active = qsMethodology.find((item) => item.id === activeId) ?? qsMethodology[0];
  const gradient = useMemo(() => {
    let cursor = 0;
    const parts = qsMethodology.map((item) => {
      const start = cursor;
      cursor += item.weight;
      return `${item.color} ${start}% ${cursor}%`;
    });
    return `conic-gradient(${parts.join(", ")})`;
  }, []);

  return (
    <ArtifactShell
      eyebrow="رینکنگ کو صحیح طرح پڑھیں"
      title="QS 2027 کا اسکور کیسے بنتا ہے؟"
      description="عالمی رینک کسی ایک امتحان یا ایک سروے کا نتیجہ نہیں؛ پانچ بڑے زاویے مل کر مجموعی اسکور بناتے ہیں۔"
      componentId="QsMethodologyWheel"
      tone="teal"
    >
      <div className={styles.methodologyLayout}>
        <div className={styles.donutWrap}>
          <div className={styles.donut} style={{ background: gradient }} aria-hidden="true">
            <div className={styles.donutCore}>
              <strong>{active.weight}%</strong>
              <span>{active.label}</span>
            </div>
          </div>
          <p className={styles.activeDetail}>{active.detail}</p>
        </div>

        <div className={styles.methodologyList} role="list" aria-label="QS اشاریوں کے وزن">
          {qsMethodology.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.methodologyButton} ${item.id === active.id ? styles.isActive : ""}`}
              onMouseEnter={() => setActiveId(item.id)}
              onFocus={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              aria-pressed={item.id === active.id}
            >
              <span className={styles.methodDot} style={{ background: item.color }} />
              <span className={styles.methodLabel}>{item.label}</span>
              <strong>{item.weight}%</strong>
              <span className={styles.methodBar} aria-hidden="true">
                <i style={{ width: `${item.weight * 2}%`, background: item.color }} />
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.methodologyNote}>
        سب سے بڑا وزن تحقیق کا ہے؛ اسی لیے کسی یونیورسٹی کا مجموعی رینک آپ کے مخصوص انڈرگریجویٹ پروگرام کی مکمل تصویر نہیں ہوتا۔
      </div>
    </ArtifactShell>
  );
}

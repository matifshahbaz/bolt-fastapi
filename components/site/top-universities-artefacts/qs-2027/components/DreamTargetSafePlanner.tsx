"use client";

import { useEffect, useState } from "react";
import { plannerSeed } from "../data/articleArtifactsData";
import { ArtifactShell } from "./ArtifactShell";
import styles from "./Artifacts.module.css";

type Bucket = "dream" | "target" | "safe";
type PlannerItem = (typeof plannerSeed)[number];

const bucketMeta: Record<Bucket, { title: string; subtitle: string }> = {
  dream: { title: "خواہش", subtitle: "مشکل مگر ممکن" },
  target: { title: "ہدف", subtitle: "حقیقت پسندانہ مطابقت" },
  safe: { title: "محفوظ انتخاب", subtitle: "نسبتاً زیادہ امکان" },
};

const bucketOrder: Bucket[] = ["dream", "target", "safe"];
const storageKey = "shama-university-shortlist-v1";

export function DreamTargetSafePlanner() {
  const [items, setItems] = useState<PlannerItem[]>(plannerSeed);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setItems(JSON.parse(saved) as PlannerItem[]);
    } catch {
      // The planner still works in-memory when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // Keep the interaction available without persistence.
    }
  }, [items]);

  function moveItem(id: string, bucket: Bucket) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, bucket } : item));
  }

  function moveByOne(item: PlannerItem, direction: -1 | 1) {
    const currentIndex = bucketOrder.indexOf(item.bucket);
    const next = bucketOrder[currentIndex + direction];
    if (next) moveItem(item.id, next);
  }

  return (
    <ArtifactShell
      eyebrow="دو منٹ کا عملی منصوبہ"
      title="اپنی یونیورسٹی شارٹ لسٹ ابھی بنائیں"
      description="نمونہ پروگراموں کو گھسیٹ کر رکھیں یا تیر والے بٹنوں سے تین خانوں میں منتقل کریں۔ انتخاب اسی براؤزر میں محفوظ رہتا ہے۔"
      componentId="DreamTargetSafePlanner"
      tone="teal"
    >
      <div className={styles.plannerToolbar}>
        <p>ہر خانے میں کم از کم دو اختیارات رکھیں؛ آخری تاریخ، ٹیسٹ اور فیس کا لنک ساتھ محفوظ کریں۔</p>
        <button type="button" onClick={() => setItems(plannerSeed)}>نمونہ فہرست بحال کریں</button>
      </div>

      <div className={styles.plannerBoard}>
        {bucketOrder.map((bucket, bucketIndex) => (
          <section
            className={`${styles.plannerColumn} ${styles[`bucket_${bucket}`]}`}
            key={bucket}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (draggedId) moveItem(draggedId, bucket);
              setDraggedId(null);
            }}
          >
            <header>
              <span>{String(bucketIndex + 1).padStart(2, "0")}</span>
              <div><h3>{bucketMeta[bucket].title}</h3><p>{bucketMeta[bucket].subtitle}</p></div>
            </header>
            <div className={styles.plannerItems}>
              {items.filter((item) => item.bucket === bucket).map((item) => (
                <article
                  className={styles.plannerCard}
                  key={item.id}
                  draggable
                  onDragStart={() => setDraggedId(item.id)}
                  onDragEnd={() => setDraggedId(null)}
                >
                  <span className={styles.dragHandle} aria-hidden="true">⋮⋮</span>
                  <div>
                    <small>{item.university}</small>
                    <h4>{item.programme}</h4>
                    <p>{item.deadline}</p>
                  </div>
                  <div className={styles.cardMoveButtons} aria-label={`${item.university} کو منتقل کریں`}>
                    <button type="button" disabled={bucketIndex === 0} onClick={() => moveByOne(item, -1)} aria-label="پچھلے خانے میں منتقل کریں">→</button>
                    <button type="button" disabled={bucketIndex === bucketOrder.length - 1} onClick={() => moveByOne(item, 1)} aria-label="اگلے خانے میں منتقل کریں">←</button>
                  </div>
                </article>
              ))}
              {items.every((item) => item.bucket !== bucket) ? <p className={styles.emptyBucket}>یہاں پروگرام منتقل کریں</p> : null}
            </div>
          </section>
        ))}
      </div>
      <p className={styles.plannerPrivacy}>آپ کی فہرست صرف اسی براؤزر میں محفوظ ہوتی ہے؛ کوئی ذاتی ڈیٹا سرور کو نہیں بھیجا جاتا۔</p>
    </ArtifactShell>
  );
}

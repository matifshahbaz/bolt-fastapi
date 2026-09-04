"use client";

import { useMemo, useState } from "react";
import { fitProfiles } from "../data/articleArtifactsData";
import { ArtifactShell } from "./ArtifactShell";
import styles from "./Artifacts.module.css";

type Dimension = keyof (typeof fitProfiles)[number]["scores"];

const dimensionLabels: { id: Dimension; label: string; hint: string }[] = [
  { id: "subject", label: "میرے مضمون سے مطابقت", hint: "اسے سب سے زیادہ وزن دیں" },
  { id: "department", label: "شعبے کی اصل مضبوطی", hint: "لیبز، فیکلٹی، نصاب" },
  { id: "affordability", label: "مالی استطاعت", hint: "چار سالہ مکمل لاگت" },
  { id: "admission", label: "داخلے کا امکان", hint: "میرٹ اور ٹیسٹ پروفائل" },
  { id: "location", label: "شہر، سفر اور ہاسٹل", hint: "روزمرہ زندگی کا اثر" },
  { id: "career", label: "کیریئر کے مواقع", hint: "انٹرن شپ، نیٹ ورک، صنعت" },
];

const initialWeights: Record<Dimension, number> = {
  subject: 5,
  department: 5,
  affordability: 4,
  admission: 3,
  location: 2,
  career: 4,
};

export function UniversityFitDecisionTool() {
  const [weights, setWeights] = useState(initialWeights);

  const ranked = useMemo(() => {
    const weightTotal = Object.values(weights).reduce((sum, value) => sum + value, 0);
    return fitProfiles
      .map((profile) => {
        const total = (Object.keys(weights) as Dimension[]).reduce(
          (sum, key) => sum + profile.scores[key] * weights[key],
          0,
        );
        return { ...profile, match: Math.round(total / weightTotal) };
      })
      .sort((a, b) => b.match - a.match)
      .slice(0, 3);
  }, [weights]);

  return (
    <ArtifactShell
      eyebrow="آپ کی ذاتی شارٹ لسٹ"
      title="آپ کے لیے بہترین یونیورسٹی کون سی ہے؟"
      description="چھ ترجیحات کا وزن بدلیں۔ نتیجہ مجموعی رینک کے بجائے پروگرام کی سطح پر موزونیت کی مثال دکھائے گا۔"
      componentId="UniversityFitDecisionTool"
      tone="violet"
    >
      <div className={styles.fitLayout}>
        <form className={styles.fitControls} onSubmit={(event) => event.preventDefault()}>
          <div className={styles.panelHeading}>
            <span>01</span>
            <div><h3>اپنی ترجیحات طے کریں</h3><p>1 = کم اہم، 5 = بہت اہم</p></div>
          </div>
          {dimensionLabels.map((dimension) => (
            <label className={styles.sliderRow} key={dimension.id}>
              <span>
                <strong>{dimension.label}</strong>
                <small>{dimension.hint}</small>
              </span>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={weights[dimension.id]}
                onChange={(event) => setWeights((current) => ({
                  ...current,
                  [dimension.id]: Number(event.target.value),
                }))}
                aria-label={dimension.label}
              />
              <output>{weights[dimension.id]}</output>
            </label>
          ))}
          <button className={styles.resetButton} type="button" onClick={() => setWeights(initialWeights)}>
            ابتدائی وزن بحال کریں
          </button>
        </form>

        <section className={styles.fitResults} aria-live="polite">
          <div className={styles.panelHeading}>
            <span>02</span>
            <div><h3>آپ کی موجودہ شارٹ لسٹ</h3><p>تین نسبتاً موزوں پروگرام کے راستے</p></div>
          </div>
          <ol>
            {ranked.map((profile, index) => (
              <li key={profile.id}>
                <span className={styles.resultPosition}>{index + 1}</span>
                <div className={styles.resultCopy}>
                  <small>{profile.label}</small>
                  <h4>{profile.university}</h4>
                  <p>{profile.programme}</p>
                </div>
                <div className={styles.matchScore}>
                  <strong>{profile.match}%</strong>
                  <span>مطابقت</span>
                </div>
              </li>
            ))}
          </ol>
          <p className={styles.fitDisclaimer}>
            یہ شفاف ادارتی ماڈل صرف شارٹ لسٹ بنانے میں مدد دیتا ہے؛ داخلہ یا کیریئر کے نتیجے کی ضمانت نہیں۔ اسکورز کو اپنے نظام کے ڈیٹا سے بدلیں۔
          </p>
        </section>
      </div>
    </ArtifactShell>
  );
}

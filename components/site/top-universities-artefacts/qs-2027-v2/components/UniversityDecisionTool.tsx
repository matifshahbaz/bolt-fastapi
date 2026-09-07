"use client";

import { useMemo, useState } from "react";
import {
  metricMeta,
  palette,
  subjectMeta,
  universities,
  type MetricKey,
  type SubjectKey,
} from "../data/universityArticleData";
import { ArtifactShell } from "./ArtifactShell";
import styles from "./UniversityArtefacts.module.css";

type Budget = "low" | "mid" | "open";

const subjects: SubjectKey[] = ["business", "computer", "engineering", "mathematics", "pharmacy", "natural"];
const priorities: MetricKey[] = ["citations", "employer", "facultyStudent", "researchNetwork", "employment"];

const budgetMeta: Record<Budget, { label: string; hint: string }> = {
  low: { label: "کم خرچ", hint: "زیادہ تر سرکاری options" },
  mid: { label: "درمیانی", hint: "سرکاری اور moderate-fee options" },
  open: { label: "فیس بعد میں", hint: "پہلے مضبوط programme" },
};

const budgetScores: Record<Budget, Record<1 | 2 | 3, number>> = {
  low: { 1: 100, 2: 48, 3: 8 },
  mid: { 1: 86, 2: 100, 3: 38 },
  open: { 1: 100, 2: 100, 3: 100 },
};

export function UniversityDecisionTool() {
  const [subject, setSubject] = useState<SubjectKey>("computer");
  const [budget, setBudget] = useState<Budget>("mid");
  const [priority, setPriority] = useState<MetricKey>("employer");

  const shortlist = useMemo(() => {
    return universities
      .filter((university) => university.subjectRanks[subject])
      .map((university) => {
        const subjectRank = university.subjectRanks[subject] as number;
        const subjectScore = Math.max(28, 105 - subjectRank * 9);
        const priorityScore = university.metrics[priority] ?? 0;
        const affordabilityScore = budgetScores[budget][university.costLevel];
        const fit = Math.round(subjectScore * 0.55 + priorityScore * 0.25 + affordabilityScore * 0.2);
        return { university, subjectRank, priorityScore, fit };
      })
      .sort((a, b) => b.fit - a.fit)
      .slice(0, 3);
  }, [budget, priority, subject]);

  return (
    <ArtifactShell
      eyebrow="مختصر interactive decision tool"
      title="اپنی ابتدائی shortlist خود بنائیں"
      description="صرف تین چیزیں منتخب کریں۔ نتیجہ آپ کو تحقیق کے لیے تین ابتدائی options دے گا—حتمی داخلہ فیصلہ نہیں۔"
      componentId="UniversityDecisionTool"
    >
      <div className={styles.decisionGrid}>
        <form className={styles.decisionForm} onSubmit={(event) => event.preventDefault()}>
          <fieldset>
            <legend><span>1</span> آپ کیا پڑھنا چاہتے ہیں؟</legend>
            <div className={styles.choiceGrid}>
              {subjects.map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={subject === key}
                  className={subject === key ? styles.selectedChoice : ""}
                  style={{ "--choice-accent": palette[subjectMeta[key].accent] } as React.CSSProperties}
                  onClick={() => setSubject(key)}
                >
                  {subjectMeta[key].label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend><span>2</span> فیس کے بارے میں آپ کا رخ؟</legend>
            <div className={styles.choiceGridThree}>
              {(Object.keys(budgetMeta) as Budget[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={budget === key}
                  className={budget === key ? styles.selectedChoice : ""}
                  style={{ "--choice-accent": palette[key === "low" ? "green" : key === "mid" ? "yellow" : "blue"] } as React.CSSProperties}
                  onClick={() => setBudget(key)}
                >
                  <strong>{budgetMeta[key].label}</strong>
                  <small>{budgetMeta[key].hint}</small>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend><span>3</span> آپ کے لیے دوسرا اہم عامل؟</legend>
            <div className={styles.choiceGrid}>
              {priorities.map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={priority === key}
                  className={priority === key ? styles.selectedChoice : ""}
                  style={{ "--choice-accent": palette[metricMeta[key].accent] } as React.CSSProperties}
                  onClick={() => setPriority(key)}
                >
                  {metricMeta[key].label}
                </button>
              ))}
            </div>
          </fieldset>
        </form>

        <section className={styles.shortlistPanel} aria-live="polite">
          <header>
            <span>آپ کی ابتدائی shortlist</span>
            <p>{subjectMeta[subject].label} · {budgetMeta[budget].label} · {metricMeta[priority].label}</p>
          </header>
          <ol>
            {shortlist.map(({ university, subjectRank, priorityScore, fit }, index) => (
              <li key={university.id} style={{ "--item-accent": palette[university.accent] } as React.CSSProperties}>
                <span className={styles.shortlistNumber}>{index + 1}</span>
                <div>
                  <small>{university.shortName} · {university.city}</small>
                  <h3>{university.nameUrdu}</h3>
                  <p>مضمون میں پاکستان نمبر {subjectRank} · منتخب QS پیمانے پر {priorityScore}</p>
                </div>
                <strong>{fit}%<small>ابتدائی fit</small></strong>
              </li>
            ))}
          </ol>
          <p className={styles.decisionDisclaimer}>
            اب ان تین options کی اصل programme fee، داخلہ اہلیت، ہاسٹل اور سفر الگ سے چیک کریں۔ یہ اس مضمون کے محدود QS data پر مبنی شفاف shortlist ہے، ضمانت نہیں۔
          </p>
        </section>
      </div>
    </ArtifactShell>
  );
}

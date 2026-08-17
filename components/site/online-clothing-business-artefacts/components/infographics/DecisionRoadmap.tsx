"use client";

import ArticleIcon, { type ArticleIconName } from "./ArticleIcon";
import styles from "./Infographics.module.css";
import VisualShell from "./VisualShell";

const stages: Array<{ icon: ArticleIconName; title: string; note: string }> = [
  { icon: "idea", title: "خیال", note: "کیا یہ واقعی موقع ہے؟" },
  { icon: "model", title: "سادہ ماڈل", note: "کیا بیچنا اور کیسے؟" },
  { icon: "supplier", title: "سپلائر", note: "سستا یا قابلِ اعتماد؟" },
  { icon: "market", title: "بازار", note: "کہاں سامنے آنا ہے؟" },
  { icon: "order", title: "پہلا آرڈر", note: "خوشی کے ساتھ تصدیق" },
  { icon: "system", title: "نظام", note: "ہر نتیجے سے بہتر فیصلہ" },
];

export default function DecisionRoadmap() {
  return (
    <VisualShell kicker="کاروباری سفر" title="کاروبار سیدھی سڑک نہیں، فیصلوں کا سفر ہے">
      <div className={styles.roadmap}>
        {stages.map((stage) => (
          <div className={styles.roadStep} key={stage.title}>
            <span className={styles.roadStepIcon}><ArticleIcon name={stage.icon} /></span>
            <b>{stage.title}</b>
            <small>{stage.note}</small>
          </div>
        ))}
      </div>
    </VisualShell>
  );
}


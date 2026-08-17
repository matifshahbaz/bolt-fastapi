"use client";

import ArticleIcon, { type ArticleIconName } from "./ArticleIcon";
import styles from "./Infographics.module.css";
import VisualShell from "./VisualShell";

const months: Array<{ month: string; icon: ArticleIconName; note: string }> = [
  { month: "مہینہ 1", icon: "idea", note: "جوش، تیاری اور پہلا قدم" },
  { month: "مہینہ 2", icon: "message", note: "سوال بہت، آرڈر کم" },
  { month: "مہینہ 3", icon: "order", note: "پہلی ترسیل اور پہلی واپسی" },
  { month: "مہینہ 4", icon: "struggle", note: "خاموشی، شکوک اور فیصلے" },
  { month: "مہینہ 5", icon: "chart", note: "اعداد، جائزہ اور اصلاح" },
  { month: "مہینہ 6", icon: "system", note: "واضح نظام اور بہتر فیصلہ" },
];

export default function SixMonthJourney() {
  return (
    <VisualShell kicker="جذباتی اور کاروباری سفر" title="پہلے 6 ماہ میں confidence سیدھی لائن میں نہیں بڑھتا">
      <div className={styles.timeline}>
        <div className={styles.timelineTrack} />
        <div className={styles.months}>
          {months.map((item) => (
            <div className={styles.month} key={item.month}>
              <span className={styles.monthDot}><ArticleIcon name={item.icon} /></span>
              <strong>{item.month}</strong>
              <span>{item.note}</span>
            </div>
          ))}
        </div>
      </div>
    </VisualShell>
  );
}


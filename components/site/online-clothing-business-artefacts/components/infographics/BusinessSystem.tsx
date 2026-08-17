"use client";

import ArticleIcon, { type ArticleIconName } from "./ArticleIcon";
import styles from "./Infographics.module.css";
import VisualShell from "./VisualShell";

const statuses: Array<{ icon: ArticleIconName; label: string }> = [
  { icon: "message", label: "نیا سوال" },
  { icon: "clock", label: "زیرِ تصدیق" },
  { icon: "check", label: "تصدیق شدہ" },
  { icon: "truck", label: "روانہ شدہ" },
  { icon: "package", label: "پہنچ گیا" },
  { icon: "money", label: "COD موصول" },
  { icon: "system", label: "حساب مکمل" },
];

export default function BusinessSystem() {
  return (
    <VisualShell kicker="جذبات سے نظام تک" title="جو کام یادداشت سے چلتا تھا، اب واضح process سے چلے گا">
      <div className={styles.systemFlow}>
        {statuses.map((status) => (
          <div className={styles.systemStep} key={status.label}>
            <span><ArticleIcon name={status.icon} /></span>
            <b>{status.label}</b>
          </div>
        ))}
      </div>
      <div className={styles.systemMetrics}>
        <div className={styles.metric}><strong>Delivery %</strong><span>کامیاب ترسیل</span></div>
        <div className={styles.metric}><strong>Return %</strong><span>واپسی کی شرح</span></div>
        <div className={styles.metric}><strong>Net Profit</strong><span>حقیقی منافع</span></div>
      </div>
    </VisualShell>
  );
}


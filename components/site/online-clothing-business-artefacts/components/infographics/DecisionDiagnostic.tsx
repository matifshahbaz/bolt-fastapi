"use client";

import ArticleIcon, { type ArticleIconName } from "./ArticleIcon";
import styles from "./Infographics.module.css";
import VisualShell from "./VisualShell";

const decisions: Array<{ problemIcon: ArticleIconName; problem: string; actionIcon: ArticleIconName; action: string }> = [
  { problemIcon: "market", problem: "لوگ دیکھ ہی نہیں رہے", actionIcon: "chart", action: "تصویر، پلیٹ فارم یا audience بدلیں" },
  { problemIcon: "message", problem: "سوال ہیں مگر آرڈر کم", actionIcon: "security", action: "قیمت، اعتماد اور تفصیل دیکھیں" },
  { problemIcon: "return", problem: "آرڈر ہیں مگر واپسی زیادہ", actionIcon: "check", action: "تصدیق، معیار اور سپلائر درست کریں" },
  { problemIcon: "money", problem: "فروخت ہے مگر منافع نہیں", actionIcon: "calculator", action: "کورئیر، تشہیر اور return cost دیکھیں" },
];

export default function DecisionDiagnostic() {
  return (
    <VisualShell kicker="فیصلے کا موڑ" title="مسئلہ کہاں ہے اور کیا بدلنا چاہیے؟">
      <div className={styles.diagnostic}>
        {decisions.map((item) => (
          <div className={styles.diagnosticRow} key={item.problem}>
            <div className={styles.symptom}><ArticleIcon name={item.problemIcon} /><span>{item.problem}</span></div>
            <div className={styles.diagnosticArrow}>←</div>
            <div className={styles.action}><ArticleIcon name={item.actionIcon} /><span>{item.action}</span></div>
          </div>
        ))}
      </div>
    </VisualShell>
  );
}


"use client";

import ArticleIcon, { type ArticleIconName } from "./ArticleIcon";
import styles from "./Infographics.module.css";
import VisualShell from "./VisualShell";

const steps: Array<{ icon: ArticleIconName; title: string; note: string }> = [
  { icon: "message", title: "گاہک کا آرڈر", note: "واٹس ایپ پر" },
  { icon: "check", title: "آپ کی تصدیق", note: "سائز، پتا، اسٹاک" },
  { icon: "supplier", title: "سپلائر", note: "اسٹاک اسی کے پاس" },
  { icon: "package", title: "براہِ راست پارسل", note: "آپ کے لیبل سے" },
  { icon: "truck", title: "گاہک تک ترسیل", note: "کیش آن ڈیلیوری" },
  { icon: "money", title: "رقم آپ کو", note: "کورئیر settlement" },
  { icon: "check", title: "سپلائر کو ادائیگی", note: "طے شدہ رقم" },
];

export default function LeanBusinessModel() {
  return (
    <VisualShell kicker="بغیر اسٹاک ماڈل" title="صرف موبائل سے آرڈر اور رقم کا مکمل بہاؤ">
      <div className={styles.flow}>
        {steps.map((step) => (
          <div className={styles.flowNode} key={step.title}>
            <span><ArticleIcon name={step.icon} /></span>
            <b>{step.title}</b>
            <small>{step.note}</small>
          </div>
        ))}
      </div>
      <div className={styles.flowNote}>اسٹاک سپلائر کے پاس ہوگا، مگر گاہک، وعدہ اور حساب آپ کے پاس رہیں گے۔</div>
    </VisualShell>
  );
}


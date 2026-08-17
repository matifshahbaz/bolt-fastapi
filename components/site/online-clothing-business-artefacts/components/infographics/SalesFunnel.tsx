"use client";

import type { CSSProperties } from "react";

import styles from "./Infographics.module.css";
import VisualShell from "./VisualShell";

const stages = [
  { label: "لوگوں نے دیکھا", value: "10,000", width: "100%" },
  { label: "دلچسپی یا لائک", value: "500", width: "88%" },
  { label: "قیمت اور معلومات پوچھیں", value: "100", width: "74%" },
  { label: "آرڈر کی تصدیق", value: "25", width: "61%" },
  { label: "پارسل روانہ ہوا", value: "20", width: "49%" },
  { label: "پارسل پہنچا اور رقم بنی", value: "16", width: "38%" },
];

export default function SalesFunnel() {
  return (
    <VisualShell kicker="آن لائن فروخت" title="لوگ دیکھ رہے ہیں—پھر خرید کیوں نہیں رہے؟">
      <div className={styles.funnel}>
        {stages.map((stage) => (
          <div className={styles.funnelStep} style={{ "--level-width": stage.width } as CSSProperties} key={stage.label}>
            <span>{stage.label}</span><strong>{stage.value}</strong>
          </div>
        ))}
      </div>
      <div className={styles.funnelEquation}>لائک ≠ سوال ≠ آرڈر ≠ کامیاب ترسیل ≠ وصول شدہ رقم</div>
    </VisualShell>
  );
}


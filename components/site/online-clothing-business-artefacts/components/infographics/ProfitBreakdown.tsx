"use client";

import type { CSSProperties } from "react";

import styles from "./Infographics.module.css";
import VisualShell from "./VisualShell";

const rows = [
  { label: "فروخت قیمت", amount: "Rs. 3,500", width: "100%", type: "income" },
  { label: "سپلائر کی قیمت", amount: "– Rs. 2,450", width: "70%", type: "cost" },
  { label: "کورئیر چارجز", amount: "– Rs. 250", width: "22%", type: "cost" },
  { label: "پیکنگ یا لیبل", amount: "– Rs. 80", width: "12%", type: "cost" },
  { label: "واپسی کا reserve", amount: "– Rs. 150", width: "17%", type: "cost" },
  { label: "حقیقی متوقع منافع", amount: "Rs. 570", width: "38%", type: "profit" },
];

export default function ProfitBreakdown() {
  return (
    <VisualShell kicker="خالص منافع" title="3,500 روپے کی فروخت میں 570 روپے کیوں بچتے ہیں؟">
      <div className={styles.profitList}>
        {rows.map((row) => (
          <div className={`${styles.profitRow} ${row.type === "income" ? styles.profitIncome : ""} ${row.type === "profit" ? styles.profitTotal : ""}`} key={row.label}>
            <span className={styles.profitRowLabel}>{row.label}</span>
            <div className={styles.profitTrack}><div className={styles.profitBar} style={{ "--bar-width": row.width } as CSSProperties} /></div>
            <strong className={styles.profitAmount}>{row.amount}</strong>
          </div>
        ))}
      </div>
      <div className={styles.profitFormula}>فروخت قیمت اور خرید قیمت کا فرق پورا منافع نہیں ہوتا۔</div>
    </VisualShell>
  );
}


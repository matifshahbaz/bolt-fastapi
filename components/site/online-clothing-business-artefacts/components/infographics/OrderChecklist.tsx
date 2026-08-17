"use client";

import ArticleIcon from "./ArticleIcon";

import styles from "./Infographics.module.css";
import VisualShell from "./VisualShell";

const checks = ["ڈیزائن کوڈ", "رنگ اور سائز", "موجودہ اسٹاک", "مکمل پتا", "دو موبائل نمبر", "آخری تحریری تصدیق"];

export default function OrderChecklist() {
  return (
    <VisualShell kicker="آرڈر تصدیق" title="پارسل بھیجنے سے پہلے 6 ضروری تصدیقات">
      <div className={styles.checklistWrap}>
        <div className={styles.centralPackage}><ArticleIcon name="package" /><b>تصدیق شدہ آرڈر</b></div>
        <div className={styles.checkGrid}>
          {checks.map((item) => <div className={styles.checkItem} key={item}><ArticleIcon name="check" /><span>{item}</span></div>)}
        </div>
      </div>
    </VisualShell>
  );
}


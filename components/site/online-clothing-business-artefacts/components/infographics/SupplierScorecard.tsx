"use client";

import ArticleIcon from "./ArticleIcon";

import styles from "./Infographics.module.css";
import VisualShell from "./VisualShell";

const cheap = ["کم قیمت", "غیر واضح اسٹاک", "دیر سے جواب", "کیٹلاگ تصویر پر انحصار", "مبہم واپسی", "برانڈ پیکنگ کا خطرہ"];
const reliable = ["اصل ویڈیو", "درست سائز", "تازہ اسٹاک", "بروقت جواب", "واضح واپسی", "سادہ یا آپ کے نام کی پیکنگ"];

function Card({ good, title, items }: { good?: boolean; title: string; items: string[] }) {
  return (
    <div className={`${styles.supplierCard} ${good ? styles.supplierCardGood : ""}`}>
      <div className={styles.supplierHead}>
        <ArticleIcon name={good ? "security" : "supplier"} />
        <strong>{title}</strong>
      </div>
      <div className={styles.scoreList}>
        {items.map((item) => <div className={styles.scoreRow} key={item}><i className={styles.scoreDot} /><span>{item}</span></div>)}
      </div>
    </div>
  );
}

export default function SupplierScorecard() {
  return (
    <VisualShell kicker="سپلائر کا انتخاب" title="پہلا ساتھی یا پہلا خطرہ؟">
      <div className={styles.scorecards}>
        <Card title="صرف سستا سپلائر" items={cheap} />
        <Card good title="قابلِ اعتماد سپلائر" items={reliable} />
      </div>
      <div className={styles.supplierVerdict}>200 روپے کی بچت ایک خراب پارسل یا واپسی میں ختم ہوسکتی ہے۔</div>
    </VisualShell>
  );
}


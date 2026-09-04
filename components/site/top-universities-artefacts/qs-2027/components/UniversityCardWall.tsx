"use client";

import { useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import styles from "./UniversityCardWall.module.css";

type University = {
  id: string;
  rank: string;
  worldRank: string;
  shortName: string;
  name: string;
  city: string;
  field: string;
  routes: string[];
  tone: string;
};

const universities: University[] = [
  { id: "qau", rank: "1", worldRank: "381", shortName: "QAU", name: "قائداعظم یونیورسٹی", city: "اسلام آباد", field: "قدرتی و سماجی علوم", routes: ["تحقیق", "حیاتیاتی علوم", "پالیسی"], tone: "sun" },
  { id: "nust", rank: "2", worldRank: "384", shortName: "NUST", name: "نیشنل یونیورسٹی آف سائنسز اینڈ ٹیکنالوجی", city: "اسلام آباد", field: "کمپیوٹنگ و انجینئرنگ", routes: ["مصنوعی ذہانت", "سائبر سکیورٹی", "انجینئرنگ"], tone: "aqua" },
  { id: "pieas", rank: "3", worldRank: "560", shortName: "PIEAS", name: "پاکستان انسٹی ٹیوٹ آف انجینئرنگ اینڈ اپلائیڈ سائنسز", city: "اسلام آباد", field: "انجینئرنگ و بنیادی علوم", routes: ["فزکس", "الیکٹریکل", "مکینیکل"], tone: "violet" },
  { id: "pu", rank: "4", worldRank: "588", shortName: "PU", name: "پنجاب یونیورسٹی", city: "لاہور", field: "کمپیوٹنگ، قانون و فارمیسی", routes: ["کمپیوٹنگ", "قانون", "فارمیسی"], tone: "coral" },
  { id: "lums", rank: "5", worldRank: "608", shortName: "LUMS", name: "لاہور یونیورسٹی آف مینجمنٹ سائنسز", city: "لاہور", field: "بزنس، اکنامکس و کمپیوٹنگ", routes: ["فنانس", "اکنامکس", "کمپیوٹر سائنس"], tone: "pink" },
  { id: "uaf", rank: "6", worldRank: "629", shortName: "UAF", name: "یونیورسٹی آف ایگریکلچر فیصل آباد", city: "فیصل آباد", field: "زراعت، ویٹرنری و فوڈ", routes: ["زراعت", "ویٹرنری", "ایگری ٹیک"], tone: "green" },
  { id: "comsats", rank: "7", worldRank: "639", shortName: "COMSATS", name: "کامسیٹس یونیورسٹی اسلام آباد", city: "اسلام آباد", field: "کمپیوٹنگ و انجینئرنگ", routes: ["سافٹ ویئر", "ڈیٹا", "ٹیلی کام"], tone: "blue" },
  { id: "gcuf", rank: "8", worldRank: "691", shortName: "GCUF", name: "گورنمنٹ کالج یونیورسٹی فیصل آباد", city: "فیصل آباد", field: "سائنس و کمپیوٹنگ", routes: ["قدرتی علوم", "کمپیوٹنگ", "کاروبار"], tone: "purple" },
  { id: "uet", rank: "9", worldRank: "791–800", shortName: "UET", name: "یونیورسٹی آف انجینئرنگ اینڈ ٹیکنالوجی لاہور", city: "لاہور", field: "انجینئرنگ و ٹیکنالوجی", routes: ["سول", "الیکٹریکل", "مکینیکل"], tone: "orange" },
  { id: "aku", rank: "10", worldRank: "951–1000", shortName: "AKU", name: "آغا خان یونیورسٹی", city: "کراچی", field: "طب، نرسنگ و صحت عامہ", routes: ["میڈیسن", "نرسنگ", "صحت عامہ"], tone: "teal" },
  { id: "uop", rank: "10", worldRank: "951–1000", shortName: "UoP", name: "یونیورسٹی آف پشاور", city: "پشاور", field: "سماجی و قدرتی علوم", routes: ["سماجی علوم", "قدرتی علوم", "انسانی علوم"], tone: "lime" },
];

export default function UniversityCardWall() {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setFlipped((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <main className={styles["page-shell"]} dir="rtl">
      <section className={styles.poster} aria-labelledby="poster-title">
        <div className={`${styles["light-orb"]} ${styles["orb-one"]}`} aria-hidden="true" />
        <div className={`${styles["light-orb"]} ${styles["orb-two"]}`} aria-hidden="true" />

        <header className={styles["poster-header"]}>
          <div className={styles["edition-pill"]}>
            <Sparkles aria-hidden="true" size={18} />
            <span>QS ورلڈ یونیورسٹی رینکنگ 2027</span>
          </div>
          <h1 id="poster-title">پاکستان کی ٹاپ 10 یونیورسٹیاں</h1>
          <div className={styles["title-rule"]} aria-hidden="true">
            <span />
            <i />
            <span />
          </div>
          <p className={styles["poster-intro"]}>عالمی درجہ بندی، شہر اور نمایاں شعبہ — سب ایک نظر میں</p>
        </header>

        <div className={styles["card-wall"]} aria-label="پاکستان کی نمایاں یونیورسٹیاں">
          {universities.map((university, index) => (
            <button
              className={`${styles["university-card"]} ${styles[`tone-${university.tone}`]} ${flipped.has(university.id) ? styles["is-flipped"] : ""} ${index < 3 ? styles["top-three"] : ""}`}
              key={university.id}
              onClick={() => toggleCard(university.id)}
              type="button"
              aria-label={`${university.name} کی تفصیل ${flipped.has(university.id) ? "بند کریں" : "دیکھیں"}`}
              aria-pressed={flipped.has(university.id)}
            >
              <span className={styles["card-inner"]}>
                <span className={`${styles["card-face"]} ${styles["card-front"]}`}>
                  <span className={styles["rank-disc"]} aria-label={`پاکستانی درجہ ${university.rank}`}>
                    <small>#</small>{university.rank}
                  </span>
                  <span className={styles["short-name"]} dir="ltr">{university.shortName}</span>
                  <span className={styles["university-name"]}>{university.name}</span>
                  <span className={styles["city-chip"]}>{university.city}</span>
                  <span className={styles["card-bottom"]}>
                    <span>
                      <small>عالمی رینک</small>
                      <b dir="ltr">{university.worldRank}</b>
                    </span>
                    <span className={styles["tap-hint"]}>کارڈ پلٹیں</span>
                  </span>
                </span>

                <span className={`${styles["card-face"]} ${styles["card-back"]}`}>
                  <span className={styles["back-rank"]} dir="ltr">#{university.rank} · {university.shortName}</span>
                  <span className={styles["field-label"]}>نمایاں شعبے</span>
                  <strong>{university.field}</strong>
                  <span className={styles["route-list"]}>
                    {university.routes.map((route) => <i key={route}>{route}</i>)}
                  </span>
                  <span className={styles["back-foot"]}>واپس پلٹنے کے لیے کلک کریں</span>
                </span>
              </span>
            </button>
          ))}

          <article className={styles["guide-card"]}>
            <span className={styles["guide-number"]}>10</span>
            <strong>درجہ بند مقامات</strong>
            <p>مشترکہ 10ویں مقام کی وجہ سے فہرست میں 11 جامعات شامل ہیں۔</p>
            <span>تفصیلی گائیڈ</span>
          </article>
        </div>

        <footer className={styles["poster-footer"]}>
          <p>فیس، داخلہ، شعبوں اور درست انتخاب کا مکمل موازنہ</p>
          <strong dir="ltr">shama.pk</strong>
        </footer>
      </section>

      <div className={styles.controls} aria-label="کارڈ کنٹرولز">
        <p>ہر کارڈ پر کلک کرکے نمایاں شعبے دیکھیں۔</p>
        <button type="button" onClick={() => setFlipped(new Set())} disabled={flipped.size === 0}>
          <RotateCcw aria-hidden="true" size={18} />
          تمام کارڈ سامنے کریں
        </button>
      </div>
    </main>
  );
}

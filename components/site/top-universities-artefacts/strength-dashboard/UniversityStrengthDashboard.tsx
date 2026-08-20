"use client";

import { useMemo, useState } from "react";
import PriorityCard from "./PriorityCard";
import UniversitySelector from "./UniversitySelector";
import { universities } from "../data/universities";
import styles from "./UniversityStrengthDashboard.module.css";

type Part = 1 | 2;

type UniversityStrengthDashboardProps = {
  defaultPart?: Part;
  brand?: string;
};

export default function UniversityStrengthDashboard({
  defaultPart = 1,
  brand = "shama.pk",
}: UniversityStrengthDashboardProps) {
  const [activePart, setActivePart] = useState<Part>(defaultPart);
  const [activeRank, setActiveRank] = useState(defaultPart === 1 ? 1 : 6);

  const partUniversities = useMemo(
    () => universities.filter((university) => activePart === 1 ? university.rank <= 5 : university.rank >= 6),
    [activePart],
  );

  const activeUniversity =
    partUniversities.find((university) => university.rank === activeRank) ?? partUniversities[0] ?? universities[0];

  const changePart = (part: Part) => {
    setActivePart(part);
    setActiveRank(part === 1 ? 1 : 6);
  };

  return (
    <section className={styles.dashboard} dir="rtl" aria-labelledby="university-dashboard-title">
      <div className={styles.ambientOne} aria-hidden="true" />
      <div className={styles.ambientTwo} aria-hidden="true" />

      <header className={styles.dashboardHeader}>
        <div>
          <p className={styles.eyebrow}>2026 SUBJECT STRENGTH DASHBOARD</p>
          <h1 id="university-dashboard-title">پاکستان کی ٹاپ 10 یونیورسٹیاں</h1>
          <p className={styles.intro}>ہر یونیورسٹی کی پہلی، دوسری اور تیسری مضبوط تعلیمی ترجیح ایک نظر میں</p>
        </div>

        <div className={styles.summary} aria-label="ڈیش بورڈ خلاصہ">
          <div><strong>10</strong><span>جامعات</span></div>
          <div><strong>30</strong><span>ترجیحات</span></div>
          <div><strong>2026</strong><span>رینکنگ</span></div>
        </div>
      </header>

      <div className={styles.partTabs} role="tablist" aria-label="یونیورسٹی رینکنگ کے حصے">
        <button
          type="button"
          role="tab"
          aria-selected={activePart === 1}
          data-selected={activePart === 1}
          onClick={() => changePart(1)}
        >
          <span>حصہ 1</span>
          <small>رینک 1–5</small>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activePart === 2}
          data-selected={activePart === 2}
          onClick={() => changePart(2)}
        >
          <span>حصہ 2</span>
          <small>رینک 6–10</small>
        </button>
      </div>

      <UniversitySelector
        universities={partUniversities}
        activeRank={activeUniversity.rank}
        onSelect={setActiveRank}
      />

      <article className={styles.detailPanel} key={activeUniversity.rank}>
        <div className={styles.universityIdentity}>
          <div className={styles.rankBadge}>
            <small>2026 رینک</small>
            <strong>#{String(activeUniversity.rank).padStart(2, "0")}</strong>
          </div>
          <div>
            <p>منتخب یونیورسٹی</p>
            <h2>{activeUniversity.name}</h2>
          </div>
        </div>

        <div className={styles.priorityLayout}>
          <PriorityCard priority={activeUniversity.priorities[0]} featured />
          <div className={styles.secondaryPriorities}>
            <PriorityCard priority={activeUniversity.priorities[1]} />
            <PriorityCard priority={activeUniversity.priorities[2]} />
          </div>
        </div>
      </article>

      <footer className={styles.dashboardFooter}>
        <span className={styles.brand}>{brand}</span>
        <span>عالمی پوزیشنز مختلف سبجیکٹ رینکنگز کے مطابق ہیں۔</span>
      </footer>
    </section>
  );
}

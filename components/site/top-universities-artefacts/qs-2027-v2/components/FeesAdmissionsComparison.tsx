"use client";

import { useMemo, useState } from "react";
import { feeRecords, researchDate, universities } from "../data/universityArticleData";
import { ArtifactShell } from "./ArtifactShell";
import styles from "./UniversityArtefacts.module.css";

type SectorFilter = "تمام" | "سرکاری" | "نجی";
type ProgrammeFilter = "تمام" | "ٹیکنالوجی" | "دیگر";
type FeeStatus = "within" | "stretch" | "outside" | "unavailable";

const MIN_BUDGET = 20_000;
const MAX_BUDGET = 300_000;
const STEP = 5_000;
const TECH_IDS = new Set(["qau", "nust", "pieas", "pu", "lums", "comsats", "uet", "uol"]);

const statusMeta: Record<Exclude<FeeStatus, "unavailable">, { label: string; colour: string }> = {
  within: { label: "بجٹ کے اندر", colour: "#34A853" },
  stretch: { label: "قدرے مہنگی", colour: "#FBBC05" },
  outside: { label: "بجٹ سے باہر", colour: "#EA4335" },
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-PK").format(value);
}

function semesterAmount(tuition: string, feePeriod: string) {
  if (!feePeriod.includes("سمسٹر")) return null;
  const match = tuition.replaceAll(",", "").match(/\d+/);
  return match ? Number(match[0]) : null;
}

function feeStatus(amount: number | null, budget: number): FeeStatus {
  if (amount === null) return "unavailable";
  if (amount <= budget) return "within";
  if (amount <= budget * 1.25) return "stretch";
  return "outside";
}

export function FeesAdmissionsComparison() {
  const [budget, setBudget] = useState(100_000);
  const [sector, setSector] = useState<SectorFilter>("تمام");
  const [programme, setProgramme] = useState<ProgrammeFilter>("تمام");
  const [selectedIds, setSelectedIds] = useState<string[]>(["pu", "qau", "pieas"]);
  const [showComparison, setShowComparison] = useState(false);

  const allRecords = useMemo(
    () => feeRecords.map((fee) => ({
      fee,
      university: universities.find((item) => item.id === fee.universityId)!,
      amount: semesterAmount(fee.tuition, fee.feePeriod),
      group: TECH_IDS.has(fee.universityId) ? "ٹیکنالوجی" : "دیگر",
    })),
    [],
  );

  const filteredRecords = useMemo(
    () => allRecords.filter(({ university, group }) => (
      (sector === "تمام" || university.sector === sector)
      && (programme === "تمام" || group === programme)
    )),
    [allRecords, programme, sector],
  );

  const chartRecords = useMemo(
    () => filteredRecords
      .filter((record): record is typeof record & { amount: number } => record.amount !== null)
      .sort((a, b) => a.amount - b.amount),
    [filteredRecords],
  );

  const unavailableRecords = filteredRecords.filter((record) => record.amount === null);
  const counts = chartRecords.reduce(
    (result, record) => {
      result[feeStatus(record.amount, budget) as Exclude<FeeStatus, "unavailable">] += 1;
      return result;
    },
    { within: 0, stretch: 0, outside: 0 },
  );

  const featured = useMemo(() => {
    const byRank = [...chartRecords].sort((a, b) => a.university.position - b.university.position);
    return byRank.find((record) => feeStatus(record.amount, budget) === "within")
      ?? byRank.find((record) => feeStatus(record.amount, budget) === "stretch")
      ?? [...chartRecords].sort((a, b) => a.amount - b.amount)[0];
  }, [budget, chartRecords]);

  const selectedRecords = selectedIds
    .map((id) => allRecords.find((record) => record.university.id === id))
    .filter((record): record is (typeof allRecords)[number] => Boolean(record));

  const chartMaximum = Math.max(MAX_BUDGET, ...chartRecords.map((record) => record.amount));
  const budgetLineBottom = 70 + Math.min(budget / chartMaximum, 1) * 220;
  const gaugePercent = ((budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100;
  const gaugeAngle = Math.PI - (Math.PI * gaugePercent) / 100;
  const gaugeX = 130 + 100 * Math.cos(gaugeAngle);
  const gaugeY = 124 - 100 * Math.sin(gaugeAngle);

  const toggleSelection = (id: string) => {
    setSelectedIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length === 3) return current;
      return [...current, id];
    });
  };

  return (
    <ArtifactShell
      eyebrow="فیس اور داخلہ · programme-specific examples"
      title="آپ کے بجٹ میں کون سی یونیورسٹی آتی ہے؟"
      description="فی سمسٹر بجٹ منتخب کریں اور مناسب، قدرے مہنگی اور بجٹ سے باہر جامعات فوراً دیکھیں۔"
      componentId="FeesAdmissionsComparison"
    >
      <div className={styles.feeExplorer}>
        <div className={styles.feeToolbar}>
          <div className={styles.feeSectorFilters} role="group" aria-label="ادارے کی قسم منتخب کریں">
            {(["تمام", "سرکاری", "نجی"] as SectorFilter[]).map((item) => (
              <button
                type="button"
                key={item}
                className={sector === item ? styles.activeFeeFilter : ""}
                aria-pressed={sector === item}
                onClick={() => setSector(item)}
              >
                {item} ادارے
              </button>
            ))}
          </div>

          <label className={styles.programmeSelect}>
            <span>پروگرام منتخب کریں</span>
            <select value={programme} onChange={(event) => setProgramme(event.target.value as ProgrammeFilter)}>
              <option value="تمام">تمام programme examples</option>
              <option value="ٹیکنالوجی">کمپیوٹر اور انجینئرنگ</option>
              <option value="دیگر">دیگر مضامین</option>
            </select>
          </label>
        </div>

        <div className={styles.affordabilityHero}>
          <section className={styles.budgetPanel} aria-labelledby="fee-budget-title">
            <header>
              <span className={styles.panelIcon} aria-hidden="true">↗</span>
              <div>
                <h3 id="fee-budget-title">اپنا فی سمسٹر بجٹ منتخب کریں</h3>
                <p>Slider حرکت دیں؛ chart اور سفارش فوراً بدل جائیں گے۔</p>
              </div>
            </header>

            <div className={styles.feeGauge}>
              <svg viewBox="0 0 260 140" role="img" aria-label={`منتخب بجٹ ${formatNumber(budget)} روپے`}>
                <path className={styles.gaugeTrack} pathLength="100" d="M 30 124 A 100 100 0 0 1 230 124" />
                <path className={styles.gaugeGreen} pathLength="100" d="M 30 124 A 100 100 0 0 1 230 124" />
                <path className={styles.gaugeBlue} pathLength="100" d="M 30 124 A 100 100 0 0 1 230 124" />
                <path className={styles.gaugeYellow} pathLength="100" d="M 30 124 A 100 100 0 0 1 230 124" />
                <path className={styles.gaugeRed} pathLength="100" d="M 30 124 A 100 100 0 0 1 230 124" />
                <circle className={styles.gaugePointerHalo} cx={gaugeX} cy={gaugeY} r="9" />
                <circle className={styles.gaugePointer} cx={gaugeX} cy={gaugeY} r="5" />
              </svg>
              <div className={styles.gaugeValue}>
                <small>آپ کا بجٹ</small>
                <output htmlFor="semester-budget">{formatNumber(budget)}</output>
                <span>روپے</span>
              </div>
            </div>

            <div className={styles.rangeWrap}>
              <input
                id="semester-budget"
                type="range"
                min={MIN_BUDGET}
                max={MAX_BUDGET}
                step={STEP}
                value={budget}
                aria-valuetext={`${formatNumber(budget)} روپے فی سمسٹر`}
                onChange={(event) => setBudget(Number(event.target.value))}
                style={{ "--range-progress": `${gaugePercent}%` } as React.CSSProperties}
              />
              <div><span dir="ltr">20,000</span><span>فی سمسٹر</span><span dir="ltr">300,000</span></div>
            </div>
          </section>

          <section className={styles.budgetSummary} aria-live="polite" aria-atomic="true">
            <div className={styles.summaryLead}>
              <span aria-hidden="true">●●●</span>
              <p>آپ کے بجٹ میں</p>
              <strong><b dir="ltr">{counts.within}</b> جامعات</strong>
              <small>{chartRecords.length} قابلِ موازنہ فی سمسٹر مثالوں میں سے</small>
            </div>
            <div className={styles.statusGrid}>
              {(Object.keys(statusMeta) as (keyof typeof statusMeta)[]).map((status) => (
                <div key={status} data-status={status}>
                  <b dir="ltr">{counts[status]}</b>
                  <span>{statusMeta[status].label}</span>
                </div>
              ))}
            </div>
            {unavailableRecords.length > 0 && (
              <p className={styles.unavailableNotice}>
                {unavailableRecords.length} مزید records کی مدت مختلف ہے یا تازہ فیس portal سے لینی ہوگی۔
              </p>
            )}
          </section>
        </div>

        <section className={styles.feeChartSection} aria-labelledby="fee-chart-title">
          <header>
            <div>
              <small>programme-specific fee examples · فی سمسٹر</small>
              <h3 id="fee-chart-title">جامعات کا فیس موازنہ</h3>
            </div>
            <p><span aria-hidden="true">✓</span> bar منتخب کرکے موازنہ میں شامل کریں</p>
          </header>

          {chartRecords.length ? (
            <div className={styles.feeChartViewport}>
              <div className={styles.feePlot} style={{ "--fee-columns": chartRecords.length } as React.CSSProperties}>
                <div className={styles.feeThreshold} style={{ bottom: budgetLineBottom }}>
                  <span>آپ کا بجٹ · {formatNumber(budget)} روپے</span>
                </div>
                <div className={styles.feeBars}>
                  {chartRecords.map((record) => {
                    const status = feeStatus(record.amount, budget) as Exclude<FeeStatus, "unavailable">;
                    const height = Math.max(24, (record.amount / chartMaximum) * 220);
                    const selected = selectedIds.includes(record.university.id);
                    return (
                      <button
                        type="button"
                        key={record.university.id}
                        className={selected ? styles.selectedFeeBar : ""}
                        aria-pressed={selected}
                        aria-label={`${record.university.nameUrdu}، ${formatNumber(record.amount)} روپے، ${statusMeta[status].label}، موازنہ کے لیے منتخب کریں`}
                        onClick={() => toggleSelection(record.university.id)}
                      >
                        <span className={styles.feeBarValue} dir="ltr">{formatNumber(record.amount)}</span>
                        <span className={styles.feeColumn}>
                          <i style={{ height, "--fee-status-colour": statusMeta[status].colour } as React.CSSProperties} />
                        </span>
                        <strong>{record.university.shortName}</strong>
                        <small>{record.university.nameUrdu}</small>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.emptyFeeState}>
              اس انتخاب میں قابلِ موازنہ فی سمسٹر رقم دستیاب نہیں۔ نیچے اصل fee records اور سرکاری ذرائع دیکھیں۔
            </div>
          )}
        </section>

        {featured && (
          <section className={styles.featuredFeeChoice} aria-labelledby="featured-fee-title">
            <div className={styles.featuredRibbon}>★ بہترین ابتدائی انتخاب</div>
            <div>
              <small>{featured.fee.programme}</small>
              <h3 id="featured-fee-title">{featured.university.nameUrdu}</h3>
              <p>{featured.fee.admission}</p>
            </div>
            <div className={styles.featuredRank}>
              <span>QS عالمی رینک</span>
              <b dir="ltr">{featured.university.worldRank}</b>
            </div>
            <div className={styles.featuredSaving}>
              {featured.amount <= budget ? (
                <>
                  <span>بجٹ سے</span>
                  <strong><b dir="ltr">{formatNumber(budget - featured.amount)}</b> روپے کم</strong>
                  <small>یہ programme example آپ کے منتخب بجٹ میں آتا ہے۔</small>
                </>
              ) : (
                <>
                  <span>منتخب بجٹ سے</span>
                  <strong><b dir="ltr">{formatNumber(featured.amount - budget)}</b> روپے زیادہ</strong>
                  <small>یہ قریب ترین دستیاب fee example ہے۔</small>
                </>
              )}
            </div>
          </section>
        )}

        <details className={styles.feeDetails}>
          <summary>تمام programme-specific فیس اور داخلہ records دیکھیں</summary>
          <div className={styles.feeDetailList}>
            {filteredRecords.map(({ fee, university, amount }) => (
              <article key={university.id}>
                <div>
                  <strong>{university.nameUrdu}</strong>
                  <small>{university.sector} · {university.city} · QS {university.worldRank}</small>
                </div>
                <div>
                  <b dir="ltr">{fee.tuition}</b>
                  <small>{fee.feePeriod}{amount === null ? " · براہِ راست تقابل میں شامل نہیں" : ""}</small>
                </div>
                <p><b>داخلہ:</b> {fee.admission}</p>
                <a href={fee.sourceUrl} target="_blank" rel="noreferrer">{fee.sourceLabel} ↗</a>
              </article>
            ))}
          </div>
        </details>

        <section className={styles.feeCompareTray} aria-label="منتخب جامعات کا موازنہ">
          <header>
            <div>
              <strong>منتخب جامعات <b dir="ltr">({selectedRecords.length}/3)</b></strong>
              <small>chart میں کسی bar پر کلک کرکے انتخاب بدلیں</small>
            </div>
            <button type="button" disabled={selectedRecords.length < 2} onClick={() => setShowComparison((current) => !current)}>
              {showComparison ? "موازنہ بند کریں" : `${selectedRecords.length} جامعات کا موازنہ کریں`}
              <span aria-hidden="true">←</span>
            </button>
          </header>

          <div className={styles.compareSlots}>
            {selectedRecords.map(({ fee, university }) => (
              <div key={university.id}>
                <button type="button" aria-label={`${university.nameUrdu} کو موازنہ سے نکالیں`} onClick={() => toggleSelection(university.id)}>×</button>
                <strong>{university.shortName}</strong>
                <span>{fee.tuition}</span>
              </div>
            ))}
            {Array.from({ length: 3 - selectedRecords.length }, (_, index) => (
              <div className={styles.emptyCompareSlot} key={`empty-${index}`}>ایک جامعہ منتخب کریں</div>
            ))}
          </div>

          {showComparison && selectedRecords.length >= 2 && (
            <div className={styles.comparisonTableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>پیمانہ</th>
                    {selectedRecords.map(({ university }) => <th key={university.id}>{university.shortName}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr><th>فیس مثال</th>{selectedRecords.map(({ fee, university }) => <td key={university.id}>{fee.tuition}</td>)}</tr>
                  <tr><th>مدت</th>{selectedRecords.map(({ fee, university }) => <td key={university.id}>{fee.feePeriod}</td>)}</tr>
                  <tr><th>QS رینک</th>{selectedRecords.map(({ university }) => <td dir="ltr" key={university.id}>{university.worldRank}</td>)}</tr>
                  <tr><th>شہر</th>{selectedRecords.map(({ university }) => <td key={university.id}>{university.city}</td>)}</tr>
                  <tr><th>ادارے کی قسم</th>{selectedRecords.map(({ university }) => <td key={university.id}>{university.sector}</td>)}</tr>
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className={styles.dataFooter}>
          <span>تحقیق کی تاریخ: {researchDate}</span>
          <span>حتمی ادائیگی کے لیے موجودہ offer letter یا portal-generated challan دیکھیں۔</span>
        </footer>
      </div>
    </ArtifactShell>
  );
}

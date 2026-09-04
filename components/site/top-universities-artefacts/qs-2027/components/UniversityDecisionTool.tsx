"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CircleAlert,
  GraduationCap,
  MapPinned,
  RotateCcw,
  WalletCards,
} from "lucide-react";
import styles from "./UniversityDecisionTool.module.css";

type FieldKey = "computing" | "engineering" | "health" | "business" | "agriculture" | "sciences";
type BudgetKey = "low" | "medium" | "open";
type CityKey = "islamabad" | "lahore" | "faisalabad" | "karachi" | "peshawar" | "other";
type ProfileKey = "strong" | "test" | "marks" | "safe";
type MobilityKey = "move" | "local";
type FeeTier = "low" | "medium" | "high";
type AdmissionModel = "test" | "marks" | "mixed" | "holistic";
type Selectivity = "high" | "selective" | "moderate" | "accessible";

type Answers = {
  field: FieldKey | null;
  budget: BudgetKey | null;
  mobility: MobilityKey | null;
  city: CityKey | null;
  profile: ProfileKey | null;
};

type University = {
  id: string;
  rank: string;
  shortName: string;
  name: string;
  city: CityKey;
  cityLabel: string;
  fee: FeeTier;
  admissionModel: AdmissionModel;
  selectivity: Selectivity;
  fields: Record<FieldKey, number>;
  strength: string;
  caution: string;
};

const fieldOptions: { key: FieldKey; label: string; note: string }[] = [
  { key: "computing", label: "کمپیوٹر سائنس", note: "سافٹ ویئر، مصنوعی ذہانت، ڈیٹا" },
  { key: "engineering", label: "انجینئرنگ", note: "سول، الیکٹریکل، مکینیکل" },
  { key: "health", label: "طب اور صحت", note: "میڈیسن، نرسنگ، صحتِ عامہ" },
  { key: "business", label: "بزنس و سماجی علوم", note: "فنانس، اکنامکس، قانون" },
  { key: "agriculture", label: "زراعت اور فوڈ", note: "ایگری کلچر، ویٹرنری، فوڈ" },
  { key: "sciences", label: "بنیادی علوم", note: "فزکس، کیمسٹری، بائیولوجی" },
];

const budgetOptions: { key: BudgetKey; label: string; note: string }[] = [
  { key: "low", label: "1 لاکھ تک", note: "فی سمسٹر تقریباً" },
  { key: "medium", label: "1 سے 2.5 لاکھ", note: "فی سمسٹر تقریباً" },
  { key: "open", label: "بجٹ لچکدار ہے", note: "معیار پہلی ترجیح ہے" },
];

const cityOptions: { key: CityKey; label: string }[] = [
  { key: "islamabad", label: "اسلام آباد / راولپنڈی" },
  { key: "lahore", label: "لاہور" },
  { key: "faisalabad", label: "فیصل آباد" },
  { key: "karachi", label: "کراچی" },
  { key: "peshawar", label: "پشاور" },
  { key: "other", label: "کوئی اور شہر" },
];

const profileOptions: { key: ProfileKey; label: string; note: string }[] = [
  { key: "strong", label: "نمبر اور ٹیسٹ دونوں مضبوط", note: "مشکل داخلوں کے لیے تیار ہوں" },
  { key: "test", label: "ٹیسٹ بہتر دے سکتا ہوں", note: "بورڈ نمبر اوسط ہیں" },
  { key: "marks", label: "تعلیمی نمبر مضبوط ہیں", note: "ٹیسٹ تیاری اوسط ہے" },
  { key: "safe", label: "محفوظ انتخاب چاہیے", note: "داخلے کا بہتر امکان اہم ہے" },
];

const universities: University[] = [
  {
    id: "qau", rank: "1", shortName: "QAU", name: "قائداعظم یونیورسٹی", city: "islamabad", cityLabel: "اسلام آباد",
    fee: "low", admissionModel: "marks", selectivity: "selective",
    fields: { computing: 72, engineering: 25, health: 45, business: 82, agriculture: 20, sciences: 100 },
    strength: "تحقیق، بنیادی علوم اور سماجی علوم",
    caution: "اپنے منتخب پروگرام کا تازہ میرٹ اور شعبہ وار سہولیات الگ دیکھیں۔",
  },
  {
    id: "nust", rank: "2", shortName: "NUST", name: "نیشنل یونیورسٹی آف سائنسز اینڈ ٹیکنالوجی", city: "islamabad", cityLabel: "اسلام آباد",
    fee: "medium", admissionModel: "test", selectivity: "high",
    fields: { computing: 100, engineering: 100, health: 52, business: 78, agriculture: 10, sciences: 72 },
    strength: "کمپیوٹنگ، انجینئرنگ اور صنعت سے روابط",
    caution: "NET کا وزن بہت زیادہ ہے؛ ٹیسٹ تیاری فیصلہ کن ہوگی۔",
  },
  {
    id: "pieas", rank: "3", shortName: "PIEAS", name: "پاکستان انسٹی ٹیوٹ آف انجینئرنگ اینڈ اپلائیڈ سائنسز", city: "islamabad", cityLabel: "اسلام آباد",
    fee: "low", admissionModel: "test", selectivity: "high",
    fields: { computing: 76, engineering: 96, health: 35, business: 18, agriculture: 10, sciences: 100 },
    strength: "تحقیق پر مبنی انجینئرنگ اور بنیادی علوم",
    caution: "داخلہ ٹیسٹ اہم اور نشستیں محدود ہیں۔",
  },
  {
    id: "pu", rank: "4", shortName: "PU", name: "پنجاب یونیورسٹی", city: "lahore", cityLabel: "لاہور",
    fee: "low", admissionModel: "mixed", selectivity: "moderate",
    fields: { computing: 86, engineering: 46, health: 78, business: 92, agriculture: 35, sciences: 88 },
    strength: "متعدد شعبے، مناسب فیس اور وسیع انتخاب",
    caution: "ہر پروگرام کا میرٹ، معیار اور داخلہ طریقہ مختلف ہوسکتا ہے۔",
  },
  {
    id: "lums", rank: "5", shortName: "LUMS", name: "لاہور یونیورسٹی آف مینجمنٹ سائنسز", city: "lahore", cityLabel: "لاہور",
    fee: "high", admissionModel: "holistic", selectivity: "high",
    fields: { computing: 96, engineering: 42, health: 12, business: 100, agriculture: 8, sciences: 65 },
    strength: "بزنس، اکنامکس، قانون اور کمپیوٹر سائنس",
    caution: "فیس زیادہ ہے؛ مالی معاونت کا فیصلہ الگ جانچیں۔",
  },
  {
    id: "uaf", rank: "6", shortName: "UAF", name: "یونیورسٹی آف ایگریکلچر فیصل آباد", city: "faisalabad", cityLabel: "فیصل آباد",
    fee: "low", admissionModel: "marks", selectivity: "moderate",
    fields: { computing: 52, engineering: 62, health: 70, business: 55, agriculture: 100, sciences: 82 },
    strength: "زراعت، ویٹرنری، فوڈ اور ایگری ٹیک",
    caution: "زراعت سے باہر ہر پروگرام کی طاقت یکساں نہیں۔",
  },
  {
    id: "comsats", rank: "7", shortName: "COMSATS", name: "کامسیٹس یونیورسٹی اسلام آباد", city: "islamabad", cityLabel: "اسلام آباد",
    fee: "medium", admissionModel: "mixed", selectivity: "moderate",
    fields: { computing: 100, engineering: 90, health: 35, business: 72, agriculture: 18, sciences: 78 },
    strength: "کمپیوٹنگ، سافٹ ویئر اور انجینئرنگ",
    caution: "کیمپس کے لحاظ سے فیس، میرٹ اور ماحول بدلتا ہے۔",
  },
  {
    id: "gcuf", rank: "8", shortName: "GCUF", name: "گورنمنٹ کالج یونیورسٹی فیصل آباد", city: "faisalabad", cityLabel: "فیصل آباد",
    fee: "low", admissionModel: "marks", selectivity: "accessible",
    fields: { computing: 78, engineering: 42, health: 58, business: 72, agriculture: 48, sciences: 88 },
    strength: "قدرتی علوم، کمپیوٹنگ اور قابلِ برداشت خرچ",
    caution: "اپنے شعبے کی فیکلٹی، لیبز اور منظوری الگ جانچیں۔",
  },
  {
    id: "uet", rank: "9", shortName: "UET", name: "یونیورسٹی آف انجینئرنگ اینڈ ٹیکنالوجی لاہور", city: "lahore", cityLabel: "لاہور",
    fee: "medium", admissionModel: "test", selectivity: "selective",
    fields: { computing: 88, engineering: 100, health: 12, business: 42, agriculture: 25, sciences: 62 },
    strength: "روایتی انجینئرنگ اور مضبوط صنعتی شناخت",
    caution: "ECAT، ڈومیسائل اور زمرے کی شرائط اہم ہیں۔",
  },
  {
    id: "aku", rank: "10", shortName: "AKU", name: "آغا خان یونیورسٹی", city: "karachi", cityLabel: "کراچی",
    fee: "high", admissionModel: "holistic", selectivity: "high",
    fields: { computing: 18, engineering: 8, health: 100, business: 45, agriculture: 10, sciences: 82 },
    strength: "میڈیسن، نرسنگ، صحتِ عامہ اور تحقیق",
    caution: "فیس اور داخلے کا انتہائی مسابقتی عمل دونوں اہم ہیں۔",
  },
  {
    id: "uop", rank: "10", shortName: "UoP", name: "یونیورسٹی آف پشاور", city: "peshawar", cityLabel: "پشاور",
    fee: "low", admissionModel: "marks", selectivity: "accessible",
    fields: { computing: 66, engineering: 35, health: 52, business: 82, agriculture: 38, sciences: 84 },
    strength: "سماجی، انسانی اور قدرتی علوم",
    caution: "مطلوبہ شعبے کی تازہ منظوری اور سہولیات دیکھیں۔",
  },
];

const initialAnswers: Answers = { field: null, budget: null, mobility: null, city: null, profile: null };

function budgetScore(budget: BudgetKey, fee: FeeTier) {
  if (budget === "open") return 100;
  if (budget === "medium") return fee === "high" ? 35 : 100;
  if (fee === "low") return 100;
  if (fee === "medium") return 58;
  return 10;
}

function admissionScore(profile: ProfileKey, model: AdmissionModel, selectivity: Selectivity) {
  if (profile === "strong") return selectivity === "high" ? 100 : selectivity === "selective" ? 96 : 90;
  if (profile === "test") return model === "test" ? 100 : model === "mixed" ? 86 : model === "holistic" ? 70 : 64;
  if (profile === "marks") return model === "marks" ? 100 : model === "mixed" ? 88 : model === "holistic" ? 78 : 66;
  return selectivity === "accessible" ? 100 : selectivity === "moderate" ? 88 : selectivity === "selective" ? 62 : 38;
}

type CompleteAnswers = {
  field: FieldKey;
  budget: BudgetKey;
  mobility: MobilityKey;
  city: CityKey;
  profile: ProfileKey;
};

function scoreUniversity(university: University, answers: CompleteAnswers) {
  const field = university.fields[answers.field];
  const budget = budgetScore(answers.budget, university.fee);
  const location = answers.mobility === "move" ? 100 : university.city === answers.city ? 100 : 18;
  const admission = admissionScore(answers.profile, university.admissionModel, university.selectivity);
  return {
    university,
    score: Math.round(field * 0.45 + budget * 0.25 + location * 0.15 + admission * 0.15),
    parts: { field, budget, location, admission },
  };
}

export default function UniversityDecisionTool() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [showResults, setShowResults] = useState(false);

  const isStepComplete =
    step === 0 ? Boolean(answers.field) :
    step === 1 ? Boolean(answers.budget) :
    step === 2 ? answers.mobility === "move" || (answers.mobility === "local" && Boolean(answers.city)) :
    Boolean(answers.profile);

  const results = useMemo(() => {
    const { field, budget, mobility, profile } = answers;
    if (!field || !budget || !mobility || !profile) return [];
    const complete: CompleteAnswers = { field, budget, mobility, profile, city: answers.city ?? "other" };
    return universities
      .map((university) => scoreUniversity(university, complete))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [answers]);

  const fieldLabel = fieldOptions.find((item) => item.key === answers.field)?.label ?? "";

  const goNext = () => {
    if (!isStepComplete) return;
    if (step < 3) setStep((current) => current + 1);
    else setShowResults(true);
  };

  const restart = () => {
    setAnswers(initialAnswers);
    setStep(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <main className={styles.shell} dir="rtl">
        <section className={styles.tool} data-results="true" aria-labelledby="decision-title">
          <div className={styles.resultHeader}>
            <div>
              <span className={styles.eyebrow}>آپ کی ذاتی شارٹ لسٹ</span>
              <h1 id="decision-title">ان 3 جامعات سے تحقیق شروع کریں</h1>
              <p>یہ داخلے کی پیش گوئی نہیں، آپ کے جوابات کے مطابق ابتدائی موزونیت ہے۔</p>
            </div>
            <div className={styles.brand} dir="ltr">shama.pk</div>
          </div>

          <div className={styles.resultsGrid}>
            {results.map(({ university, score, parts }, index) => {
              const locationText =
                answers.mobility === "move"
                  ? "دوسرے شہر جانا آپ کے لیے ممکن ہے"
                  : parts.location === 100
                    ? "آپ کے منتخب شہر میں موجود ہے"
                    : "دوسرے شہر منتقلی درکار ہوگی";
              const budgetText =
                parts.budget >= 90
                  ? answers.budget === "open" ? "بجٹ کی پابندی سے مطابقت متاثر نہیں" : "آپ کی منتخب بجٹ حد کے مطابق"
                  : parts.budget >= 50
                    ? "آپ کی بجٹ حد سے کچھ زیادہ ہوسکتی ہے"
                    : "آپ کی موجودہ بجٹ حد سے خاصی زیادہ";

              return (
                <article className={`${styles.resultCard} ${index === 0 ? styles.bestCard : ""}`} key={university.id}>
                  <div className={styles.resultTopline}>
                    <span className={styles.resultPosition}>{index + 1}</span>
                    <span className={styles.fitScore}><b>{score}</b><small>/100 موزونیت</small></span>
                  </div>
                  <span className={styles.universityMeta} dir="ltr">PK #{university.rank} · {university.shortName}</span>
                  <h2>{university.name}</h2>
                  <p className={styles.strength}>{university.strength}</p>
                  <div className={styles.reasonList}>
                    <span><Check size={16} /> {fieldLabel} سے {parts.field >= 90 ? "مضبوط" : "اچھی"} مطابقت</span>
                    <span className={parts.budget < 50 ? styles.tradeoff : ""}>
                      {parts.budget < 50 ? <CircleAlert size={16} /> : <Check size={16} />} {budgetText}
                    </span>
                    <span className={parts.location < 50 ? styles.tradeoff : ""}>
                      {parts.location < 50 ? <CircleAlert size={16} /> : <Check size={16} />} {locationText}
                    </span>
                  </div>
                  <div className={styles.caution}>
                    <b>داخلہ لینے سے پہلے</b>
                    <span>{university.caution}</span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.resultActions}>
            <button type="button" className={styles.secondaryButton} onClick={() => { setShowResults(false); setStep(0); }}>
              <ArrowRight size={18} /> جوابات تبدیل کریں
            </button>
            <button type="button" className={styles.resetButton} onClick={restart}>
              <RotateCcw size={17} /> دوبارہ شروع کریں
            </button>
          </div>

          <p className={styles.disclaimer}>
            یہ شارٹ لسٹ شعبے کو 45%، بجٹ کو 25%، مقام کو 15% اور داخلہ تیاری کو 15% وزن دے کر بنتی ہے۔
            حتمی فیصلہ تازہ فیس، اہلیت، منظوری اور سرکاری داخلہ معلومات دیکھ کر کریں۔
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.shell} dir="rtl">
      <section className={styles.tool} data-step={step} aria-labelledby="decision-title">
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>4 مختصر سوالات</span>
            <h1 id="decision-title">آپ کے لیے کون سی یونیورسٹی بہتر ہے؟</h1>
            <p>اپنی ترجیحات منتخب کریں۔ آخر میں 3 موزوں جامعات اور انتخاب کی وجہ دیکھیں۔</p>
          </div>
          <div className={styles.brand} dir="ltr">shama.pk</div>
        </header>

        <ol className={styles.progress} aria-label={`سوال ${step + 1} از 4`}>
          {[0, 1, 2, 3].map((item) => (
            <li className={item === step ? styles.activeStep : item < step ? styles.doneStep : ""} key={item}>
              <span>{item < step ? <Check size={15} /> : item + 1}</span>
              <i />
            </li>
          ))}
        </ol>

        <div className={styles.questionPanel}>
          {step === 0 && (
            <fieldset>
              <legend><BookOpen size={24} /> آپ کیا پڑھنا چاہتے ہیں؟</legend>
              <p className={styles.questionNote}>سب سے قریب شعبہ منتخب کریں۔</p>
              <div className={styles.optionGrid}>
                {fieldOptions.map((option) => (
                  <button
                    type="button"
                    className={answers.field === option.key ? styles.selectedOption : ""}
                    key={option.key}
                    onClick={() => setAnswers((current) => ({ ...current, field: option.key }))}
                    aria-pressed={answers.field === option.key}
                  >
                    <strong>{option.label}</strong><span>{option.note}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset>
              <legend><WalletCards size={24} /> ایک سمسٹر کا اندازاً بجٹ؟</legend>
              <p className={styles.questionNote}>ہاسٹل اور ذاتی خرچ اس رقم میں شامل نہیں۔</p>
              <div className={styles.optionGrid}>
                {budgetOptions.map((option) => (
                  <button
                    type="button"
                    className={answers.budget === option.key ? styles.selectedOption : ""}
                    key={option.key}
                    onClick={() => setAnswers((current) => ({ ...current, budget: option.key }))}
                    aria-pressed={answers.budget === option.key}
                  >
                    <strong>{option.label}</strong><span>{option.note}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend><MapPinned size={24} /> کیا آپ دوسرے شہر جاسکتے ہیں؟</legend>
              <p className={styles.questionNote}>ہاسٹل یا مستقل رہائش اختیار کرنے کی صورت کو ذہن میں رکھیں۔</p>
              <div className={styles.twoOptions}>
                <button
                  type="button"
                  className={answers.mobility === "move" ? styles.selectedOption : ""}
                  onClick={() => setAnswers((current) => ({ ...current, mobility: "move", city: null }))}
                  aria-pressed={answers.mobility === "move"}
                >
                  <strong>ہاں، شہر بدل سکتا ہوں</strong><span>ملک بھر کی جامعات دکھائیں</span>
                </button>
                <button
                  type="button"
                  className={answers.mobility === "local" ? styles.selectedOption : ""}
                  onClick={() => setAnswers((current) => ({ ...current, mobility: "local" }))}
                  aria-pressed={answers.mobility === "local"}
                >
                  <strong>نہیں، اپنے شہر کے قریب</strong><span>مقام کو اہم سمجھیں</span>
                </button>
              </div>
              {answers.mobility === "local" && (
                <div className={styles.cityBox}>
                  <span>اپنا قریبی شہر منتخب کریں:</span>
                  <div className={styles.cityOptions}>
                    {cityOptions.map((option) => (
                      <button
                        type="button"
                        className={answers.city === option.key ? styles.selectedCity : ""}
                        key={option.key}
                        onClick={() => setAnswers((current) => ({ ...current, city: option.key }))}
                        aria-pressed={answers.city === option.key}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </fieldset>
          )}

          {step === 3 && (
            <fieldset>
              <legend><GraduationCap size={24} /> آپ کی موجودہ داخلہ تیاری؟</legend>
              <p className={styles.questionNote}>وہ جواب چنیں جو آج کی صورتِ حال کے زیادہ قریب ہے۔</p>
              <div className={styles.optionGrid}>
                {profileOptions.map((option) => (
                  <button
                    type="button"
                    className={answers.profile === option.key ? styles.selectedOption : ""}
                    key={option.key}
                    onClick={() => setAnswers((current) => ({ ...current, profile: option.key }))}
                    aria-pressed={answers.profile === option.key}
                  >
                    <strong>{option.label}</strong><span>{option.note}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          )}
        </div>

        <div className={styles.navigation}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            disabled={step === 0}
          >
            <ArrowRight size={18} /> پچھلا سوال
          </button>
          <span>سوال {step + 1} از 4</span>
          <button type="button" className={styles.nextButton} onClick={goNext} disabled={!isStepComplete}>
            {step === 3 ? "میری شارٹ لسٹ بنائیں" : "اگلا سوال"} <ArrowLeft size={18} />
          </button>
        </div>
      </section>
    </main>
  );
}

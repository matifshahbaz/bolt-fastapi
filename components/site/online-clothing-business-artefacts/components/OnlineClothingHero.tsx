"use client";

import styles from "./OnlineClothingHero.module.css";

type IconName =
  | "factory"
  | "fabric"
  | "suit"
  | "check"
  | "package"
  | "truck"
  | "return"
  | "coins"
  | "clock"
  | "calculator"
  | "decision";

const operations: Array<{ icon: IconName; label: string }> = [
  { icon: "factory", label: "سپلائر" },
  { icon: "fabric", label: "کپڑا" },
  { icon: "suit", label: "تیار سوٹ" },
  { icon: "check", label: "اسٹاک" },
  { icon: "package", label: "پارسل" },
  { icon: "truck", label: "کورئیر" },
  { icon: "return", label: "واپسی" },
];

const realities: Array<{ icon: IconName; label: string }> = [
  { icon: "coins", label: "COD" },
  { icon: "clock", label: "انتظار" },
  { icon: "calculator", label: "حساب" },
  { icon: "decision", label: "فیصلہ" },
];

function Icon({ name }: { name: IconName }) {
  const common = {
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  switch (name) {
    case "factory":
      return (
        <svg {...common}>
          <path d="M8 54V27l15-8v11l15-10v10l18-9v33H8Z" fill="currentColor" opacity=".22" />
          <path d="M8 54V27l15-8v11l15-10v10l18-9v33H8Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M16 12h8v13M44 12h8v12M17 43h7M31 43h7M45 43h5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "fabric":
      return (
        <svg {...common}>
          <path d="M13 17c5-7 13-8 19-3l19 17c4 4 2 11-3 13L21 53c-7 2-13-4-10-10l8-17" fill="currentColor" opacity=".2" />
          <path d="M13 17c5-7 13-8 19-3l19 17c4 4 2 11-3 13L21 53c-7 2-13-4-10-10l8-17" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M20 20l27 23M16 30l20 17M29 13l22 20" stroke="currentColor" strokeWidth="2" opacity=".65" />
        </svg>
      );
    case "suit":
      return (
        <svg {...common}>
          <path d="m24 10 8 6 8-6 11 8-5 10v27H18V28l-5-10 11-8Z" fill="currentColor" opacity=".24" />
          <path d="m24 10 8 6 8-6 11 8-5 10v27H18V28l-5-10 11-8Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M28 14c0 7 8 7 8 0M32 19v29M25 26h14M25 35h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <rect x="13" y="10" width="38" height="46" rx="7" fill="currentColor" opacity=".18" />
          <rect x="13" y="10" width="38" height="46" rx="7" stroke="currentColor" strokeWidth="3" />
          <path d="m21 28 7 7 15-16M22 45h20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "package":
      return (
        <svg {...common}>
          <path d="m9 21 23-12 23 12v29L32 59 9 50V21Z" fill="currentColor" opacity=".2" />
          <path d="m9 21 23-12 23 12v29L32 59 9 50V21Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="m9 21 23 11 23-11M32 32v27M22 14l23 12v10" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common}>
          <path d="M7 18h31v28H7zM38 27h11l8 10v9H38z" fill="currentColor" opacity=".2" />
          <path d="M7 18h31v28H7zM38 27h11l8 10v9H38z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="18" cy="49" r="6" fill="currentColor" />
          <circle cx="49" cy="49" r="6" fill="currentColor" />
          <path d="M44 32v7h10" stroke="currentColor" strokeWidth="3" />
        </svg>
      );
    case "return":
      return (
        <svg {...common}>
          <path d="M18 18h27c8 0 13 6 13 14s-5 14-13 14H18" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="m24 9-9 9 9 9" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="24" y="28" width="20" height="20" rx="3" fill="currentColor" opacity=".25" />
        </svg>
      );
    case "coins":
      return (
        <svg {...common}>
          <ellipse cx="25" cy="46" rx="16" ry="7" fill="currentColor" opacity=".28" />
          <path d="M9 30v16c0 4 7 7 16 7s16-3 16-7V30" stroke="currentColor" strokeWidth="3" />
          <ellipse cx="25" cy="30" rx="16" ry="7" stroke="currentColor" strokeWidth="3" />
          <path d="M41 38c8 0 14 3 14 7s-6 7-14 7M44 14v14M38 18h9c4 0 4 6 0 6h-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="32" cy="34" r="23" fill="currentColor" opacity=".18" />
          <circle cx="32" cy="34" r="23" stroke="currentColor" strokeWidth="3" />
          <path d="M32 21v15l10 7M25 7h14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "calculator":
      return (
        <svg {...common}>
          <rect x="15" y="6" width="34" height="52" rx="6" fill="currentColor" opacity=".18" />
          <rect x="15" y="6" width="34" height="52" rx="6" stroke="currentColor" strokeWidth="3" />
          <rect x="21" y="13" width="22" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
          {[28, 38, 48].flatMap((y) => [23, 32, 41].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" fill="currentColor" />))}
        </svg>
      );
    case "decision":
      return (
        <svg {...common}>
          <path d="M32 57V19M32 27 14 12M32 27l18-15" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m14 12 1 11M14 12l11 1M50 12l-1 11M50 12l-11 1" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
  }
}

function ProductSuit() {
  return (
    <svg className={styles.productSuit} viewBox="0 0 280 340" role="img" aria-label="خواتین کا سلا ہوا جامنی سوٹ">
      <defs>
        <linearGradient id="fabricTone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7b3aa1" />
          <stop offset="1" stopColor="#351346" />
        </linearGradient>
        <filter id="suitShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodOpacity=".22" />
        </filter>
      </defs>
      <g filter="url(#suitShadow)">
        <path d="M79 38 112 18c10 17 46 17 56 0l33 20 38 51-31 25-13-21v210H85V93l-13 21-31-25 38-51Z" fill="url(#fabricTone)" />
        <path d="M112 18c4 29 52 29 56 0M140 42v185" stroke="#f1b84a" strokeWidth="8" fill="none" />
        <path d="M111 53c14 9 44 9 58 0M104 74h72M104 96h72" stroke="#f1b84a" strokeWidth="4" strokeLinecap="round" />
        <path d="M102 130h76M102 159h76M102 188h76" stroke="#d99b31" strokeWidth="3" strokeDasharray="4 8" opacity=".72" />
        <path d="M85 270h110" stroke="#f1b84a" strokeWidth="7" />
      </g>
    </svg>
  );
}

export default function OnlineClothingHero() {
  return (
    <section className={styles.hero} dir="rtl" aria-labelledby="clothing-hero-title">
      <div className={styles.topLayer}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>آن لائن کاروبار گائیڈ</span>
          <h1 id="clothing-hero-title">آن لائن کپڑوں کے کاروبار کی اصل کہانی</h1>
          <p>جو لائکس میں نظر نہیں آتی</p>
        </div>

        <div className={styles.showcase} aria-label="موبائل پر نظر آنے والی آن لائن دکان">
          <span className={`${styles.signal} ${styles.signalHeart}`} aria-label="لائکس">♥</span>
          <span className={`${styles.signal} ${styles.signalStars}`} aria-label="تعریف">★★★★★</span>
          <span className={`${styles.signal} ${styles.signalQuestion}`} aria-label="قیمت کا سوال">؟</span>
          <span className={`${styles.signal} ${styles.signalCheck}`} aria-label="آرڈر کی تصدیق">✓</span>

          <div className={styles.phone}>
            <div className={styles.phoneSpeaker} />
            <div className={styles.phoneScreen}>
              <ProductSuit />
              <div className={styles.productMeta}>
                <i />
                <i />
                <b>Rs.</b>
              </div>
            </div>
          </div>
          <div className={styles.phoneGlow} />
        </div>
      </div>

      <svg className={styles.waterline} viewBox="0 0 1600 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 42C155 9 260 73 421 39c174-37 272 32 450 3 193-31 282 25 427-2 127-24 206-9 302 2v38H0V42Z" />
      </svg>

      <div className={styles.hiddenLayer}>
        <div className={styles.iceberg} aria-hidden="true" />

        <div className={styles.operationFlow} aria-label="کاروبار کے پس منظر میں ہونے والے کام">
          {operations.map((item, index) => (
            <div className={styles.operationItem} key={item.label}>
              <span className={styles.node}><Icon name={item.icon} /></span>
              <span className={styles.nodeLabel}>{item.label}</span>
              {index < operations.length - 1 && <span className={styles.connector} aria-hidden="true">←</span>}
            </div>
          ))}
        </div>

        <div className={styles.realityRow} aria-label="وہ حقیقتیں جو لائکس میں دکھائی نہیں دیتیں">
          {realities.map((item) => (
            <div className={styles.realityItem} key={item.label}>
              <span className={styles.realityIcon}><Icon name={item.icon} /></span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.brand}><span aria-hidden="true">◈</span> shama.pk</div>
      </div>
    </section>
  );
}


import { useId } from "react";
import styles from "./UniversityClassSizeSpectrum.module.css";
import {
  universityClassSizes,
  type SpectrumZone,
  type UniversityClassSize,
} from "./classSizeSpectrumData";

type UniversityClassSizeSpectrumProps = {
  className?: string;
  showBrand?: boolean;
  showNote?: boolean;
};

const zoneColors: Record<
  SpectrumZone,
  { main: string; light: string; dark: string; glow: string }
> = {
  network: {
    main: "#F2C35B",
    light: "#FFE7A5",
    dark: "#3D2D18",
    glow: "#D9A72D",
  },
  balanced: {
    main: "#6189FF",
    light: "#B6C8FF",
    dark: "#101E5C",
    glow: "#4169F3",
  },
  attention: {
    main: "#43E0CE",
    light: "#93FFF2",
    dark: "#06293E",
    glow: "#1ED4CA",
  },
};

function SpectrumNode({
  item,
  idPrefix,
}: {
  item: UniversityClassSize;
  idPrefix: string;
}) {
  const colors = zoneColors[item.zone];
  const labelX =
    item.labelSide === "left"
      ? item.x - item.radius - 58
      : Math.min(1950, item.x + 760);
  const lineStart =
    item.labelSide === "left"
      ? item.x - item.radius
      : item.x + item.radius;
  const lineEnd =
    item.labelSide === "left" ? labelX - 395 : labelX - 480;

  return (
    <g>
      <line
        className={styles.leader}
        x1={Math.min(lineStart, lineEnd)}
        y1={item.y}
        x2={Math.max(lineStart, lineEnd)}
        y2={item.y}
        stroke={colors.main}
      />
      <circle
        cx={item.x}
        cy={item.y}
        r={item.radius + 20}
        fill={colors.glow}
        opacity="0.09"
        filter={`url(#${idPrefix}-soft-glow)`}
      />
      <circle
        cx={item.x}
        cy={item.y}
        r={item.radius}
        fill={`url(#${idPrefix}-${item.zone}-node)`}
        stroke={colors.main}
        strokeWidth="4"
      />
      <circle
        cx={item.x - item.radius * 0.24}
        cy={item.y - item.radius * 0.27}
        r={Math.round(item.radius * 0.17)}
        fill={colors.light}
        opacity="0.22"
      />
      <text
        className={styles.range}
        x={item.x}
        y={item.y + 12}
        textAnchor="middle"
      >
        {item.range}
      </text>
      <text
        className={styles.universityName}
        x={labelX}
        y={item.y + 9}
        textAnchor="start"
        direction="rtl"
        style={{ unicodeBidi: "plaintext" }}
      >
        {item.name}
      </text>
    </g>
  );
}

export function UniversityClassSizeSpectrum({
  className = "",
  showBrand = true,
  showNote = true,
}: UniversityClassSizeSpectrumProps) {
  const rawId = useId();
  const idPrefix = `class-spectrum-${rawId.replace(/:/g, "")}`;

  return (
    <figure
      className={`${styles.figure} ${className}`.trim()}
      dir="rtl"
      aria-label="پاکستان کی ٹاپ 10 یونیورسٹیوں میں کلاس سائز، ذاتی توجہ اور نیٹ ورک کا تقابلی سپیکٹرم"
    >
      <svg
        className={styles.visual}
        viewBox="0 0 2160 2700"
        role="img"
        aria-labelledby={`${idPrefix}-title ${idPrefix}-description`}
      >
        <title id={`${idPrefix}-title`}>چھوٹی کلاس یا بڑا نیٹ ورک؟</title>
        <desc id={`${idPrefix}-description`}>
          بڑی کلاس اور بڑا نیٹ ورک اوپر سے شروع ہو کر چھوٹی کلاس اور زیادہ
          ذاتی توجہ کی طرف نیچے جاتا ہے۔
        </desc>

        <defs>
          <linearGradient id={`${idPrefix}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#061F54" />
            <stop offset="0.52" stopColor="#06153A" />
            <stop offset="1" stopColor="#020A20" />
          </linearGradient>
          <radialGradient id={`${idPrefix}-top-glow`} cx="83%" cy="15%" r="55%">
            <stop offset="0" stopColor="#174AA0" stopOpacity="0.48" />
            <stop offset="1" stopColor="#06153A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${idPrefix}-bottom-glow`} cx="12%" cy="82%" r="48%">
            <stop offset="0" stopColor="#0B6170" stopOpacity="0.20" />
            <stop offset="1" stopColor="#06153A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${idPrefix}-spectrum`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F2C35B" />
            <stop offset="0.49" stopColor="#6189FF" />
            <stop offset="1" stopColor="#43E0CE" />
          </linearGradient>
          <radialGradient id={`${idPrefix}-network-node`} cx="35%" cy="25%" r="80%">
            <stop offset="0" stopColor="#A77927" />
            <stop offset="1" stopColor="#3D2D18" />
          </radialGradient>
          <radialGradient id={`${idPrefix}-balanced-node`} cx="35%" cy="25%" r="80%">
            <stop offset="0" stopColor="#375FD8" />
            <stop offset="1" stopColor="#101E5C" />
          </radialGradient>
          <radialGradient id={`${idPrefix}-attention-node`} cx="35%" cy="25%" r="80%">
            <stop offset="0" stopColor="#138E99" />
            <stop offset="1" stopColor="#06293E" />
          </radialGradient>
          <filter id={`${idPrefix}-soft-glow`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="20" />
          </filter>
          <filter id={`${idPrefix}-line-glow`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`${idPrefix}-text-shadow`} x="-20%" y="-30%" width="140%" height="170%">
            <feDropShadow dx="0" dy="9" stdDeviation="8" floodColor="#010716" floodOpacity="0.62" />
          </filter>
          <pattern id={`${idPrefix}-dots`} width="34" height="34" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="2.3" fill="#56CFE1" opacity="0.22" />
          </pattern>
        </defs>

        <rect width="2160" height="2700" fill={`url(#${idPrefix}-bg)`} />
        <rect width="2160" height="2700" fill={`url(#${idPrefix}-top-glow)`} />
        <rect width="2160" height="2700" fill={`url(#${idPrefix}-bottom-glow)`} />
        <rect x="1530" y="75" width="520" height="330" fill={`url(#${idPrefix}-dots)`} opacity="0.72" />
        <rect x="40" y="2090" width="520" height="370" fill={`url(#${idPrefix}-dots)`} opacity="0.42" />

        <path className={styles.decorativeArc} d="M-120 475 C410 110 1070 120 1500 500 S2310 905 2240 220" />
        <path className={styles.decorativeArcAqua} d="M-60 520 C470 180 1020 215 1450 560 S2200 915 2230 310" />
        <path className={styles.decorativeArc} d="M70 2530 C510 2330 840 2410 1200 2645" />

        <g filter={`url(#${idPrefix}-text-shadow)`}>
          <text className={styles.heading} x="1960" y="235" textAnchor="start" direction="rtl">
            چھوٹی کلاس یا بڑا نیٹ ورک؟
          </text>
        </g>
        <text className={styles.subtitle} x="1960" y="380" textAnchor="start" direction="rtl">
          پاکستان کی ٹاپ 10 یونیورسٹیوں کا تعلیمی ماحول
        </text>
        <line className={styles.headerRule} x1="325" y1="455" x2="1960" y2="455" />

        <text className={`${styles.zoneLabel} ${styles.attentionText}`} x="1920" y="590" textAnchor="start" direction="rtl">
          زیادہ ذاتی توجہ
        </text>
        <text className={`${styles.zoneLabel} ${styles.balancedText}`} x="1250" y="590" textAnchor="start" direction="rtl">
          متوازن ماحول
        </text>
        <text className={`${styles.zoneLabel} ${styles.networkText}`} x="545" y="590" textAnchor="start" direction="rtl">
          بڑا نیٹ ورک
        </text>

        <path className={styles.zoneLine} d="M1890 635 H370" />
        <path d="M370 635 l40 -22 v44 z" fill="#F2C35B" />
        <circle cx="1890" cy="635" r="11" fill="#43E0CE" />
        <circle cx="1130" cy="635" r="11" fill="#6189FF" />

        <path
          className={styles.pathShadow}
          d="M310 805 C350 870 405 935 455 990 S550 1120 605 1175 S700 1295 760 1355 S880 1470 940 1535 S1060 1655 1130 1715 S1260 1830 1325 1895 S1450 2005 1515 2075 S1625 2190 1685 2255 S1790 2370 1810 2440"
        />
        <path
          className={styles.pathGlow}
          d="M310 805 C350 870 405 935 455 990 S550 1120 605 1175 S700 1295 760 1355 S880 1470 940 1535 S1060 1655 1130 1715 S1260 1830 1325 1895 S1450 2005 1515 2075 S1625 2190 1685 2255 S1790 2370 1810 2440"
          stroke={`url(#${idPrefix}-spectrum)`}
          filter={`url(#${idPrefix}-line-glow)`}
        />

        {universityClassSizes.map((item) => (
          <SpectrumNode key={item.name} item={item} idPrefix={idPrefix} />
        ))}

        {showBrand && (
          <g transform="translate(117 2565)" aria-label="shama.pk">
            <circle cx="0" cy="0" r="27" fill="none" stroke="#43E0CE" strokeWidth="3" />
            <path
              d="M-14 0h28M0-14c7 7 7 21 0 28M0-14c-7 7-7 21 0 28M-22-10c14 7 30 7 44 0M-22 10c14-7 30-7 44 0"
              fill="none"
              stroke="#43E0CE"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <text className={styles.brand} x="48" y="12" textAnchor="start">
              shama.pk
            </text>
          </g>
        )}

        {showNote && (
          <text className={styles.note} x="2015" y="2585" textAnchor="start" direction="rtl">
            کلاس سائز تخمینی ہیں؛ پروگرام اور کیمپس کے مطابق فرق ہو سکتا ہے۔
          </text>
        )}
      </svg>
    </figure>
  );
}

export default UniversityClassSizeSpectrum;


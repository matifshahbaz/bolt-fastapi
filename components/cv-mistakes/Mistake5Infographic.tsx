'use client';

/**
 * Mistake5Infographic — "پانچویں غلطی: CV کی پریزنٹیشن کو نظر انداز کرنا"
 * shama.pk
 *
 * A self-contained, dependency-free React + TypeScript infographic.
 * Designed at 1080 × 1920 and scaled to fit its container, so it stays
 * pixel-faithful at any width.
 *
 * ── Usage ────────────────────────────────────────────────────────────────
 *   import Mistake5Infographic from "./Mistake5Infographic";
 *   <Mistake5Infographic />                       // fluid, fills parent
 *   <Mistake5Infographic width={1080} />          // fixed width
 *   <Mistake5Infographic content={{ title: "…" }} />  // override any text
 *
 * ── Fonts ────────────────────────────────────────────────────────────────
 * The component injects its own Google Fonts <link>. To self-host instead,
 * set loadFonts={false} and make these families available:
 *   Noto Nastaliq Urdu · Noto Naskh Arabic · Inter
 *
 * ── Export as an image ───────────────────────────────────────────────────
 * Render at width={1080} and screenshot the root node (Playwright/Puppeteer
 * at deviceScaleFactor 2 gives the 2160 × 3840 asset).
 */

import React, { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════════════════════════════════════
   TOKENS — change these to rebrand. All values validated for colour-blind
   separation and contrast against the #FBFAF8 surface.
   ══════════════════════════════════════════════════════════════════════════ */

export const tokens = {
  brand: "#4F46E5",
  brandDeep: "#312E81",
  accent: "#F59E0B",
  ok: "#0D9488",
  bad: "#E11D48",
  surface: "#FBFAF8",
  card: "#FFFFFF",
  ink: "#111014",
  ink2: "#57545F",
  muted: "#8B8794",
  line: "rgba(17,16,20,0.09)",
  hair: "rgba(17,16,20,0.11)",
  paper: "#DFDDD8",
  paperDim: "#D6D3CE",
  paperDense: "#CFCCC6",
  fontUrdu: '"Jameel Noori Nastaleeq","Noto Naskh Arabic","Noto Sans Arabic",serif',
  fontNastaliq: '"Jameel Noori Nastaleeq","Noto Nastaliq Urdu",serif',
  fontLatin: '"Inter",system-ui,sans-serif',
} as const;

const DESIGN_W = 1080;
const DESIGN_H = 1920;

/* ══════════════════════════════════════════════════════════════════════════
   CONTENT — every string in one place
   ══════════════════════════════════════════════════════════════════════════ */

export interface BadCv {
  /** which mock layout to draw */
  kind: "colourful" | "sparse" | "crammed";
  label: string;
  note: string;
}

export interface LengthCard {
  pages: number;
  title: string;
  note: string;
  state: "ok" | "bad" | "neutral";
}

export interface Mistake5Content {
  eyebrow: string;
  title: string;
  subtitle: string;
  bandWrong: string;
  bandRight: string;
  bandRightEm: string;
  bandLength: string;
  badCvs: BadCv[];
  questions: string[];
  goodLabel: string;
  goodStamp: string;
  lengths: LengthCard[];
  quoteLine1: string;
  quoteLine2: string;
  footNote: string;
  brand: string;
}

export const defaultContent: Mistake5Content = {
  eyebrow: "shama.pk · career · غلطی 05",
  title: "CV دیکھی پہلے جاتی ہے، پڑھی بعد میں",
  subtitle:
    "پریزنٹیشن کو نظر انداز کرنا — پانچویں اور سب سے زیادہ نظر آنے والی غلطی",
  bandWrong: "دو انتہائیں — اور ایک تیسری خرابی",
  bandRight: "درست CV — ",
  bandRightEm: "پانچ سیکنڈ میں پانچ جواب",
  bandLength: "لمبائی — کتنے صفحے؟",
  badCvs: [
    {
      kind: "colourful",
      label: "بہت رنگ برنگی",
      note: "اصل معلومات رنگوں میں گم ہو جاتی ہیں",
    },
    {
      kind: "sparse",
      label: "خشک اور آدھا صفحہ خالی",
      note: "نہ عنوان، نہ ترتیب — دیکھ کر ہی دلچسپی ختم",
    },
    {
      kind: "crammed",
      label: "سانس لینے کی جگہ نہیں",
      note: "اتنی بھری ہوئی کہ نظر کہیں ٹھہرتی نہیں",
    },
  ],
  questions: [
    "کتنے سال کا تجربہ ہے؟",
    "موجودہ ملازمت کیا ہے؟",
    "ابھی جاب کر رہا ہے یا دستیاب ہے؟",
    "کس شہر میں رہتا ہے؟",
    "بنیادی مہارتیں کیا ہیں؟",
  ],
  goodLabel: "سادہ، متوازن، پروفیشنل",
  goodStamp: "CLEAN · BALANCED",
  lengths: [
    { pages: 1, title: "1 صفحہ", note: "نیا گریجویٹ، تجربہ نہیں", state: "neutral" },
    { pages: 2, title: "2 صفحات ✓", note: "زیادہ تر امیدواروں کے لیے بہترین", state: "ok" },
    { pages: 4, title: "4–5 صفحات ✕", note: "متاثر نہیں کرتا — تھکا دیتا ہے", state: "bad" },
  ],
  quoteLine1: "آپ کی CV کمپنی کو بتاتی ہے کہ آپ اپنے کام میں",
  quoteLine2: "نفاست کا کتنا خیال رکھتے ہیں۔",
  footNote: "ہائرنگ مینیجر کے پاس وقت کم اور امیدوار زیادہ ہوتے ہیں۔",
  brand: "shama.pk",
};

/* ══════════════════════════════════════════════════════════════════════════
   SMALL PARTS
   ══════════════════════════════════════════════════════════════════════════ */

/** One grey "line of text" inside a mock CV page. */
function Line({
  w,
  className = "",
}: {
  w: number | string;
  className?: string;
}): React.JSX.Element {
  return <div className={`m5-l ${className}`} style={{ width: typeof w === "number" ? `${w}%` : w }} />;
}

function Band({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <div className="m5-band">{children}</div>;
}

/* ── the three wrong CV mocks ─────────────────────────────────────────── */

const COLOUR_BLOCKS: readonly string[][] = [
  [tokens.brand, tokens.ok, tokens.accent, tokens.bad, tokens.brand],
  [tokens.accent, tokens.bad, tokens.brand, tokens.ok, tokens.accent],
];

function ColourfulCv(): React.JSX.Element {
  return (
    <div className="m5-pg m5-cA">
      <div className="m5-topband" />
      <div className="m5-circ" />
      <div style={{ height: 34 }} />
      <div className="m5-cols">
        {COLOUR_BLOCKS.map((col, i) => (
          <div className="m5-cl" key={i}>
            {col.map((c, j) => (
              <div className="m5-blk" key={j} style={{ background: c }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SparseCv(): React.JSX.Element {
  const widths = [100, 100, 100, 100, 100, 100, 100, 72];
  return (
    <div className="m5-pg m5-cB">
      {widths.map((w, i) => (
        <Line w={w} key={i} />
      ))}
    </div>
  );
}

function CrammedCv(): React.JSX.Element {
  // 40 tightly packed lines — deliberately claustrophobic
  const widths = Array.from({ length: 40 }, (_, i) => [100, 97, 99, 95, 98, 96, 94][i % 7]);
  return (
    <div className="m5-pg m5-cC">
      {widths.map((w, i) => (
        <Line w={w} key={i} />
      ))}
    </div>
  );
}

const BAD_MOCKS: Record<BadCv["kind"], () => React.JSX.Element> = {
  colourful: ColourfulCv,
  sparse: SparseCv,
  crammed: CrammedCv,
};

/* ── the correct CV mock ──────────────────────────────────────────────── */

/** Section body line-widths, kept deliberately consistent so the page reads tidy. */
const GOOD_SECTIONS: readonly number[][] = [
  [100, 76],
  [100, 76],
  [100, 76],
  [100],
  [100, 76],
];

function GoodCv({ stamp }: { stamp: string }): React.JSX.Element {
  return (
    <div className="m5-pg m5-good">
      <div className="m5-gname" />
      <div className="m5-grole" />
      <div className="m5-gmeta" />
      <div className="m5-gdiv" />
      {GOOD_SECTIONS.map((lines, i) => (
        <div className="m5-sec" key={i}>
          <div className="m5-ghd">
            <span className="m5-p">{i + 1}</span>
            <span className="m5-b" />
          </div>
          {lines.map((w, j) => (
            <Line w={w} key={j} />
          ))}
        </div>
      ))}
      <div className="m5-stamp">{stamp}</div>
    </div>
  );
}

/* ── page-count stacks ────────────────────────────────────────────────── */

const STACK_HEIGHTS: Record<number, number[]> = {
  1: [78],
  2: [70, 82],
  4: [58, 66, 74, 82],
};

function PageStack({ pages }: { pages: number }): React.JSX.Element {
  const heights = STACK_HEIGHTS[pages] ?? [78];
  return (
    <div className="m5-stack">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`m5-sh ${i < heights.length - 1 ? "m5-sh-a" : ""}`}
          style={{ height: h }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */

export interface Mistake5InfographicProps {
  /** Fixed render width in px. Omit to fill the parent element. */
  width?: number;
  /** Override any subset of the copy. */
  content?: Partial<Mistake5Content>;
  /** Inject the Google Fonts <link>. Set false if self-hosting. Default true. */
  loadFonts?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Mistake5Infographic({
  width,
  content,
  loadFonts = true,
  className = "",
  style,
}: Mistake5InfographicProps): React.JSX.Element {
  const c: Mistake5Content = { ...defaultContent, ...content };
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(width ? width / DESIGN_W : 1);

  // Scale the fixed 1080×1920 design to whatever width it is given.
  useEffect(() => {
    if (width) {
      setScale(width / DESIGN_W);
      return;
    }
    const el = hostRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? DESIGN_W;
      setScale(w / DESIGN_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  useEffect(() => {
    if (!loadFonts || typeof document === "undefined") return;
    const HREF =
      "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Inter:wght@600;700;800&display=swap";
    if (document.querySelector(`link[href="${HREF}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = HREF;
    document.head.appendChild(link);
  }, [loadFonts]);

  useEffect(() => {
    if (typeof document === "undefined" || document.querySelector('style[data-cv-mistakes-infographic]')) return;
    const style = document.createElement('style');
    style.dataset.cvMistakesInfographic = 'true';
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div
      ref={hostRef}
      className={`m5-host ${className}`}
      style={{
        width: width ?? "100%",
        height: DESIGN_H * scale,
        ...style,
      }}
    >
      <div
        className="m5-root"
        dir="rtl"
        lang="ur"
        style={{ transform: `scale(${scale})` }}
      >
        {/* ── header ─────────────────────────────────────────────── */}
        <div className="m5-eyebrow">
          <span className="m5-dot" />
          <span>{c.eyebrow}</span>
        </div>
        <h2 className="m5-h1">{c.title}</h2>
        <p className="m5-sub">{c.subtitle}</p>

        {/* ── three failure modes ────────────────────────────────── */}
        <Band>
          <span>{c.bandWrong}</span>
        </Band>

        <div className="m5-row3">
          {c.badCvs.map((cv) => {
            const Mock = BAD_MOCKS[cv.kind];
            return (
              <div className="m5-cell" key={cv.kind}>
                <Mock />
                <div className="m5-xlab">
                  <i>✕</i> {cv.label}
                </div>
                <div className="m5-xnote">{cv.note}</div>
              </div>
            );
          })}
        </div>

        {/* ── the correct CV + five questions ────────────────────── */}
        <Band>
          <span>
            {c.bandRight}
            <u>{c.bandRightEm}</u>
          </span>
        </Band>

        <div className="m5-good-wrap">
          <div className="m5-qs">
            {c.questions.map((q, i) => (
              <div className="m5-q" key={i}>
                <span className="m5-qn">{i + 1}</span>
                <span className="m5-qt">{q}</span>
              </div>
            ))}
          </div>
          <div className="m5-goodcol">
            <GoodCv stamp={c.goodStamp} />
            <div className="m5-glab">✓ {c.goodLabel}</div>
          </div>
        </div>

        {/* ── length ─────────────────────────────────────────────── */}
        <Band>
          <span>{c.bandLength}</span>
        </Band>

        <div className="m5-len">
          {c.lengths.map((l) => (
            <div className={`m5-lc ${l.state === "ok" ? "m5-lc-ok" : ""}`} key={l.pages}>
              <PageStack pages={l.pages} />
              <div
                className="m5-lt"
                style={
                  l.state === "ok"
                    ? { color: tokens.ok }
                    : l.state === "bad"
                      ? { color: tokens.bad }
                      : undefined
                }
              >
                {l.title}
              </div>
              <div className="m5-ls">{l.note}</div>
            </div>
          ))}
        </div>

        {/* ── footer ─────────────────────────────────────────────── */}
        <div className="m5-foot">
          <div className="m5-quote">
            <p>
              {c.quoteLine1}
              <br />
              <b>{c.quoteLine2}</b>
            </p>
          </div>
          <div className="m5-cap">
            <span className="m5-cl">{c.footNote}</span>
            <span className="m5-cb">{c.brand}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   STYLES — every selector prefixed m5- so nothing leaks into your app
   ══════════════════════════════════════════════════════════════════════════ */

const CSS = `
.m5-host{position:relative;overflow:hidden}
.m5-root{
  width:${DESIGN_W}px;height:${DESIGN_H}px;
  transform-origin:top right;
  position:absolute;top:0;right:0;
  background:${tokens.surface};
  font-family:${tokens.fontUrdu};
  color:${tokens.ink};
  -webkit-font-smoothing:antialiased;
  display:flex;flex-direction:column;
  padding:54px 56px 40px;
  box-sizing:border-box;
}
.m5-root *{margin:0;padding:0;box-sizing:border-box}

/* header */
.m5-eyebrow{display:flex;align-items:center;gap:11px;margin-bottom:18px}
.m5-dot{width:9px;height:9px;border-radius:50%;background:${tokens.accent};flex:none}
.m5-eyebrow span{font-family:${tokens.fontLatin};direction:ltr;font-size:18px;font-weight:700;
  letter-spacing:.17em;text-transform:uppercase;color:${tokens.muted}}
.m5-h1{font-family:${tokens.fontNastaliq};font-size:52px;line-height:1.9;font-weight:700}
.m5-sub{font-size:25px;color:${tokens.ink2};line-height:1.7;margin-top:12px}

/* section band */
.m5-band{font-family:${tokens.fontLatin};direction:ltr;text-align:right;font-size:15px;
  font-weight:700;letter-spacing:.17em;text-transform:uppercase;color:${tokens.muted};
  display:flex;align-items:center;gap:14px;margin:34px 0 20px}
.m5-band::after{content:"";flex:1;height:1px;background:${tokens.hair}}
.m5-band u{text-decoration:none;color:${tokens.brand}}

/* mock page shell */
.m5-pg{background:${tokens.card};border-radius:9px;box-shadow:0 2px 10px rgba(17,16,20,.07);
  border:1px solid ${tokens.line};padding:14px;position:relative;overflow:hidden}
.m5-l{height:5px;border-radius:3px;background:${tokens.paper};margin-bottom:6px}

/* three wrong */
.m5-row3{display:flex;gap:22px}
.m5-cell{flex:1}
.m5-cell .m5-pg{height:340px}
.m5-xlab{display:flex;align-items:center;gap:8px;margin-top:14px;
  font-size:21px;font-weight:700;color:${tokens.bad};line-height:1.5}
.m5-xlab i{font-style:normal;font-family:${tokens.fontLatin};font-size:19px;font-weight:800}
.m5-xnote{font-size:17px;color:${tokens.muted};line-height:1.6;margin-top:3px}

.m5-topband{height:34px;border-radius:6px;background:${tokens.bad};margin-bottom:8px}
.m5-circ{width:52px;height:52px;border-radius:50%;background:${tokens.accent};
  position:absolute;top:56px;left:16px;border:3px solid ${tokens.card}}
.m5-cols{display:flex;gap:7px;margin-top:8px}
.m5-cl{flex:1}
.m5-blk{height:26px;border-radius:5px;margin-bottom:7px}

.m5-cB .m5-l{background:${tokens.paperDim};height:6px;margin-bottom:13px}
.m5-cC{padding:9px}
.m5-cC .m5-l{height:4px;margin-bottom:3px;background:${tokens.paperDense}}

/* correct CV + questions */
.m5-good-wrap{display:flex;gap:30px;align-items:stretch}
.m5-qs{flex:1;display:flex;flex-direction:column;gap:11px;justify-content:center}
.m5-q{display:flex;align-items:center;gap:15px;background:${tokens.card};
  border:1px solid ${tokens.line};border-radius:12px;padding:13px 17px}
.m5-qn{width:32px;height:32px;flex:none;border-radius:9px;background:${tokens.brand};color:#fff;
  font-family:${tokens.fontLatin};font-size:17px;font-weight:800;
  display:flex;align-items:center;justify-content:center}
.m5-qt{font-size:21px;font-weight:600;line-height:1.55}
.m5-goodcol{width:352px;flex:none}
.m5-good{height:472px;padding:20px;border:2px solid ${tokens.ok};
  box-shadow:0 0 0 5px rgba(13,148,136,.10),0 4px 16px rgba(17,16,20,.08)}
.m5-gname{height:14px;width:58%;border-radius:4px;background:${tokens.brandDeep};margin-bottom:8px}
.m5-grole{height:8px;width:40%;border-radius:4px;background:${tokens.ok};margin-bottom:7px}
.m5-gmeta{height:5px;width:66%;border-radius:3px;background:${tokens.paper}}
.m5-gdiv{height:1px;background:rgba(17,16,20,.10);margin:16px 0 4px}
.m5-sec{margin-top:15px}
.m5-sec .m5-l{margin-bottom:6px}
.m5-ghd{display:flex;align-items:center;gap:8px;margin-bottom:9px}
.m5-p{width:19px;height:19px;border-radius:6px;background:${tokens.brand};color:#fff;flex:none;
  font-family:${tokens.fontLatin};font-size:11px;font-weight:800;
  display:flex;align-items:center;justify-content:center}
.m5-b{height:7px;width:88px;border-radius:4px;background:#A8A5A0}
.m5-stamp{position:absolute;bottom:14px;left:16px;font-family:${tokens.fontLatin};
  font-size:13px;font-weight:800;color:${tokens.ok};letter-spacing:.08em}
.m5-glab{display:flex;align-items:center;gap:8px;margin-top:14px;justify-content:center;
  font-size:21px;font-weight:700;color:${tokens.ok}}

/* length */
.m5-len{display:flex;gap:22px}
.m5-lc{flex:1;background:${tokens.card};border:1px solid ${tokens.line};border-radius:14px;
  padding:18px 16px 16px;text-align:center}
.m5-lc-ok{border-color:rgba(13,148,136,.35);background:rgba(13,148,136,.04)}
.m5-stack{height:96px;display:flex;align-items:flex-end;justify-content:center;gap:5px;margin-bottom:13px}
.m5-sh{width:44px;background:${tokens.card};border:1px solid rgba(17,16,20,.16);border-radius:4px}
.m5-sh-a{background:#EFEEEA}
.m5-lt{font-size:22px;font-weight:700;line-height:1.5}
.m5-ls{font-size:17px;color:${tokens.muted};margin-top:3px;line-height:1.55}

/* footer */
.m5-foot{margin-top:auto;padding-top:30px}
.m5-quote{border-right:5px solid ${tokens.brand};padding:2px 24px 2px 0;margin-bottom:24px}
.m5-quote p{font-size:31px;line-height:1.72;font-weight:600}
.m5-cap{display:flex;justify-content:space-between;align-items:center;gap:30px;
  padding-top:22px;border-top:1px solid ${tokens.hair}}
.m5-cl{font-size:20px;color:${tokens.muted};line-height:1.6;flex:1}
.m5-cb{font-family:${tokens.fontLatin};direction:ltr;font-size:25px;font-weight:800;
  color:${tokens.brand};letter-spacing:-.02em;flex:none}
`;

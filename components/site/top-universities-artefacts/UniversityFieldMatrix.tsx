"use client";

/**
 * UniversityFieldMatrix — پاکستان کی ٹاپ 10 یونیورسٹیاں
 * shama.pk · اگست 2026
 *
 * Self-contained. No dependencies beyond React. Drop it in and render <UniversityFieldMatrix />.
 *
 * FONT — Jameel Noori Nastaleeq
 * Renders immediately for anyone who has the font installed (via local()).
 * To serve it to every reader, host the file yourself and fix the url() in FONT_CSS below.
 * Falls back to Noto Nastaliq Urdu, so it stays Nastaliq either way.
 *
 * COLOUR — every value here passed a contrast + colour-blindness validator in both
 * light and dark mode. Hue = city, depth = first vs second choice, and the numeral
 * carries the same information for anyone who can't separate the colours.
 */

import { useState, useCallback } from 'react';

/* ────────────────────────────────────────────────────────────────────────── */
/* Types                                                                      */
/* ────────────────────────────────────────────────────────────────────────── */

type CityKey = 'isb' | 'lhr' | 'khi';

interface University {
  /** QS World Ranking 2026 — position within Pakistan */
  rank: number;
  name: string;
  city: string;
  cityKey: CityKey;
}

interface Field {
  /** Column heading, \n renders as a line break */
  label: string;
  /** Full name, used in the tooltip */
  full: string;
  first: string[];
  second: string[];
}

type Choice = 1 | 2 | null;

/* ────────────────────────────────────────────────────────────────────────── */
/* Data — sections 5.3, 10.1 and 10.3 of the article                          */
/* ────────────────────────────────────────────────────────────────────────── */

const UNIVERSITIES: University[] = [
  { rank: 1,  name: 'قائداعظم یونیورسٹی',  city: 'اسلام آباد', cityKey: 'isb' },
  { rank: 2,  name: 'نسٹ یونیورسٹی',        city: 'اسلام آباد', cityKey: 'isb' },
  { rank: 3,  name: 'پنجاب یونیورسٹی',      city: 'لاہور',      cityKey: 'lhr' },
  { rank: 4,  name: 'لمز یونیورسٹی',        city: 'لاہور',      cityKey: 'lhr' },
  { rank: 5,  name: 'PIEAS یونیورسٹی',      city: 'اسلام آباد', cityKey: 'isb' },
  { rank: 6,  name: 'کامسیٹس یونیورسٹی',    city: 'اسلام آباد', cityKey: 'isb' },
  { rank: 7,  name: 'جی سی یو یونیورسٹی',   city: 'لاہور',      cityKey: 'lhr' },
  { rank: 8,  name: 'آغا خان یونیورسٹی',    city: 'کراچی',      cityKey: 'khi' },
  { rank: 9,  name: 'یو ای ٹی یونیورسٹی',   city: 'لاہور',      cityKey: 'lhr' },
  { rank: 10, name: 'این ای ڈی یونیورسٹی',  city: 'کراچی',      cityKey: 'khi' },
];

const FIELDS: Field[] = [
  {
    label: 'کمپیوٹر سائنس\nاور سافٹ ویئر',
    full: 'کمپیوٹر سائنس اور سافٹ ویئر',
    first: ['نسٹ یونیورسٹی', 'کامسیٹس یونیورسٹی'],
    second: ['پنجاب یونیورسٹی', 'لمز یونیورسٹی'],
  },
  {
    label: 'سول اور\nمکینیکل',
    full: 'سول اور مکینیکل انجینئرنگ',
    first: ['یو ای ٹی یونیورسٹی', 'این ای ڈی یونیورسٹی'],
    second: ['نسٹ یونیورسٹی'],
  },
  {
    label: 'الیکٹریکل اور\nنیوکلیئر',
    full: 'الیکٹریکل اور نیوکلیئر',
    first: ['PIEAS یونیورسٹی', 'نسٹ یونیورسٹی'],
    second: ['کامسیٹس یونیورسٹی'],
  },
  {
    label: 'میڈیکل، نرسنگ\nاور فارمیسی',
    full: 'میڈیکل، نرسنگ، فارمیسی',
    first: ['آغا خان یونیورسٹی', 'قائداعظم یونیورسٹی'],
    second: ['پنجاب یونیورسٹی'],
  },
  {
    label: 'بزنس، اکنامکس\nاور لاء',
    full: 'بزنس، اکنامکس، لاء',
    first: ['لمز یونیورسٹی'],
    second: ['قائداعظم یونیورسٹی', 'پنجاب یونیورسٹی'],
  },
  {
    label: 'بیسک سائنس\nاور ادب',
    full: 'بیسک سائنس، ریاضی، ادب',
    first: ['قائداعظم یونیورسٹی', 'جی سی یو یونیورسٹی'],
    second: ['پنجاب یونیورسٹی'],
  },
];

const CHOICE_LABEL: Record<Exclude<Choice, null>, string> = {
  1: 'پہلی ترجیح',
  2: 'دوسری ترجیح',
};

function choiceFor(field: Field, uni: University): Choice {
  if (field.first.includes(uni.name)) return 1;
  if (field.second.includes(uni.name)) return 2;
  return null;
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Styles                                                                     */
/* ────────────────────────────────────────────────────────────────────────── */

const FONT_CSS = `
@font-face{
  font-family:'JameelNoori';
  src:local('Jameel Noori Nastaleeq'),
      local('Jameel Noori Nastaleeq Regular'),
      local('JameelNooriNastaleeq'),
      url('/fonts/JameelNooriNastaleeq.woff2') format('woff2'),
      url('/fonts/JameelNooriNastaleeq.ttf') format('truetype');
  font-weight:400 700; font-display:swap;
}
@import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400..700&display=swap');
`;

const CSS = `
${FONT_CSS}

.ufm *,.ufm *::before,.ufm *::after{box-sizing:border-box}
.ufm{
  --isb-1:#4338CA; --isb-2:#818CF8; --isb-ink:#1E1B4B; --isb-soft:#EEF2FF;
  --lhr-1:#059669; --lhr-2:#2BC48F; --lhr-ink:#064E3B; --lhr-soft:#ECFDF5;
  --khi-1:#D97706; --khi-2:#E8A521; --khi-ink:#78350F; --khi-soft:#FFFBEB;
  --col-1:#6366F1; --col-1s:#EEF2FF;
  --col-2:#F97316; --col-2s:#FFF7ED;
  --col-3:#CA8A04; --col-3s:#FEFCE8;
  --col-4:#10B981; --col-4s:#ECFDF5;
  --col-5:#8B5CF6; --col-5s:#F5F3FF;
  --col-6:#EC4899; --col-6s:#FDF2F8;
  --corner:linear-gradient(135deg,#F8FAFC 0%,#EEF2FF 50%,#ECFDF5 100%);
  --page:#FBFAF8; --card:#FFFFFF;
  --ink:#111014; --ink2:#57545F; --ink3:#8B8794;
  --hair:rgba(17,16,20,.09);
  --f:'JameelNoori','Noto Nastaliq Urdu',serif;

  direction:rtl; text-align:right; font-family:var(--f);
  background:var(--page); color:var(--ink);
  border:1px solid var(--hair); border-radius:16px;
  padding:34px 32px 24px; margin:30px auto; max-width:1240px;
  -webkit-font-smoothing:antialiased;
}
@media (prefers-color-scheme:dark){
  .ufm{
    --isb-1:#6366F1; --isb-2:#423DB8; --isb-ink:#E4E6FE; --isb-soft:#1E1D3A;
    --lhr-1:#0E9C8B; --lhr-2:#0B5F57; --lhr-ink:#D6F5F0; --lhr-soft:#0F2A28;
    --khi-1:#C9822A; --khi-2:#7C3D0A; --khi-ink:#FBEBD8; --khi-soft:#2B1D0C;
    --col-1:#818CF8; --col-1s:#1A1B33;
    --col-2:#FB923C; --col-2s:#2A1B10;
    --col-3:#D9A441; --col-3s:#291F0E;
    --col-4:#34D399; --col-4s:#0F2622;
    --col-5:#A78BFA; --col-5s:#221A33;
    --col-6:#F472B6; --col-6s:#2E1622;
    --corner:linear-gradient(135deg,#1B1B20 0%,#1E1B4B 55%,#0F2A28 100%);
    --page:#131316; --card:#1B1B20;
    --ink:#F3F2F0; --ink2:#AAA7B1; --ink3:#7E7B88;
    --hair:rgba(255,255,255,.11);
  }
}

/* Nastaliq needs air — every line-height below is deliberate */
.ufm h3{font-size:30px; line-height:2.25; margin:0 0 22px; padding-top:10px;
  font-weight:700; color:var(--ink)}

.ufm .belowtable{display:flex; align-items:center; justify-content:space-between;
  gap:16px 28px; flex-wrap:wrap-reverse; margin:18px 0 0}
.ufm .legend{display:flex; gap:12px 26px; flex-wrap:wrap; align-items:center;
  margin:0; font-size:15px; line-height:2.1; color:var(--ink2)}
.ufm .brand{font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  font-size:19px; font-weight:700; letter-spacing:.005em; color:var(--ink2);
  direction:ltr; unicode-bidi:isolate; white-space:nowrap; flex:0 0 auto}
.ufm .legend .grp{display:flex; align-items:center; gap:9px}
.ufm .sw{display:inline-flex; gap:4px}
.ufm .sw i{width:20px; height:20px; border-radius:6px; display:inline-block;
  box-shadow:0 2px 6px rgba(0,0,0,.15), inset 0 1px 0 rgba(255,255,255,.28)}
.ufm .legend .hint{color:var(--ink3); font-size:14px}

.ufm .scroll{overflow-x:auto; padding-bottom:8px; border-radius:16px}
.ufm .scroll::-webkit-scrollbar{height:9px}
.ufm .scroll::-webkit-scrollbar-thumb{background:var(--hair); border-radius:5px}

.ufm .wrap{background:var(--card);
  border:2px solid color-mix(in srgb,var(--isb-1) 16%,var(--hair)); border-radius:16px;
  overflow:hidden; min-width:1164px;
  box-shadow:0 4px 8px rgba(67,56,202,.05), 0 18px 44px -16px rgba(67,56,202,.20)}
.ufm .strip{height:9px; display:flex}
.ufm .strip i{flex:1; box-shadow:inset 0 -2px 4px rgba(0,0,0,.13)}
.ufm .grid{display:grid; grid-template-columns:118px 218px repeat(6,minmax(138px,1fr))}

/* header row */
.ufm .hd{padding:17px 9px 19px; text-align:center; font-size:18px; line-height:1.9;
  color:var(--ink); font-weight:700; border-bottom:2px solid var(--hair);
  background:var(--hbg); display:flex; align-items:flex-end; justify-content:center;
  position:relative; overflow:hidden}
.ufm .hd b{display:block; white-space:nowrap; font-weight:700}
.ufm .hd::after{content:''; position:absolute; bottom:0; left:14%; right:14%; height:3px;
  border-radius:3px 3px 0 0; background:var(--hac); opacity:.9}
.ufm .hd.corner{text-align:right; justify-content:flex-start; padding-right:18px;
  background:var(--corner)}
.ufm .hd.corner::after{display:none}
.ufm .hd.rankhd{background:var(--corner); justify-content:center}
.ufm .hd.rankhd::after{display:none}

/* rank column */
.ufm .rank{border-bottom:1px solid color-mix(in srgb,var(--r1) 20%,var(--hair));
  display:flex; align-items:center; justify-content:center; position:relative;
  background:linear-gradient(to left, var(--rsoft) 0%,
    color-mix(in srgb,var(--rsoft) 60%,var(--card)) 100%)}
.ufm .rank::after{content:''; position:absolute; top:0; bottom:0; right:0; width:6px;
  background:linear-gradient(to bottom,var(--r1),var(--r2));
  box-shadow:-2px 0 8px color-mix(in srgb,var(--r1) 32%,transparent)}
.ufm .rankbadge{min-width:46px; height:46px; padding:0 8px; border-radius:14px;
  display:flex; align-items:center; justify-content:center;
  font-family:var(--f); font-size:25px; line-height:1; font-weight:700;
  color:var(--rink); background:var(--card);
  border:2px solid color-mix(in srgb,var(--r1) 42%,transparent);
  box-shadow:0 2px 8px -2px color-mix(in srgb,var(--r1) 30%,transparent)}

/* university column */
.ufm .uni{padding:0 20px 0 14px; font-size:22px; line-height:1.9; color:var(--rink);
  font-weight:700; border-bottom:1px solid color-mix(in srgb,var(--r1) 20%,var(--hair));
  display:flex; flex-direction:column; justify-content:center;
  background:linear-gradient(to left, color-mix(in srgb,var(--rsoft) 82%,var(--card)) 0%,
    color-mix(in srgb,var(--rsoft) 45%,var(--card)) 72%, var(--card) 100%)}
.ufm .uni small{font-size:15px; color:var(--ink3); margin-top:4px; line-height:1.9;
  font-weight:400}

/* cells */
.ufm .cell{border-bottom:1px solid color-mix(in srgb,var(--r1) 11%,var(--hair));
  border-left:1px solid color-mix(in srgb,var(--r1) 7%,transparent);
  display:flex; align-items:center; justify-content:center; padding:11px 5px;
  min-height:76px; background:color-mix(in srgb,var(--rsoft) 36%,var(--card));
  transition:background .15s, box-shadow .15s}
.ufm .row:hover .cell{background:color-mix(in srgb,var(--rsoft) 74%,var(--card));
  box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--r1) 17%,transparent)}
.ufm .grid>div:nth-last-child(-n+8){border-bottom:0}

.ufm .chip{min-width:44px; height:44px; padding:0 9px; border-radius:13px;
  display:flex; align-items:center; justify-content:center;
  font-family:var(--f); font-size:22px; line-height:1; font-weight:700;
  border:2px solid rgba(255,255,255,.42);
  transition:transform .15s, box-shadow .15s; cursor:default}
.ufm .chip:hover,.ufm .chip:focus{transform:translateY(-3px) scale(1.07);
  box-shadow:0 9px 20px -4px color-mix(in srgb,var(--r1) 52%,rgba(17,16,20,.3)); outline:none}
.ufm .chip1{background:linear-gradient(145deg,var(--r1) 0%,color-mix(in srgb,var(--r1) 76%,#000) 100%);
  color:#fff; box-shadow:0 3px 10px -2px color-mix(in srgb,var(--r1) 48%,transparent),
    inset 0 1px 0 rgba(255,255,255,.26)}
.ufm .chip2{background:linear-gradient(145deg,var(--r2) 0%,color-mix(in srgb,var(--r2) 72%,var(--r1)) 100%);
  color:var(--rink); box-shadow:0 2px 8px -2px color-mix(in srgb,var(--r2) 42%,transparent),
    inset 0 1px 0 rgba(255,255,255,.34)}
@media (prefers-color-scheme:dark){.ufm .chip1,.ufm .chip2{border-color:rgba(255,255,255,.14)}}
.ufm .empty{width:9px; height:9px; border-radius:50%;
  background:color-mix(in srgb,var(--r1) 20%,var(--hair));
  box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--r1) 32%,transparent)}

.ufm .note{margin-top:20px; font-size:15px; line-height:2.3; color:var(--ink2);
  border-right:3px solid var(--khi-1); padding:3px 15px 3px 0}


@media (max-width:760px){
  .ufm{padding:24px 18px 16px}
  .ufm h3{font-size:25px}
  .ufm .wrap{min-width:992px}
  .ufm .grid{grid-template-columns:96px 176px repeat(6,minmax(120px,1fr))}
  .ufm .uni{font-size:19px; padding:0 14px 0 8px}
  .ufm .hd{font-size:16px; padding:14px 6px 15px}
  .ufm .chip{min-width:38px; height:38px; font-size:19px}
  .ufm .rankbadge{min-width:38px; height:38px; font-size:21px}
}

.ufm-tip{position:fixed; z-index:9999; pointer-events:none;
  background:#111014; color:#fff; font-family:'JameelNoori','Noto Nastaliq Urdu',serif;
  direction:rtl; text-align:right; font-size:15px; line-height:2.1;
  padding:10px 15px; border-radius:10px; max-width:300px;
  box-shadow:0 6px 22px rgba(0,0,0,.26)}
`;

/* ────────────────────────────────────────────────────────────────────────── */
/* Component                                                                  */
/* ────────────────────────────────────────────────────────────────────────── */

interface TipState {
  lines: string[];
  x: number;
  y: number;
}

export default function UniversityFieldMatrix() {
  const [tip, setTip] = useState<TipState | null>(null);

  const show = useCallback((lines: string[], e: React.MouseEvent | React.FocusEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clientX = 'clientX' in e ? (e as React.MouseEvent).clientX : rect.right;
    const clientY = 'clientY' in e ? (e as React.MouseEvent).clientY : rect.bottom;
    setTip({ lines, x: clientX, y: clientY });
  }, []);

  const move = useCallback((e: React.MouseEvent) => {
    setTip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : t));
  }, []);

  const hide = useCallback(() => setTip(null), []);

  const rowVars = (u: University) =>
    ({
      '--r1': `var(--${u.cityKey}-1)`,
      '--r2': `var(--${u.cityKey}-2)`,
      '--rink': `var(--${u.cityKey}-ink)`,
      '--rsoft': `var(--${u.cityKey}-soft)`,
    }) as React.CSSProperties;

  return (
    <>
      <style>{CSS}</style>

      <figure
        className="ufm"
        role="group"
        aria-label="پاکستان کی ٹاپ 10 یونیورسٹیاں اور چھ شعبوں کا گرڈ، جس میں ہر یونیورسٹی کی پہلی اور دوسری ترجیح والے شعبے دکھائے گئے ہیں"
      >
        <h3>پاکستان کی ٹاپ 10 یونیورسٹیاں — کون کس شعبے میں آگے ہے</h3>
        <div className="scroll">
          <div className="wrap">
            <div className="strip">
              <i style={{ background: 'var(--isb-1)' }} />
              <i style={{ background: 'var(--lhr-1)' }} />
              <i style={{ background: 'var(--khi-1)' }} />
            </div>

            <div className="grid">
              {/* header row */}
              <div className="hd rankhd">
                <b>رینکنگ 2026</b>
              </div>
              <div className="hd corner">
                <b>یونیورسٹی</b>
              </div>
              {FIELDS.map((f, i) => (
                <div
                  key={f.full}
                  className="hd"
                  style={
                    {
                      '--hbg': `var(--col-${i + 1}s)`,
                      '--hac': `var(--col-${i + 1})`,
                    } as React.CSSProperties
                  }
                >
                  <span>
                    {f.label.split('\n').map((line, j) => (
                      <b key={j}>{line}</b>
                    ))}
                  </span>
                </div>
              ))}

              {/* body */}
              {UNIVERSITIES.map((u) => {
                const vars = rowVars(u);
                return (
                  <div className="row" style={{ display: 'contents' }} key={u.name}>
                    <div className="rank" style={vars}>
                      <span
                        className="rankbadge"
                        aria-label={`پاکستان میں ${u.rank} نمبر`}
                      >
                        {u.rank}
                      </span>
                    </div>

                    <div className="uni" style={vars}>
                      {u.name}
                      <small>{u.city}</small>
                    </div>

                    {FIELDS.map((f) => {
                      const c = choiceFor(f, u);
                      return (
                        <div className="cell" style={vars} key={f.full}>
                          {c === null ? (
                            <span className="empty" />
                          ) : (
                            <span
                              className={`chip chip${c}`}
                              tabIndex={0}
                              aria-label={`${u.name} — ${f.full} — ${CHOICE_LABEL[c]}`}
                              onMouseEnter={(e) =>
                                show([u.name, f.full, `— ${CHOICE_LABEL[c]}`], e)
                              }
                              onMouseMove={move}
                              onMouseLeave={hide}
                              onFocus={(e) =>
                                show([u.name, f.full, `— ${CHOICE_LABEL[c]}`], e)
                              }
                              onBlur={hide}
                            >
                              {c}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="belowtable">
          <div className="legend">
          <span className="grp">
            <span className="sw">
              <i style={{ background: 'var(--isb-1)' }} />
              <i style={{ background: 'var(--lhr-1)' }} />
              <i style={{ background: 'var(--khi-1)' }} />
            </span>
            گہرا رنگ — پہلی ترجیح
          </span>
          <span className="grp">
            <span className="sw">
              <i style={{ background: 'var(--isb-2)' }} />
              <i style={{ background: 'var(--lhr-2)' }} />
              <i style={{ background: 'var(--khi-2)' }} />
            </span>
            ہلکا رنگ — دوسری ترجیح
          </span>
          <span className="grp hint">
            اور رنگ شہر بتاتا ہے:
            <span className="sw" style={{ margin: '0 8px 0 4px' }}>
              <i style={{ background: 'var(--isb-1)' }} />
            </span>
            اسلام آباد
            <span className="sw" style={{ margin: '0 8px 0 4px' }}>
              <i style={{ background: 'var(--lhr-1)' }} />
            </span>
            لاہور
            <span className="sw" style={{ margin: '0 8px 0 4px' }}>
              <i style={{ background: 'var(--khi-1)' }} />
            </span>
            کراچی
            </span>
          </div>
          <span className="brand">shama.pk</span>
        </div>

        <div className="note">
          خالی قطار کا مطلب یہ نہیں کہ وہ یونیورسٹی بری ہے — صرف یہ کہ اِن چھ بڑے شعبوں میں
          وہ ٹاپ دو میں نہیں آتی۔ کئی یونیورسٹیوں کی اصل طاقت اِن چھ کے باہر ہے۔
        </div>
      </figure>

      {tip && (
        <div
          className="ufm-tip"
          style={{
            left: Math.max(8, tip.x - 300),
            top: Math.max(8, tip.y - 96),
          }}
        >
          {tip.lines.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      )}
    </>
  );
}

/**
 * IndustrySectorGrid — کون سی یونیورسٹی کس انڈسٹری میں بھیجتی ہے
 * shama.pk · اگست 2026 · article §6.3
 *
 * Universities down the right, six industry sectors across. <IndustrySectorGrid />
 * Self-contained; no dependencies beyond React.
 *
 * DROPPED FROM THE SOURCE TABLE, ON PURPOSE
 *   • "ایمپلائر کہاں لیتا ہے" — restates the industry column in other words.
 *     Not lost: the verbatim line is the tooltip on every filled cell.
 *   • "اسٹارٹ اپ سپورٹ" — removed entirely.
 *
 * COLOUR — one hue per COLUMN, and it is reinforcement, not encoding. Six
 * categorical hues cannot pass colour-blind separation (best set tested still
 * had yellow↔green at ΔE 4.2 under protanopia), so nothing here depends on
 * telling them apart: meaning is carried by column position, the column header,
 * and the mark's shape — solid ● مرکزی vs ring ○ ثانوی. Strip the colour and
 * every cell still reads.
 *
 * مرکزی vs ثانوی follows the order the article itself lists sectors in.
 */

type CityKey = 'isb' | 'lhr' | 'khi';
type SectorKey = 'it' | 'eng' | 'corp' | 'res' | 'health' | 'edu';
type Theme = 'dark' | 'light' | 'auto';

interface Sector { key: SectorKey; lines: [string, string]; hue: string }

interface Row {
  rank: number;
  name: string;
  cityKey: CityKey;
  /** the sector the article names first */
  primary: SectorKey;
  secondary: SectorKey[];
  /** verbatim §6.3 industry line — becomes the tooltip */
  line: string;
}

const SECTORS: Sector[] = [
  { key: 'it',     lines: ['آئی ٹی اور', 'سافٹ ویئر'],   hue: 'var(--s1)' },
  { key: 'eng',    lines: ['انجینئرنگ اور', 'کنسٹرکشن'], hue: 'var(--s2)' },
  { key: 'corp',   lines: ['کارپوریٹ اور', 'بینکنگ'],    hue: 'var(--s3)' },
  { key: 'res',    lines: ['ریسرچ اور', 'ہائی ٹیک'],     hue: 'var(--s4)' },
  { key: 'health', lines: ['ہیلتھ اور', 'فارما'],        hue: 'var(--s5)' },
  { key: 'edu',    lines: ['ایجوکیشن اور', 'سول سروس'],  hue: 'var(--s6)' },
];

const ROWS: Row[] = [
  { rank: 1,  name: 'قائداعظم یونیورسٹی', cityKey: 'isb', primary: 'res',    secondary: ['health'], line: 'ریسرچ ادارے، فارما' },
  { rank: 2,  name: 'نسٹ یونیورسٹی',       cityKey: 'isb', primary: 'it',     secondary: ['eng'],    line: 'آئی ٹی، ٹیلی کام، انجینئرنگ' },
  { rank: 3,  name: 'پنجاب یونیورسٹی',     cityKey: 'lhr', primary: 'edu',    secondary: ['health'], line: 'ایجوکیشن، لاء، فارما، میڈیا' },
  { rank: 4,  name: 'لمز یونیورسٹی',       cityKey: 'lhr', primary: 'corp',   secondary: [],         line: 'کارپوریٹ، بینکنگ، کنسلٹنگ' },
  { rank: 5,  name: 'PIEAS یونیورسٹی',     cityKey: 'isb', primary: 'res',    secondary: [],         line: 'ایٹمک انرجی، ہائی ٹیک' },
  { rank: 6,  name: 'کامسیٹس یونیورسٹی',   cityKey: 'isb', primary: 'it',     secondary: [],         line: 'آئی ٹی انڈسٹری' },
  { rank: 7,  name: 'جی سی یو یونیورسٹی',  cityKey: 'lhr', primary: 'edu',    secondary: [],         line: 'ایجوکیشن، سول سروس' },
  { rank: 8,  name: 'آغا خان یونیورسٹی',   cityKey: 'khi', primary: 'health', secondary: [],         line: 'ہیلتھ سیکٹر' },
  { rank: 9,  name: 'یو ای ٹی یونیورسٹی',  cityKey: 'lhr', primary: 'eng',    secondary: [],         line: 'کنسٹرکشن، انرجی' },
  { rank: 10, name: 'این ای ڈی یونیورسٹی', cityKey: 'khi', primary: 'eng',    secondary: [],         line: 'کراچی انڈسٹری، بلڈنگ' },
];

const CITY: Record<CityKey, string> = {
  isb: 'اسلام آباد', lhr: 'لاہور', khi: 'کراچی',
};

const label = (s: Sector) => s.lines.join(' ');

function cityVars(key: CityKey): React.CSSProperties {
  return {
    '--r1': `var(--${key}-1)`,
    '--r2': `var(--${key}-2)`,
    '--rink': `var(--${key}-ink)`,
    '--rsoft': `var(--${key}-soft)`,
  } as React.CSSProperties;
}

const SHARED_CSS = `
/* ═══════════════════════════════════════════════════════════════════════════
   shama.pk — table & graphic template
   Prefix: .st   ·   Nothing here leaks outside .st
   ═══════════════════════════════════════════════════════════════════════════

   FONT — Jameel Noori Nastaleeq
   Works at once for readers who have it installed (local()). To serve it to
   everyone, host the file and fix the url() below. Falls back to Noto
   Nastaliq Urdu, so it stays Nastaliq either way.                            */

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

.st *,.st *::before,.st *::after{box-sizing:border-box}

.st{
  /* city hues — the site's one colour axis. -1 strong, -2 light, -ink text,
     -soft the row wash. Validated as a categorical trio and as 2-step ramps. */
  --isb-1:#4338CA; --isb-2:#818CF8; --isb-ink:#1E1B4B; --isb-soft:#EEF2FF;
  --lhr-1:#059669; --lhr-2:#2BC48F; --lhr-ink:#064E3B; --lhr-soft:#ECFDF5;
  --khi-1:#D97706; --khi-2:#E8A521; --khi-ink:#78350F; --khi-soft:#FFFBEB;

  /* column accents — decoration only. Header text is always ink, never these,
     so nothing depends on telling six pale tints apart. */
  --col-1:#6366F1; --col-1s:#EEF2FF;
  --col-2:#F97316; --col-2s:#FFF7ED;
  --col-3:#CA8A04; --col-3s:#FEFCE8;
  --col-4:#10B981; --col-4s:#ECFDF5;
  --col-5:#8B5CF6; --col-5s:#F5F3FF;
  --col-6:#EC4899; --col-6s:#FDF2F8;
  --corner:linear-gradient(135deg,#F8FAFC 0%,#EEF2FF 50%,#ECFDF5 100%);

  --page:#FBFAF8; --card:#FFFFFF;          /* never pure white behind the card */
  --ink:#111014; --ink2:#57545F; --ink3:#8B8794;
  --hair:rgba(17,16,20,.09);
  --f:'JameelNoori','Noto Nastaliq Urdu',serif;

  direction:rtl; text-align:right; font-family:var(--f);
  background:var(--page); color:var(--ink);
  border:1px solid var(--hair); border-radius:16px;
  padding:34px 32px 24px; margin:30px auto; max-width:1240px;
  -webkit-font-smoothing:antialiased;
}

/* Dark tokens live in one place, applied two ways:
   • .st.theme-dark  — force a dark card whatever the reader's OS says.
     Use it to set one table apart from its neighbours on the same page.
   • prefers-color-scheme — every table follows the reader's OS, unless a
     table has opted out with .theme-light.                                  */
.st.theme-dark{
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
@media (prefers-color-scheme:dark){
  .st:not(.theme-light){
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
/* the chip's white hairline reads as glare on a dark card */
.st.theme-dark .chip1,.st.theme-dark .chip2{border-color:rgba(255,255,255,.14)}
.st.theme-dark .strip i{box-shadow:inset 0 -2px 4px rgba(0,0,0,.35)}
.st.theme-dark .wrap{box-shadow:0 4px 10px rgba(0,0,0,.35), 0 20px 48px -18px rgba(0,0,0,.55)}

/* Nastaliq collides at normal line-height. Every value below is deliberate —
   do not drop any of them below ~1.9.                                        */
.st h3{font-size:30px; line-height:2.25; margin:0 0 22px; padding-top:10px;
  font-weight:700; color:var(--ink)}

.st .num{font-family:var(--f); direction:ltr; unicode-bidi:isolate; display:inline-block}
.st .ltr{direction:ltr; unicode-bidi:isolate; display:inline-block}

/* ── card ─────────────────────────────────────────────────────────────────── */
.st .scroll{overflow-x:auto; padding-bottom:8px; border-radius:16px}
.st .scroll::-webkit-scrollbar{height:9px}
.st .scroll::-webkit-scrollbar-thumb{background:var(--hair); border-radius:5px}

.st .wrap{background:var(--card);
  border:2px solid color-mix(in srgb,var(--isb-1) 16%,var(--hair)); border-radius:16px;
  overflow:hidden;
  box-shadow:0 4px 8px rgba(67,56,202,.05), 0 18px 44px -16px rgba(67,56,202,.20)}
.st .strip{height:9px; display:flex}
.st .strip i{flex:1; box-shadow:inset 0 -2px 4px rgba(0,0,0,.13)}
.st .grid{display:grid}

/* ── header row — all cells one size and weight ───────────────────────────── */
.st .hd{padding:17px 9px 19px; text-align:center; font-size:18px; line-height:1.9;
  color:var(--ink); font-weight:700; border-bottom:2px solid var(--hair);
  background:var(--hbg,var(--corner)); display:flex; align-items:flex-end;
  justify-content:center; position:relative}
.st .hd b{display:block; white-space:nowrap; font-weight:700}
.st .hd.acc::after{content:''; position:absolute; bottom:0; left:14%; right:14%;
  height:3px; border-radius:3px 3px 0 0; background:var(--hac); opacity:.9}
.st .hd.start{text-align:right; justify-content:flex-start; padding-right:18px}

/* ── rank column ──────────────────────────────────────────────────────────── */
.st .rank{border-bottom:1px solid color-mix(in srgb,var(--r1) 20%,var(--hair));
  display:flex; align-items:center; justify-content:center; position:relative;
  background:linear-gradient(to left, var(--rsoft) 0%,
    color-mix(in srgb,var(--rsoft) 60%,var(--card)) 100%)}
.st .rank::after{content:''; position:absolute; top:0; bottom:0; right:0; width:6px;
  background:linear-gradient(to bottom,var(--r1),var(--r2));
  box-shadow:-2px 0 8px color-mix(in srgb,var(--r1) 32%,transparent)}
.st .badge{min-width:46px; height:46px; padding:0 8px; border-radius:14px;
  display:flex; align-items:center; justify-content:center;
  font-family:var(--f); font-size:25px; line-height:1; font-weight:700;
  color:var(--rink); background:var(--card);
  border:2px solid color-mix(in srgb,var(--r1) 42%,transparent);
  box-shadow:0 2px 8px -2px color-mix(in srgb,var(--r1) 30%,transparent)}

/* ── name column ──────────────────────────────────────────────────────────── */
.st .name{padding:0 20px 0 14px; font-size:22px; line-height:1.9; color:var(--rink);
  font-weight:700; border-bottom:1px solid color-mix(in srgb,var(--r1) 20%,var(--hair));
  display:flex; flex-direction:column; justify-content:center;
  background:linear-gradient(to left, color-mix(in srgb,var(--rsoft) 82%,var(--card)) 0%,
    color-mix(in srgb,var(--rsoft) 45%,var(--card)) 72%, var(--card) 100%)}
.st .name small{font-size:15px; color:var(--ink3); margin-top:4px; line-height:1.9;
  font-weight:400}

/* ── body cells ───────────────────────────────────────────────────────────── */
.st .cell{border-bottom:1px solid color-mix(in srgb,var(--r1) 11%,var(--hair));
  border-left:1px solid color-mix(in srgb,var(--r1) 7%,transparent);
  display:flex; align-items:center; justify-content:center; padding:11px 5px;
  background:color-mix(in srgb,var(--rsoft) 36%,var(--card));
  transition:background .15s, box-shadow .15s}
.st .row:hover .cell{background:color-mix(in srgb,var(--rsoft) 74%,var(--card));
  box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--r1) 17%,transparent)}

/* matrix variant — chips */
.st.matrix .cell{min-height:76px}
.st .chip{min-width:44px; height:44px; padding:0 9px; border-radius:13px;
  display:flex; align-items:center; justify-content:center;
  font-family:var(--f); font-size:22px; line-height:1; font-weight:700;
  border:2px solid rgba(255,255,255,.42);
  transition:transform .15s, box-shadow .15s; cursor:default}
.st .chip:hover,.st .chip:focus{transform:translateY(-3px) scale(1.07);
  box-shadow:0 9px 20px -4px color-mix(in srgb,var(--r1) 52%,rgba(17,16,20,.3)); outline:none}
.st .chip1{background:linear-gradient(145deg,var(--r1) 0%,color-mix(in srgb,var(--r1) 76%,#000) 100%);
  color:#fff; box-shadow:0 3px 10px -2px color-mix(in srgb,var(--r1) 48%,transparent),
    inset 0 1px 0 rgba(255,255,255,.26)}
.st .chip2{background:linear-gradient(145deg,var(--r2) 0%,color-mix(in srgb,var(--r2) 72%,var(--r1)) 100%);
  color:var(--rink); box-shadow:0 2px 8px -2px color-mix(in srgb,var(--r2) 42%,transparent),
    inset 0 1px 0 rgba(255,255,255,.34)}
@media (prefers-color-scheme:dark){.st .chip1,.st .chip2{border-color:rgba(255,255,255,.14)}}
.st .empty{width:9px; height:9px; border-radius:50%;
  background:color-mix(in srgb,var(--r1) 20%,var(--hair));
  box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--r1) 32%,transparent)}

/* rows variant — text cells */
.st.rows .cell{min-height:78px; display:block; padding:16px 18px;
  font-size:17px; line-height:2.05; color:var(--ink2); text-align:right}
.st.rows .cell.mid{color:var(--rink); font-weight:700; font-size:18px;
  display:flex; align-items:center; justify-content:center; text-align:center}

/* ── tiles variant ────────────────────────────────────────────────────────
   Cards instead of rows. Same city colour axis: the glow, the border and
   the stat all take the row's --r1, so a Lahore tile still reads as Lahore. */
.st.tiles .deck{display:flex; flex-wrap:wrap; justify-content:center; gap:20px}
.st.tiles .tile{flex:1 1 322px; max-width:calc(33.333% - 14px)}
.st.tiles .tile{position:relative; background:var(--card);
  border:1px solid color-mix(in srgb,var(--r1) 36%,transparent); border-radius:24px;
  padding:22px 24px 18px; display:flex; flex-direction:column; gap:14px;
  box-shadow:0 0 30px color-mix(in srgb,var(--r1) 11%,transparent);
  transition:transform .35s, box-shadow .35s, border-color .35s}
.st.tiles .tile:hover,.st.tiles .tile:focus-within{transform:translateY(-4px);
  border-color:color-mix(in srgb,var(--r1) 62%,transparent);
  box-shadow:0 0 44px color-mix(in srgb,var(--r1) 22%,transparent),
             0 14px 30px -14px rgba(0,0,0,.5)}

.st.tiles .top{display:flex; align-items:center; justify-content:space-between; gap:12px}
.st.tiles .icon{width:52px; height:52px; border-radius:15px; display:flex;
  align-items:center; justify-content:center; font-size:25px; line-height:1;
  background:color-mix(in srgb,var(--r1) 15%,transparent);
  border:1px solid color-mix(in srgb,var(--r1) 26%,transparent)}
.st.tiles .pos{display:flex; align-items:center; gap:9px}
.st.tiles .dot{width:11px; height:11px; border-radius:50%; background:var(--r1);
  box-shadow:0 0 12px color-mix(in srgb,var(--r1) 85%,transparent)}
.st.tiles .rk{font-family:var(--f); font-size:18px; font-weight:700; color:var(--ink3)}

.st.tiles .tname{font-size:25px; line-height:1.75; font-weight:700; color:var(--ink);
  margin:2px 0 0}
.st.tiles .pill{align-self:flex-start; display:inline-block; padding:5px 16px;
  border-radius:100px; font-size:16px; line-height:1.85; color:var(--rink);
  background:color-mix(in srgb,var(--r1) 17%,transparent);
  border:1px solid color-mix(in srgb,var(--r1) 30%,transparent)}
.st.tiles .line{font-size:17px; line-height:2.0; color:var(--ink2); margin:0}

.st.tiles .foot{display:flex; align-items:center; justify-content:space-between;
  gap:12px; margin-top:auto; padding-top:14px;
  border-top:1px solid color-mix(in srgb,var(--r1) 16%,var(--hair))}
.st.tiles .flabel{font-size:14px; line-height:1.8; color:var(--ink3)}
.st.tiles .stat{font-size:17px; line-height:1.8; font-weight:700; color:var(--r1)}

@media (max-width:760px){
  .st.tiles .deck{gap:16px}
  .st.tiles .tile{flex:1 1 100%; max-width:100%}
  .st.tiles .tname{font-size:22px}
  .st.tiles .icon{width:46px; height:46px; font-size:22px}
}

/* ── dashboard variant ────────────────────────────────────────────────────
   Overview bar + filter chips + detail cards. Use only when the data has
   something to filter by AND something to measure — otherwise it is a table
   wearing a costume.                                                        */
.st.dash .stats{display:flex; gap:14px; flex-wrap:wrap; margin:0 0 22px}
.st.dash .kpi{flex:1 1 168px; background:var(--card); border:1px solid var(--hair);
  border-radius:16px; padding:16px 20px 14px}
.st.dash .kpi b{display:block; font-family:var(--f); font-size:34px; line-height:1.35;
  font-weight:700; color:var(--ink)}
.st.dash .kpi span{display:block; font-size:14.5px; line-height:1.85; color:var(--ink3);
  margin-top:2px}

.st.dash .panel{background:var(--card); border:1px solid var(--hair); border-radius:16px;
  padding:20px 22px; margin:0 0 20px}
.st.dash .ptitle{font-size:17px; line-height:1.9; font-weight:700; color:var(--ink);
  margin:0 0 14px}
.st.dash .bars{display:flex; flex-direction:column; gap:9px}
.st.dash .bar{display:grid; grid-template-columns:190px 1fr 34px; align-items:center;
  gap:12px; cursor:pointer; border-radius:9px; padding:3px 4px;
  transition:background .14s}
.st.dash .bar:hover,.st.dash .bar.on{background:color-mix(in srgb,var(--sc) 13%,transparent)}
.st.dash .bar .bl{font-size:15.5px; line-height:1.8; color:var(--ink2)}
.st.dash .bar.on .bl{color:var(--ink)}
.st.dash .track{display:block; height:12px; max-width:460px; border-radius:6px;
  background:color-mix(in srgb,var(--ink) 7%,transparent); overflow:hidden}
.st.dash .fill{display:block; height:100%; border-radius:6px; background:var(--sc);
  transition:width .2s}
.st.dash .bar .bv{font-family:var(--f); font-size:16px; font-weight:700; color:var(--ink2);
  text-align:left}

.st.dash .chips{display:flex; gap:9px; flex-wrap:wrap; margin:0 0 20px}
.st.dash .chip-f{font-family:var(--f); font-size:15.5px; line-height:1.8; cursor:pointer;
  padding:7px 17px; border-radius:100px; color:var(--ink2); background:var(--card);
  border:1px solid var(--hair); transition:all .15s}
.st.dash .chip-f:hover{color:var(--ink); border-color:color-mix(in srgb,var(--sc,var(--isb-1)) 55%,transparent)}
.st.dash .chip-f[aria-pressed="true"]{color:var(--ink);
  background:color-mix(in srgb,var(--sc,var(--isb-1)) 17%,var(--card));
  border-color:color-mix(in srgb,var(--sc,var(--isb-1)) 60%,transparent)}

.st.dash .deck{display:flex; flex-wrap:wrap; justify-content:center; gap:18px}
.st.dash .ucard{flex:1 1 330px; max-width:calc(33.333% - 12px); background:var(--card);
  border:1px solid color-mix(in srgb,var(--r1) 32%,transparent); border-radius:20px;
  padding:18px 20px 16px; display:flex; flex-direction:column; gap:12px;
  box-shadow:0 0 26px color-mix(in srgb,var(--r1) 9%,transparent);
  transition:transform .3s, box-shadow .3s, border-color .3s, opacity .25s}
.st.dash .ucard.dim{opacity:.2; pointer-events:none}
.st.dash .ucard:hover{transform:translateY(-3px);
  border-color:color-mix(in srgb,var(--r1) 58%,transparent);
  box-shadow:0 0 38px color-mix(in srgb,var(--r1) 18%,transparent)}
.st.dash .uhead{display:flex; align-items:center; justify-content:space-between; gap:10px}
.st.dash .uname{font-size:22px; line-height:1.8; font-weight:700; color:var(--ink); margin:0}
.st.dash .urk{font-family:var(--f); font-size:17px; font-weight:700; color:var(--ink3)}
.st.dash .tags{display:flex; gap:7px; flex-wrap:wrap}
.st.dash .tag{font-size:14px; line-height:1.8; padding:3px 12px; border-radius:100px;
  color:var(--ink2); background:color-mix(in srgb,var(--sc) 15%,transparent);
  border:1px solid color-mix(in srgb,var(--sc) 28%,transparent)}
.st.dash .emp{font-size:16px; line-height:2.0; color:var(--ink2); margin:0}
.st.dash .emp b{color:var(--ink3); font-size:13.5px; font-weight:400; display:block}
.st.dash .meter{margin-top:auto; padding-top:12px;
  border-top:1px solid color-mix(in srgb,var(--r1) 16%,var(--hair))}
.st.dash .mrow{display:flex; align-items:center; justify-content:space-between; gap:10px}
.st.dash .mlab{font-size:13.5px; line-height:1.8; color:var(--ink3)}
.st.dash .mval{font-size:15.5px; line-height:1.8; font-weight:700; color:var(--r1)}
.st.dash .segs{display:flex; gap:4px; margin-top:8px}
.st.dash .segs i{flex:1; height:7px; border-radius:4px;
  background:color-mix(in srgb,var(--r1) 15%,transparent)}
.st.dash .segs i.on{background:var(--r1)}
.st.dash .empty-msg{width:100%; text-align:center; font-size:16px; line-height:2;
  color:var(--ink3); padding:26px 0}

@media (max-width:900px){.st.dash .ucard{max-width:calc(50% - 9px)}}
@media (max-width:640px){
  .st.dash .ucard{flex:1 1 100%; max-width:100%}
  .st.dash .bar{grid-template-columns:132px 1fr 30px; gap:9px}
  .st.dash .bar .bl{font-size:14px}
  .st.dash .kpi b{font-size:28px}
}

/* ── sector-grid variant ──────────────────────────────────────────────────
   Universities down, sectors across. Hue belongs to the COLUMN, not the row —
   it reinforces a labelled column, it is not the encoding. Meaning is carried
   by position + header + fill style (solid = مرکزی, ring = ثانوی), so a
   colour-blind reader loses nothing. Six categorical hues cannot pass CVD
   separation; that is why nothing here depends on telling them apart.        */
.st.sect{--s1:#6366F1; --s2:#EA580C; --s3:#06B6D4; --s4:#22C55E; --s5:#EC4899; --s6:#EAB308;
  --cellink:#0B0A14}
.st.sect .grid{display:grid}
.st.sect .hd{padding:16px 8px 18px; font-size:17px; line-height:1.85;
  background:color-mix(in srgb,var(--hc) 17%,var(--card))}
.st.sect .hd.acc::after{background:var(--hc); opacity:1; height:4px; left:10%; right:10%}
.st.sect .hd.plain{background:color-mix(in srgb,var(--ink) 5%,var(--card))}

.st.sect .rank{border-bottom:1px solid var(--hair); background:none}
.st.sect .rank::after{background:linear-gradient(to bottom,var(--r1),var(--r2))}
.st.sect .name{font-size:21px; padding:0 20px 0 12px;
  border-bottom:1px solid var(--hair);
  background:linear-gradient(to left,color-mix(in srgb,var(--rsoft) 70%,var(--card)),var(--card) 92%)}
.st.sect .name small{font-size:14px}

.st.sect .sc{border-bottom:1px solid var(--hair);
  border-left:1px solid color-mix(in srgb,var(--ink) 6%,transparent);
  display:flex; align-items:center; justify-content:center; padding:12px 8px;
  min-height:70px; background:color-mix(in srgb,var(--hc) 6%,transparent);
  transition:background .16s}
.st.sect .row:hover .sc{background:color-mix(in srgb,var(--hc) 14%,transparent)}

/* solid = primary. The glyph is the non-colour channel. */
.st.sect .mk{min-width:64px; height:40px; border-radius:12px; display:flex;
  align-items:center; justify-content:center; gap:7px; font-family:var(--f);
  font-size:15px; font-weight:700; transition:transform .16s, box-shadow .16s}
.st.sect .mk:hover,.st.sect .mk:focus{transform:translateY(-2px) scale(1.05); outline:none;
  box-shadow:0 8px 18px -4px color-mix(in srgb,var(--hc) 60%,transparent)}
.st.sect .mk.p1{background:var(--hc); color:var(--cellink);
  box-shadow:0 3px 12px -3px color-mix(in srgb,var(--hc) 70%,transparent)}
.st.sect .mk.p2{background:color-mix(in srgb,var(--hc) 20%,transparent);
  border:2px solid color-mix(in srgb,var(--hc) 70%,transparent); color:var(--ink)}
.st.sect .mk i{font-style:normal; font-size:13px; line-height:1}
.st.sect .none{width:7px; height:7px; border-radius:50%;
  background:color-mix(in srgb,var(--hc) 26%,transparent)}

.st.sect .legend .sw i{border-radius:5px}
@media (max-width:760px){
  .st.sect .name{font-size:18px}
  .st.sect .hd{font-size:15px}
  .st.sect .mk{min-width:52px; height:34px; font-size:13.5px}
}

/* ── below the table: legend right, brand left ────────────────────────────── */
.st .belowtable{display:flex; align-items:center; justify-content:space-between;
  gap:16px 28px; flex-wrap:wrap-reverse; margin:18px 0 0}
.st .legend{display:flex; gap:12px 26px; flex-wrap:wrap; align-items:center;
  margin:0; font-size:15px; line-height:2.1; color:var(--ink2)}
.st .legend .grp{display:flex; align-items:center; gap:9px}
.st .sw{display:inline-flex; gap:4px}
.st .sw i{width:20px; height:20px; border-radius:6px; display:inline-block;
  box-shadow:0 2px 6px rgba(0,0,0,.15), inset 0 1px 0 rgba(255,255,255,.28)}
.st .legend .hint{color:var(--ink3); font-size:14px}
.st .brand{font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  font-size:19px; font-weight:700; letter-spacing:.005em; color:var(--ink2);
  direction:ltr; unicode-bidi:isolate; white-space:nowrap; flex:0 0 auto}

.st .note{margin-top:20px; font-size:15px; line-height:2.3; color:var(--ink2);
  border-right:3px solid var(--khi-1); padding:3px 15px 3px 0}

@media (max-width:760px){
  .st{padding:24px 18px 16px}
  .st h3{font-size:25px}
  .st .name{font-size:19px; padding:0 14px 0 8px}
  .st .hd{font-size:16px; padding:14px 6px 15px}
  .st .chip{min-width:38px; height:38px; font-size:19px}
  .st .badge{min-width:38px; height:38px; font-size:21px}
  .st.rows .cell{font-size:16px; padding:14px 14px}
}

.st-tip{position:fixed; z-index:9999; pointer-events:none; opacity:0;
  transition:opacity .12s; background:#111014; color:#fff;
  font-family:'JameelNoori','Noto Nastaliq Urdu',serif; direction:rtl; text-align:right;
  font-size:15px; line-height:2.1; padding:10px 15px; border-radius:10px;
  max-width:300px; box-shadow:0 6px 22px rgba(0,0,0,.26)}

.st.sect .legend .mk.lg{min-width:0; height:30px; padding:0 12px; font-size:14px;
  border-radius:9px; transform:none !important; box-shadow:none}
.st.sect .legend .grp{gap:11px}
`;

export default function IndustrySectorGrid({ theme = 'dark' }: { theme?: Theme }) {
  const themeClass =
    theme === 'dark' ? ' theme-dark' : theme === 'light' ? ' theme-light' : '';

  return (
    <>
      <style>{SHARED_CSS}</style>

      <figure
        className={`st sect${themeClass}`}
        role="group"
        aria-label="دس یونیورسٹیوں اور چھ انڈسٹری سیکٹرز کا گرڈ، مرکزی اور ثانوی شعبے کے ساتھ"
      >
        <h3>کون سی یونیورسٹی کس انڈسٹری میں بھیجتی ہے</h3>

        <div className="scroll">
          <div className="wrap" style={{ minWidth: 1160 }}>
            <div className="strip">
              {SECTORS.map((s) => <i key={s.key} style={{ background: s.hue }} />)}
            </div>

            <div
              className="grid"
              style={{ gridTemplateColumns: '88px 232px repeat(6,minmax(140px,1fr))' }}
            >
              <div className="hd plain"><span>رینکنگ</span></div>
              <div className="hd plain start"><span>یونیورسٹی</span></div>
              {SECTORS.map((s) => (
                <div
                  className="hd acc"
                  key={s.key}
                  style={{ '--hc': s.hue } as React.CSSProperties}
                >
                  <span>{s.lines.map((l) => <b key={l}>{l}</b>)}</span>
                </div>
              ))}

              {ROWS.map((r) => {
                const v = cityVars(r.cityKey);
                return (
                  <div className="row" style={{ display: 'contents' }} key={r.name}>
                    <div className="rank" style={v}>
                      <span className="badge" aria-label={`پاکستان میں ${r.rank} نمبر`}>
                        {r.rank}
                      </span>
                    </div>
                    <div className="name" style={v}>
                      {r.name}
                      <small>{CITY[r.cityKey]}</small>
                    </div>

                    {SECTORS.map((s) => {
                      const isPrimary = r.primary === s.key;
                      const isSecondary = r.secondary.includes(s.key);
                      const kind = isPrimary ? 'مرکزی' : 'ثانوی';
                      return (
                        <div
                          className="sc"
                          key={s.key}
                          style={{ '--hc': s.hue } as React.CSSProperties}
                        >
                          {isPrimary || isSecondary ? (
                            <span
                              className={`mk ${isPrimary ? 'p1' : 'p2'}`}
                              tabIndex={0}
                              title={`${r.name} — ${label(s)} — ${kind}\n${r.line}`}
                              aria-label={`${r.name} — ${label(s)} — ${kind} شعبہ`}
                            >
                              <i>{isPrimary ? '●' : '○'}</i>
                              {kind}
                            </span>
                          ) : (
                            <span className="none" />
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
              <span className="mk p1 lg" style={{ '--hc': 'var(--s4)' } as React.CSSProperties}>
                <i>●</i>مرکزی
              </span>
              وہ شعبہ جس کا ذکر آرٹیکل پہلے کرتا ہے
            </span>
            <span className="grp">
              <span className="mk p2 lg" style={{ '--hc': 'var(--s4)' } as React.CSSProperties}>
                <i>○</i>ثانوی
              </span>
              جس کا ذکر بعد میں آتا ہے
            </span>
            <span className="grp hint">
              رنگ صرف کالم پہچاننے کے لیے ہے — معنی خانے کی شکل سے ہیں
            </span>
          </div>
          <span className="brand">shama.pk</span>
        </div>

        <div className="note">
          سیکٹر فیملیز آرٹیکل کے اپنے الفاظ کو گروپ کر کے بنائی گئی ہیں۔ مرکزی وہ شعبہ ہے جس کا
          ذکر آرٹیکل پہلے کرتا ہے۔ ایک خالی قطار کا مطلب یہ نہیں کہ اُس شعبے میں نوکری نہیں ملتی —
          صرف یہ کہ آرٹیکل اُس یونیورسٹی کے ساتھ اُس شعبے کا ذکر نہیں کرتا۔ خانے پر ماؤس رکھیں تو
          آرٹیکل کی اصل عبارت نظر آئے گی۔
        </div>
      </figure>
    </>
  );
}

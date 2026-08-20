/**
 * CampusPersonalityTiles — کیمپس کی شخصیت
 * shama.pk · اگست 2026
 *
 * Ten campus-personality cards. Self-contained; no dependencies beyond React.
 *   <CampusPersonalityTiles />
 *
 * THEME — defaults to "dark". The glow and the tinted pills are built for a
 * dark card; pass theme="auto" to follow the reader's OS if you ever need it.
 *
 * COLOUR — hue follows the city, the same axis the comparison tables use, so a
 * reader who learned "teal = لاہور" upstairs is not contradicted here. The
 * reference deck coloured cards amber/yellow/pink with no meaning attached.
 *
 * FONT — Jameel Noori Nastaleeq via local(), self-hosted url() second, Noto
 * Nastaliq Urdu as the fallback. See FONT block inside SHARED_CSS.
 *
 * SHARED_CSS is byte-identical to the block in the other shama components. If
 * you render more than one on a page, move it to shama-table.css, import once,
 * and drop the <style> tag from each.
 */

/* ────────────────────────────────────────────────────────────────────────── */
/* Types                                                                      */
/* ────────────────────────────────────────────────────────────────────────── */

type CityKey = 'isb' | 'lhr' | 'khi';
type Theme = 'dark' | 'light' | 'auto';

interface Tile {
  /** QS World Ranking 2026 — position within Pakistan */
  rank: number;
  name: string;
  cityKey: CityKey;
  /** Emoji, decorative only — hidden from screen readers */
  icon: string;
  /** The personality, shown as a pill */
  pill: string;
  /** One line of description */
  line: string;
  /** The footer stat, in the city colour */
  stat: string;
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Data                                                                       */
/*                                                                            */
/* Three stat lines differ from the reference deck. Each was an unsourced      */
/* number that appears nowhere in the article:                                 */
/*   لمز    "100% ایمپلائمنٹ" → "کارپوریٹ کی پہلی پسند"  (§6.1)                */
/*   PIEAS  "1% قبولیت"       → "فی بیچ 100 سے کم"        (§3.1, verbatim)      */
/*   پنجاب  "45 ہزار طلباء"   → "سب سے زیادہ طلباء"       (§3.1)                */
/* ────────────────────────────────────────────────────────────────────────── */

const TILES: Tile[] = [
  { rank: 1, name: 'قائداعظم یونیورسٹی', cityKey: 'isb', icon: '🌲',
    pill: 'سرسبز پہاڑوں میں', line: 'اسلام آباد کی پہاڑیوں میں 1700 ایکڑ', stat: '#1 پاکستان' },
  { rank: 2, name: 'نسٹ یونیورسٹی', cityKey: 'isb', icon: '🚀',
    pill: 'مستقبل کا شہر', line: 'ایچ-12 میں جدید ترین کیمپس', stat: 'QS 371' },
  { rank: 3, name: 'پنجاب یونیورسٹی', cityKey: 'lhr', icon: '🏛️',
    pill: 'سب سے بڑی', line: '1882 سے علم کا مرکز', stat: 'سب سے زیادہ طلباء' },
  { rank: 4, name: 'لمز یونیورسٹی', cityKey: 'lhr', icon: '💼',
    pill: 'CEO فیکٹری', line: 'بزنس لیڈرز کی جنم بھومی', stat: 'کارپوریٹ کی پہلی پسند' },
  { rank: 5, name: 'PIEAS یونیورسٹی', cityKey: 'isb', icon: '⚛️',
    pill: 'سب سے سلیکٹو', line: 'ایٹمی سائنس کا خفیہ نگینہ', stat: 'فی بیچ 100 سے کم' },
  { rank: 6, name: 'کامسیٹس یونیورسٹی', cityKey: 'isb', icon: '💻',
    pill: 'کوڈرز کی جنت', line: '7 کیمپس، ایک وژن', stat: 'IT میں #1' },
  { rank: 7, name: 'جی سی یو یونیورسٹی', cityKey: 'lhr', icon: '🕰️',
    pill: 'تاریخی ورثہ', line: '1864 کی گوتھک عمارت', stat: 'علامہ اقبال کا کالج' },
  { rank: 8, name: 'آغا خان یونیورسٹی', cityKey: 'khi', icon: '🏥',
    pill: 'ڈاکٹروں کی جنت', line: 'عالمی معیار کا ہسپتال', stat: 'میڈیکل میں #1' },
  { rank: 9, name: 'یو ای ٹی یونیورسٹی', cityKey: 'lhr', icon: '🏗️',
    pill: 'انجینئرز کی ماں', line: '1921 سے انجینئرنگ', stat: 'لاہور کی پہچان' },
  { rank: 10, name: 'این ای ڈی یونیورسٹی', cityKey: 'khi', icon: '🌊',
    pill: 'کراچی کی طاقت', line: 'سندھ کی انجینئرنگ کا ستون', stat: '1922 سے قائم' },
];

const CITIES: { key: CityKey; label: string }[] = [
  { key: 'isb', label: 'اسلام آباد' },
  { key: 'lhr', label: 'لاہور' },
  { key: 'khi', label: 'کراچی' },
];

/* ────────────────────────────────────────────────────────────────────────── */
/* Helpers                                                                    */
/* ────────────────────────────────────────────────────────────────────────── */

/* RTL bidi reverses "1700" and scrambles "ایچ-12" unless each number run is
   isolated. Split keeps the delimiters because the group is capturing. */
const NUM_SPLIT = /(\d[\d,.]*(?:\s*[-–]\s*\d[\d,.]*)?%?)/;
const STARTS_DIGIT = /^\d/;

/* A run with no Arabic-script character at all ("QS 371") is isolated whole,
   matching the HTML build; anything else gets its number runs isolated. */
const HAS_ARABIC = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;

function Urdu({ children }: { children: string }) {
  if (!HAS_ARABIC.test(children)) {
    return <bdi className="ltr">{children}</bdi>;
  }
  return (
    <>
      {children.split(NUM_SPLIT).map((part, i) =>
        STARTS_DIGIT.test(part) ? <span className="num" key={i}>{part}</span> : part,
      )}
    </>
  );
}

function cityVars(key: CityKey): React.CSSProperties {
  return {
    '--r1': `var(--${key}-1)`,
    '--r2': `var(--${key}-2)`,
    '--rink': `var(--${key}-ink)`,
    '--rsoft': `var(--${key}-soft)`,
  } as React.CSSProperties;
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Styles                                                                     */
/* ────────────────────────────────────────────────────────────────────────── */

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
`;

/* ────────────────────────────────────────────────────────────────────────── */
/* Component                                                                  */
/* ────────────────────────────────────────────────────────────────────────── */

export default function CampusPersonalityTiles({ theme = 'dark' }: { theme?: Theme }) {
  const themeClass =
    theme === 'dark' ? ' theme-dark' : theme === 'light' ? ' theme-light' : '';

  return (
    <>
      <style>{SHARED_CSS}</style>

      <figure
        className={`st tiles${themeClass}`}
        role="group"
        aria-label="دس یونیورسٹیوں کے کیمپس کی شخصیت کے کارڈز"
      >
        <h3>کیمپس کی شخصیت — ہر یونیورسٹی کس بات سے پہچانی جاتی ہے</h3>

        <div className="deck">
          {TILES.map((t) => (
            <article
              className="tile"
              key={t.name}
              style={cityVars(t.cityKey)}
              tabIndex={0}
              aria-label={`${t.name} — ${t.pill} — ${t.line}`}
            >
              <div className="top">
                <span className="icon" aria-hidden="true">{t.icon}</span>
                <span className="pos">
                  <span className="rk">{t.rank}</span>
                  <span className="dot" aria-hidden="true" />
                </span>
              </div>

              <h4 className="tname">{t.name}</h4>
              <span className="pill"><Urdu>{t.pill}</Urdu></span>
              <p className="line"><Urdu>{t.line}</Urdu></p>

              <div className="foot">
                <span className="flabel">رینک / پہچان</span>
                <span className="stat"><Urdu>{t.stat}</Urdu></span>
              </div>
            </article>
          ))}
        </div>

        <div className="belowtable">
          <div className="legend">
            <span className="grp hint">
              رنگ شہر بتاتا ہے:
              {CITIES.map((c) => (
                <span key={c.key}>
                  <span className="sw" style={{ margin: '0 8px 0 4px' }}>
                    <i style={{ background: `var(--${c.key}-1)` }} />
                  </span>
                  {c.label}
                </span>
              ))}
            </span>
          </div>
          <span className="brand">shama.pk</span>
        </div>

        <div className="note">
          یہ پہچان ہے، درجہ بندی نہیں۔ کسی یونیورسٹی کی شہرت اُس کے ماحول اور تاریخ سے بنتی
          ہے، لیکن آپ کا فیصلہ اِس سے نہیں — اپنے شعبے کی سبجیکٹ رینکنگ، فیس اور ہاسٹل سے
          ہونا چاہیے۔ کارنر کا نمبر کیو ایس ورلڈ رینکنگ 2026 میں پاکستان کی پوزیشن ہے۔
        </div>
      </figure>
    </>
  );
}

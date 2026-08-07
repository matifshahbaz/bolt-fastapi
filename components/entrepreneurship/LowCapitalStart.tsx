import React from "react";

/** مضمون کے حصے: کم سرمائے کے ساتھ شروعات */
export default function LowCapitalStart() {
  const steps = [
    ["مہارت", "جو آتا ہے، اسی سے خدمت یا مصنوعات کا آغاز کریں"],
    ["مسئلہ", "لوگوں کی ایک واضح ضرورت منتخب کریں"],
    ["پہلا نمونہ", "کم خرچ، قابلِ آزمائش شکل بنائیں"],
    ["آمدن", "پہلی کمائی کو دوبارہ کاروبار میں لگائیں"],
  ];
  const numerals = ["۱", "۲", "۳", "۴"];
  return (
    <section className="lc-card" dir="rtl" lang="ur" aria-labelledby="lc-title">
      <style>{styles}</style>
      <div className="lc-dots" aria-hidden="true" />
      <header>
        <span>کم وسائل، بڑی سمت</span>
        <h2 id="lc-title">کم سرمائے سے آغاز</h2>
        <p>کاروبار صرف رقم سے نہیں، مشاہدے، مہارت اور مسلسل کوشش سے چلتا ہے۔</p>
      </header>
      <div className="lc-body">
        <div className="lc-visual" aria-label="ایک چھوٹی شروعات سے بڑھتی ہوئی پیش رفت">
          <svg viewBox="0 0 390 330" role="img" aria-label="چھوٹے بیج سے بلند ترقی کی علامت">
            <defs><linearGradient id="lc-grow" x1="0" x2="0" y2="1"><stop stopColor="#ffd978"/><stop offset="1" stopColor="#e66b50"/></linearGradient></defs>
            <path d="M49 274H340" stroke="#f9e4bd" strokeWidth="5" strokeLinecap="round" opacity=".55"/>
            <path d="M77 273V230M140 273V180M203 273V130M266 273V81" stroke="url(#lc-grow)" strokeWidth="32" strokeLinecap="round"/>
            <path d="M288 78l-28 3 19 21" fill="none" stroke="#fff3d8" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M265 82C222 100 211 122 203 130" fill="none" stroke="#fff3d8" strokeWidth="7" strokeLinecap="round"/>
            <circle cx="77" cy="223" r="11" fill="#fff3d8"/><circle cx="140" cy="172" r="11" fill="#fff3d8"/><circle cx="203" cy="122" r="11" fill="#fff3d8"/><circle cx="266" cy="72" r="11" fill="#fff3d8"/>
          </svg>
          <div><b>چھوٹا آغاز</b><i>پختہ رفتار</i></div>
        </div>
        <ol className="lc-steps">
          {steps.map(([title, copy], index) => <li key={title}><span>{numerals[index]}</span><div><strong>{title}</strong><p>{copy}</p></div></li>)}
        </ol>
      </div>
      <aside>یاد رکھیں: پہلے گاہک تک پہنچنا، بڑے دفتر سے زیادہ ضروری ہے۔</aside>
    </section>
  );
}

const styles = `
  .lc-card{--cream:#fff3d8;--orange:#e66b50;--yellow:#ffd978;position:relative;overflow:hidden;max-width:1100px;margin:28px auto;padding:clamp(28px,5vw,65px);border-radius:32px;background:#5a2735;color:var(--cream);font-family:"Jameel Noori Nastaleeq","Noto Nastaliq Urdu",serif;box-shadow:0 24px 60px #431c2e35;text-align:right}.lc-card *{box-sizing:border-box}.lc-dots{position:absolute;inset:0;background-image:radial-gradient(#ffd9784a 1px,transparent 1px);background-size:17px 17px;mask-image:linear-gradient(90deg,#0000,#000 35%,#0000);pointer-events:none}
  .lc-card header,.lc-body,.lc-card aside{position:relative}.lc-card header span{color:var(--yellow);font-size:clamp(21px,2.3vw,29px)}.lc-card h2{margin:2px 0;font-size:clamp(42px,5vw,70px);line-height:1.25}.lc-card header p{max-width:710px;margin:0;color:#ffeecb;font-size:clamp(23px,2.5vw,34px);line-height:1.7}.lc-body{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(22px,5vw,70px);align-items:center;margin-top:18px}.lc-visual{position:relative;text-align:center}.lc-visual svg{width:min(100%,390px);filter:drop-shadow(0 12px 12px #2c0f2050)}.lc-visual div{margin-top:-28px;display:flex;justify-content:center;gap:13px;font-size:clamp(25px,2.7vw,37px)}.lc-visual b{color:var(--yellow)}.lc-visual i{font-style:normal;color:#fff}.lc-steps{list-style:none;margin:0;padding:0;display:grid;gap:10px}.lc-steps li{display:flex;align-items:center;gap:15px;padding:10px 13px;border-bottom:1px solid #fff3d844}.lc-steps span{flex:0 0 47px;width:47px;height:47px;border-radius:50%;display:grid;place-items:center;background:var(--yellow);color:#5a2735;font-family:Arial,sans-serif;font-size:22px;font-weight:700}.lc-steps strong{font-size:clamp(28px,2.9vw,39px);line-height:1.1;color:var(--yellow)}.lc-steps p{margin:0;font-size:clamp(20px,2.1vw,28px);line-height:1.5}.lc-card aside{margin-top:25px;padding:16px 22px;border-radius:17px;background:linear-gradient(90deg,#e66b50,#bf4d4d);font-size:clamp(24px,2.7vw,36px);line-height:1.5;text-align:center}
  @media(max-width:700px){.lc-card{padding:27px 18px;border-radius:23px}.lc-body{grid-template-columns:1fr;gap:12px}.lc-visual{order:2}.lc-steps strong{font-size:30px}.lc-steps p{font-size:23px}}
`;

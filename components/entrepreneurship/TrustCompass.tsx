import React from "react";

/** مضمون کے حصے: دیانت، اعتماد اور دیرپا شہرت */
export default function TrustCompass() {
  const values = [
    ["سچائی", "وعدہ اور بات میں یکسانیت"],
    ["معیار", "کم کام، مگر اچھا کام"],
    ["ذمہ داری", "غلطی تسلیم کر کے درست کرنا"],
    ["خدمت", "گاہک کے مسئلے کو اہم سمجھنا"],
  ];
  return (
    <section className="tc-card" dir="rtl" lang="ur" aria-labelledby="tc-title">
      <style>{styles}</style>
      <div className="tc-stars" aria-hidden="true" />
      <header><span>کاروبار کی اصل کرنسی</span><h2 id="tc-title">دیانت سے جنم لیتا ہے اعتماد</h2><p>قیمت ایک بار لی جاتی ہے، اعتماد بار بار واپس آتا ہے۔</p></header>
      <div className="tc-layout">
        <div className="tc-compass" aria-label="اعتماد کا قطب نما">
          <svg viewBox="0 0 370 370" role="img" aria-label="چار اقدار کے ساتھ قطب نما">
            <circle cx="185" cy="185" r="145" fill="#123653" stroke="#81d8d0" strokeWidth="2"/>
            <circle cx="185" cy="185" r="100" fill="none" stroke="#81d8d066" strokeWidth="2" strokeDasharray="3 9"/>
            <path d="M185 53v264M53 185h264" stroke="#81d8d044" strokeWidth="2"/>
            <path d="M185 78l33 107-33-17-33 17 33-107Z" fill="#ffca6d"/><path d="M185 292l-33-107 33 17 33-17-33 107Z" fill="#4cb0a8"/>
            <circle cx="185" cy="185" r="25" fill="#fff0cc"/><circle cx="185" cy="185" r="10" fill="#0a2943"/>
            <text x="185" y="31" textAnchor="middle" className="tc-svg">سچائی</text><text x="338" y="194" textAnchor="middle" className="tc-svg">معیار</text><text x="185" y="354" textAnchor="middle" className="tc-svg">خدمت</text><text x="32" y="194" textAnchor="middle" className="tc-svg">ذمہ داری</text>
          </svg>
        </div>
        <div className="tc-values">
          {values.map(([title, description]) => <article key={title}><span>✦</span><div><h3>{title}</h3><p>{description}</p></div></article>)}
        </div>
      </div>
      <footer><b>لمبی دوڑ کا اصول:</b> ہر معاملہ اس طرح کریں کہ اعتماد بڑھ جائے۔</footer>
    </section>
  );
}

const styles = `
  .tc-card{--deep:#0a2943;--blue:#123653;--mint:#81d8d0;--sun:#ffca6d;position:relative;isolation:isolate;overflow:hidden;max-width:1100px;margin:28px auto;padding:clamp(28px,5vw,65px);border-radius:32px;background:linear-gradient(135deg,var(--deep),#18546b);color:#effdfa;font-family:"Jameel Noori Nastaleeq","Noto Nastaliq Urdu",serif;box-shadow:0 23px 60px #0a294355;text-align:right}.tc-card *{box-sizing:border-box}.tc-stars{position:absolute;inset:0;z-index:-1;background-image:radial-gradient(#ffca6d 1px,transparent 1.5px),radial-gradient(#81d8d0 1px,transparent 1.5px);background-size:47px 47px,83px 83px;background-position:3px 6px,17px 39px;opacity:.35}.tc-card header{max-width:740px}.tc-card header span{color:var(--sun);font-size:clamp(21px,2.2vw,29px)}.tc-card h2{margin:3px 0;font-size:clamp(42px,5vw,70px);line-height:1.25;color:#fff8e8}.tc-card header p{margin:0;font-size:clamp(23px,2.5vw,34px);line-height:1.7}.tc-layout{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(25px,6vw,85px);align-items:center;margin-top:20px}.tc-compass{text-align:center}.tc-compass svg{width:100%;max-width:370px}.tc-svg{fill:#effdfa;font-family:"Jameel Noori Nastaleeq","Noto Nastaliq Urdu",serif;font-size:25px}.tc-values{display:grid;grid-template-columns:1fr 1fr;gap:12px}.tc-values article{display:flex;gap:11px;padding:14px;border:1px solid #81d8d044;border-radius:18px;background:#0a29439c;backdrop-filter:blur(5px)}.tc-values article>span{color:var(--sun);font-family:Arial,sans-serif;font-size:24px;line-height:1.8}.tc-values h3{margin:0;color:var(--mint);font-size:clamp(28px,2.8vw,39px);line-height:1}.tc-values p{margin:4px 0 0;font-size:clamp(19px,2vw,27px);line-height:1.45}.tc-card footer{margin-top:25px;padding:15px 18px;border-radius:17px;background:#ffca6d;color:#0a2943;font-size:clamp(24px,2.6vw,36px);line-height:1.5;text-align:center}.tc-card footer b{font-weight:700}
  @media(max-width:720px){.tc-card{padding:27px 18px;border-radius:23px}.tc-layout{grid-template-columns:1fr;gap:5px}.tc-compass svg{max-width:320px}.tc-values{grid-template-columns:1fr}.tc-values h3{font-size:32px}.tc-values p{font-size:23px}.tc-card footer{font-size:28px}}
`;

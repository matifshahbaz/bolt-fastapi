import React from "react";

/** مضمون کے حصے: تعلیم کے ساتھ عملی سیکھنا */
export default function LearningPath() {
  return (
    <section className="lp-card" dir="rtl" lang="ur" aria-labelledby="lp-title">
      <style>{styles}</style>
      <header><span>علم کو حرکت دیں</span><h2 id="lp-title">تعلیم اور عملی سیکھنا، ساتھ ساتھ</h2><p>تعلیم نقشہ دیتی ہے؛ عملی کوشش راستے کے نشیب و فراز سکھاتی ہے۔</p></header>
      <div className="lp-road" aria-label="علم اور عمل کو ملانے والا راستہ">
        <svg viewBox="0 0 920 270" role="img" aria-label="دونوں طرف کے ستونوں کو ملاتا ہوا پل">
          <defs><linearGradient id="lp-bridge" x1="0" x2="1"><stop stopColor="#654fc5"/><stop offset=".5" stopColor="#e46b86"/><stop offset="1" stopColor="#f5b844"/></linearGradient></defs>
          <path d="M79 184C260 44 608 44 841 184" fill="none" stroke="url(#lp-bridge)" strokeWidth="22" strokeLinecap="round"/>
          <path d="M79 183v48M841 183v48" stroke="#fff1df" strokeWidth="16" strokeLinecap="round"/><path d="M34 233h89M797 233h89" stroke="#fff1df" strokeWidth="16" strokeLinecap="round"/>
          <circle cx="207" cy="111" r="10" fill="#f5b844"/><circle cx="353" cy="72" r="10" fill="#f5b844"/><circle cx="505" cy="70" r="10" fill="#f5b844"/><circle cx="661" cy="111" r="10" fill="#f5b844"/>
          <text x="79" y="265" textAnchor="middle" className="lp-svg">تعلیم</text><text x="841" y="265" textAnchor="middle" className="lp-svg">عمل</text><text x="460" y="128" textAnchor="middle" className="lp-svg lp-mid">اعتماد، مہارت، فہم</text>
        </svg>
        <div className="lp-mobile-road"><span>تعلیم</span><b>اعتماد، مہارت، فہم</b><span>عمل</span></div>
      </div>
      <div className="lp-cards">
        <article><div className="lp-icon">⌁</div><h3>تعلیم کیا دیتی ہے؟</h3><p>بنیاد، زبان، اصول اور بہتر سوال کرنے کی صلاحیت۔</p></article>
        <article><div className="lp-icon">◈</div><h3>عمل کیا دیتا ہے؟</h3><p>بازار کی سمجھ، گاہک کی رائے اور فیصلہ کرنے کی پختگی۔</p></article>
        <article><div className="lp-icon">✦</div><h3>بہترین امتزاج</h3><p>پڑھیں، آزمائیں، نتیجہ نوٹ کریں اور اگلا قدم بہتر بنائیں۔</p></article>
      </div>
    </section>
  );
}

const styles = `
  .lp-card{--paper:#fff1df;--violet:#654fc5;--rose:#e46b86;--gold:#f5b844;position:relative;overflow:hidden;max-width:1100px;margin:28px auto;padding:clamp(28px,5vw,65px);border-radius:32px;background:linear-gradient(145deg,#2d235e,#5a418c);color:var(--paper);font-family:"Jameel Noori Nastaleeq","Noto Nastaliq Urdu",serif;box-shadow:0 23px 60px #281d5145;text-align:right}.lp-card *{box-sizing:border-box}.lp-card:after{content:"";position:absolute;width:450px;height:450px;border:1px solid #f5b84444;border-radius:50%;left:-280px;bottom:-290px}.lp-card header{position:relative;z-index:1}.lp-card header span{color:var(--gold);font-size:clamp(20px,2.1vw,28px)}.lp-card h2{margin:3px 0;font-size:clamp(41px,5vw,69px);line-height:1.25}.lp-card header p{max-width:760px;margin:0;font-size:clamp(23px,2.5vw,34px);line-height:1.7}.lp-road{position:relative;margin:9px 0 5px}.lp-road svg{display:block;width:100%;overflow:visible}.lp-mobile-road{display:none}.lp-svg{fill:#fff1df;font-family:"Jameel Noori Nastaleeq","Noto Nastaliq Urdu",serif;font-size:31px}.lp-mid{fill:#f5b844;font-size:28px}.lp-cards{position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin-top:14px}.lp-cards article{padding:17px 18px;border-radius:18px;background:#ffffff15;border:1px solid #fff1df33}.lp-icon{color:var(--gold);font-family:Arial,sans-serif;font-size:35px;line-height:1}.lp-cards h3{margin:4px 0 0;color:#f5b844;font-size:clamp(27px,2.7vw,38px);line-height:1.2}.lp-cards p{margin:3px 0 0;font-size:clamp(19px,2vw,27px);line-height:1.5}
  @media(max-width:700px){.lp-card{padding:27px 18px;border-radius:23px}.lp-road{margin:24px 0 16px}.lp-road svg{display:none}.lp-mobile-road{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:7px;text-align:center}.lp-mobile-road span{font-size:23px}.lp-mobile-road b{border-top:5px solid var(--rose);padding-top:9px;color:var(--gold);font-size:19px;line-height:1.45}.lp-cards{grid-template-columns:1fr}.lp-cards h3{font-size:32px}.lp-cards p{font-size:23px}}
`;

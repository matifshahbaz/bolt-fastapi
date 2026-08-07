import React from "react";

/** مضمون کے حصے: چھوٹا، ناپا تلا رسک */
export default function SmallRisk() {
  return (
    <section className="sr-card" dir="rtl" lang="ur" aria-labelledby="sr-title">
      <style>{styles}</style>
      <header><span>حکمتِ عملی</span><h2 id="sr-title">چھوٹا رسک، واضح سیکھ</h2><p>اندھا خطرہ نہیں؛ ایسا تجربہ جس میں نقصان محدود اور سیکھنے کا امکان زیادہ ہو۔</p></header>
      <div className="sr-grid">
        <div className="sr-scale" aria-label="رسک اور سیکھ کے درمیان توازن">
          <svg viewBox="0 0 380 270" role="img" aria-label="متوازن ترازو کی علامت">
            <path d="M190 41v151M110 194h160M191 43l-57 55M191 43l57 55" stroke="#16383c" strokeWidth="10" strokeLinecap="round"/>
            <path d="M61 101h145L168 179H99L61 101ZM174 101h145l-38 78h-69l-38-78Z" fill="#d4f2dd" stroke="#16383c" strokeWidth="7" strokeLinejoin="round"/>
            <text x="134" y="149" textAnchor="middle" className="sr-svg-text">کم نقصان</text><text x="246" y="149" textAnchor="middle" className="sr-svg-text">زیادہ سیکھ</text>
            <circle cx="190" cy="39" r="18" fill="#e8a83d"/><path d="M190 9v12M190 57v12M160 39h12M208 39h12" stroke="#e8a83d" strokeWidth="6" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="sr-rules">
          <article><span>۱</span><h3>حد مقرر کریں</h3><p>اتنی رقم یا وقت رکھیں جس کا نقصان برداشت ہو سکے۔</p></article>
          <article><span>۲</span><h3>چھوٹا تجربہ کریں</h3><p>پہلے محدود گاہکوں، مصنوعات یا علاقے سے آزمائیں۔</p></article>
          <article><span>۳</span><h3>نتیجہ نوٹ کریں</h3><p>جو کام کرے اسے بڑھائیں، جو نہ چلے اسے بدل دیں۔</p></article>
        </div>
      </div>
      <div className="sr-equation"><b>بہتر فیصلہ</b><i> = </i><span>محدود رسک</span><i> + </i><span>تیز مشاہدہ</span></div>
    </section>
  );
}

const styles = `
  .sr-card{--green:#d4f2dd;--ink:#16383c;--gold:#e8a83d;max-width:1100px;margin:28px auto;padding:clamp(27px,5vw,64px);border-radius:32px;background:linear-gradient(145deg,#ebf7e9,#bde9d6);color:var(--ink);font-family:"Jameel Noori Nastaleeq","Noto Nastaliq Urdu",serif;box-shadow:0 22px 55px #0f5e4630;text-align:right}.sr-card *{box-sizing:border-box}.sr-card header span{display:inline-block;padding:3px 17px;border:1px solid #16383c88;border-radius:999px;font-size:clamp(20px,2.1vw,28px)}.sr-card h2{margin:10px 0 3px;font-size:clamp(42px,5vw,70px);line-height:1.2}.sr-card header p{max-width:740px;margin:0;font-size:clamp(23px,2.5vw,34px);line-height:1.65}.sr-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:clamp(22px,6vw,80px);align-items:center;margin-top:22px}.sr-scale svg{width:100%;max-width:390px}.sr-svg-text{fill:#16383c;font-family:"Jameel Noori Nastaleeq","Noto Nastaliq Urdu",serif;font-size:25px}.sr-rules{display:grid;gap:12px}.sr-rules article{display:grid;grid-template-columns:50px 1fr;column-gap:15px;padding:14px 15px;border-radius:18px;background:#ffffff91;border:1px solid #ffffff}.sr-rules span{grid-row:span 2;display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:var(--ink);color:var(--green);font-family:Arial,sans-serif;font-weight:bold;font-size:22px}.sr-rules h3{margin:0;color:#29595b;font-size:clamp(28px,2.8vw,39px);line-height:1}.sr-rules p{margin:2px 0 0;font-size:clamp(20px,2.1vw,29px);line-height:1.5}.sr-equation{margin-top:26px;padding:16px 20px;border-radius:18px;background:var(--ink);color:#fff;text-align:center;font-size:clamp(24px,2.7vw,37px);line-height:1.5}.sr-equation b{color:var(--gold)}.sr-equation span{color:#d4f2dd}.sr-equation i{margin:0 8px;color:var(--gold);font-style:normal}
  @media(max-width:700px){.sr-card{padding:26px 18px;border-radius:23px}.sr-grid{grid-template-columns:1fr;gap:5px}.sr-scale{text-align:center}.sr-scale svg{max-width:330px}.sr-rules h3{font-size:31px}.sr-rules p{font-size:23px}.sr-equation{font-size:28px}}
`;

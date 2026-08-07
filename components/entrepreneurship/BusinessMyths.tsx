import React from "react";

/** مضمون کے حصے: کاروبار سے متعلق عام غلط فہمیاں */
export default function BusinessMyths() {
  return (
    <section className="bm-card" dir="rtl" lang="ur" aria-labelledby="bm-title">
      <style>{styles}</style>
      <div className="bm-halo bm-halo-one" />
      <div className="bm-halo bm-halo-two" />
      <header className="bm-header">
        <span className="bm-kicker">سوچ کا زاویہ بدلیں</span>
        <h2 id="bm-title">کاروبار سے متعلق غلط فہمیاں</h2>
        <p>راستہ مشکل ہو سکتا ہے، مگر ناممکن نہیں۔ صحیح سمجھ پہلا سرمایہ ہے۔</p>
      </header>

      <div className="bm-map" aria-label="چار عام غلط فہمیاں اور ان کی حقیقت">
        <svg className="bm-orbit" viewBox="0 0 520 400" aria-hidden="true">
          <defs>
            <linearGradient id="bm-line" x1="0" x2="1">
              <stop stopColor="#f6c768" stopOpacity=".1" />
              <stop offset=".5" stopColor="#f6c768" stopOpacity=".95" />
              <stop offset="1" stopColor="#f6c768" stopOpacity=".1" />
            </linearGradient>
          </defs>
          <path d="M260 60C426 60 486 166 412 257C353 328 169 352 84 259C10 177 96 62 260 60Z" fill="none" stroke="url(#bm-line)" strokeWidth="2" strokeDasharray="5 10" />
          <circle cx="260" cy="200" r="77" fill="#123c4a" stroke="#f6c768" strokeWidth="2" />
          <path d="M228 199l22 23 46-52" fill="none" stroke="#f6c768" strokeLinecap="round" strokeLinejoin="round" strokeWidth="11" />
        </svg>

        <article className="bm-point bm-a"><span>غلط فہمی</span><strong>بڑا سرمایہ لازم ہے</strong><b>حقیقت: آغاز چھوٹا بھی ہو سکتا ہے</b></article>
        <article className="bm-point bm-b"><span>غلط فہمی</span><strong>پہلے مکمل تجربہ چاہیے</strong><b>حقیقت: تجربہ عمل سے بنتا ہے</b></article>
        <article className="bm-point bm-c"><span>غلط فہمی</span><strong>فوراً کامیابی ملتی ہے</strong><b>حقیقت: تسلسل راستہ بناتا ہے</b></article>
        <article className="bm-point bm-d"><span>غلط فہمی</span><strong>ناکامی اختتام ہے</strong><b>حقیقت: سبق اگلا قدم ہے</b></article>
      </div>

      <footer className="bm-footer">صحیح سوال: <em>میں آج چھوٹا، سمجھ دار قدم کیا اٹھا سکتا ہوں؟</em></footer>
    </section>
  );
}

const styles = `
  .bm-card{--ink:#f9f2dc;--navy:#082c38;--teal:#0e5961;--gold:#f6c768;position:relative;isolation:isolate;overflow:hidden;max-width:1100px;margin:28px auto;padding:clamp(28px,5vw,66px);border-radius:32px;background:linear-gradient(135deg,var(--navy),var(--teal));color:var(--ink);font-family:"Jameel Noori Nastaleeq","Noto Nastaliq Urdu",serif;box-shadow:0 24px 70px #05232c44;text-align:right}
  .bm-card *{box-sizing:border-box}.bm-halo{position:absolute;border:1px solid #f6c76833;border-radius:50%;z-index:-1}.bm-halo-one{width:430px;height:430px;left:-230px;top:-230px}.bm-halo-two{width:540px;height:540px;right:-340px;bottom:-360px}
  .bm-header{max-width:690px;margin-inline-start:auto}.bm-kicker{display:inline-block;padding:5px 18px;border:1px solid #f6c76877;border-radius:999px;color:var(--gold);font-size:clamp(20px,2.2vw,29px);line-height:1.4}.bm-header h2{margin:18px 0 4px;font-size:clamp(40px,5vw,70px);line-height:1.25;color:#fff7e6}.bm-header p{margin:0;font-size:clamp(23px,2.5vw,33px);line-height:1.7;color:#dbe7d5}
  .bm-map{position:relative;min-height:400px;margin-top:25px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px 74px;align-items:center}.bm-orbit{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.bm-point{position:relative;padding:19px 24px 17px;border:1px solid #ffffff28;border-radius:22px;background:#052b37bd;backdrop-filter:blur(8px);box-shadow:0 12px 25px #021a2140}.bm-point:nth-of-type(odd){transform:translateX(5%)}.bm-point span{display:block;color:var(--gold);font-size:clamp(19px,2vw,27px);line-height:1}.bm-point strong{display:block;margin-top:5px;font-size:clamp(25px,2.6vw,37px);line-height:1.45;color:#fff}.bm-point b{display:block;margin-top:2px;color:#b8ead4;font-size:clamp(19px,2vw,27px);font-weight:400;line-height:1.45}.bm-footer{margin-top:20px;padding:14px 20px;border-right:5px solid var(--gold);background:#f6c76815;font-size:clamp(24px,2.6vw,35px);line-height:1.6}.bm-footer em{color:var(--gold);font-style:normal}
  @media(max-width:650px){.bm-card{border-radius:23px;padding:26px 18px}.bm-map{grid-template-columns:1fr;min-height:0;gap:14px}.bm-orbit{display:none}.bm-point:nth-of-type(odd){transform:none}.bm-header h2{font-size:43px}.bm-header p{font-size:25px}.bm-point{padding:16px 18px}.bm-footer{font-size:27px}}
  @media(prefers-reduced-motion:no-preference){.bm-halo-one{animation:bm-float 8s ease-in-out infinite}.bm-halo-two{animation:bm-float 10s ease-in-out -3s infinite}@keyframes bm-float{50%{transform:translateY(15px)}}}
`;

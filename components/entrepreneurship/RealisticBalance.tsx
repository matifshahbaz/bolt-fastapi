import React from "react";

/** مضمون کے حصے: حقیقت پسندانہ توازن */
export default function RealisticBalance() {
  const sides = [
    ["جذبہ", "اپنی دلچسپی اور مقصد کو زندہ رکھیں", "rb-warm"],
    ["حقیقت", "وقت، بجٹ اور ذمہ داریوں کا حساب رکھیں", "rb-cool"],
  ];
  return (
    <section className="rb-card" dir="rtl" lang="ur" aria-labelledby="rb-title">
      <style>{styles}</style>
      <header><span>پائیدار رفتار</span><h2 id="rb-title">خواب اور حقیقت کا توازن</h2><p>نہ بے سوچا جوش، نہ خوف کی خاموشی؛ واضح حساب کے ساتھ آگے بڑھنا۔</p></header>
      <div className="rb-layout">
        {sides.map(([title, copy, tone]) => <article className={tone} key={title}><span className="rb-ornament">◌</span><h3>{title}</h3><p>{copy}</p></article>)}
        <div className="rb-center" aria-label="توازن کی علامت"><svg viewBox="0 0 250 250" role="img" aria-label="توازن میں دو دائرے"><circle cx="92" cy="125" r="68" fill="#f0b65a"/><circle cx="158" cy="125" r="68" fill="#56b7b0"/><path d="M125 34v182M34 125h182" stroke="#fff3d9" strokeWidth="4" strokeDasharray="5 8"/><circle cx="125" cy="125" r="36" fill="#203a4e"/><path d="M108 126l12 13 25-29" fill="none" stroke="#fff3d9" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/></svg><b>سمجھ دار قدم</b></div>
      </div>
      <div className="rb-checks"><span>چھوٹا ہدف</span><i>→</i><span>حقیقی آزمائش</span><i>→</i><span>جائزہ</span><i>→</i><span>بہتر اگلا قدم</span></div>
    </section>
  );
}

const styles = `
  .rb-card{--night:#203a4e;--paper:#fff3d9;--warm:#f0b65a;--cool:#56b7b0;max-width:1100px;margin:28px auto;padding:clamp(28px,5vw,65px);border-radius:32px;background:#f7f1e3;color:var(--night);font-family:"Jameel Noori Nastaleeq","Noto Nastaliq Urdu",serif;box-shadow:0 22px 55px #203a4e28;text-align:right}.rb-card *{box-sizing:border-box}.rb-card header{text-align:center}.rb-card header span{color:#b96947;font-size:clamp(20px,2.1vw,28px)}.rb-card h2{margin:3px 0;font-size:clamp(42px,5vw,70px);line-height:1.25}.rb-card header p{max-width:770px;margin:0 auto;font-size:clamp(23px,2.5vw,34px);line-height:1.7}.rb-layout{display:grid;grid-template-columns:1fr .7fr 1fr;gap:20px;align-items:center;margin-top:23px}.rb-layout article{min-height:185px;padding:24px;border-radius:25px}.rb-warm{background:#f8d996}.rb-cool{background:#b9e2dd}.rb-ornament{float:left;font-family:Arial,sans-serif;font-size:40px;line-height:.7;opacity:.72}.rb-layout h3{margin:0;font-size:clamp(35px,3.6vw,50px);line-height:1}.rb-layout p{margin:7px 0 0;font-size:clamp(21px,2.2vw,30px);line-height:1.55}.rb-center{text-align:center}.rb-center svg{display:block;width:100%;max-width:230px;margin:auto}.rb-center b{font-size:clamp(25px,2.5vw,34px);line-height:1.3}.rb-checks{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:7px;margin-top:24px;padding:16px;border-top:1px dashed #203a4e66;border-bottom:1px dashed #203a4e66;font-size:clamp(22px,2.3vw,31px);line-height:1.4}.rb-checks span{padding:2px 12px;border-radius:999px;background:#fff}.rb-checks i{color:#b96947;font-family:Arial,sans-serif;font-style:normal}
  @media(max-width:700px){.rb-card{padding:27px 18px;border-radius:23px}.rb-layout{grid-template-columns:1fr;gap:11px}.rb-layout article{min-height:0;padding:18px}.rb-center{order:-1}.rb-center svg{max-width:175px}.rb-layout h3{font-size:38px}.rb-layout p{font-size:25px}.rb-checks{font-size:26px}}
`;

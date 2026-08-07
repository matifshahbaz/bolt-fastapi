import React from "react";

/** مضمون کے حصے: کاروبار شروع کرنے کے عملی مراحل */
export default function PracticalStartSteps() {
  const steps = [
    ["مشاہدہ", "ایک حقیقی مسئلہ یا ضرورت پہچانیں"],
    ["انتخاب", "ایک سادہ پیش کش چنیں"],
    ["بات چیت", "ممکنہ گاہکوں کی رائے سنیں"],
    ["آزمائش", "چھوٹے پیمانے پر پیش کریں"],
    ["حساب", "خرچ، وقت اور نتیجہ لکھیں"],
    ["بہتری", "رائے کے مطابق اگلا چکر بہتر بنائیں"],
  ];
  const numerals = ["۱", "۲", "۳", "۴", "۵", "۶"];
  return (
    <section className="ps-card" dir="rtl" lang="ur" aria-labelledby="ps-title">
      <style>{styles}</style>
      <header><span>آج سے شروع کریں</span><h2 id="ps-title">شروعات کے عملی مراحل</h2><p>بڑے منصوبے کو اتنے چھوٹے قدموں میں بانٹیں کہ پہلا قدم آج اٹھایا جا سکے۔</p></header>
      <ol className="ps-journey" aria-label="کاروبار شروع کرنے کے چھ مراحل">
        {steps.map(([title, copy], index) => <li key={title}><span className="ps-num">{numerals[index]}</span><div className="ps-dot" aria-hidden="true"/><article><h3>{title}</h3><p>{copy}</p></article></li>)}
      </ol>
      <footer><span>پہلا عمل</span><b>کامل منصوبے کا انتظار مت کریں۔</b><i>آغاز، سیکھنے کا دروازہ ہے۔</i></footer>
    </section>
  );
}

const styles = `
  .ps-card{--ink:#202846;--purple:#6b5ccc;--pink:#ec7a93;--gold:#f7bf62;--paper:#fff9ee;position:relative;overflow:hidden;max-width:1100px;margin:28px auto;padding:clamp(28px,5vw,65px);border-radius:32px;background:var(--paper);color:var(--ink);font-family:"Jameel Noori Nastaleeq","Noto Nastaliq Urdu",serif;box-shadow:0 22px 55px #20284625;text-align:right}.ps-card *{box-sizing:border-box}.ps-card:before{content:"";position:absolute;inset:auto -80px -200px auto;width:470px;height:470px;border-radius:50%;background:radial-gradient(circle,#f7bf6238 0 25%,#ec7a931c 26% 45%,transparent 46%)}.ps-card header{position:relative}.ps-card header span{color:var(--purple);font-size:clamp(20px,2.1vw,28px)}.ps-card h2{margin:2px 0;font-size:clamp(42px,5vw,70px);line-height:1.25}.ps-card header p{max-width:760px;margin:0;font-size:clamp(23px,2.5vw,34px);line-height:1.7}.ps-journey{position:relative;margin:28px 0 0;padding:0;list-style:none;display:grid;grid-template-columns:repeat(6,1fr);gap:9px}.ps-journey:before{content:"";position:absolute;top:34px;right:7%;left:7%;height:3px;background:linear-gradient(90deg,var(--purple),var(--pink),var(--gold));z-index:0}.ps-journey li{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center}.ps-num{width:68px;height:68px;border:5px solid var(--paper);border-radius:50%;display:grid;place-items:center;background:var(--purple);color:#fff;font-family:Arial,sans-serif;font-size:25px;font-weight:700;box-shadow:0 3px 0 #5145ad}.ps-journey li:nth-child(2) .ps-num,.ps-journey li:nth-child(5) .ps-num{background:#a85fb7;box-shadow:0 3px 0 #874a94}.ps-journey li:nth-child(3) .ps-num,.ps-journey li:nth-child(4) .ps-num{background:var(--pink);box-shadow:0 3px 0 #c85f75}.ps-journey li:nth-child(6) .ps-num{background:var(--gold);box-shadow:0 3px 0 #cd9338;color:var(--ink)}.ps-dot{width:10px;height:10px;margin:7px;border-radius:50%;background:var(--gold)}.ps-journey article{padding:9px 5px}.ps-journey h3{margin:0;color:var(--purple);font-size:clamp(27px,2.65vw,37px);line-height:1.2}.ps-journey p{margin:2px 0 0;font-size:clamp(18px,1.85vw,25px);line-height:1.45}.ps-card footer{position:relative;display:flex;align-items:baseline;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:24px;padding:16px 18px;border-radius:17px;background:var(--ink);color:#fff;font-size:clamp(23px,2.5vw,34px);line-height:1.45}.ps-card footer span{color:var(--gold)}.ps-card footer i{color:#f3bed0;font-style:normal}
  @media(max-width:760px){.ps-card{padding:27px 18px;border-radius:23px}.ps-journey{grid-template-columns:1fr;margin-top:18px;gap:0}.ps-journey:before{top:35px;bottom:35px;right:33px;left:auto;width:3px;height:auto;background:linear-gradient(var(--purple),var(--pink),var(--gold))}.ps-journey li{display:grid;grid-template-columns:68px 1fr;text-align:right;column-gap:14px;margin-bottom:3px;align-items:start}.ps-num{grid-row:span 2}.ps-dot{display:none}.ps-journey article{padding:4px 0}.ps-journey h3{font-size:32px}.ps-journey p{font-size:23px}.ps-card footer{font-size:27px}}
`;

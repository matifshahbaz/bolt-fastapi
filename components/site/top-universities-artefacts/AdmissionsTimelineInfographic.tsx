"use client";

import { useMemo, useState } from 'react';
import { CalendarDays, Clock3, GraduationCap, RotateCw, Search, Trophy } from 'lucide-react';
import admissionsTimelineCss from './AdmissionsTimelineInfographicCss';

type University = { rank:number; name:string; rounds:string; deadline:string; classes:string; roundCount:1|2; deadlineMonth:number; deadlineLabel:string };

const universities: University[] = [
  {rank:1,name:'قائداعظم یونیورسٹی',rounds:'1 راؤنڈ (Fall)',deadline:'31 اگست',classes:'اکتوبر پہلا ہفتہ',roundCount:1,deadlineMonth:8,deadlineLabel:'اگست'},
  {rank:2,name:'نسٹ یونیورسٹی',rounds:'داخلہ 1 بار',deadline:'جون کے آخر تک',classes:'ستمبر دوسرا ہفتہ',roundCount:1,deadlineMonth:6,deadlineLabel:'جون'},
  {rank:3,name:'پنجاب یونیورسٹی',rounds:'2 راؤنڈ (Phase-I اور Phase-II)',deadline:'5 اگست Phase-I، 25 ستمبر Phase-II',classes:'اکتوبر / نومبر',roundCount:2,deadlineMonth:9,deadlineLabel:'اگست، ستمبر'},
  {rank:4,name:'لمز یونیورسٹی',rounds:'1 راؤنڈ (Fall)',deadline:'مئی شروع، ڈاکومنٹس 1 جون',classes:'اگست آخر',roundCount:1,deadlineMonth:5,deadlineLabel:'مئی'},
  {rank:5,name:'پیاس یونیورسٹی',rounds:'2 راؤنڈ',deadline:'28 مارچ Test-1، 21 جولائی Test-2',classes:'11 ستمبر اور 3 نومبر',roundCount:2,deadlineMonth:3,deadlineLabel:'مارچ، جولائی'},
  {rank:6,name:'کامسیٹس یونیورسٹی',rounds:'2 راؤنڈ (Spring اور Fall)',deadline:'دسمبر (Spring)، جولائی (Fall)',classes:'فروری اور ستمبر',roundCount:2,deadlineMonth:7,deadlineLabel:'جولائی، دسمبر'},
  {rank:7,name:'جی سی یو یونیورسٹی',rounds:'1 راؤنڈ (Fall)',deadline:'ستمبر کے شروع تک',classes:'اکتوبر',roundCount:1,deadlineMonth:9,deadlineLabel:'ستمبر'},
  {rank:8,name:'آغا خان یونیورسٹی',rounds:'1 راؤنڈ (Fall)',deadline:'جون کے شروع تک',classes:'اگست',roundCount:1,deadlineMonth:6,deadlineLabel:'جون'},
  {rank:9,name:'یو ای ٹی یونیورسٹی',rounds:'2 راؤنڈ (Spring اور Fall)',deadline:'13 اگست Fall، 22 دسمبر Spring',classes:'15 ستمبر اور 24 نومبر',roundCount:2,deadlineMonth:8,deadlineLabel:'اگست، دسمبر'},
  {rank:10,name:'این ای ڈی یونیورسٹی',rounds:'2 راؤنڈ (Fall اور Spring)',deadline:'5 جون اور 17 دسمبر',classes:'9 اگست اور 5 جنوری',roundCount:2,deadlineMonth:6,deadlineLabel:'جون، دسمبر'}
];
const months=['جنوری','فروری','مارچ','اپریل','مئی','جون','جولائی','اگست','ستمبر','اکتوبر','نومبر','دسمبر'];

export default function App(){
 const [query,setQuery]=useState(''); const [filter,setFilter]=useState<'all'|1|2>('all'); const [selected,setSelected]=useState(universities[0]);
 const filtered=useMemo(()=>universities.filter(u=>u.name.includes(query.trim())&&(filter==='all'||u.roundCount===filter)),[query,filter]);
 const starts=[{m:'اگست',n:['لمز','آغا خان','این ای ڈی']},{m:'ستمبر',n:['نسٹ','پیاس','یو ای ٹی','کامسیٹس']},{m:'اکتوبر',n:['قائداعظم','پنجاب','جی سی یو']},{m:'نومبر',n:['پنجاب','پیاس','یو ای ٹی']}];
 return <>
 <style>{admissionsTimelineCss}</style>
 <main className="shell" dir="rtl">
  <header className="hero"><div className="ticker"><span>داخلہ ڈیٹا</span><span>پاکستان</span><span>ٹاپ 10</span><span>2026</span></div><div className="heroGrid"><div><p className="eyebrow">تعلیمی ڈیٹا ڈیش بورڈ</p><h1>داخلہ انٹیلیجنس رپورٹ</h1><p>رینک، آخری تاریخ، داخلہ راؤنڈز اور کلاسز کے آغاز کا جامع منظر</p></div><div className="brand"><GraduationCap size={48}/><strong>shama.pk</strong><small>درست انتخاب، روشن مستقبل</small></div></div></header>
  <section className="controls card"><label><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="یونیورسٹی تلاش کریں"/></label><div>{(['all',1,2] as const).map(x=><button key={x} className={filter===x?'active':''} onClick={()=>setFilter(x)}>{x==='all'?'تمام':`${x} راؤنڈ`}</button>)}</div></section>
  <section className="kpis"><Kpi icon={<Trophy/>} label="اعلیٰ رینک" value="قائداعظم" note="#1"/><Kpi icon={<Clock3/>} label="ابتدائی درج آخری تاریخ" value="پیاس" note="28 مارچ"/><Kpi icon={<RotateCw/>} label="دو راؤنڈ والی جامعات" value="5" note="مزید مواقع"/><Kpi icon={<CalendarDays/>} label="جلد درج کلاسز" value="این ای ڈی" note="9 اگست"/></section>
  <section className="dashboard"><article className="card timeline"><Title kicker="وقت کی لکیر" title="اپلائی کی آخری تاریخیں"/><div className="months">{months.map((m,i)=><span key={m} className={i+1===selected.deadlineMonth?'hot':''}>{m}</span>)}</div><div className="tracks">{filtered.map(u=><button key={u.rank} className={selected.rank===u.rank?'track selected':'track'} onClick={()=>setSelected(u)}><span><b>#{u.rank}</b> {u.name}</span><i><em style={{width:`${u.deadlineMonth/12*100}%`}}/></i><small>{u.deadlineLabel}</small></button>)}</div></article>
  <aside className="card focus"><span className="badge">پاکستان رینک #{selected.rank}</span><h2>{selected.name}</h2><Row label="داخلہ راؤنڈز" value={selected.rounds}/><Row label="آخری تاریخ" value={selected.deadline}/><Row label="کلاسز کا آغاز" value={selected.classes}/></aside></section>
  <section className="card section"><Title kicker="تقابلی منظر" title="داخلہ راؤنڈز"/><div className="roundGrid">{([1,2] as const).map(n=><div key={n}><h3>{n} راؤنڈ</h3>{universities.filter(u=>u.roundCount===n).map(u=><div key={u.rank} className="roundRow"><span>{u.name}</span><i className={n===2?'two':''}/></div>)}</div>)}</div></section>
  <section className="card section"><Title kicker="تعلیمی کیلنڈر" title="کلاسز کب شروع ہوتی ہیں؟"/><div className="calendar">{starts.map(g=><div key={g.m}><strong>{g.m}</strong>{g.n.map(n=><span key={n}>{n}</span>)}</div>)}</div></section>
  <section className="card section"><Title kicker="تفصیلی فہرست" title="ٹاپ 10 یونیورسٹیز"/><div className="uniGrid">{filtered.map(u=><button key={u.rank} onClick={()=>setSelected(u)}><b>#{u.rank}</b><h3>{u.name}</h3><p>{u.deadline}</p><small>{u.rounds}</small></button>)}</div></section>
  <footer><strong>shama.pk</strong><span>تاریخوں کی حتمی تصدیق متعلقہ یونیورسٹی سے کریں۔</span></footer>
 </main>
 </>
}
const Kpi=({icon,label,value,note}:{icon:React.ReactNode,label:string,value:string,note:string})=><div className="card kpi"><span>{icon}</span><small>{label}</small><strong>{value}</strong><em>{note}</em></div>;
const Title=({kicker,title}:{kicker:string,title:string})=><div className="title"><span>{kicker}</span><h2>{title}</h2></div>;
const Row=({label,value}:{label:string,value:string})=><div className="row"><small>{label}</small><strong>{value}</strong></div>;

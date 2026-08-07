import type { CSSProperties } from 'react';
import './computer-science-it-banner.css';

type BannerProps = {
  className?: string;
  style?: CSSProperties;
};

const topicCards = [
  { number: '01', label: 'پروگرامنگ', icon: 'code' },
  { number: '02', label: 'ڈیٹا اور اے آئی', icon: 'data' },
  { number: '03', label: 'نیٹ ورکنگ', icon: 'network' },
];

const disciplines = [
  { label: 'کوڈنگ', icon: 'code' },
  { label: 'ڈیٹا', icon: 'data' },
  { label: 'سائبر سکیورٹی', icon: 'shield' },
  { label: 'کلاؤڈ', icon: 'cloud' },
];

function LineIcon({ name }: { name: string }) {
  const shared = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'code':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...shared} d="m11 9-7 7 7 7M21 9l7 7-7 7M18.5 6 13.5 26" /></svg>;
    case 'data':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><ellipse {...shared} cx="16" cy="8" rx="9" ry="4" /><path {...shared} d="M7 8v8c0 2.2 4 4 9 4s9-1.8 9-4V8M7 16v8c0 2.2 4 4 9 4s9-1.8 9-4v-8" /></svg>;
    case 'network':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><circle {...shared} cx="16" cy="7" r="3" /><circle {...shared} cx="7" cy="23" r="3" /><circle {...shared} cx="25" cy="23" r="3" /><path {...shared} d="m14.5 9.6-6 10.8M17.5 9.6l6 10.8M10 23h12" /></svg>;
    case 'shield':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...shared} d="M16 4c3.2 2.2 6.6 3.2 10 3.5v7.1c0 6.1-4.1 10.6-10 13.4-5.9-2.8-10-7.3-10-13.4V7.5C9.4 7.2 12.8 6.2 16 4Z" /><path {...shared} d="m11.7 15.9 2.8 2.8 5.9-6" /></svg>;
    case 'cloud':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...shared} d="M9.6 24h12.8a5.6 5.6 0 0 0 .9-11.1A7.8 7.8 0 0 0 8.2 15.3 4.4 4.4 0 0 0 9.6 24Z" /><path {...shared} d="M16 12v9m0-9-3 3m3-3 3 3" /></svg>;
    case 'chip':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><rect {...shared} x="9" y="9" width="14" height="14" rx="2" /><rect {...shared} x="13" y="13" width="6" height="6" rx="1" /><path {...shared} d="M12 4v5m4-5v5m4-5v5M12 23v5m4-5v5m4-5v5M4 12h5m-5 4h5m-5 4h5m14-8h5m-5 4h5m-5 4h5" /></svg>;
    default:
      return null;
  }
}

export function ComputerScienceITBanner({ className = '', style }: BannerProps) {
  return (
    <section
      className={`csit-banner ${className}`.trim()}
      style={style}
      dir="rtl"
      aria-labelledby="csit-banner-title"
      data-computer-science-artifact="field-banner"
    >
      <div className="csit-banner__grain" />
      <div className="csit-banner__orbit csit-banner__orbit--one" />
      <div className="csit-banner__orbit csit-banner__orbit--two" />
      <div className="csit-banner__nodes" aria-hidden="true"><i /><i /><i /><i /><i /></div>

      <div className="csit-banner__content">
        <div className="csit-banner__copy">
          <p className="csit-banner__eyebrow"><span /> مستقبل کی دنیا کو سمجھیں</p>
          <h2 id="csit-banner-title">کمپیوٹر سائنس<br />اور آئی ٹی کی فیلڈ</h2>
          <p className="csit-banner__subtitle">ایک تفصیلی اور حقیقی جائزہ</p>
          <div className="csit-banner__accent-rule"><span /></div>
          <p className="csit-banner__summary">تعلیم، مہارتوں اور کیریئر کے نئے امکانات کا واضح نقشہ</p>
        </div>

        <div className="csit-banner__illustration" aria-label="کمپیوٹر، دنیا اور ٹیکنالوجی کے موضوعات کی تصویری وضاحت">
          <div className="csit-banner__topic-stack">
            {topicCards.map((topic) => (
              <div className="csit-banner__topic-card" key={topic.number}>
                <span className="csit-banner__topic-number">{topic.number}</span>
                <span className="csit-banner__topic-icon"><LineIcon name={topic.icon} /></span>
                <span>{topic.label}</span>
              </div>
            ))}
          </div>
          <div className="csit-banner__globe" aria-hidden="true">
            <span className="csit-banner__globe-lat lat-one" /><span className="csit-banner__globe-lat lat-two" />
            <span className="csit-banner__globe-long long-one" /><span className="csit-banner__globe-long long-two" />
            <b className="dot dot-one" /><b className="dot dot-two" /><b className="dot dot-three" />
          </div>
          <div className="csit-banner__laptop" aria-hidden="true">
            <div className="csit-banner__laptop-screen"><span className="screen-code">&lt;/&gt;</span><span className="screen-line one" /><span className="screen-line two" /><span className="screen-line three" /></div>
            <div className="csit-banner__laptop-base"><span /></div>
          </div>
          <div className="csit-banner__chip"><LineIcon name="chip" /></div>
          <div className="csit-banner__spark spark-one">✦</div><div className="csit-banner__spark spark-two">✦</div>
        </div>
      </div>

      <footer className="csit-banner__footer">
        <div className="csit-banner__site"><span className="csit-banner__site-mark">ش</span><span>shama.pk</span></div>
        <div className="csit-banner__disciplines">
          {disciplines.map((discipline) => <div className="csit-banner__discipline" key={discipline.label}><span><LineIcon name={discipline.icon} /></span>{discipline.label}</div>)}
        </div>
      </footer>
    </section>
  );
}
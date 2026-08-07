import { AlertCircle, HelpCircle, MessageSquare } from 'lucide-react';

const stages = [
  {
    label: 'مرحلہ 01',
    title: 'فیصلے کا دباؤ اور کم عمری',
    text: 'اگر آپ میٹرک، انٹرمیڈیٹ یا یونیورسٹی کے ابتدائی مرحلے میں ہیں اور ابھی تک یہ طے نہیں کر پائے کہ آگے کیا کرنا ہے، تو یہ کوئی غیر معمولی بات نہیں۔ آج کا نوجوان اکثر سولہ سے بیس سال کی عمر میں ایسے فیصلوں کے سامنے کھڑا ہوتا ہے جن کے اثرات کئی سال تک اس کی زندگی کے ساتھ رہتے ہیں۔ اس عمر میں تجربہ کم ہوتا ہے، دنیا کی سمجھ ابھی بن رہی ہوتی ہے، گھر والوں کی توقعات بڑھ رہی ہوتی ہیں، دوست اپنے اپنے راستے چن رہے ہوتے ہیں، اور معاشرہ یہ سوال بار بار پوچھتا ہے کہ اب آگے کیا ارادہ ہے؟ یہی سوال بظاہر سادہ لگتا ہے، مگر ایک نوجوان کے لیے یہ بہت بڑا ذہنی بوجھ بن سکتا ہے۔',
    icon: HelpCircle,
    accent: '#FF6B00',
    background: 'from-[#FFF5EC] to-[#FFE6D1]',
  },
  {
    label: 'مرحلہ 02',
    title: 'اصل پریشانی نالائقی نہیں، معلومات کی کمی ہے',
    text: 'بہت سے نوجوان سمجھتے ہیں کہ شاید وہ خود کمزور ہیں، شاید ان میں فیصلہ کرنے کی صلاحیت نہیں، یا شاید وہ دوسروں کی طرح واضح ذہن نہیں رکھتے۔ حقیقت اکثر اس کے برعکس ہوتی ہے۔ مسئلہ یہ نہیں کہ نوجوان سوچ نہیں سکتا؛ مسئلہ یہ ہے کہ اسے سوچنے کے لیے مکمل نقشہ نہیں دیا جاتا۔ اسے چند مشہور راستوں کے نام تو بتا دیے جاتے ہیں، مگر یہ نہیں بتایا جاتا کہ ان راستوں کی حقیقت کیا ہے، ان میں داخلہ کیسے ہوتا ہے، کن صلاحیتوں کی ضرورت پڑتی ہے، روزمرہ کام کی نوعیت کیا ہوتی ہے، اور کون سا راستہ کس مزاج کے انسان کے لیے بہتر ہو سکتا ہے۔ جب معلومات ادھوری ہوں تو الجھن فطری ہے۔',
    icon: AlertCircle,
    accent: '#F59E0B',
    background: 'from-[#FFFBEB] to-[#FEF3C7]',
  },
  {
    label: 'مرحلہ 03',
    title: 'ہر طرف مشورے، مگر واضح راستہ کم',
    text: 'آج ایک نوجوان کو مشورے بہت ملتے ہیں، مگر رہنمائی کم ملتی ہے۔ کوئی کہتا ہے ڈاکٹر بنو، کوئی کہتا ہے کمپیوٹر پڑھو، کوئی سرکاری نوکری کو محفوظ سمجھتا ہے، کوئی کاروبار کو آزادی کا راستہ بتاتا ہے، کوئی بیرونِ ملک جانے کا خواب دکھاتا ہے، اور کوئی کہتا ہے کہ آج کل سب کچھ آن لائن ہے۔ دلچسپ بات یہ ہے کہ ہر مشورہ دینے والا اپنی نظر سے درست بات کر رہا ہوتا ہے، مگر ہر مشورہ ہر نوجوان کے لیے درست نہیں ہوتا۔ ایک طالب علم کے لیے اصل مشکل یہی ہے کہ وہ ان آوازوں میں سے اپنی حقیقت کے مطابق درست بات کیسے پہچانے۔',
    icon: MessageSquare,
    accent: '#E11D48',
    background: 'from-[#FFF1F2] to-[#FFE4E6]',
  },
];

export default function GeminiConfusion() {
  return (
    <section className="w-full border-y-4 border-[#FF6B00] bg-[#FCF8F2] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="pb-2 text-3xl font-extrabold leading-[1.7] text-[#1A1A1A] sm:text-4xl lg:text-5xl">
            ابتدائی الجھن: نوجوان کہاں کھڑا ہے؟
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-32 rounded bg-[#FF6B00]" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <article
                key={stage.label}
                className={`relative overflow-hidden rounded-lg border-t-8 bg-gradient-to-br p-6 shadow-lg ${stage.background}`}
                style={{ borderTopColor: stage.accent }}
              >
                <div className="mb-6 flex items-center justify-between gap-3">
                  <span className="rounded-lg p-3 text-white shadow-sm" style={{ backgroundColor: stage.accent }}>
                    <Icon size={28} />
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold" style={{ color: stage.accent }}>
                    {stage.label}
                  </span>
                </div>
                <h3 className="mb-4 text-2xl font-bold leading-[1.7] text-[#1A1A1A]">{stage.title}</h3>
                <p className="text-justify text-lg leading-[2] text-[#3A3A3A]">{stage.text}</p>
              </article>
            );
          })}
        </div>

        <p className="mt-12 text-center text-xl font-bold text-[#FF6B00]">
          شمع ڈاٹ پی کے (shama.pk) — خصوصی رہنمائی برائے نوجوانان
        </p>
      </div>
    </section>
  );
}
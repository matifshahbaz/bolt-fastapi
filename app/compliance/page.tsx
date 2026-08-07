import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'کاروباری اور ادائیگی معلومات',
  description: 'shama.pk کے کاروباری ماڈل، ادائیگی گیٹ وے، کورس ایکٹیویشن اور ریفنڈ کے بارے میں معلومات۔',
  alternates: {
    canonical: 'https://shama.pk/compliance',
  },
};

export default function CompliancePage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">تعمیل</Badge>
          <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-nastaliq text-foreground leading-[1.6]">
            ادائیگی گیٹ وے، کاروباری ماڈل اور ریفنڈ پالیسی
          </h1>
          <p className="text-lg font-nastaliq text-muted-foreground leading-[1.9]">
            یہ صفحہ ادائیگی گیٹ وے تعمیل کے لیے بنایا گیا ہے تاکہ واضح ہو کہ shama.pk پر ادائیگیاں کیسے وصول کی جاتی ہیں،
            کورس رسائی کیسے فراہم کی جاتی ہے، اور ریفنڈ پالیسی کیسے لاگو ہوتی ہے۔
          </p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">کاروباری رابطہ معلومات</h2>
            <ul className="space-y-2 text-base text-muted-foreground leading-relaxed">
              <li><span className="font-nastaliq">ای میل ایڈریس:</span> <span dir="ltr">contact@shama.pk</span></li>
              <li><span className="font-nastaliq">رابطہ نمبر:</span> <span dir="ltr">03216630988</span></li>
              <li><span className="font-nastaliq">کاروباری پتہ:</span> <span dir="ltr">House 784, R-block, Model town, Lahore</span></li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">ادائیگی گیٹ وے کے استعمال کی تفصیل</h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground font-nastaliq">
              shama.pk ایک آن لائن تعلیمی اور کیریئر رہنمائی پلیٹ فارم ہے۔ Rapidgateway.pk کو بامعاوضہ ڈیجیٹل کورسز کی ایک مرتبہ فیس وصول کرنے کے لیے استعمال کیا جائے گا۔
            </p>
            <ol className="list-decimal space-y-2 pr-6 text-base text-muted-foreground leading-relaxed font-nastaliq">
              <li>صارف shama.pk پر بامعاوضہ کورس منتخب کرتا ہے۔</li>
              <li>صارف ادائیگی کے بٹن پر کلک کرتا ہے اور محفوظ Rapidgateway checkout پر منتقل ہوتا ہے۔</li>
              <li>صارف دستیاب ادائیگی طریقے سے ادائیگی مکمل کرتا ہے۔</li>
              <li>کامیاب ادائیگی کے بعد صارف دوبارہ shama.pk پر واپس آتا ہے۔</li>
              <li>کورس صارف کے ڈیش بورڈ میں فعال ہو جاتا ہے اور ڈیجیٹل اسباق تک رسائی مل جاتی ہے۔</li>
              <li>ادائیگی کی تصدیق کے بعد صارف کو ای میل کے ذریعے ادائیگی کی انوائس بھیجی جاتی ہے۔</li>
            </ol>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground font-nastaliq">
              اس گیٹ وے کے ذریعے کوئی فزیکل پراڈکٹ فروخت نہیں کی جاتی۔ ادائیگیاں صرف ڈیجیٹل کورس رسائی اور متعلقہ تعلیمی خدمات کے لیے استعمال ہوتی ہیں۔
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">ادائیگی کی انوائس</h2>
            <p className="mb-5 text-base leading-relaxed text-muted-foreground font-nastaliq">
              کامیاب ادائیگی کی سرور سائیڈ تصدیق کے بعد خریدار کو انوائس نمبر، ٹرانزیکشن حوالہ، کورس، تاریخ اور ادا شدہ رقم کے ساتھ ای میل انوائس بھیجی جائے گی۔ درج ذیل نمونہ صرف فارمیٹ دکھانے کے لیے ہے اور کسی حقیقی لین دین کی نمائندگی نہیں کرتا۔
            </p>
            <Button asChild variant="outline">
              <Link href="/invoices/sample">نمونہ انوائس دیکھیں</Link>
            </Button>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">تفصیلی کاروباری ماڈل</h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground font-nastaliq">
              shama.pk پاکستان کے طلبہ اور نوجوان پروفیشنلز کے لیے اردو-فرسٹ کیریئر رہنمائی اور اسکلز ایجوکیشن فراہم کرتا ہے۔ ہمارا کاروباری ماڈل مواد پر مبنی ڈیجیٹل تعلیم ہے۔
            </p>
            <ul className="list-disc space-y-2 pr-6 text-base text-muted-foreground leading-relaxed font-nastaliq">
              <li>بنیادی پیشکش: منظم آن لائن کورسز، لیسن نوٹس، اور رہنمائی شدہ سیکھنے کے راستے۔</li>
              <li>ڈلیوری ماڈل: اندراج کے بعد صارف اپنے ڈیش بورڈ سے ویڈیوز اور ٹیکسٹ اسباق تک رسائی حاصل کرتا ہے۔</li>
              <li>آمدنی ماڈل: ہر بامعاوضہ کورس پر ایک مرتبہ کورس فیس۔</li>
              <li>صارفین کی نوعیت: براہ راست طلبہ اور ابتدائی کیریئر صارفین۔</li>
              <li>فلفلمنٹ: کامیاب ادائیگی کی تصدیق کے فوراً بعد ڈیجیٹل رسائی آن لائن فراہم کی جاتی ہے۔</li>
              <li>سپورٹ: صارف درج شدہ ای میل اور فون کے ذریعے رابطہ کر سکتا ہے۔</li>
            </ul>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground font-nastaliq">
              یہ ماڈل واضح قیمت، شفاف ادائیگی، اور ادائیگی کے بعد فوری کورس رسائی کو یقینی بناتا ہے۔
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">ریفنڈ پالیسی (7 دن، بغیر سوال)</h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground font-nastaliq">
              صارف خریداری کی تاریخ سے 7 دن کے اندر بغیر کسی سوال کے مکمل ریفنڈ حاصل کر سکتا ہے۔
              7 دن گزرنے کے بعد ریفنڈ دستیاب نہیں ہوگا۔
            </p>
            <ul className="list-disc space-y-2 pr-6 text-base text-muted-foreground leading-relaxed font-nastaliq">
              <li>ریفنڈ کی درخواست صارف اپنے ڈیش بورڈ سے براہِ راست دے سکتا ہے۔</li>
              <li>منظور شدہ ریفنڈ کے بعد کورس تک رسائی غیر فعال کر دی جاتی ہے۔</li>
              <li>یہ پالیسی تمام بامعاوضہ ڈیجیٹل کورسز پر یکساں لاگو ہے۔</li>
            </ul>
            <p className="mt-4 text-base text-muted-foreground font-nastaliq">
              مکمل صفحہ:
              <a href="/refund-policy" className="mr-1 text-primary underline underline-offset-4">/refund-policy</a>
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">خریدار کو کیا ملے گا (واضح شرائط)</h2>
            <ul className="list-disc space-y-2 pr-6 text-base text-muted-foreground leading-relaxed font-nastaliq">
              <li>خریداری کے بعد صارف کو کورس ویڈیوز اور نوٹس کی آن لائن رسائی فراہم کی جائے گی۔</li>
              <li>لیکچر ویڈیوز ڈاؤن لوڈ کے لیے دستیاب نہیں ہوں گی۔</li>
              <li>کورس رسائی صرف ایک ماہ (30 دن) کے لیے ہوگی۔</li>
              <li>30 دن مکمل ہونے کے بعد رسائی خودکار طور پر ختم/منسوخ کر دی جائے گی۔</li>
              <li>صارف کی ادائیگی اسی ڈیجیٹل رسائی اور تعلیمی سروس کے بدلے لی جاتی ہے۔</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

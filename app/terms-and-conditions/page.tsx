import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'شرائط و ضوابط',
  description: 'shama.pk کے استعمال، اکاؤنٹ، کورس رسائی، ادائیگی اور صارف ذمہ داریوں کی شرائط و ضوابط۔',
  alternates: {
    canonical: 'https://shama.pk/terms-and-conditions',
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">Terms & Conditions</Badge>
          <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-nastaliq text-foreground leading-[1.6]">
            شرائط و ضوابط
          </h1>
          <p className="text-lg font-nastaliq text-muted-foreground leading-[1.9]">
            shama.pk استعمال کرنے سے آپ ان شرائط و ضوابط سے اتفاق کرتے ہیں۔ یہ شرائط کورس خریداری، رسائی،
            صارف ذمہ داریوں اور قانونی حدود کو واضح کرتی ہیں۔
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">سروس کا دائرہ</h2>
            <p className="text-base text-muted-foreground leading-relaxed font-nastaliq">
              shama.pk ایک ڈیجیٹل تعلیمی پلیٹ فارم ہے جو کیریئر رہنمائی اور اسکلز سے متعلق کورسز، ویڈیو لیکچرز
              اور تحریری نوٹس فراہم کرتا ہے۔
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">اکاؤنٹ اور رسائی</h2>
            <ul className="list-disc space-y-2 pr-6 text-base text-muted-foreground leading-relaxed font-nastaliq">
              <li>صارف درست معلومات کے ساتھ اکاؤنٹ بنائے گا۔</li>
              <li>اکاؤنٹ کی سیکیورٹی اور پاس ورڈ کی حفاظت صارف کی ذمہ داری ہے۔</li>
              <li>ہر کورس کی رسائی خریداری کے بعد 30 دن (ایک ماہ) کے لیے دستیاب ہوگی۔</li>
              <li>کورس مواد کا غیر مجاز شیئرنگ، ری-اپلوڈ یا فروخت ممنوع ہے۔</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">ادائیگی اور ریفنڈ</h2>
            <ul className="list-disc space-y-2 pr-6 text-base text-muted-foreground leading-relaxed font-nastaliq">
              <li>ادائیگی Rapidgateway جیسے محفوظ ادائیگی گیٹ وے کے ذریعے پراسیس کی جا سکتی ہے۔</li>
              <li>قیمت، فیس اور دستیابی صفحہ کورس پر درج معلومات کے مطابق ہوگی۔</li>
              <li>ریفنڈ پالیسی کے مطابق 7 دن کے اندر مکمل ریفنڈ دستیاب ہے۔</li>
            </ul>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed font-nastaliq">
              مکمل ریفنڈ تفصیل:
              <Link href="/refund-policy" className="mr-1 text-primary underline underline-offset-4">
                /refund-policy
              </Link>
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">دانشورانہ ملکیت</h2>
            <p className="text-base text-muted-foreground leading-relaxed font-nastaliq">
              پلیٹ فارم پر موجود مواد، برانڈنگ، اور تدریسی میٹریل shama.pk یا متعلقہ حقوق کے حاملین کی ملکیت ہیں۔
              بغیر اجازت نقل، تقسیم یا تجارتی استعمال کی اجازت نہیں۔
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">ذمہ داری کی حدود اور ترمیم</h2>
            <p className="text-base text-muted-foreground leading-relaxed font-nastaliq">
              پلیٹ فارم دستیابی اور سروس معیار برقرار رکھنے کی کوشش کی جاتی ہے، تاہم تکنیکی مسائل یا عارضی تعطل
              ممکن ہیں۔ shama.pk ضرورت کے مطابق ان شرائط میں ترمیم کا حق محفوظ رکھتا ہے، اور تازہ ترین ورژن اسی صفحے پر دستیاب ہوگا۔
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">رابطہ</h2>
            <p className="text-base text-muted-foreground leading-relaxed font-nastaliq">
              قانونی یا اکاؤنٹ سے متعلق سوالات کے لیے:
              <span dir="ltr" className="mr-1">contact@shama.pk</span>
            </p>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed font-nastaliq">
              رازداری سے متعلق معلومات:
              <Link href="/privacy-policy" className="mr-1 text-primary underline underline-offset-4">
                /privacy-policy
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

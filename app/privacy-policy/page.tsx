import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">Privacy Policy</Badge>
          <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-nastaliq text-foreground leading-[1.6]">
            پرائیویسی پالیسی
          </h1>
          <p className="text-lg font-nastaliq text-muted-foreground leading-[1.9]">
            shama.pk آپ کی معلومات کی رازداری کا احترام کرتا ہے۔ یہ پالیسی واضح کرتی ہے کہ ہم کون سا ڈیٹا لیتے ہیں،
            اسے کیسے استعمال کرتے ہیں، اور صارفین اپنے حقوق کیسے استعمال کر سکتے ہیں۔
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">جمع کی جانے والی معلومات</h2>
            <ul className="list-disc space-y-2 pr-6 text-base text-muted-foreground leading-relaxed font-nastaliq">
              <li>اکاؤنٹ معلومات: نام، ای میل ایڈریس، اور پاس ورڈ (محفوظ ہیش کی صورت میں)۔</li>
              <li>لرننگ سرگرمی: کورس انرولمنٹ، اسباق کی پیش رفت، اور متعلقہ استعمالی ریکارڈ۔</li>
              <li>رابطہ معلومات: جب آپ Contact فارم یا ای میل کے ذریعے سپورٹ سے رابطہ کرتے ہیں۔</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">معلومات کا استعمال</h2>
            <ul className="list-disc space-y-2 pr-6 text-base text-muted-foreground leading-relaxed font-nastaliq">
              <li>آپ کو کورس رسائی اور اکاؤنٹ فیچرز فراہم کرنے کے لیے۔</li>
              <li>ادائیگی کی تصدیق اور کورس ایکٹیویشن کے لیے۔</li>
              <li>سروس بہتر بنانے، سیکیورٹی مانیٹرنگ، اور صارف سپورٹ کے لیے۔</li>
              <li>اکاؤنٹ سے متعلق اہم اطلاعات جیسے پاس ورڈ ری سیٹ اور اپڈیٹس کے لیے۔</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">ڈیٹا شیئرنگ</h2>
            <p className="text-base text-muted-foreground leading-relaxed font-nastaliq">
              ہم آپ کا ذاتی ڈیٹا فروخت نہیں کرتے۔ محدود حالات میں ڈیٹا ایسے سروس پرووائیڈرز کے ساتھ شیئر ہو سکتا ہے
              جو پلیٹ فارم چلانے، ادائیگی پراسیسنگ، یا سیکیورٹی کے لیے ضروری ہوں اور رازداری کی ذمہ داری رکھتے ہوں۔
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">سیکیورٹی اور محفوظ کاری</h2>
            <p className="text-base text-muted-foreground leading-relaxed font-nastaliq">
              ہم مناسب تکنیکی اور انتظامی اقدامات کے ذریعے صارف معلومات کی حفاظت کرتے ہیں۔ اس کے باوجود انٹرنیٹ
              پر مکمل سیکیورٹی کی ضمانت ممکن نہیں، اس لیے صارفین کو مضبوط پاس ورڈ رکھنے کی ہدایت کی جاتی ہے۔
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-2xl font-nastaliq text-foreground">آپ کے حقوق اور رابطہ</h2>
            <p className="text-base text-muted-foreground leading-relaxed font-nastaliq">
              آپ اپنے اکاؤنٹ سے متعلق معلومات کی تصحیح، اپڈیٹ یا سپورٹ درخواست کے لیے ہم سے رابطہ کر سکتے ہیں:
              <span dir="ltr" className="mr-1">contact@shama.pk</span>
            </p>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed font-nastaliq">
              مزید قانونی معلومات کے لیے:
              <Link href="/terms-and-conditions" className="mr-1 text-primary underline underline-offset-4">
                شرائط و ضوابط
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

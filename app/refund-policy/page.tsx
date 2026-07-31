import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'ریفنڈ پالیسی',
  description: 'shama.pk کورس خریداری کے لیے 7 دن کی ریفنڈ پالیسی، اہلیت اور درخواست کا طریقہ۔',
  alternates: {
    canonical: 'https://shama.pk/refund-policy',
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">ریفنڈ پالیسی</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-nastaliq text-foreground leading-[1.7]">
            7 دن میں مکمل ریفنڈ، بغیر کسی سوال کے
          </h1>
          <p className="mt-4 text-lg text-muted-foreground font-nastaliq leading-[1.9]">
            shama.pk پر خریدے گئے بامعاوضہ ڈیجیٹل کورسز کے لیے صارف خریداری کے 7 دن کے اندر مکمل ریفنڈ لے سکتا ہے۔
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border bg-card p-7 space-y-5">
            <h2 className="text-2xl font-nastaliq text-foreground">پالیسی کی شرائط</h2>
            <ul className="list-disc space-y-2 pr-6 text-base text-muted-foreground font-nastaliq leading-[1.9]">
              <li>ریفنڈ خریداری کی تاریخ سے 7 دن کے اندر دستیاب ہے۔</li>
              <li>7 دن کے بعد ریفنڈ کی درخواست قبول نہیں کی جائے گی۔</li>
              <li>ریفنڈ کے لیے کسی وجہ یا سوال کی ضرورت نہیں ہے۔</li>
              <li>ریفنڈ منظور ہونے کے بعد متعلقہ کورس تک رسائی بند ہو جاتی ہے۔</li>
              <li>لیکچر ویڈیوز ڈاؤن لوڈ کے لیے دستیاب نہیں ہیں؛ رسائی صرف آن لائن ہے۔</li>
              <li>کورس رسائی خریداری کے بعد صرف 30 دن (ایک ماہ) کے لیے دستیاب رہتی ہے۔</li>
              <li>30 دن مکمل ہونے کے بعد کورس رسائی خودکار طور پر منسوخ کر دی جاتی ہے۔</li>
            </ul>

            <h3 className="text-xl font-nastaliq text-foreground">ریفنڈ کیسے لیں</h3>
            <ol className="list-decimal space-y-2 pr-6 text-base text-muted-foreground font-nastaliq leading-[1.9]">
              <li>اپنے اکاؤنٹ میں لاگ اِن کریں۔</li>
              <li>ڈیش بورڈ پر جائیں۔</li>
              <li>اپنے کورس کارڈ میں موجود "ابھی ریفنڈ لیں" بٹن دبائیں۔</li>
              <li>اگر خریداری 7 دن کے اندر ہو تو ریفنڈ فوراً پراسیس ہو جائے گا۔</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}

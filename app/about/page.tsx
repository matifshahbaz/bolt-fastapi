import type { Metadata } from 'next';
import Link from 'next/link';
import { Target, Eye, Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'ہمارے بارے میں',
  description: 'شمع.pk کے مقصد، وژن اور پاکستانی نوجوانوں کے لیے اردو کیریئر رہنمائی کے عزم کے بارے میں جانیں۔',
  alternates: {
    canonical: 'https://shama.pk/about',
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
            ہمارے بارے میں
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-nastaliq text-foreground mb-6 leading-[1.6]">
            شمع.pk — پاکستان کے نوجوانوں کے لیے کیریئر رہنمائی
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            ہم پاکستان کے نوجوانوں کو اردو میں معیاری کیریئر رہنمائی فراہم کرنے کا عزم رکھتے ہیں۔
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-nastaliq text-foreground mb-6">
            ہماری کہانی
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-[2.2] text-justify">
              شمع.pk کا آغاز اس احساس سے ہوا کہ بہت سے پاکستانی نوجوانوں کو کیریئر کے حوالے سے درست رہنمائی میسر نہیں۔ انگریزی میں معلومات تو موجود ہیں، لیکن اردو میں معیاری مواد کی کمی واضح تھی۔
            </p>
            <p className="text-lg text-muted-foreground leading-[2.2] text-justify">
              ہمارا ماننا ہے کہ زبان کو رکاوٹ نہیں بننا چاہیے۔ ہر نوجوان، چاہے وہ کسی بھی پس منظر سے ہو، اپنے مستقبل کے بارے میں واضح رہنمائی کا مستحق ہے۔ شمع.pk اسی خواب کو حقیقت میں بدلنے کی کوشش ہے۔
            </p>
            <p className="text-lg text-muted-foreground leading-[2.2] text-justify">
              آج شمع.pk ایک کورس کے ساتھ شروعات کر رہا ہے۔ ہم حقیقی طلبہ کی ضروریات اور رائے کے مطابق مزید کورسز اور مضامین شامل کریں گے — سب اردو میں، سب پاکستانی نوجوانوں کے لیے۔
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-nastaliq text-foreground text-center mb-10">
            ہماری قدریں
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: 'مقصدیت',
                desc: 'ہر نوجوان کے لیے واضح کیریئر رہنمائی فراہم کرنا ہمارا مقصد ہے۔',
              },
              {
                icon: Eye,
                title: 'شفافیت',
                desc: 'ہم سادہ، سچی اور قابل اعتماد معلومات فراہم کرنے پر یقین رکھتے ہیں۔',
              },
              {
                icon: Heart,
                title: 'خدمت',
                desc: 'پاکستان کے نوجوانوں کی خدمت ہمارا محرک ہے۔',
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="card-hover rounded-2xl border bg-card p-6 text-center"
              >
                <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-accent/10 mb-4">
                  <value.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-nastaliq text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-nastaliq text-foreground mb-4">
            ہمارے ساتھ اپنا مستقبل بنائیں
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            شمع.pk کے پہلے کورس سے اپنا کیریئر سفر شروع کریں۔
          </p>
          <Link href="/course/youth-career-guidance">
            <Button size="lg" className="text-lg">
              کورس دیکھیں
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

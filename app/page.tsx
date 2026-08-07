'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Clock,
  BookOpen,
  Compass,
  Rocket,
  Briefcase,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArticleCard } from '@/components/site/article-card';
import {
  featuredCourse,
  articles,
  categories,
} from '@/lib/data';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass,
  Rocket,
  Briefcase,
  Sparkles,
};

export default function Home() {
  const [email, setEmail] = useState('');
  const visibleLessonCount = featuredCourse.modules.reduce(
    (total, module) => total + module.lessons.filter((lesson) => !lesson.hidden).length,
    0,
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] xl:gap-12">
            <div className="animate-fade-in">
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/10 border-primary/20">
                ایک نیا آغاز — اردو میں عملی کیریئر رہنمائی
              </Badge>
              <h1 className="mb-6 text-4xl font-nastaliq !leading-[1.85] text-foreground md:text-5xl lg:text-5xl xl:text-6xl">
                اپنے کیریئر کی سمت میں واضح رہنمائی حاصل کریں
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
                شمع.pk نوجوانوں کے لیے کورسز، مضامین اور رہنمائی فراہم کرتا ہے۔ کیریئر کا انتخاب، نوکری کی تلاش، اور کاروبار شروع کرنا — سب کچھ اردو میں۔
              </p>

              {/* Search bar */}
              <div className="flex items-center gap-2 mb-8 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="کورس یا مضمون تلاش کریں..."
                    className="w-full rounded-xl border-2 border-border bg-white py-4 pr-12 pl-4 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <Button size="lg" className="text-lg h-[58px] px-8">
                  تلاش
                </Button>
              </div>

              {/* Launch facts */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="text-lg text-muted-foreground">ایک نیا آغاز</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-lg text-muted-foreground">{visibleLessonCount} اسباق</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="h-5 w-5 text-accent" />
                  <span className="text-lg text-muted-foreground">اردو میں عملی رہنمائی</span>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative animate-fade-in-delay-2">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/top-banner-shama-pk.png"
                  alt="تعلیم، ڈیجیٹل مہارت اور کاروباری راستوں کی کیریئر رہنمائی"
                  width={1536}
                  height={1024}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Chips */}
      <section className="border-b bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.icon] ?? Sparkles;
              return (
                <Link
                  key={cat.id}
                  href="/articles"
                  className="group flex items-center gap-2 rounded-full border-2 border-border bg-white px-5 py-3 hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <Icon className={`h-5 w-5 ${cat.color}`} />
                  <span className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Course */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/10">
              نمایاں کورس
            </Badge>
            <h2 className="text-3xl md:text-4xl font-nastaliq text-foreground mb-4">
              ہمارا لانچ کورس
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نوجوانوں کے لیے مکمل کیریئر رہنمائی — اردو میں
            </p>
          </div>

          {/* Featured course banner */}
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={featuredCourse.coverImage}
                  alt={featuredCourse.title}
                  width={1536}
                  height={1024}
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                  {featuredCourse.level}
                </Badge>
                <Badge className="bg-accent/10 text-accent hover:bg-accent/10">
                  {featuredCourse.language}
                </Badge>
              </div>
              <h3 className="text-2xl md:text-3xl font-nastaliq text-foreground leading-relaxed">
                {featuredCourse.title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {featuredCourse.description}
              </p>
              <div className="flex flex-wrap gap-4 text-base text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {featuredCourse.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {visibleLessonCount} اسباق
                </span>
              </div>
              <div className="flex gap-3">
                <Link href="/course">
                  <Button size="lg" className="text-lg">
                    ابھی شروع کریں
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/course">
                  <Button size="lg" variant="outline" className="text-lg">
                    تفصیل دیکھیں
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes Strip */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-nastaliq text-foreground text-center mb-10">
            آپ کیا سیکھیں گے؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Compass, title: 'کیریئر کا انتخاب', desc: 'اپنی صلاحیتوں اور دلچسپیاں پہچانیں' },
              { icon: Briefcase, title: 'نوکری تلاش', desc: 'سی وی، انٹرویو، اور جاب پورٹلز' },
              { icon: Rocket, title: 'کاروبار شروع کریں', desc: 'بزنس پلان اور مالی منصوبہ بندی' },
              { icon: Sparkles, title: 'ذاتی برانڈ', desc: 'ڈیجیٹل دور میں اپنی پہچان بنائیں' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="card-hover rounded-2xl border bg-card p-6 text-center"
              >
                <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-nastaliq text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Preview */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-nastaliq text-foreground mb-2">
                تازہ مضامین
              </h2>
              <p className="text-lg text-muted-foreground">
                کیریئر، کاروبار اور مہارتوں پر اردو مضامین
              </p>
            </div>
            <Link href="/articles">
              <Button variant="outline" className="text-lg">
                سب دیکھیں
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
            ہمارا مشن
          </Badge>
          <h2 className="text-3xl md:text-4xl font-nastaliq text-foreground mb-6 leading-relaxed">
            پاکستان کے نوجوانوں کو اردو میں معیاری رہنمائی فراہم کرنا
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            ہمارا ماننا ہے کہ ہر نوجوان کے پاس اپنے مستقبل کے بارے میں واضح رہنمائی کا حق ہے۔ شمع.pk پاکستان کے نوجوانوں کے لیے، اردو میں، معیاری کیریئر رہنمائی فراہم کرتا ہے۔ ہمارا مقصد ہر نوجوان کو اپنی صلاحیتوں کو پہچان کر، صحیح کیریئر کا انتخاب کرنے میں مدد کرنا ہے۔
          </p>
          <div className="mt-12 rounded-2xl border border-primary/15 bg-primary/5 px-6 py-8">
            <h3 className="mb-3 text-2xl font-nastaliq text-foreground">یہ صرف آغاز ہے</h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              شمع.pk ابھی اپنے ابتدائی مرحلے میں ہے۔ ہم حقیقی طلبہ کے تجربات، درست اعداد و شمار اور آپ کی رائے کے ساتھ اسے دیانت داری سے بہتر بنائیں گے۔
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-l from-primary to-primary/80 p-10 text-center text-white">
            <Mail className="h-12 w-12 mx-auto mb-4 text-white/80" />
            <h2 className="text-3xl font-nastaliq mb-4">
              اردو میں کیریئر ٹپس حاصل کریں
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              نئی کیریئر رہنمائی، مضامین اور کورس مواد کی اطلاع اردو میں حاصل کریں۔
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="اپنا ای میل درج کریں"
                className="flex-1 rounded-xl border-0 bg-white px-5 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button
                type="submit"
                size="lg"
                className="text-lg bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                سبسکرائب
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

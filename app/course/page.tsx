'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  Users,
  Clock,
  BookOpen,
  Globe,
  CheckCircle2,
  ChevronDown,
  Play,
  Award,
  BarChart3,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { featuredCourse, testimonials } from '@/lib/data';

export default function CoursePage() {
  const c = featuredCourse;

  return (
    <div className="flex flex-col">
      {/* Course Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left: Course info */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                  {c.level}
                </Badge>
                <Badge className="bg-accent/10 text-accent hover:bg-accent/10">
                  {c.language}
                </Badge>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  نمایاں کورس
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-nastaliq text-foreground leading-[1.6] mb-4">
                {c.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                {c.subtitle}
              </p>

              {/* Rating + learners */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="text-lg font-bold text-foreground">
                    {c.rating}
                  </span>
                  <span className="text-lg text-muted-foreground">
                    ({c.reviewCount.toLocaleString()} جائزے)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-lg text-muted-foreground">
                    {c.learnerCount} طلبہ
                  </span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={c.instructor.avatar}
                    alt={c.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg text-foreground">
                    <span className="text-muted-foreground">اساتذہ: </span>
                    {c.instructor.name}
                  </p>
                  <p className="text-base text-muted-foreground">
                    {c.instructor.title}
                  </p>
                </div>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-6 text-base text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-5 w-5" />
                  {c.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-5 w-5" />
                  {c.lessons} اسباق
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="h-5 w-5" />
                  زبان: {c.language}
                </span>
                <span className="flex items-center gap-1">
                  <BarChart3 className="h-5 w-5" />
                  {c.level}
                </span>
              </div>
            </div>

            {/* Right: Course card */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl overflow-hidden border shadow-xl bg-card sticky top-20">
                <div className="relative aspect-video">
                  <Image
                    src={c.coverImage}
                    alt={c.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 cursor-pointer hover:scale-110 transition-transform">
                      <Play className="h-7 w-7 text-primary mr-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-base text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>مدت: {c.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-base text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>اسباق: {c.lessons}</span>
                    </div>
                    <div className="flex items-center gap-2 text-base text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      <span>زبان: {c.language}</span>
                    </div>
                    <div className="flex items-center gap-2 text-base text-muted-foreground">
                      <BarChart3 className="h-4 w-4" />
                      <span>سطح: {c.level}</span>
                    </div>
                    <div className="flex items-center gap-2 text-base text-muted-foreground">
                      <Award className="h-4 w-4" />
                      <span>سرٹیفکیٹ: ہاں</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4 pb-4 border-b">
                    <span className="text-3xl font-bold text-foreground">
                      {c.price}
                    </span>
                    <span className="text-base text-muted-foreground line-through">
                      Rs. 2,000
                    </span>
                    <Badge className="bg-accent text-accent-foreground">
                      75% رعایت
                    </Badge>
                  </div>
                  <Button className="w-full text-lg mb-3" size="lg">
                    کورس شروع کریں
                  </Button>
                  <Button variant="outline" className="w-full text-lg" size="lg">
                    نمونہ دیکھیں
                  </Button>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    ابھی شامل ہوں — محدود وقت کی پیشکش
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-nastaliq text-foreground mb-6">
            کورس کا جائزہ
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {c.description}
          </p>

          {/* What you'll learn */}
          <div className="rounded-2xl border-2 border-primary/10 bg-primary/5 p-8">
            <h3 className="text-2xl font-nastaliq text-foreground mb-6">
              آپ کیا سیکھیں گے
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {c.outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <span className="text-lg text-foreground leading-relaxed">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-nastaliq text-foreground mb-2">
            نصاب
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {c.modules.length} ماڈیول، {c.lessons} اسباق
          </p>

          <Accordion type="single" collapsible defaultValue="m1">
            {c.modules.map((module, mIdx) => (
              <AccordionItem
                key={module.id}
                value={module.id}
                className="rounded-xl border bg-card px-6 mb-3 overflow-hidden"
              >
                <AccordionTrigger className="text-xl font-nastaliq text-foreground hover:no-underline">
                  <div className="flex items-center gap-3 text-right">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-base font-bold">
                      {mIdx + 1}
                    </span>
                    {module.title}
                    <span className="text-sm text-muted-foreground font-normal">
                      ({module.lessons.length} اسباق)
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-2 pb-2">
                    {module.lessons.map((lesson, lIdx) => (
                      <div
                        key={lIdx}
                        className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <Play className="h-4 w-4 text-primary" />
                          <span className="text-base text-foreground">
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {lesson.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-nastaliq text-foreground mb-8">
            استاد
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative h-32 w-32 rounded-2xl overflow-hidden shrink-0">
              <Image
                src={c.instructor.avatar}
                alt={c.instructor.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-nastaliq text-foreground mb-1">
                {c.instructor.name}
              </h3>
              <p className="text-lg text-primary mb-4">
                {c.instructor.title}
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-4 text-base text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  {c.rating} ریٹنگ
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {c.learnerCount} طلبہ
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  1 کورس
                </span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {c.instructor.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-nastaliq text-foreground mb-2">
            طلبہ کے جائزے
          </h2>
          <div className="flex items-center gap-3 mb-8">
            <Star className="h-6 w-6 fill-accent text-accent" />
            <span className="text-2xl font-bold text-foreground">
              {c.rating}
            </span>
            <span className="text-lg text-muted-foreground">
              ({c.reviewCount.toLocaleString()} جائزے)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-2xl border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-lg text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl bg-gradient-to-l from-primary to-primary/80 p-10 text-white">
            <h2 className="text-3xl font-nastaliq mb-4">
              آج ہی اپنا مستقبل بنائیں
            </h2>
            <p className="text-lg text-white/80 mb-8">
              ہزاروں نوجوانوں کے ساتھ شامل ہوں جنہوں نے اپنا کیریئر شمع.pk سے شروع کیا۔
            </p>
            <Link href="/">
              <Button
                size="lg"
                className="text-lg bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                ابھی شامل ہوں
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

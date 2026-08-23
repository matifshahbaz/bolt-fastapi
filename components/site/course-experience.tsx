'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  BookOpen,
  Globe,
  CheckCircle2,
  Play,
  Award,
  BarChart3,
  ArrowLeft,
  Lock,
  UserRound,
} from 'lucide-react';

import { useAuth } from '@/components/site/auth-provider';
import { CloudflareLessonPlayer } from '@/components/site/cloudflare-lesson-player';
import { CourseTextLesson } from '@/components/site/course-text-lesson';
import { ManualPaymentForm } from '@/components/site/manual-payment-form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  getCourseProgress,
  getLessonPlayback,
  submitLessonWatchEvent,
  updateLessonProgress,
  type CourseProgress,
  type LessonPlayback,
} from '@/lib/lms-api';
import type { Course, CourseLesson } from '@/lib/data';
import { COURSE_PURCHASE_NOTES } from '@/lib/course-policy';

type CourseExperienceProps = {
  course: Course;
};

type VisibleLesson = {
  lesson: CourseLesson;
  lessonIndex: number;
};

type CurriculumRow = {
  key: string;
  title: string;
  videoLessons: VisibleLesson[];
  textLesson?: VisibleLesson;
};

const courseAudience = [
  'میٹرک یا او لیول کے بعد مضامین کا انتخاب کررہے ہیں',
  'انٹرمیڈیٹ یا اے لیول کے بعد اگلا راستہ تلاش کررہے ہیں',
  'یونیورسٹی میں داخلے کے بارے میں فیصلہ کرنا چاہتے ہیں',
  'داخلہ نہ ملنے کے بعد متبادل راستہ تلاش کررہے ہیں',
  'کمپیوٹر سائنس، انجینئرنگ یا میڈیکل کے بارے میں حقیقت پسندانہ معلومات چاہتے ہیں',
  'آن لائن کمائی، ویب سائٹ بنانے یا فری لانسنگ میں دلچسپی رکھتے ہیں',
  'زراعت، سرکاری شعبے یا سیلز کے مواقع سمجھنا چاہتے ہیں',
  'ملازمت کے ساتھ کاروبار یا اپنا کام شروع کرنے پر غور کررہے ہیں',
  'اپنی شخصیت، دلچسپی اور حالات کے مطابق کیریئر منتخب کرنا چاہتے ہیں',
  'تعلیم کے بعد عملی کیریئر کے آغاز میں الجھن محسوس کررہے ہیں',
];

function getCurriculumKey(moduleId: string, lesson: CourseLesson) {
  const match = lesson.id.match(new RegExp(`^${moduleId}-[vt](\\d+)(?:-\\d+)?$`));
  return match ? `${moduleId}-${match[1]}` : lesson.id;
}

function getCurriculumTitle(lesson: CourseLesson) {
  return lesson.title
    .replace(/\s+—\s+نوٹس$/, '')
    .replace(/\s+—\s+حصہ\s+[^:]+:.+$/, '')
    .replace(/\s+—\s+حصہ\s+.+$/, '');
}

function groupCurriculumRows(moduleId: string, lessons: VisibleLesson[]): CurriculumRow[] {
  const rows: CurriculumRow[] = [];
  const rowByKey = new Map<string, CurriculumRow>();

  lessons.forEach((visibleLesson) => {
    const key = getCurriculumKey(moduleId, visibleLesson.lesson);
    const existingRow = rowByKey.get(key);
    const row = existingRow ?? {
      key,
      title: getCurriculumTitle(visibleLesson.lesson),
      videoLessons: [],
    };

    if (visibleLesson.lesson.kind === 'video') {
      row.videoLessons.push(visibleLesson);
    } else {
      row.textLesson = visibleLesson;
    }

    if (!existingRow) {
      rows.push(row);
      rowByKey.set(key, row);
    }
  });

  return rows;
}

export function CourseExperience({ course }: CourseExperienceProps) {
  const { isAuthenticated, token, user } = useAuth();
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [activeLesson, setActiveLesson] = useState<{ moduleId: string; lessonIndex: number; lesson: CourseLesson } | null>(null);
  const [lessonPlayback, setLessonPlayback] = useState<LessonPlayback | null>(null);
  const [actionStatus, setActionStatus] = useState<'idle' | 'loading'>('idle');
  const [feedback, setFeedback] = useState('');
  const [playbackFeedback, setPlaybackFeedback] = useState('');

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setProgress(null);
      return;
    }

    getCourseProgress(token, course.id)
      .then((payload) => {
        setProgress(payload);
      })
      .catch(() => {
        setProgress(null);
      });
  }, [course.id, isAuthenticated, token]);

  const completedLookup = useMemo(() => {
    const lookup = new Set<string>();
    progress?.items.forEach((item) => {
      if (item.completed) {
        lookup.add(`${item.module_id}:${item.lesson_index}`);
      }
    });
    return lookup;
  }, [progress]);

  const refreshApprovedCourse = async () => {
    if (!token) {
      return;
    }
    const latestProgress = await getCourseProgress(token, course.id);
    setProgress(latestProgress);
  };

  const toggleLesson = async (moduleId: string, lessonIndex: number, completed: boolean) => {
    if (!token) {
      return;
    }
    setActionStatus('loading');
    try {
      const latestProgress = await updateLessonProgress(token, course.id, moduleId, lessonIndex, completed);
      setProgress(latestProgress);
      setFeedback('آپ کی پیش رفت محفوظ کر دی گئی ہے۔');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'پیش رفت محفوظ نہیں ہو سکی۔');
    } finally {
      setActionStatus('idle');
    }
  };

  const toggleCurriculumRow = async (moduleId: string, row: CurriculumRow, completed: boolean) => {
    if (!token) {
      return;
    }

    const rowLessons = [...row.videoLessons, row.textLesson]
      .filter((item): item is VisibleLesson => Boolean(item))
      .filter((item) => !item.lesson.comingSoon);

    if (rowLessons.length === 0) {
      return;
    }

    setActionStatus('loading');
    try {
      let latestProgress: CourseProgress | null = null;
      for (const item of rowLessons) {
        latestProgress = await updateLessonProgress(token, course.id, moduleId, item.lessonIndex, completed);
      }
      setProgress(latestProgress);
      setFeedback('آپ کی پیش رفت محفوظ کر دی گئی ہے۔');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'پیش رفت محفوظ نہیں ہو سکی۔');
    } finally {
      setActionStatus('idle');
    }
  };

  const hasPurchased = Boolean(progress);
  const visibleModules = course.modules
    .filter((module) => !module.hidden)
    .map((module) => ({
      ...module,
      lessons: module.lessons
        .map((lesson, lessonIndex) => ({ lesson, lessonIndex }))
        .filter(({ lesson }) => !lesson.hidden),
    }));
  const curriculumModules = visibleModules.map((module) => ({
    ...module,
    curriculumRows: groupCurriculumRows(module.id, module.lessons),
  }));
  const visibleLessonCount = curriculumModules.reduce((total, module) => total + module.curriculumRows.length, 0);
  const audience = course.audience ?? courseAudience;
  const audienceIntro = course.audienceIntro
    ?? (course.audience ? 'یہ کورس اُن لوگوں کے لیے ہے جو:' : 'یہ کورس بالخصوص ان نوجوانوں کے لیے مفید ہے جو:');
  const enrollmentOpen = course.availability !== 'coming-soon';

  const openLesson = async (moduleId: string, lessonIndex: number, lesson: CourseLesson) => {
    if (!isAuthenticated) {
      return;
    }
    setActiveLesson({ moduleId, lessonIndex, lesson });
    setPlaybackFeedback('');

    if (lesson.kind === 'text') {
      setLessonPlayback(null);
      return;
    }

    if (!token) {
      return;
    }

    if (lesson.videoUid?.startsWith('placeholder-')) {
      setLessonPlayback(null);
      setPlaybackFeedback('یہ ویڈیو ابھی placeholder ہے۔ بعد میں آپ یہاں اصل Cloudflare Stream video replace کر سکتے ہیں۔');
      return;
    }

    setActionStatus('loading');
    try {
      const playback = await getLessonPlayback(token, course.id, moduleId, lessonIndex);
      setLessonPlayback(playback);
    } catch (error) {
      setPlaybackFeedback(error instanceof Error ? error.message : 'ویڈیو لوڈ نہیں ہو سکی۔');
      setLessonPlayback(null);
    } finally {
      setActionStatus('idle');
    }
  };

  const handleWatchThresholdReached = async (watchedPercent: number) => {
    if (!token || !activeLesson || activeLesson.lesson.kind !== 'video') {
      return;
    }
    try {
      const result = await submitLessonWatchEvent(
        token,
        course.id,
        activeLesson.moduleId,
        activeLesson.lessonIndex,
        watchedPercent,
      );
      if (result.marked_complete) {
        const latestProgress = await getCourseProgress(token, course.id);
        setProgress(latestProgress);
        setPlaybackFeedback('50% دیکھنے پر سبق خودکار طور پر مکمل ہو گیا ہے۔');
      }
    } catch (error) {
      setPlaybackFeedback(error instanceof Error ? error.message : 'ویڈیو پیش رفت محفوظ نہیں ہو سکی۔');
    }
  };

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/10">{course.level}</Badge>
                <Badge className="bg-accent/10 text-accent hover:bg-accent/10">{course.language}</Badge>
                <Badge className={enrollmentOpen ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-amber-100 text-amber-800 hover:bg-amber-100'}>
                  {enrollmentOpen ? 'نمایاں کورس' : 'جلد دستیاب'}
                </Badge>
              </div>
              <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-nastaliq text-accent leading-[1.6]">
                {course.title}
              </h1>
              <p className="mb-6 text-xl text-muted-foreground leading-relaxed">{course.subtitle}</p>

              {course.heroPoints?.length ? (
                <div className="mb-7 border-r-4 border-[#1877F2] bg-white/80 px-5 py-5 shadow-sm">
                  <div className="space-y-2 text-lg leading-relaxed text-foreground">
                    {course.heroPoints.map((point) => (
                      <p key={point}>{point}</p>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserRound className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg text-foreground">
                    <span className="text-muted-foreground">استاد: </span>
                    {course.instructor.name}
                  </p>
                  <p className="text-base text-muted-foreground">{course.instructor.title}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-base text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-5 w-5" />{course.duration}</span>
                <span className="flex items-center gap-1"><BookOpen className="h-5 w-5" />{visibleModules.length} ماڈیولز</span>
                {course.stages ? <span className="flex items-center gap-1"><Award className="h-5 w-5" />{course.stages} مراحل</span> : null}
                <span className="flex items-center gap-1"><Globe className="h-5 w-5" />زبان: {course.language}</span>
                <span className="flex items-center gap-1"><BarChart3 className="h-5 w-5" />{course.level}</span>
              </div>

              {course.introVideo ? (
                <div className="mt-8 overflow-hidden rounded-2xl border bg-black shadow-xl">
                  <div className="flex items-center gap-2 border-b border-white/10 bg-slate-950 px-5 py-3 text-right text-white" dir="rtl">
                    <Play className="h-5 w-5 text-accent" />
                    <span className="text-lg font-nastaliq">کورس کا تعارفی ویڈیو</span>
                  </div>
                  <video
                    controls
                    preload="metadata"
                    className="aspect-video w-full bg-black"
                    aria-label={`${course.title} کا تعارفی ویڈیو`}
                  >
                    <source src={course.introVideo} type="video/mp4" />
                    آپ کا براؤزر ویڈیو چلانے کی سہولت نہیں رکھتا۔
                  </video>
                </div>
              ) : null}

              <div className="mt-8 border-r-4 border-primary bg-white/75 px-5 py-6 text-right shadow-sm sm:px-6" dir="rtl">
                <h2 className="text-2xl font-nastaliq leading-relaxed text-accent">یہ کورس کن لوگوں کے لیے ہے؟</h2>
                <p className="mt-2 text-base text-muted-foreground">{audienceIntro}</p>
                <ul className="mt-4 grid list-disc grid-cols-1 gap-x-8 gap-y-2 pr-5 text-base leading-relaxed text-foreground md:grid-cols-2">
                  {audience.map((item) => (
                    <li key={item}>{item}۔</li>
                  ))}
                </ul>
                {course.audienceNote ? (
                  <p className="mt-5 border-t pt-4 text-base leading-relaxed text-muted-foreground">{course.audienceNote}</p>
                ) : (
                  <p className="mt-5 border-t pt-4 text-base leading-relaxed text-muted-foreground">
                    والدین اور اساتذہ بھی اس کورس سے فائدہ اٹھا سکتے ہیں تاکہ وہ نوجوانوں پر اپنی پسند مسلط کرنے کے بجائے انہیں معلومات کی بنیاد پر فیصلہ کرنے میں مدد دے سکیں۔
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-20 overflow-hidden rounded-2xl border bg-card shadow-xl">
                <div className={`relative bg-white ${course.coverAspect === 'wide' ? 'aspect-[11/6]' : 'aspect-[3/2]'}`}>
                  <Image src={course.coverImage} alt={course.title} fill className="object-contain" priority />
                </div>
                <div className="p-6">
                  <div className="mb-6 space-y-3">
                    <div className="flex items-center gap-2 text-base text-muted-foreground"><Clock className="h-4 w-4" /><span>مدت: {course.duration}</span></div>
                    <div className="flex items-center gap-2 text-base text-muted-foreground"><BookOpen className="h-4 w-4" /><span>ماڈیولز: {visibleModules.length}</span></div>
                    {course.stages ? <div className="flex items-center gap-2 text-base text-muted-foreground"><Award className="h-4 w-4" /><span>مراحل: {course.stages}</span></div> : null}
                    <div className="flex items-center gap-2 text-base text-muted-foreground"><Globe className="h-4 w-4" /><span>زبان: {course.language}</span></div>
                    <div className="flex items-center gap-2 text-base text-muted-foreground"><BarChart3 className="h-4 w-4" /><span>سطح: {course.level}</span></div>
                    <div className="flex items-center gap-2 text-base text-muted-foreground"><Award className="h-4 w-4" /><span>سرٹیفکیٹ: ہاں</span></div>
                    {course.code ? <div className="text-sm text-muted-foreground" dir="ltr">Course code: {course.code}</div> : null}
                  </div>
                  <div className="mb-4 flex items-baseline gap-2 border-b pb-4">
                    <span className="text-3xl font-bold text-foreground">{course.price}</span>
                    <span className="text-base text-muted-foreground">کورس فیس</span>
                  </div>

                  <div className="mb-4 rounded-xl border border-amber-300/70 bg-amber-50 p-4 text-right">
                    <p className="text-base font-semibold text-amber-900">خریداری سے پہلے اہم معلومات</p>
                    <ul className="mt-2 list-disc space-y-1 pr-5 text-sm leading-relaxed text-amber-900">
                      {COURSE_PURCHASE_NOTES.map((note) => <li key={note}>{note}</li>)}
                    </ul>
                  </div>

                  {hasPurchased && progress ? (
                    <div className="mb-4 space-y-3 rounded-2xl bg-primary/5 p-4">
                      <div className="flex items-center justify-between text-base">
                        <span className="text-foreground">آپ کی پیش رفت</span>
                        <span className="text-primary">{progress.percent_complete}%</span>
                      </div>
                      <Progress value={progress.percent_complete} />
                      <p className="text-sm text-muted-foreground">
                        {progress.completed_lessons} از {progress.total_lessons} اسباق مکمل
                      </p>
                    </div>
                  ) : null}

                  {!enrollmentOpen ? (
                    <Button className="mb-3 w-full text-lg" size="lg" disabled>داخلہ جلد کھلے گا</Button>
                  ) : isAuthenticated ? (
                    hasPurchased ? (
                      <Link href="/dashboard">
                        <Button className="mb-3 w-full text-lg" size="lg">اپنا ڈیش بورڈ دیکھیں</Button>
                      </Link>
                    ) : (
                      token ? <ManualPaymentForm token={token} courseId={course.id} onApproved={refreshApprovedCourse} /> : null
                    )
                  ) : (
                    <Link href="/login">
                      <Button className="mb-3 w-full text-lg" size="lg">لاگ اِن کر کے خریدیں</Button>
                    </Link>
                  )}

                  {feedback ? <p className="mt-4 text-center text-sm text-muted-foreground">{feedback}</p> : null}

                  {!isAuthenticated ? (
                    <p className="mt-4 text-center text-sm text-muted-foreground">
                      کورس خریدنے اور پیش رفت محفوظ رکھنے کے لیے پہلے اکاؤنٹ بنائیں۔
                    </p>
                  ) : user ? (
                    <p className="mt-4 text-center text-sm text-muted-foreground">یہ کورس {user.full_name} کے اکاؤنٹ سے منسلک ہوگا۔</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl md:text-3xl font-nastaliq text-accent">کورس کا جائزہ</h2>
          <div className="mb-8 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {(course.descriptionParagraphs ?? [course.description]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <div className="rounded-2xl border-2 border-primary/10 bg-primary/5 p-8">
            <h3 className="mb-6 text-2xl font-nastaliq text-accent">آپ کیا سیکھیں گے</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {course.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <span className="text-lg text-foreground leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {course.benefits?.length ? (
            <div className="mt-10">
              <h3 className="text-2xl font-nastaliq text-accent">یہ مہارت آپ کے کام میں کیا بدلے گی؟</h3>
              <div className="mt-5 divide-y border-y">
                {course.benefits.map((benefit) => (
                  <div key={benefit.title} className="grid gap-2 py-5 md:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.7fr)] md:gap-8">
                    <h4 className="text-lg font-semibold text-accent">{benefit.title}</h4>
                    <p className="text-base leading-relaxed text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {course.bonuses?.length ? (
            <div className="mt-8 border-r-4 border-accent bg-accent/5 p-6">
              <h3 className="text-2xl font-nastaliq text-accent">کورس بونس</h3>
              <ul className="mt-4 grid gap-3 md:grid-cols-3">
                {course.bonuses.map((bonus) => (
                  <li key={bonus} className="flex items-start gap-2 text-base leading-relaxed text-foreground">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    {bonus}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {course.requirements?.length || course.notFor?.length ? (
            <div className="mt-10 grid gap-10 border-y py-8 md:grid-cols-2">
              {course.requirements?.length ? (
                <div>
                  <h3 className="text-2xl font-nastaliq text-accent">ضروری شرائط</h3>
                  <ul className="mt-4 space-y-3">
                    {course.requirements.map((requirement) => (
                      <li key={requirement} className="flex items-start gap-2 text-base leading-relaxed text-foreground">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />{requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {course.notFor?.length ? (
                <div>
                  <h3 className="text-2xl font-nastaliq text-accent">یہ کورس کن کے لیے نہیں ہے؟</h3>
                  <ul className="mt-4 list-disc space-y-3 pr-5 text-base leading-relaxed text-muted-foreground">
                    {course.notFor.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}

          {course.included?.length ? (
            <div className="mt-10 border-r-4 border-primary bg-primary/5 p-6">
              <h3 className="text-2xl font-nastaliq text-accent">کورس کے ساتھ کیا ملتا ہے؟</h3>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {course.included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base leading-relaxed text-foreground">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />{item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {course.earningPaths?.length ? (
        <section className="border-y bg-[#071A2B] py-16 text-white">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-[#63D7B0]">Learn & Earn</p>
              <h2 className="mt-2 text-3xl font-nastaliq leading-relaxed">ویب سائٹ بنا کر پیسے کیسے کمائیں گے؟</h2>
              <p className="mt-3 text-lg leading-relaxed text-white/75">ہم صرف کوڈ نہیں، کمائی کا پورا نقشہ دیں گے۔</p>
            </div>
            <div className="mt-9 grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-2 lg:grid-cols-5">
              {course.earningPaths.map((path) => (
                <article key={path.title} className="bg-[#071A2B] p-5">
                  <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#63D7B0]">{path.title}</p>
                  <h3 className="mt-3 text-xl font-nastaliq leading-relaxed text-white">{path.subtitle}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">{path.description}</p>
                </article>
              ))}
            </div>
            {course.actionPlan ? (
              <div className="mt-8 border-r-4 border-[#F6C453] bg-white/5 px-6 py-5">
                <p className="text-sm font-semibold text-[#F6C453]">30 دن میں پہلی کمائی کا پلان</p>
                <p className="mt-2 text-lg leading-relaxed text-white">{course.actionPlan}</p>
              </div>
            ) : null}
            {course.earningsDisclaimer ? <p className="mt-5 text-sm leading-relaxed text-white/55">{course.earningsDisclaimer}</p> : null}
          </div>
        </section>
      ) : null}

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-2xl md:text-3xl font-nastaliq text-accent">نصاب</h2>
          <p className="mb-8 text-lg text-muted-foreground">{visibleModules.length} ماڈیول، {visibleLessonCount} لیکچرز</p>
          {course.curriculumIntro ? <p className="-mt-5 mb-8 border-r-4 border-accent pr-4 text-base leading-relaxed text-muted-foreground">{course.curriculumIntro}</p> : null}

          {hasPurchased && activeLesson ? (
            <div className="mb-8 space-y-3 rounded-2xl border bg-card p-5 shadow-sm">
              {activeLesson.lesson.kind === 'video' ? (
                lessonPlayback ? (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl font-nastaliq text-accent">اب چل رہا ہے: {activeLesson.lesson.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        {lessonPlayback.completion_threshold_percent}% دیکھنے پر سبق مکمل ہوگا
                      </span>
                    </div>
                    <CloudflareLessonPlayer
                      hlsUrl={lessonPlayback.hls_url}
                      posterUrl={lessonPlayback.thumbnail_url}
                      thresholdPercent={lessonPlayback.completion_threshold_percent}
                      onThresholdReached={handleWatchThresholdReached}
                    />
                  </>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                    <h3 className="text-xl font-nastaliq text-accent">{activeLesson.lesson.title}</h3>
                    <p className="mt-3 text-lg text-black">
                      {playbackFeedback || 'یہ ویڈیو بعد میں Cloudflare Stream سے replace کی جائے گی۔'}
                    </p>
                  </div>
                )
              ) : (
                <CourseTextLesson
                  lesson={activeLesson.lesson}
                  completed={completedLookup.has(`${activeLesson.moduleId}:${activeLesson.lessonIndex}`)}
                  isLoading={actionStatus === 'loading'}
                  onMarkComplete={() => toggleLesson(activeLesson.moduleId, activeLesson.lessonIndex, true)}
                />
              )}
              {playbackFeedback && activeLesson.lesson.kind === 'video' ? (
                <p className="text-sm text-primary">{playbackFeedback}</p>
              ) : null}
            </div>
          ) : null}

          <Accordion type="multiple" defaultValue={curriculumModules[0] ? [curriculumModules[0].id] : []}>
            {curriculumModules.map((module, moduleIndex) => (
              <AccordionItem key={module.id} value={module.id} className="mb-3 overflow-hidden rounded-xl border bg-card px-6">
                <AccordionTrigger className="text-xl font-nastaliq text-accent hover:no-underline">
                  <div className="flex items-center gap-3 text-right">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-base font-bold text-primary">{moduleIndex + 1}</span>
                    <span>
                      {module.stage ? <span className="mb-1 block text-xs font-sans font-semibold text-primary">{module.stage}</span> : null}
                      {module.title}
                    </span>
                    <span className="text-sm font-normal text-muted-foreground">({module.curriculumRows.length} لیکچرز)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-2 pb-2">
                    {module.curriculumRows.map((row) => {
                      const rowLessons = [...row.videoLessons, row.textLesson]
                        .filter((item): item is VisibleLesson => Boolean(item));
                      const availableRowLessons = rowLessons.filter(({ lesson }) => !lesson.comingSoon);
                      const rowComingSoon = rowLessons.length > 0 && rowLessons.every(({ lesson }) => lesson.comingSoon);
                      const completed = availableRowLessons.length > 0
                        && availableRowLessons.every(({ lessonIndex }) => completedLookup.has(`${module.id}:${lessonIndex}`));
                      return (
                        <div key={row.key} className="flex flex-col gap-3 rounded-lg bg-secondary/50 px-4 py-3 md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center gap-3">
                            {hasPurchased ? (
                              rowComingSoon ? (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-300 bg-amber-50 text-amber-700">
                                  <Clock className="h-4 w-4" />
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => toggleCurriculumRow(module.id, row, !completed)}
                                  className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                                    completed
                                      ? 'border-primary bg-primary text-primary-foreground'
                                      : 'border-border bg-white text-muted-foreground'
                                  }`}
                                  disabled={actionStatus === 'loading'}
                                  aria-label="سبق مکمل کریں"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </button>
                              )
                            ) : (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-muted-foreground">
                                <Lock className="h-4 w-4" />
                              </div>
                            )}
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-base text-foreground">{row.title}</span>
                                {row.videoLessons.length > 0 ? (
                                  <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">ویڈیو</Badge>
                                ) : null}
                                {row.textLesson ? (
                                  <Badge variant="outline" className={row.textLesson.lesson.comingSoon ? 'border-amber-300 bg-amber-50 text-amber-800' : 'border-accent/40 bg-accent/10 text-accent'}>
                                    {row.textLesson.lesson.comingSoon ? 'نوٹس جلد دستیاب' : 'نوٹس'}
                                  </Badge>
                                ) : null}
                              </div>
                              {rowComingSoon ? (
                                <p className="text-sm text-muted-foreground">یہ مواد جلد دستیاب ہوگا۔</p>
                              ) : completed ? (
                                <p className="text-sm text-primary">یہ لیکچر مکمل ہو چکا ہے</p>
                              ) : null}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {hasPurchased ? row.videoLessons.map(({ lesson, lessonIndex }, videoIndex) => (
                              !lesson.comingSoon ? (
                                <Button
                                  key={lesson.id}
                                  type="button"
                                  size="sm"
                                  className="border border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                                  onClick={() => openLesson(module.id, lessonIndex, lesson)}
                                  disabled={actionStatus === 'loading'}
                                >
                                  {row.videoLessons.length > 1 ? `ویڈیو ${videoIndex + 1}` : 'ویڈیو'}
                                </Button>
                              ) : null
                            )) : null}
                            {hasPurchased && row.textLesson && !row.textLesson.lesson.comingSoon ? (
                              <Button
                                type="button"
                                size="sm"
                                className="border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground"
                                onClick={() => openLesson(module.id, row.textLesson!.lessonIndex, row.textLesson!.lesson)}
                                disabled={actionStatus === 'loading'}
                              >
                                نوٹس
                              </Button>
                            ) : null}
                            <span className="text-sm text-muted-foreground">
                              {row.videoLessons.length > 0 ? row.videoLessons.map(({ lesson }) => lesson.duration).join('، ') : null}
                              {row.videoLessons.length > 0 && row.textLesson ? ' / ' : null}
                              {row.textLesson ? row.textLesson.lesson.duration : null}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {course.fastTrack ? (
            <div className="mt-10 border border-[#2F5496]/25 bg-white p-6 shadow-sm sm:p-8">
              <Badge className="bg-[#2F5496] text-white hover:bg-[#2F5496]">فاسٹ ٹریک</Badge>
              <h3 className="mt-4 text-2xl font-nastaliq text-accent">{course.fastTrack.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{course.fastTrack.description}</p>
              <ol className="mt-6 grid gap-2 sm:grid-cols-2">
                {course.fastTrack.lessons.map((lesson, index) => (
                  <li key={lesson} className="flex items-start gap-3 border-b py-3 text-base text-foreground">
                    <span className="font-sans font-bold text-[#2F5496]">{String(index + 1).padStart(2, '0')}</span>
                    {lesson}
                  </li>
                ))}
              </ol>
              {course.fastTrack.footer ? <p className="mt-5 text-sm text-muted-foreground">{course.fastTrack.footer}</p> : null}
            </div>
          ) : null}
        </div>
      </section>

      {course.parentMessage || course.certificate ? (
        <section className="border-y bg-[#F4F7F9] py-16">
          <div className="container mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            {course.parentMessage ? (
              <div className="border-r-4 border-primary pr-6">
                <h2 className="text-2xl font-nastaliq text-accent">والدین کے لیے پیغام</h2>
                <p className="mt-4 text-lg leading-[2] text-muted-foreground">{course.parentMessage}</p>
              </div>
            ) : null}
            {course.certificate ? (
              <div className="border-r-4 border-accent pr-6">
                <h2 className="text-2xl font-nastaliq text-accent">سرٹیفکیٹ اور اگلا قدم</h2>
                <p className="mt-4 text-lg leading-[2] text-muted-foreground">{course.certificate}</p>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl md:text-3xl font-nastaliq text-accent">استاد</h2>
          <div className="flex flex-col items-start gap-8 md:flex-row">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <UserRound className="h-14 w-14" />
            </div>
            <div>
              <h3 className="mb-1 text-2xl font-nastaliq text-accent">{course.instructor.name}</h3>
              <p className="mb-4 text-lg text-primary">{course.instructor.title}</p>
              <p className="text-lg text-muted-foreground leading-relaxed">{course.instructor.bio}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl bg-gradient-to-l from-primary to-primary/80 p-10 text-white">
            <h2 className="mb-4 text-3xl font-nastaliq">{enrollmentOpen ? 'آج ہی اپنا مستقبل بنائیں' : 'کورس کی تیاری جاری ہے'}</h2>
            <p className="mb-8 text-lg text-white/80">
              {enrollmentOpen
                ? 'شمع.pk کے ساتھ اپنا سیکھنے کا سفر شروع کریں اور اپنی حقیقی رائے سے اسے بہتر بنانے میں مدد دیں۔'
                : 'نصاب تیار ہے۔ اسباق، عملی فائلیں اور پراجیکٹس مکمل ہونے کے بعد داخلہ کھولا جائے گا۔'}
            </p>
            {enrollmentOpen ? (
              <Link href={hasPurchased ? '/dashboard' : isAuthenticated ? `/course/${course.slug}` : '/signup'}>
                <Button size="lg" className="bg-accent text-lg text-accent-foreground hover:bg-accent/90">
                  {hasPurchased ? 'اپنا ڈیش بورڈ کھولیں' : 'ابھی شامل ہوں'}
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Button size="lg" className="bg-white/15 text-lg text-white" disabled>داخلہ جلد کھلے گا</Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
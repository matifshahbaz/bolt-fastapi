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

type CourseExperienceProps = {
  course: Course;
};

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

  const hasPurchased = Boolean(progress);
  const visibleModules = course.modules
    .filter((module) => !module.hidden)
    .map((module) => ({
      ...module,
      lessons: module.lessons
        .map((lesson, lessonIndex) => ({ lesson, lessonIndex }))
        .filter(({ lesson }) => !lesson.hidden),
    }));
  const visibleLessonCount = visibleModules.reduce((total, module) => total + module.lessons.length, 0);

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
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">نمایاں کورس</Badge>
              </div>
              <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-nastaliq text-foreground leading-[1.6]">
                {course.title}
              </h1>
              <p className="mb-6 text-xl text-muted-foreground leading-relaxed">{course.subtitle}</p>

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
                <span className="flex items-center gap-1"><BookOpen className="h-5 w-5" />{visibleLessonCount} اسباق</span>
                <span className="flex items-center gap-1"><Globe className="h-5 w-5" />زبان: {course.language}</span>
                <span className="flex items-center gap-1"><BarChart3 className="h-5 w-5" />{course.level}</span>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-20 overflow-hidden rounded-2xl border bg-card shadow-xl">
                <div className="relative aspect-[3/2] bg-white">
                  <Image src={course.coverImage} alt={course.title} fill className="object-contain" priority />
                </div>
                <div className="p-6">
                  <div className="mb-6 space-y-3">
                    <div className="flex items-center gap-2 text-base text-muted-foreground"><Clock className="h-4 w-4" /><span>مدت: {course.duration}</span></div>
                    <div className="flex items-center gap-2 text-base text-muted-foreground"><BookOpen className="h-4 w-4" /><span>اسباق: {visibleLessonCount}</span></div>
                    <div className="flex items-center gap-2 text-base text-muted-foreground"><Globe className="h-4 w-4" /><span>زبان: {course.language}</span></div>
                    <div className="flex items-center gap-2 text-base text-muted-foreground"><BarChart3 className="h-4 w-4" /><span>سطح: {course.level}</span></div>
                    <div className="flex items-center gap-2 text-base text-muted-foreground"><Award className="h-4 w-4" /><span>سرٹیفکیٹ: ہاں</span></div>
                  </div>
                  <div className="mb-4 flex items-baseline gap-2 border-b pb-4">
                    <span className="text-3xl font-bold text-foreground">{course.price}</span>
                    <span className="text-base text-muted-foreground">کورس فیس</span>
                  </div>

                  <div className="mb-4 rounded-xl border border-amber-300/70 bg-amber-50 p-4 text-right">
                    <p className="text-base font-semibold text-amber-900">خریداری سے پہلے اہم معلومات</p>
                    <ul className="mt-2 list-disc space-y-1 pr-5 text-sm leading-relaxed text-amber-900">
                      <li>یہ کورس صرف آن لائن اسٹریمنگ/پڑھائی کے لیے ہے۔</li>
                      <li>لیکچر ویڈیوز ڈاؤن لوڈ کے لیے دستیاب نہیں ہوں گی۔</li>
                      <li>خریداری کے بعد کورس تک رسائی صرف 30 دن (ایک ماہ) کے لیے ہوگی۔</li>
                      <li>ریفنڈ پالیسی: خریداری کے 7 دن کے اندر بغیر سوال کے ریفنڈ دستیاب ہے۔</li>
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

                  {isAuthenticated ? (
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
          <h2 className="mb-6 text-2xl md:text-3xl font-nastaliq text-foreground">کورس کا جائزہ</h2>
          <p className="mb-8 text-lg text-muted-foreground leading-relaxed">{course.description}</p>

          <div className="rounded-2xl border-2 border-primary/10 bg-primary/5 p-8">
            <h3 className="mb-6 text-2xl font-nastaliq text-foreground">آپ کیا سیکھیں گے</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {course.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <span className="text-lg text-foreground leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-2xl md:text-3xl font-nastaliq text-foreground">نصاب</h2>
          <p className="mb-8 text-lg text-muted-foreground">{visibleModules.length} ماڈیول، {visibleLessonCount} اسباق</p>

          {hasPurchased && activeLesson ? (
            <div className="mb-8 space-y-3 rounded-2xl border bg-card p-5 shadow-sm">
              {activeLesson.lesson.kind === 'video' ? (
                lessonPlayback ? (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl font-nastaliq text-foreground">اب چل رہا ہے: {activeLesson.lesson.title}</h3>
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
                    <h3 className="text-xl font-nastaliq text-[#2F5496]">{activeLesson.lesson.title}</h3>
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

          <Accordion type="single" collapsible defaultValue="m1">
            {visibleModules.map((module, moduleIndex) => (
              <AccordionItem key={module.id} value={module.id} className="mb-3 overflow-hidden rounded-xl border bg-card px-6">
                <AccordionTrigger className="text-xl font-nastaliq text-foreground hover:no-underline">
                  <div className="flex items-center gap-3 text-right">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-base font-bold text-primary">{moduleIndex + 1}</span>
                    {module.title}
                    <span className="text-sm font-normal text-muted-foreground">({module.lessons.length} اسباق)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-2 pb-2">
                    {module.lessons.map(({ lesson, lessonIndex }) => {
                      const lessonKey = `${module.id}:${lessonIndex}`;
                      const completed = completedLookup.has(lessonKey);
                      return (
                        <div key={lessonKey} className="flex flex-col gap-3 rounded-lg bg-secondary/50 px-4 py-3 md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center gap-3">
                            {hasPurchased ? (
                              lesson.comingSoon ? (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-300 bg-amber-50 text-amber-700">
                                  <Clock className="h-4 w-4" />
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => toggleLesson(module.id, lessonIndex, !completed)}
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
                                <span className="text-base text-foreground">{lesson.title}</span>
                                <Badge
                                  variant="outline"
                                  className={lesson.comingSoon ? 'border-amber-300 bg-amber-50 text-amber-800' : 'border-slate-300 text-slate-700'}
                                >
                                  {lesson.comingSoon ? 'جلد دستیاب' : lesson.kind === 'video' ? 'ویڈیو' : 'متن'}
                                </Badge>
                              </div>
                              {lesson.comingSoon ? (
                                <p className="text-sm text-muted-foreground">یہ مواد جلد دستیاب ہوگا۔</p>
                              ) : completed ? (
                                <p className="text-sm text-primary">یہ سبق مکمل ہو چکا ہے</p>
                              ) : null}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {hasPurchased && !lesson.comingSoon ? (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => openLesson(module.id, lessonIndex, lesson)}
                                disabled={actionStatus === 'loading'}
                              >
                                {lesson.kind === 'video' ? 'دیکھیں' : 'پڑھیں'}
                              </Button>
                            ) : null}
                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl md:text-3xl font-nastaliq text-foreground">استاد</h2>
          <div className="flex flex-col items-start gap-8 md:flex-row">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <UserRound className="h-14 w-14" />
            </div>
            <div>
              <h3 className="mb-1 text-2xl font-nastaliq text-foreground">{course.instructor.name}</h3>
              <p className="mb-4 text-lg text-primary">{course.instructor.title}</p>
              <p className="text-lg text-muted-foreground leading-relaxed">{course.instructor.bio}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl bg-gradient-to-l from-primary to-primary/80 p-10 text-white">
            <h2 className="mb-4 text-3xl font-nastaliq">آج ہی اپنا مستقبل بنائیں</h2>
            <p className="mb-8 text-lg text-white/80">شمع.pk ایک نیا آغاز ہے۔ پہلے کورس کے ساتھ اپنا سیکھنے کا سفر شروع کریں اور اپنی حقیقی رائے سے اسے بہتر بنانے میں مدد دیں۔</p>
            <Link href={hasPurchased ? '/dashboard' : isAuthenticated ? '/course' : '/signup'}>
              <Button size="lg" className="bg-accent text-lg text-accent-foreground hover:bg-accent/90">
                {hasPurchased ? 'اپنا ڈیش بورڈ کھولیں' : 'ابھی شامل ہوں'}
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
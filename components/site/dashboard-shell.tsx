'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Clock, GraduationCap } from 'lucide-react';

import { useAuth } from '@/components/site/auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getDashboard, type DashboardResponse } from '@/lib/lms-api';

export function DashboardShell() {
  const router = useRouter();
  const { token, isLoading, isAuthenticated, user } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated || !token) {
      router.replace('/login');
      return;
    }

    setStatus('loading');
    getDashboard(token)
      .then((payload) => {
        setDashboard(payload);
        setStatus('idle');
      })
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : 'ڈیش بورڈ لوڈ نہیں ہو سکا۔');
        setStatus('error');
      });
  }, [isAuthenticated, isLoading, router, token]);

  if (isLoading || status === 'loading') {
    return <p className="text-center text-lg text-muted-foreground">ڈیش بورڈ لوڈ ہو رہا ہے...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      <Card className="border-2 border-primary/10 bg-gradient-to-l from-primary/5 to-white">
        <CardHeader>
          <CardTitle className="font-nastaliq text-3xl text-foreground">
            خوش آمدید، {user.full_name}
          </CardTitle>
          <CardDescription className="text-base">
            یہاں آپ اپنی خریدی ہوئی کلاسز، سیکھنے کی رفتار، اور باقی اسباق دیکھ سکتے ہیں۔
          </CardDescription>
        </CardHeader>
      </Card>

      {status === 'error' ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      ) : null}

      {dashboard?.enrolled_courses.length ? (
        <div className="grid gap-6">
          {dashboard.enrolled_courses.map((course) => (
            <Card key={course.enrollment.id} className="border shadow-sm">
              <CardHeader>
                <CardTitle className="font-nastaliq text-2xl">{course.course_title}</CardTitle>
                <CardDescription className="text-base">{course.course_subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-secondary/50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      حیثیت
                    </div>
                    <p className="text-lg text-foreground">فعال داخلہ</p>
                  </div>
                  <div className="rounded-2xl bg-secondary/50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      مکمل اسباق
                    </div>
                    <p className="text-lg text-foreground">
                      {course.progress.completed_lessons} / {course.progress.total_lessons}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-secondary/50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      آخری رسائی
                    </div>
                    <p className="text-lg text-foreground">
                      {course.enrollment.last_accessed_at
                        ? new Date(course.enrollment.last_accessed_at).toLocaleDateString('ur-PK')
                        : 'ابھی تک نہیں'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-base text-muted-foreground">
                    <span>{course.progress.percent_complete}% مکمل</span>
                    <span>{course.enrollment.price_paid}</span>
                  </div>
                  <Progress value={course.progress.percent_complete} />
                </div>

                <Link href="/course">
                  <Button className="text-lg">کورس جاری رکھیں</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="space-y-4 pt-6 text-center">
            <p className="text-lg text-muted-foreground">
              آپ نے ابھی تک کوئی کورس نہیں خریدا۔
            </p>
            <Link href="/course">
              <Button className="text-lg">ابھی کورس خریدیں</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
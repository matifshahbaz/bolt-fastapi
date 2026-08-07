'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PauseCircle, PlayCircle, RefreshCw, Search, Trash2, UserPlus, Users } from 'lucide-react';

import { AdminNav } from '@/components/site/admin-nav';
import { useAuth } from '@/components/site/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  createAdminEnrollment,
  deleteAdminEnrollment,
  listAdminStudents,
  updateAdminEnrollmentStatus,
  type AdminStudentRecord,
} from '@/lib/lms-api';

const COURSE_ID = 'career-guidance-for-pakistani-youth';

const statusLabels: Record<string, string> = {
  active: 'فعال',
  inactive: 'معطل',
  expired: 'مدت ختم',
  refunded: 'ریفنڈ شدہ',
};

export function StudentAdmin() {
  const router = useRouter();
  const { token, user, isLoading, isAuthenticated } = useAuth();
  const [students, setStudents] = useState<AdminStudentRecord[]>([]);
  const [search, setSearch] = useState('');
  const [enrollmentEmail, setEnrollmentEmail] = useState('');
  const [pricePaid, setPricePaid] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading'>('loading');
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');

  const loadStudents = async (authToken: string, query = '') => {
    setStatus('loading');
    setError('');
    try {
      setStudents(await listAdminStudents(authToken, COURSE_ID, query));
    } catch (loadError) {
      setStudents([]);
      setError(loadError instanceof Error ? loadError.message : 'طلبہ کی فہرست لوڈ نہیں ہو سکی۔');
    } finally {
      setStatus('idle');
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated || !token) {
      router.replace('/login');
      return;
    }
    if (!user?.is_admin) {
      setError('اس صفحے کے لیے ایڈمن رسائی درکار ہے۔');
      setStatus('idle');
      return;
    }
    void loadStudents(token);
  }, [isAuthenticated, isLoading, router, token, user?.is_admin]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (token) {
      void loadStudents(token, search);
    }
  };

  const enrollByEmail = async (email: string, customPrice?: string) => {
    if (!token) {
      return;
    }
    const actionKey = `enroll-${email}`;
    setActiveAction(actionKey);
    setError('');
    setFeedback('');
    try {
      await createAdminEnrollment(token, email, COURSE_ID, customPrice);
      setFeedback(`${email} کو کورس تک رسائی دے دی گئی ہے۔`);
      setEnrollmentEmail('');
      setPricePaid('');
      await loadStudents(token, search);
    } catch (enrollError) {
      setError(enrollError instanceof Error ? enrollError.message : 'داخلہ مکمل نہیں ہو سکا۔');
    } finally {
      setActiveAction(null);
    }
  };

  const changeStatus = async (student: AdminStudentRecord, nextStatus: 'active' | 'inactive') => {
    if (!token) {
      return;
    }
    setActiveAction(`status-${student.user_id}`);
    setError('');
    setFeedback('');
    try {
      await updateAdminEnrollmentStatus(token, student.user_id, COURSE_ID, nextStatus);
      setFeedback(`${student.full_name} کی رسائی ${nextStatus === 'active' ? 'فعال' : 'معطل'} کر دی گئی ہے۔`);
      await loadStudents(token, search);
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : 'حیثیت تبدیل نہیں ہو سکی۔');
    } finally {
      setActiveAction(null);
    }
  };

  const removeEnrollment = async (student: AdminStudentRecord) => {
    if (!token || !window.confirm(`${student.full_name} کا داخلہ اور محفوظ پیش رفت مستقل طور پر ختم کریں؟`)) {
      return;
    }
    setActiveAction(`remove-${student.user_id}`);
    setError('');
    setFeedback('');
    try {
      await deleteAdminEnrollment(token, student.user_id, COURSE_ID);
      setFeedback(`${student.full_name} کا داخلہ اور کورس پیش رفت ختم کر دی گئی ہے۔`);
      await loadStudents(token, search);
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : 'داخلہ ختم نہیں ہو سکا۔');
    } finally {
      setActiveAction(null);
    }
  };

  const activeCount = students.filter((student) => student.enrollment?.status === 'active').length;
  const enrolledCount = students.filter((student) => student.enrollment).length;

  if (isLoading) {
    return <p className="text-center text-muted-foreground">اکاؤنٹ چیک ہو رہا ہے...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-nastaliq text-3xl text-foreground">طلبہ اور کورس داخلے</h1>
        <p className="mt-2 text-muted-foreground">رجسٹرڈ اکاؤنٹس تلاش کریں، رسائی دیں، معطل کریں یا داخلہ ختم کریں۔</p>
      </div>

      <AdminNav />

      <section className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3" aria-label="داخلہ خلاصہ">
        <div className="bg-card p-4"><p className="text-sm text-muted-foreground">رجسٹرڈ اکاؤنٹس</p><p className="mt-1 text-2xl font-semibold">{students.length}</p></div>
        <div className="bg-card p-4"><p className="text-sm text-muted-foreground">کورس میں شامل</p><p className="mt-1 text-2xl font-semibold">{enrolledCount}</p></div>
        <div className="bg-card p-4"><p className="text-sm text-muted-foreground">فعال رسائی</p><p className="mt-1 text-2xl font-semibold text-green-700">{activeCount}</p></div>
      </section>

      <section className="space-y-4 border-y bg-card py-5">
        <div>
          <h2 className="text-xl font-semibold">ای میل سے دستی داخلہ</h2>
          <p className="mt-1 text-sm text-muted-foreground">طالب علم کا اکاؤنٹ پہلے سے رجسٹرڈ ہونا ضروری ہے۔ قیمت خالی چھوڑنے پر موجودہ کورس فیس استعمال ہوگی۔</p>
        </div>
        <form
          className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            void enrollByEmail(enrollmentEmail, pricePaid);
          }}
        >
          <Input type="email" required value={enrollmentEmail} onChange={(event) => setEnrollmentEmail(event.target.value)} placeholder="student@example.com" dir="ltr" aria-label="طالب علم کی ای میل" />
          <Input value={pricePaid} onChange={(event) => setPricePaid(event.target.value)} placeholder="Rs. 500 (اختیاری)" aria-label="ادا شدہ قیمت" />
          <Button type="submit" disabled={Boolean(activeAction)}><UserPlus className="ml-2 h-4 w-4" />داخلہ دیں</Button>
        </form>
      </section>

      <form onSubmit={handleSearch} className="flex flex-col gap-2 sm:flex-row">
        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="نام، ای میل، موبائل یا مقام تلاش کریں" className="min-w-0 flex-1" />
        <Button type="submit" variant="outline" disabled={status === 'loading'}><Search className="ml-2 h-4 w-4" />تلاش</Button>
        <Button type="button" variant="ghost" onClick={() => { setSearch(''); token && void loadStudents(token); }} disabled={status === 'loading'}><RefreshCw className="ml-2 h-4 w-4" />تمام</Button>
      </form>

      {error ? <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</p> : null}
      {feedback ? <p className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">{feedback}</p> : null}

      {status === 'loading' ? (
        <p className="py-10 text-center text-muted-foreground">طلبہ لوڈ ہو رہے ہیں...</p>
      ) : students.length ? (
        <div className="divide-y rounded-lg border bg-card">
          {students.map((student) => {
            const enrollmentStatus = student.enrollment?.status;
            const isRowBusy = activeAction?.endsWith(String(student.user_id)) || activeAction === `enroll-${student.email}`;
            return (
              <article key={student.user_id} className="grid gap-4 p-4 lg:grid-cols-[minmax(220px,1.2fr)_minmax(180px,0.8fr)_minmax(160px,0.7fr)_auto] lg:items-center">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold">{student.full_name}</h3>
                  <p className="truncate text-sm text-muted-foreground" dir="ltr">{student.email}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{[student.mobile_number, student.location, student.age ? `عمر ${student.age}` : null].filter(Boolean).join(' · ') || 'اضافی معلومات درج نہیں'}</p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">داخلہ</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${enrollmentStatus === 'active' ? 'bg-green-100 text-green-800' : enrollmentStatus ? 'bg-amber-100 text-amber-900' : 'bg-secondary text-muted-foreground'}`}>
                      {enrollmentStatus ? statusLabels[enrollmentStatus] : 'شامل نہیں'}
                    </span>
                    {student.enrollment ? <span>{student.enrollment.price_paid}</span> : null}
                  </div>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">پیش رفت</p>
                  <p className="mt-1">{student.completed_lessons} اسباق مکمل</p>
                  <p className="mt-1 text-xs text-muted-foreground">رجسٹریشن: {new Date(student.registered_at).toLocaleDateString('ur-PK')}</p>
                </div>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {!student.enrollment ? (
                    <Button size="sm" onClick={() => void enrollByEmail(student.email)} disabled={isRowBusy}><UserPlus className="ml-2 h-4 w-4" />داخلہ دیں</Button>
                  ) : (
                    <>
                      {enrollmentStatus === 'active' ? (
                        <Button size="sm" variant="outline" onClick={() => void changeStatus(student, 'inactive')} disabled={isRowBusy}><PauseCircle className="ml-2 h-4 w-4" />معطل</Button>
                      ) : (
                        <Button size="sm" onClick={() => void changeStatus(student, 'active')} disabled={isRowBusy}><PlayCircle className="ml-2 h-4 w-4" />فعال کریں</Button>
                      )}
                      <Button size="sm" variant="destructive" onClick={() => void removeEnrollment(student)} disabled={isRowBusy}><Trash2 className="ml-2 h-4 w-4" />ختم کریں</Button>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-10 text-center text-muted-foreground"><Users className="mx-auto mb-3 h-8 w-8" /><p>کوئی اکاؤنٹ نہیں ملا۔</p></div>
      )}
    </div>
  );
}
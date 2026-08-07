'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ExternalLink, RefreshCw, X } from 'lucide-react';

import { useAuth } from '@/components/site/auth-provider';
import { AdminNav } from '@/components/site/admin-nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getPaymentProof, listPaymentSubmissions, reviewPayment, type PaymentSubmission } from '@/lib/lms-api';

type PaymentStatus = 'pending' | 'approved' | 'rejected';

export function PaymentAdmin() {
  const router = useRouter();
  const { token, isLoading, isAuthenticated } = useAuth();
  const [statusFilter, setStatusFilter] = useState<PaymentStatus>('pending');
  const [submissions, setSubmissions] = useState<PaymentSubmission[]>([]);
  const [reviewNotes, setReviewNotes] = useState<Record<number, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading'>('loading');
  const [activeId, setActiveId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const loadSubmissions = async (authToken: string, paymentStatus: PaymentStatus) => {
    setStatus('loading');
    setError('');
    try {
      setSubmissions(await listPaymentSubmissions(authToken, paymentStatus));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'ادائیگیاں لوڈ نہیں ہو سکیں۔');
      setSubmissions([]);
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
    void loadSubmissions(token, statusFilter);
  }, [isAuthenticated, isLoading, router, statusFilter, token]);

  const openProof = async (submissionId: number) => {
    if (!token) {
      return;
    }
    setActiveId(submissionId);
    setError('');
    try {
      const blob = await getPaymentProof(token, submissionId);
      const proofUrl = URL.createObjectURL(blob);
      window.open(proofUrl, '_blank', 'noopener,noreferrer');
      window.setTimeout(() => URL.revokeObjectURL(proofUrl), 60_000);
    } catch (proofError) {
      setError(proofError instanceof Error ? proofError.message : 'ثبوت کھولا نہیں جا سکا۔');
    } finally {
      setActiveId(null);
    }
  };

  const handleReview = async (submissionId: number, decision: 'approve' | 'reject') => {
    if (!token) {
      return;
    }
    setActiveId(submissionId);
    setError('');
    try {
      await reviewPayment(token, submissionId, decision, reviewNotes[submissionId]);
      await loadSubmissions(token, statusFilter);
    } catch (reviewError) {
      setError(reviewError instanceof Error ? reviewError.message : 'فیصلہ محفوظ نہیں ہو سکا۔');
    } finally {
      setActiveId(null);
    }
  };

  if (isLoading) {
    return <p className="text-center text-muted-foreground">اکاؤنٹ چیک ہو رہا ہے...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-nastaliq text-3xl text-foreground">ادائیگیوں کا جائزہ</h1>
        <p className="mt-2 text-muted-foreground">ثبوت دیکھیں، ادائیگی کی تصدیق کریں، اور کورس تک رسائی فعال کریں۔</p>
      </div>

      <AdminNav />

      <div className="grid grid-cols-3 gap-2 rounded-lg bg-secondary p-1">
        {(['pending', 'approved', 'rejected'] as PaymentStatus[]).map((paymentStatus) => (
          <button
            key={paymentStatus}
            type="button"
            onClick={() => setStatusFilter(paymentStatus)}
            className={`min-h-11 rounded-md px-3 text-sm ${statusFilter === paymentStatus ? 'bg-white font-semibold shadow-sm' : 'text-muted-foreground'}`}
          >
            {paymentStatus === 'pending' ? 'زیرِ جائزہ' : paymentStatus === 'approved' ? 'منظور شدہ' : 'مسترد شدہ'}
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button type="button" variant="outline" onClick={() => token && void loadSubmissions(token, statusFilter)} disabled={status === 'loading'}>
          <RefreshCw className="ml-2 h-4 w-4" />تازہ کریں
        </Button>
      </div>

      {error ? <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</p> : null}

      {status === 'loading' ? (
        <p className="text-center text-muted-foreground">ادائیگیاں لوڈ ہو رہی ہیں...</p>
      ) : submissions.length ? (
        <div className="grid gap-5">
          {submissions.map((submission) => (
            <Card key={submission.id} className="border shadow-sm">
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle className="text-xl">{submission.user_name}</CardTitle>
                    <CardDescription dir="ltr" className="mt-1 text-right">{submission.user_email}</CardDescription>
                  </div>
                  <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                    {submission.status === 'pending' ? 'زیرِ جائزہ' : submission.status === 'approved' ? 'منظور شدہ' : 'مسترد شدہ'}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <div><dt className="text-muted-foreground">طریقہ</dt><dd className="mt-1 font-medium">{submission.payment_method === 'jazzcash' ? 'JazzCash' : 'بینک ٹرانسفر'}</dd></div>
                  <div><dt className="text-muted-foreground">رقم</dt><dd className="mt-1 font-medium">{submission.amount}</dd></div>
                  <div><dt className="text-muted-foreground">بھیجنے والا اکاؤنٹ</dt><dd className="mt-1 font-medium" dir="ltr">{submission.sender_account || 'درج نہیں'}</dd></div>
                  <div><dt className="text-muted-foreground">ٹرانزیکشن ریفرنس</dt><dd className="mt-1 font-medium" dir="ltr">{submission.transaction_reference || 'درج نہیں'}</dd></div>
                </dl>
                <p className="text-sm text-muted-foreground">جمع: {new Date(submission.submitted_at).toLocaleString('ur-PK')}</p>
                {submission.review_note ? <p className="rounded-lg bg-secondary/50 p-3 text-sm">جائزہ نوٹ: {submission.review_note}</p> : null}
                <Button type="button" variant="outline" onClick={() => void openProof(submission.id)} disabled={activeId === submission.id}>
                  <ExternalLink className="ml-2 h-4 w-4" />ادائیگی ثبوت دیکھیں
                </Button>

                {submission.status === 'pending' ? (
                  <div className="space-y-3 border-t pt-4">
                    <Input
                      value={reviewNotes[submission.id] ?? ''}
                      onChange={(event) => setReviewNotes((current) => ({ ...current, [submission.id]: event.target.value }))}
                      placeholder="جائزہ نوٹ (اختیاری)"
                      maxLength={1000}
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button type="button" onClick={() => void handleReview(submission.id, 'approve')} disabled={activeId === submission.id}>
                        <Check className="ml-2 h-4 w-4" />منظور کریں اور رسائی دیں
                      </Button>
                      <Button type="button" variant="destructive" onClick={() => void handleReview(submission.id, 'reject')} disabled={activeId === submission.id}>
                        <X className="ml-2 h-4 w-4" />مسترد کریں
                      </Button>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">اس حیثیت میں کوئی ادائیگی موجود نہیں۔</p>
      )}
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Landmark, RefreshCw, Smartphone, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  getPaymentInstructions,
  getPaymentSubmission,
  submitPaymentProof,
  type PaymentInstructions,
  type PaymentSubmission,
} from '@/lib/lms-api';

type ManualPaymentFormProps = {
  token: string;
  courseId: string;
  onApproved: () => Promise<void>;
};

const MAX_PROOF_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function ManualPaymentForm({ token, courseId, onApproved }: ManualPaymentFormProps) {
  const [instructions, setInstructions] = useState<PaymentInstructions | null>(null);
  const [submission, setSubmission] = useState<PaymentSubmission | null>(null);
  const [method, setMethod] = useState<'jazzcash' | 'bank_transfer'>('jazzcash');
  const [senderAccount, setSenderAccount] = useState('');
  const [transactionReference, setTransactionReference] = useState('');
  const [proof, setProof] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [approvedAccessUnavailable, setApprovedAccessUnavailable] = useState(false);
  const [feedback, setFeedback] = useState('');

  const refreshStatus = async () => {
    const latest = await getPaymentSubmission(token, courseId);
    setSubmission(latest);
    if (latest?.status === 'approved') {
      try {
        await onApproved();
        setApprovedAccessUnavailable(false);
      } catch {
        setApprovedAccessUnavailable(true);
      }
    }
  };

  useEffect(() => {
    Promise.all([getPaymentInstructions(), getPaymentSubmission(token, courseId)])
      .then(([paymentInstructions, latest]) => {
        setInstructions(paymentInstructions);
        setSubmission(latest);
        if (latest?.status === 'approved') {
          void onApproved().catch(() => setApprovedAccessUnavailable(true));
        }
      })
      .catch((error) => setFeedback(error instanceof Error ? error.message : 'ادائیگی کی معلومات لوڈ نہیں ہو سکیں۔'))
      .finally(() => setIsLoading(false));
  }, [courseId, token]);

  const fileToDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('تصویر پڑھی نہیں جا سکی۔'));
    reader.readAsDataURL(file);
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback('');

    if (!proof || !ALLOWED_TYPES.includes(proof.type) || proof.size > MAX_PROOF_BYTES) {
      setFeedback('JPEG، PNG یا WebP تصویر منتخب کریں جس کا سائز 4 MB سے کم ہو۔');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await submitPaymentProof(token, courseId, {
        payment_method: method,
        sender_account: senderAccount || undefined,
        transaction_reference: transactionReference || undefined,
        proof_filename: proof.name,
        proof_data_url: await fileToDataUrl(proof),
      });
      setSubmission(created);
      setFeedback('آپ کا ادائیگی ثبوت موصول ہو گیا ہے۔ منظوری کے بعد آپ کو ای میل بھیجی جائے گی۔');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'ادائیگی ثبوت جمع نہیں ہو سکا۔');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p className="mb-4 text-center text-sm text-muted-foreground">ادائیگی کی معلومات لوڈ ہو رہی ہیں...</p>;
  }

  if (submission?.status === 'approved') {
    return (
      <div className={`mb-4 space-y-3 rounded-lg border p-4 text-right ${approvedAccessUnavailable ? 'border-amber-300 bg-amber-50' : 'border-green-300 bg-green-50'}`}>
        <p className={`font-semibold ${approvedAccessUnavailable ? 'text-amber-950' : 'text-green-900'}`}>
          {approvedAccessUnavailable
            ? 'ادائیگی منظور ہوئی تھی، لیکن کورس رسائی اس وقت فعال نہیں ہے۔'
            : 'ادائیگی منظور ہو چکی ہے۔ کورس رسائی چیک کی جا رہی ہے۔'}
        </p>
        {approvedAccessUnavailable ? (
          <p className="text-sm leading-relaxed text-amber-900">رسائی بحال کروانے کے لیے contact@shama.pk سے رابطہ کریں۔</p>
        ) : (
          <Button asChild className="w-full"><Link href="/dashboard">اپنا ڈیش بورڈ دیکھیں</Link></Button>
        )}
      </div>
    );
  }

  if (submission?.status === 'pending') {
    return (
      <div className="mb-4 space-y-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-right">
        <p className="font-semibold text-amber-950">ادائیگی ثبوت زیرِ جائزہ ہے</p>
        <p className="text-sm leading-relaxed text-amber-900">منظوری کے بعد کورس خودکار طور پر فعال ہوگا اور آپ کو ای میل موصول ہوگی۔</p>
        <Button type="button" variant="outline" className="w-full" onClick={() => void refreshStatus()}>
          <RefreshCw className="ml-2 h-4 w-4" />حیثیت دوبارہ چیک کریں
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4 text-right">
      {submission?.status === 'rejected' ? (
        <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-900">
          پچھلا ثبوت منظور نہیں ہوا۔ {submission.review_note ? `نوٹ: ${submission.review_note}` : 'براہ کرم درست ثبوت دوبارہ جمع کریں۔'}
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-2 rounded-lg bg-secondary p-1">
        <button type="button" onClick={() => setMethod('jazzcash')} className={`flex min-h-11 items-center justify-center gap-2 rounded-md px-2 text-sm ${method === 'jazzcash' ? 'bg-white font-semibold shadow-sm' : 'text-muted-foreground'}`}>
          <Smartphone className="h-4 w-4" />JazzCash
        </button>
        <button type="button" onClick={() => setMethod('bank_transfer')} className={`flex min-h-11 items-center justify-center gap-2 rounded-md px-2 text-sm ${method === 'bank_transfer' ? 'bg-white font-semibold shadow-sm' : 'text-muted-foreground'}`}>
          <Landmark className="h-4 w-4" />بینک
        </button>
      </div>

      {instructions ? (
        method === 'jazzcash' ? (
          <div className="rounded-lg border bg-secondary/30 p-4">
            <p className="text-sm text-muted-foreground">JazzCash نمبر</p>
            <p className="mt-1 text-xl font-bold" dir="ltr">{instructions.jazzcash_number}</p>
          </div>
        ) : (
          <div className="space-y-1 rounded-lg border bg-secondary/30 p-4 text-sm">
            <p className="font-semibold">{instructions.bank_name}</p>
            <p>اکاؤنٹ ٹائٹل: {instructions.bank_account_title}</p>
            <p dir="ltr" className="text-right">Account #: {instructions.bank_account_number}</p>
            <p dir="ltr" className="break-all text-right">IBAN: {instructions.bank_iban}</p>
            <p>برانچ: {instructions.bank_branch}</p>
          </div>
        )
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="senderAccount">بھیجنے والا نمبر یا اکاؤنٹ (اختیاری)</Label>
        <Input id="senderAccount" value={senderAccount} onChange={(event) => setSenderAccount(event.target.value)} maxLength={120} dir="ltr" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="transactionReference">ٹرانزیکشن ریفرنس (اختیاری)</Label>
        <Input id="transactionReference" value={transactionReference} onChange={(event) => setTransactionReference(event.target.value)} maxLength={120} dir="ltr" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="paymentProof">ادائیگی کا اسکرین شاٹ</Label>
        <Input id="paymentProof" type="file" accept="image/jpeg,image/png,image/webp" required onChange={(event) => setProof(event.target.files?.[0] ?? null)} className="h-auto py-2" />
        <p className="text-xs text-muted-foreground">JPEG، PNG یا WebP، زیادہ سے زیادہ 4 MB</p>
      </div>
      <Button type="submit" className="w-full text-base" disabled={isSubmitting}>
        <Upload className="ml-2 h-4 w-4" />{isSubmitting ? 'جمع ہو رہا ہے...' : 'ادائیگی ثبوت جمع کریں'}
      </Button>
      <p className="text-xs leading-relaxed text-muted-foreground">ثبوت دستی طور پر چیک ہوگا۔ صرف منظوری کے بعد کورس تک رسائی فعال کی جائے گی۔</p>
      {feedback ? <p className="text-sm text-primary">{feedback}</p> : null}
    </form>
  );
}
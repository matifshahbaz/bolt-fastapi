'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { confirmPasswordReset, requestPasswordReset } from '@/lib/lms-api';

type PasswordResetFormProps = {
  token?: string;
};

export function PasswordResetForm({ token }: PasswordResetFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const isConfirmation = token !== undefined;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (isConfirmation && password !== confirmation) {
      setError('دونوں پاس ورڈ ایک جیسے نہیں ہیں۔');
      return;
    }
    if (isConfirmation && !token) {
      setError('ری سیٹ لنک درست نہیں ہے۔ نیا لنک حاصل کریں۔');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isConfirmation) {
        await confirmPasswordReset(token!, password);
        setMessage('پاس ورڈ کامیابی سے تبدیل ہو گیا ہے۔ اب آپ لاگ اِن کر سکتے ہیں۔');
      } else {
        await requestPasswordReset(email);
        setMessage('اگر یہ ای میل رجسٹرڈ ہے تو پاس ورڈ ری سیٹ لنک بھیج دیا گیا ہے۔');
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'درخواست مکمل نہیں ہو سکی۔');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg border-2 border-primary/10 shadow-xl">
      <CardHeader className="space-y-3 text-center">
        <CardTitle className="font-nastaliq text-3xl">
          {isConfirmation ? 'نیا پاس ورڈ بنائیں' : 'پاس ورڈ ری سیٹ کریں'}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {isConfirmation ? 'اپنے اکاؤنٹ کے لیے کم از کم 8 حروف کا نیا پاس ورڈ درج کریں۔' : 'اپنی رجسٹرڈ ای میل درج کریں، ہم آپ کو محفوظ ری سیٹ لنک بھیجیں گے۔'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {isConfirmation ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="newPassword">نیا پاس ورڈ</Label>
                <Input id="newPassword" type="password" minLength={8} maxLength={128} required value={password} onChange={(event) => setPassword(event.target.value)} className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passwordConfirmation">پاس ورڈ دوبارہ درج کریں</Label>
                <Input id="passwordConfirmation" type="password" minLength={8} maxLength={128} required value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="h-12" />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="resetEmail">ای میل</Label>
              <Input id="resetEmail" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} dir="ltr" className="h-12" />
            </div>
          )}
          {message ? <p className="rounded-lg bg-green-50 p-3 text-sm text-green-800">{message}</p> : null}
          {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
          <Button type="submit" className="h-12 w-full text-base" disabled={isSubmitting || Boolean(message && isConfirmation)}>
            {isSubmitting ? 'براہ کرم انتظار کریں...' : isConfirmation ? 'پاس ورڈ تبدیل کریں' : 'ری سیٹ لنک بھیجیں'}
          </Button>
          <p className="text-center text-sm"><Link href="/login" className="text-primary hover:underline">لاگ اِن پر واپس جائیں</Link></p>
        </form>
      </CardContent>
    </Card>
  );
}
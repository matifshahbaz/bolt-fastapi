'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/site/auth-provider';

type AuthFormProps = {
  mode: 'login' | 'signup';
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { login, register } = useAuth();
  const supportEmail = 'contact@shama.pk';
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === 'login';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        await register({
          full_name: fullName,
          email,
          password,
          mobile_number: mobileNumber || undefined,
          age: age ? Number(age) : undefined,
          location: location || undefined,
        });
      }
      router.push('/dashboard');
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'مسئلہ پیش آیا۔');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg border-2 border-primary/10 shadow-xl">
      <CardHeader className="space-y-3 text-center">
        <CardTitle className="font-nastaliq text-3xl text-foreground">
          {isLogin ? 'اپنے اکاؤنٹ میں داخل ہوں' : 'نیا اکاؤنٹ بنائیں'}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {isLogin
            ? 'اپنی خریدی ہوئی کلاسز اور پیش رفت دیکھنے کے لیے لاگ اِن کریں۔'
            : 'شمع.pk پر سائن اپ کریں تاکہ آپ کورس خرید سکیں اور اپنی پیش رفت محفوظ رکھ سکیں۔'}
        </CardDescription>
        <p className="text-sm text-muted-foreground">
          اکاؤنٹ سپورٹ، پاس ورڈ ری سیٹ اور نئی رجسٹریشن کی مدد کے لیے{' '}
          <a href={`mailto:${supportEmail}`} className="text-primary hover:underline" dir="ltr">
            {supportEmail}
          </a>{' '}
          استعمال کریں۔
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-base">پورا نام</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="text-base">موبائل نمبر <span className="text-muted-foreground">(اختیاری)</span></Label>
                <Input id="mobileNumber" type="tel" value={mobileNumber} onChange={(event) => setMobileNumber(event.target.value)} minLength={7} maxLength={30} dir="ltr" className="h-12 text-base" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-base">عمر <span className="text-muted-foreground">(اختیاری)</span></Label>
                  <Input id="age" type="number" value={age} onChange={(event) => setAge(event.target.value)} min={10} max={100} className="h-12 text-base" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base">شہر / مقام <span className="text-muted-foreground">(اختیاری)</span></Label>
                  <Input id="location" value={location} onChange={(event) => setLocation(event.target.value)} minLength={2} maxLength={120} className="h-12 text-base" />
                </div>
              </div>
            </>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">ای میل</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-base">پاس ورڈ</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              className="h-12 text-base"
            />
            {isLogin ? (
              <p className="text-sm text-muted-foreground">
                پاس ورڈ بھول گئے؟{' '}
                <Link href="/forgot-password" className="text-primary hover:underline">ری سیٹ لنک حاصل کریں</Link>
              </p>
            ) : null}
          </div>

          {error ? <p className="text-center text-sm text-red-600">{error}</p> : null}

          <Button type="submit" className="h-12 w-full text-lg" disabled={isSubmitting}>
            {isSubmitting
              ? 'براہ کرم انتظار کریں...'
              : isLogin
                ? 'لاگ اِن کریں'
                : 'سائن اپ کریں'}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? 'اگر آپ نئے ہیں تو ' : 'اگر آپ کے پاس پہلے سے اکاؤنٹ ہے تو '}
            <Link href={isLogin ? '/signup' : '/login'} className="text-primary hover:underline">
              {isLogin ? 'سائن اپ کریں' : 'لاگ اِن کریں'}
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { submitContactForm } from '@/lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus('submitting');
    setFeedback('');

    try {
      const response = await submitContactForm(form);
      setStatus('success');
      setFeedback(response.message);
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setFeedback('پیغام بھیجنے میں مسئلہ پیش آیا۔ براہ کرم دوبارہ کوشش کریں۔');
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
            رابطہ
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-nastaliq text-foreground mb-4 leading-[1.6]">
            ہم سے رابطہ کریں
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            آپ کے سوالات، تجاویز اور رائے ہمارے لیے اہم ہیں۔ ہم سے بلا جھجھ رابطہ کریں۔
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-nastaliq text-foreground mb-6">
                ہماری معلومات
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg text-foreground">ای میل</p>
                    <p className="text-base text-muted-foreground" dir="ltr">contact@shama.pk</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg text-foreground">فون</p>
                    <p className="text-base text-muted-foreground" dir="ltr">03216630988</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg text-foreground">پتہ</p>
                    <p className="text-base text-muted-foreground" dir="ltr">House 784, R-block, Model town, Lahore</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <h3 className="text-xl font-nastaliq text-foreground mt-10 mb-4">
                ہم سے جڑیں
              </h3>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Youtube, label: 'Youtube' },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div>
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border bg-card p-8 space-y-5"
              >
                <div>
                  <label className="block text-lg text-foreground mb-2">
                    نام
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="اپنا نام درج کریں"
                    required
                    className="w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-lg text-foreground mb-2">
                    ای میل
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="اپنا ای میل درج کریں"
                    required
                    className="w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-lg text-foreground mb-2">
                    پیغام
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="اپنا پیغام لکھیں"
                    rows={5}
                    required
                    className="w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full text-lg" disabled={status === 'submitting'}>
                  <Send className="ml-2 h-5 w-5" />
                  {status === 'submitting' ? 'پیغام بھیجا جا رہا ہے...' : 'پیغام بھیجیں'}
                </Button>
                {feedback ? (
                  <p
                    className={`text-center text-base ${
                      status === 'success' ? 'text-green-700' : 'text-red-600'
                    }`}
                  >
                    {feedback}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

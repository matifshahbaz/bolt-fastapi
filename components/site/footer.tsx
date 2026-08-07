import Link from 'next/link';
import { GraduationCap, Mail } from 'lucide-react';
import { navLinks } from '@/lib/data';

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-2xl font-nastaliq text-white">
                شمع.pk
              </span>
            </Link>
            <p className="text-base text-background/70 leading-relaxed">
              پاکستانی نوجوانوں کے لیے اردو میں عملی کیریئر رہنمائی کا ایک نیا آغاز۔
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-1">
            <h3 className="text-xl text-white mb-4">فوری روابط</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-background/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/compliance"
                  className="text-base text-background/70 hover:text-white transition-colors"
                >
                  ادائیگی گیٹ وے اور کاروباری معلومات
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-base text-background/70 hover:text-white transition-colors"
                >
                  ریفنڈ پالیسی
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-base text-background/70 hover:text-white transition-colors"
                >
                  پرائیویسی پالیسی
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-base text-background/70 hover:text-white transition-colors"
                >
                  شرائط و ضوابط
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h3 className="text-xl text-white mb-4">موضوعات</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/articles" className="text-base text-background/70 hover:text-white transition-colors">
                  کیریئر رہنمائی
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-base text-background/70 hover:text-white transition-colors">
                  کاروباری
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-base text-background/70 hover:text-white transition-colors">
                  نوکری تلاش
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-base text-background/70 hover:text-white transition-colors">
                  مہارتیں
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-xl text-white mb-4">ہم سے رابطہ</h3>
            <a
              href="mailto:contact@shama.pk"
              className="inline-flex items-center gap-2 text-base text-background/70 transition-colors hover:text-white"
              dir="ltr"
            >
              <Mail className="h-5 w-5" />
              contact@shama.pk
            </a>
            <p className="text-base text-background/70 mt-4">
              shama.pk
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 rounded-2xl border border-white/15 bg-white/5 p-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-nastaliq text-white mb-3">کاروباری رابطہ معلومات</h3>
            <ul className="space-y-2 text-sm text-background/80 leading-relaxed">
              <li><span className="font-nastaliq">ای میل:</span> <span dir="ltr">contact@shama.pk</span></li>
              <li><span className="font-nastaliq">رابطہ نمبر:</span> <span dir="ltr">03216630988</span></li>
              <li><span className="font-nastaliq">کاروباری پتہ:</span> <span dir="ltr">House 784, R-block, Model town, Lahore</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-nastaliq text-white mb-3">موجودہ ادائیگی کا طریقہ</h3>
            <p className="text-sm text-background/80 leading-relaxed">
              فی الحال کورس فیس JazzCash یا بینک ٹرانسفر کے ذریعے وصول کی جاتی ہے۔ صارف ادائیگی کا ثبوت جمع کرتا ہے،
              جس کی دستی تصدیق کے بعد کورس تک رسائی فعال کی جاتی ہے اور ای میل کے ذریعے اطلاع دی جاتی ہے۔ RapidGateway کی منظوری کے بعد
              خودکار چیک آؤٹ اسی کورس ایکٹیویشن نظام سے منسلک کیا جائے گا۔
            </p>
            <p className="text-sm text-background/80 mt-2">
              تفصیلی کاروباری ماڈل، ادائیگی فلو اور ریفنڈ پالیسی:
              <Link href="/compliance" className="ml-1 text-white underline underline-offset-4 hover:text-primary">
                /compliance
              </Link>
              <span className="mx-1">|</span>
              <Link href="/refund-policy" className="text-white underline underline-offset-4 hover:text-primary">
                /refund-policy
              </Link>
              <span className="mx-1">|</span>
              <Link href="/privacy-policy" className="text-white underline underline-offset-4 hover:text-primary">
                /privacy-policy
              </Link>
              <span className="mx-1">|</span>
              <Link href="/terms-and-conditions" className="text-white underline underline-offset-4 hover:text-primary">
                /terms-and-conditions
              </Link>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-base text-background/60">
            © {new Date().getFullYear()} شمع.pk۔ جملہ حقوق محفوظ ہیں۔
          </p>
        </div>
      </div>
    </footer>
  );
}

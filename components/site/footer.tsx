import Link from 'next/link';
import { GraduationCap, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
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
              پاکستان کا پہلا اردو کیریئر رہنمائی پلیٹ فارم۔ نوجوانوں کے لیے، نوجوانوں کے لیے۔
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
                  نوکوری تلاش
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-base text-background/70 hover:text-white transition-colors">
                  مہارتیں
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-1">
            <h3 className="text-xl text-white mb-4">ہم سے جڑیں</h3>
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
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 hover:bg-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="text-base text-background/70 mt-4">
              sham.pk
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-base text-background/60">
            © 2025 شمع.pk۔ جملہ حقوق محفوظ ہیں۔
          </p>
        </div>
      </div>
    </footer>
  );
}

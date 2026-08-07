'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Search, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useAuth } from '@/components/site/auth-provider';
import { navLinks } from '@/lib/data';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
    router.refresh();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md'
          : 'bg-white'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-2xl font-nastaliq text-primary">
              شمع.pk
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon" aria-label="تلاش کریں">
              <Search className="h-5 w-5" />
            </Button>
            {isLoading ? null : isAuthenticated && user ? (
              <>
                {user.is_admin ? (
                  <Link href="/admin/students">
                    <Button variant="ghost" className="text-lg">ایڈمن</Button>
                  </Link>
                ) : null}
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-lg">میرا ڈیش بورڈ</Button>
                </Link>
                <Button variant="outline" className="text-lg" onClick={handleLogout}>لاگ آؤٹ</Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-lg">لاگ اِن</Button>
                </Link>
                <Link href="/signup">
                  <Button className="text-lg bg-accent hover:bg-accent/90 text-accent-foreground">سائن اپ</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="مینو">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <span className="text-2xl font-nastaliq text-primary">
                        شمع.pk
                      </span>
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className="text-xl text-foreground/80 hover:text-primary transition-colors py-2"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto flex flex-col gap-3 pt-6 border-t">
                    {isLoading ? null : isAuthenticated ? (
                      <>
                        {user?.is_admin ? (
                          <SheetClose asChild>
                            <Link href="/admin/students">
                              <Button variant="outline" className="text-lg w-full">ایڈمن</Button>
                            </Link>
                          </SheetClose>
                        ) : null}
                        <SheetClose asChild>
                          <Link href="/dashboard">
                            <Button variant="outline" className="text-lg w-full">میرا ڈیش بورڈ</Button>
                          </Link>
                        </SheetClose>
                        <Button className="text-lg w-full" variant="ghost" onClick={handleLogout}>لاگ آؤٹ</Button>
                      </>
                    ) : (
                      <>
                        <SheetClose asChild>
                          <Link href="/login">
                            <Button variant="outline" className="text-lg w-full">لاگ اِن</Button>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/signup">
                            <Button className="text-lg w-full bg-accent hover:bg-accent/90 text-accent-foreground">سائن اپ</Button>
                          </Link>
                        </SheetClose>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

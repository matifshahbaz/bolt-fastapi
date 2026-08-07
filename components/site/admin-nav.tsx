'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CreditCard, Users } from 'lucide-react';

const adminLinks = [
  { href: '/admin/students', label: 'طلبہ اور داخلے', icon: Users },
  { href: '/admin/payments', label: 'ادائیگیوں کا جائزہ', icon: CreditCard },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="ایڈمن سیکشن" className="grid grid-cols-2 gap-2 rounded-lg bg-secondary p-1">
      {adminLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex min-h-11 items-center justify-center gap-2 rounded-md px-3 text-center text-sm transition-colors ${
              isActive ? 'bg-white font-semibold text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
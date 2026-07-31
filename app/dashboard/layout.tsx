import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ڈیش بورڈ',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://shama.pk/dashboard' },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}

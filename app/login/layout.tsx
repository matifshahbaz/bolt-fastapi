import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'لاگ اِن',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://shama.pk/login' },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

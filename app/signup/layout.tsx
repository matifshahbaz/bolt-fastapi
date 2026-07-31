import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سائن اپ',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://shama.pk/signup' },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}

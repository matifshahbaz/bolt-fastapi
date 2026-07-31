import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'رابطہ',
  description: 'shama.pk سے کیریئر رہنمائی، کورس، اکاؤنٹ یا ادائیگی سے متعلق سوالات کے لیے رابطہ کریں۔',
  alternates: {
    canonical: 'https://shama.pk/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

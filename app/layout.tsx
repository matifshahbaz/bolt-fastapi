import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/components/site/auth-provider';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://sham.pk'),
  title: 'شمع.pk - نوجوانوں کے لیے کیریئر رہنمائی',
  description:
    'شمع.pk پاکستان کا پہلا اردو کیریئر رہنمائی پلیٹ فارم۔ نوجوانوں کے لیے کورسز، مضامین اور رہنمائی۔',
  openGraph: {
    title: 'شمع.pk - نوجوانوں کے لیے کیریئر رہنمائی',
    description:
      'پاکستان کا پہلا اردو کیریئر رہنمائی پلیٹ فارم۔ کورسز، مضامین اور رہنمائی۔',
    locale: 'ur_PK',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur" dir="rtl">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      </head>
      <body className="font-nastaliq antialiased min-h-screen flex flex-col bg-background">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

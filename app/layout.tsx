import './globals.css';
import type { Metadata } from 'next';
import { Noto_Nastaliq_Urdu } from 'next/font/google';
import Script from 'next/script';
import { AuthProvider } from '@/components/site/auth-provider';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';

const googleAnalyticsId = 'G-Q7ZBCQ9CF6';

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-nastaliq-urdu',
});

const siteStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://shama.pk/#organization',
      name: 'شمع.pk',
      url: 'https://shama.pk',
      email: 'contact@shama.pk',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://shama.pk/#website',
      name: 'شمع.pk',
      url: 'https://shama.pk',
      inLanguage: 'ur-PK',
      publisher: {
        '@id': 'https://shama.pk/#organization',
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://shama.pk'),
  title: {
    default: 'شمع.pk - نوجوانوں کے لیے کیریئر رہنمائی',
    template: '%s | شمع.pk',
  },
  description:
    'شمع.pk پاکستانی نوجوانوں کے لیے اردو میں کیریئر کورسز، مضامین اور عملی رہنمائی کا ایک نیا آغاز ہے۔',
  applicationName: 'شمع.pk',
  authors: [{ name: 'شمع.pk', url: 'https://shama.pk' }],
  creator: 'شمع.pk',
  publisher: 'شمع.pk',
  category: 'education',
  other: {
    'google-adsense-account': 'ca-pub-9480459896184387',
  },
  alternates: {
    canonical: 'https://shama.pk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'شمع.pk - نوجوانوں کے لیے کیریئر رہنمائی',
    description:
      'پاکستانی نوجوانوں کے لیے اردو میں کیریئر کورسز، مضامین اور عملی رہنمائی۔',
    url: 'https://shama.pk',
    siteName: 'شمع.pk',
    locale: 'ur_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شمع.pk - نوجوانوں کے لیے کیریئر رہنمائی',
    description: 'پاکستانی نوجوانوں کے لیے اردو میں کیریئر کورسز، مضامین اور عملی رہنمائی۔',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData).replace(/</g, '\\u003c') }}
        />
      </head>
      <body
        className={`${notoNastaliqUrdu.variable} font-nastaliq antialiased min-h-screen flex flex-col bg-background`}
      >
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

import { PaymentAdmin } from '@/components/site/payment-admin';

export const metadata: Metadata = {
  title: 'ادائیگیوں کا جائزہ',
  robots: { index: false, follow: false },
};

export default function AdminPaymentsPage() {
  return (
    <div className="bg-secondary/20 py-12 lg:py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <PaymentAdmin />
      </div>
    </div>
  );
}
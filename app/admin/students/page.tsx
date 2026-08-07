import type { Metadata } from 'next';

import { StudentAdmin } from '@/components/site/student-admin';

export const metadata: Metadata = {
  title: 'طلبہ اور داخلے',
  robots: { index: false, follow: false },
};

export default function AdminStudentsPage() {
  return (
    <div className="bg-secondary/20 py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StudentAdmin />
      </div>
    </div>
  );
}
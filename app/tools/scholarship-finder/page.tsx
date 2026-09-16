import type { Metadata } from 'next';
import { ScholarshipFinderExplorer } from '@/components/site/finder/scholarship-finder-explorer';
import { getScholarships } from '@/lib/finder-api';

export const metadata: Metadata = {
  title: 'اسکالرشپ فائنڈر',
  description: 'ملک، ڈگری سطح، شعبہ اور آخری تاریخ کے مطابق بین الاقوامی اسکالرشپس تلاش کریں۔',
  alternates: { canonical: 'https://shama.pk/tools/scholarship-finder' },
};

export default async function ScholarshipFinderPage() {
  const scholarships = await getScholarships();

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-nastaliq leading-[1.6] text-accent md:text-4xl lg:text-5xl">
            اسکالرشپ فائنڈر
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            ملک، ڈگری سطح اور شعبے کے مطابق بین الاقوامی اسکالرشپس تلاش کریں
          </p>
        </div>
      </section>
      <section className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ScholarshipFinderExplorer scholarships={scholarships} />
      </section>
    </div>
  );
}

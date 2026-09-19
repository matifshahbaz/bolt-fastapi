import type { Metadata } from 'next';
import { UniversityFinderExplorer } from '@/components/site/finder/university-finder-explorer';
import { getUniversityPrograms } from '@/lib/finder-api';

export const metadata: Metadata = {
  title: 'یونیورسٹی فائنڈر',
  description: 'شہر اور پسندیدہ پروگرام کے مطابق پاکستان کی موزوں یونیورسٹی تلاش کریں۔',
  alternates: { canonical: 'https://shama.pk/tools/university-finder' },
};

export default async function UniversityFinderPage() {
  const universityPrograms = await getUniversityPrograms();

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-nastaliq leading-[1.6] text-accent md:text-4xl lg:text-5xl">
            یونیورسٹی فائنڈر
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            شہر، پروگرام اور سرکاری یا نجی شعبے کے مطابق پاکستانی جامعات تلاش کریں
          </p>
        </div>
      </section>
      <section className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <UniversityFinderExplorer universityPrograms={universityPrograms} />
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import { CourseFinderExplorer } from '@/components/site/finder/course-finder-explorer';
import { getCourseFinderListings } from '@/lib/finder-api';

export const metadata: Metadata = {
  title: 'کورس فائنڈر',
  description: 'اپنی دلچسپی، سطح اور وقت کے مطابق موزوں آن لائن کورس تلاش کریں۔',
  alternates: { canonical: 'https://shama.pk/tools/course-finder' },
};

export default async function CourseFinderPage() {
  const listings = await getCourseFinderListings();

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-nastaliq leading-[1.6] text-accent md:text-4xl lg:text-5xl">
            کورس فائنڈر
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            مضمون، سطح، قیمت اور دورانیے کے مطابق اپنے لیے بہترین کورس چنیں
          </p>
        </div>
      </section>
      <section className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <CourseFinderExplorer listings={listings} />
      </section>
    </div>
  );
}

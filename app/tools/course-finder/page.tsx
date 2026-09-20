import type { Metadata } from 'next';
import { CourseFinderExplorer } from '@/components/site/finder/course-finder-explorer';
import { getCourseFinderListings } from '@/lib/finder-api';

export const metadata: Metadata = {
  title: 'کورس فائنڈر',
  description: 'اپنی دلچسپی، قیمت اور وقت کے مطابق موزوں آن لائن کورس تلاش کریں۔',
  alternates: { canonical: 'https://shama.pk/tools/course-finder' },
};

export default async function CourseFinderPage() {
  const listings = await getCourseFinderListings();
  const providerCount = new Set(listings.map((listing) => listing.provider).filter(Boolean)).size;
  const freeCount = listings.filter((listing) => listing.priceType === 'free').length;

  return (
    <div className="flex flex-col">
      <section className="border-b bg-gradient-to-b from-primary/5 to-background py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            مفت تلاش کا ٹول
          </span>
          <h1 className="mb-4 text-3xl font-nastaliq leading-[1.6] text-accent md:text-4xl lg:text-5xl">
            کورس فائنڈر
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            مضمون، قیمت اور دورانیے کے مطابق اپنے لیے بہترین کورس چنیں
          </p>

          <p className="mx-auto mt-8 max-w-xl text-base text-muted-foreground">
            <span className="font-semibold text-foreground">{listings.length}</span> کورسز
            <span className="mx-3 text-border">•</span>
            <span className="font-semibold text-foreground">{providerCount}</span> فراہم کنندگان
            <span className="mx-3 text-border">•</span>
            <span className="font-semibold text-foreground">{freeCount}</span> مفت کورسز
          </p>
        </div>
      </section>
      <section className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <CourseFinderExplorer listings={listings} />
      </section>
    </div>
  );
}

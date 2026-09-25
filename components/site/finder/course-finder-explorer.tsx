'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { CourseFinderCard } from '@/components/site/finder/course-finder-card';
import { useInfiniteReveal } from '@/hooks/use-infinite-reveal';
import type { CourseFinderListing } from '@/lib/finder-api';

const durationLabels: Record<string, string> = {
  short: 'مختصر (تقریباً 1 ماہ تک)',
  medium: 'درمیانی (تقریباً 2-3 ماہ)',
  long: 'طویل (3 ماہ سے زیادہ)',
};

const RESULTS_PAGE_SIZE = 20;

export function CourseFinderExplorer({ listings }: { listings: CourseFinderListing[] }) {
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState('all');
  const [price, setPrice] = useState('all');
  const [duration, setDuration] = useState('all');

  const subjects = useMemo(
    () => Array.from(new Set(listings.map((listing) => listing.subject))).sort(),
    [listings]
  );
  const durations = useMemo(
    () => Array.from(new Set(listings.map((listing) => listing.durationBucket))),
    [listings]
  );

  const filtered = useMemo(() => {
    const trimmedQuery = query.trim();
    return listings.filter((listing) => {
      if (trimmedQuery && !listing.title.includes(trimmedQuery)) return false;
      if (subject !== 'all' && listing.subject !== subject) return false;
      if (price !== 'all' && listing.priceType !== price) return false;
      if (duration !== 'all' && listing.durationBucket !== duration) return false;
      return true;
    });
  }, [listings, query, subject, price, duration]);

  const hasActiveFilters = query.trim() !== '' || subject !== 'all' || price !== 'all' || duration !== 'all';

  const resultsSignature = [query, subject, price, duration].join('|');
  const { visibleCount, sentinelRef } = useInfiniteReveal(filtered.length, RESULTS_PAGE_SIZE, resultsSignature);

  const clearFilters = () => {
    setQuery('');
    setSubject('all');
    setPrice('all');
    setDuration('all');
  };

  return (
    <div>
      <div className="mb-6 rounded-2xl border bg-card p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative md:col-span-1">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="کورس تلاش کریں"
              className="pr-9"
            />
          </div>

          <NativeSelect value={subject} onChange={(event) => setSubject(event.target.value)} className="w-full">
            <NativeSelectOption value="all">تمام مضامین</NativeSelectOption>
            {subjects.map((item) => (
              <NativeSelectOption key={item} value={item}>
                {item}
              </NativeSelectOption>
            ))}
          </NativeSelect>

          <NativeSelect value={price} onChange={(event) => setPrice(event.target.value)} className="w-full">
            <NativeSelectOption value="all">مفت اور ادائیگی دونوں</NativeSelectOption>
            <NativeSelectOption value="free">صرف مفت</NativeSelectOption>
            <NativeSelectOption value="paid">صرف ادائیگی والے</NativeSelectOption>
          </NativeSelect>

          <NativeSelect value={duration} onChange={(event) => setDuration(event.target.value)} className="w-full">
            <NativeSelectOption value="all">ہر دورانیہ</NativeSelectOption>
            {durations.map((item) => (
              <NativeSelectOption key={item} value={item}>
                {durationLabels[item] ?? item}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
        <span>{filtered.length} کورسز ملے</span>
        {hasActiveFilters ? (
          <button type="button" onClick={clearFilters} className="flex items-center gap-1 text-primary hover:underline">
            <X className="h-3.5 w-3.5" />
            فلٹر صاف کریں
          </button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            <SlidersHorizontal className="h-6 w-6" />
          </div>
          <p className="text-lg text-muted-foreground">اس فلٹر سے کوئی کورس نہیں ملا۔</p>
          {hasActiveFilters ? (
            <button type="button" onClick={clearFilters} className="text-base text-primary hover:underline">
              تمام فلٹرز ہٹائیں
            </button>
          ) : null}
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, visibleCount).map((listing, index) => (
              <div key={listing.id} className={index % 2 === 1 ? 'dark' : undefined}>
                <CourseFinderCard listing={listing} />
              </div>
            ))}
          </div>

          {visibleCount < filtered.length ? (
            <div ref={sentinelRef} className="flex justify-center py-10">
              <span className="text-sm text-muted-foreground">مزید نتائج لوڈ ہو رہے ہیں…</span>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

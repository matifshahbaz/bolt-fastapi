'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { CourseFinderCard } from '@/components/site/finder/course-finder-card';
import type { CourseFinderListing } from '@/lib/finder-api';

const durationLabels: Record<string, string> = {
  short: 'مختصر (تقریباً 1 ماہ تک)',
  medium: 'درمیانی (تقریباً 2-3 ماہ)',
  long: 'طویل (3 ماہ سے زیادہ)',
};

export function CourseFinderExplorer({ listings }: { listings: CourseFinderListing[] }) {
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState('all');
  const [level, setLevel] = useState('all');
  const [price, setPrice] = useState('all');
  const [duration, setDuration] = useState('all');

  const subjects = useMemo(
    () => Array.from(new Set(listings.map((listing) => listing.subject))).sort(),
    [listings]
  );
  const levels = useMemo(
    () => Array.from(new Set(listings.map((listing) => listing.level))).sort(),
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
      if (level !== 'all' && listing.level !== level) return false;
      if (price !== 'all' && listing.priceType !== price) return false;
      if (duration !== 'all' && listing.durationBucket !== duration) return false;
      return true;
    });
  }, [listings, query, subject, level, price, duration]);

  return (
    <div>
      <div className="mb-8 grid gap-4 rounded-2xl border bg-card p-5 shadow-sm md:grid-cols-5">
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

        <NativeSelect value={level} onChange={(event) => setLevel(event.target.value)} className="w-full">
          <NativeSelectOption value="all">تمام سطحیں</NativeSelectOption>
          {levels.map((item) => (
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

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-lg text-muted-foreground">اس فلٹر سے کوئی کورس نہیں ملا۔</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing) => (
            <CourseFinderCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}

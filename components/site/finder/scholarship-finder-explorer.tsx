'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { ScholarshipFinderCard } from '@/components/site/finder/scholarship-finder-card';
import type { Scholarship } from '@/lib/finder-api';

export function ScholarshipFinderExplorer({ scholarships }: { scholarships: Scholarship[] }) {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('all');
  const [degreeLevel, setDegreeLevel] = useState('all');
  const [field, setField] = useState('all');
  const [deadline, setDeadline] = useState('all');

  const countries = useMemo(
    () => Array.from(new Set(scholarships.map((scholarship) => scholarship.country))).sort(),
    [scholarships]
  );
  const degreeLevels = useMemo(
    () => Array.from(new Set(scholarships.map((scholarship) => scholarship.degreeLevel))).sort(),
    [scholarships]
  );
  const fields = useMemo(
    () => Array.from(new Set(scholarships.flatMap((scholarship) => scholarship.fieldOfStudy))).sort(),
    [scholarships]
  );
  const deadlines = useMemo(
    () =>
      Array.from(
        new Set(scholarships.map((scholarship) => scholarship.deadlineLabel).filter((label): label is string => Boolean(label)))
      ).sort(),
    [scholarships]
  );

  const filtered = useMemo(() => {
    const trimmedQuery = query.trim();
    return scholarships.filter((scholarship) => {
      if (trimmedQuery && !scholarship.name.includes(trimmedQuery)) return false;
      if (country !== 'all' && scholarship.country !== country) return false;
      if (degreeLevel !== 'all' && scholarship.degreeLevel !== degreeLevel) return false;
      if (field !== 'all' && !scholarship.fieldOfStudy.includes(field)) return false;
      if (deadline !== 'all' && scholarship.deadlineLabel !== deadline) return false;
      return true;
    });
  }, [scholarships, query, country, degreeLevel, field, deadline]);

  return (
    <div>
      <div className="mb-8 grid gap-4 rounded-2xl border bg-card p-5 shadow-sm md:grid-cols-5">
        <div className="relative md:col-span-1">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="اسکالرشپ تلاش کریں"
            className="pr-9"
          />
        </div>

        <NativeSelect value={country} onChange={(event) => setCountry(event.target.value)} className="w-full">
          <NativeSelectOption value="all">تمام ممالک</NativeSelectOption>
          {countries.map((item) => (
            <NativeSelectOption key={item} value={item}>
              {item}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <NativeSelect value={degreeLevel} onChange={(event) => setDegreeLevel(event.target.value)} className="w-full">
          <NativeSelectOption value="all">تمام ڈگری سطحیں</NativeSelectOption>
          {degreeLevels.map((item) => (
            <NativeSelectOption key={item} value={item}>
              {item}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <NativeSelect value={field} onChange={(event) => setField(event.target.value)} className="w-full">
          <NativeSelectOption value="all">تمام شعبے</NativeSelectOption>
          {fields.map((item) => (
            <NativeSelectOption key={item} value={item}>
              {item}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <NativeSelect value={deadline} onChange={(event) => setDeadline(event.target.value)} className="w-full">
          <NativeSelectOption value="all">ہر آخری تاریخ</NativeSelectOption>
          {deadlines.map((item) => (
            <NativeSelectOption key={item} value={item}>
              {item}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-lg text-muted-foreground">اس فلٹر سے کوئی اسکالرشپ نہیں ملی۔</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((scholarship) => (
            <ScholarshipFinderCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      )}
    </div>
  );
}

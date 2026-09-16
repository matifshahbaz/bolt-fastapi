'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { UniversityFinderCard } from '@/components/site/finder/university-finder-card';
import type { University } from '@/lib/finder-api';

export function UniversityFinderExplorer({ universities }: { universities: University[] }) {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('all');
  const [program, setProgram] = useState('all');
  const [sector, setSector] = useState('all');

  const cities = useMemo(
    () => Array.from(new Set(universities.map((university) => university.city))).sort(),
    [universities]
  );
  const programs = useMemo(
    () => Array.from(new Set(universities.flatMap((university) => university.programs))).sort(),
    [universities]
  );

  const filtered = useMemo(() => {
    const trimmedQuery = query.trim();
    return universities.filter((university) => {
      if (trimmedQuery && !university.name.includes(trimmedQuery)) return false;
      if (city !== 'all' && university.city !== city) return false;
      if (program !== 'all' && !university.programs.includes(program)) return false;
      if (sector !== 'all' && university.sector !== sector) return false;
      return true;
    });
  }, [universities, query, city, program, sector]);

  return (
    <div>
      <div className="mb-8 grid gap-4 rounded-2xl border bg-card p-5 shadow-sm md:grid-cols-4">
        <div className="relative">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="یونیورسٹی تلاش کریں"
            className="pr-9"
          />
        </div>

        <NativeSelect value={city} onChange={(event) => setCity(event.target.value)} className="w-full">
          <NativeSelectOption value="all">تمام شہر</NativeSelectOption>
          {cities.map((item) => (
            <NativeSelectOption key={item} value={item}>
              {item}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <NativeSelect value={program} onChange={(event) => setProgram(event.target.value)} className="w-full">
          <NativeSelectOption value="all">تمام پروگرام</NativeSelectOption>
          {programs.map((item) => (
            <NativeSelectOption key={item} value={item}>
              {item}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <NativeSelect value={sector} onChange={(event) => setSector(event.target.value)} className="w-full">
          <NativeSelectOption value="all">سرکاری اور نجی دونوں</NativeSelectOption>
          <NativeSelectOption value="public">صرف سرکاری</NativeSelectOption>
          <NativeSelectOption value="private">صرف نجی</NativeSelectOption>
        </NativeSelect>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-lg text-muted-foreground">اس فلٹر سے کوئی یونیورسٹی نہیں ملی۔</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((university) => (
            <UniversityFinderCard key={university.id} university={university} />
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { ArrowDownWideNarrow, Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ComboboxFilter, type ComboboxOption } from '@/components/site/finder/combobox-filter';
import { UniversityFinderCard } from '@/components/site/finder/university-finder-card';
import { useInfiniteReveal } from '@/hooks/use-infinite-reveal';
import type { UniversityProgram } from '@/lib/finder-api';
import {
  cityLabelsUr,
  degreeLevelLabelsUr,
  fieldGroupLabelsUr,
  labelFor,
  sectorLabelsUr,
  universityNameLabelsUr,
  universityShortNameEn,
} from '@/lib/university-finder-labels';

// Rendering all matching cards at once (this dataset runs past 1000 rows) is a significant
// main-thread cost with no user benefit up front, so results are revealed a page at a time.
const RESULTS_PAGE_SIZE = 20;

const selectFieldClassName =
  'w-full rounded-xl border-border/60 bg-secondary/30 transition-colors hover:bg-secondary/50 focus-visible:bg-background';

function FilterField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0 [&_[data-slot=native-select-wrapper]]:w-full">
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

type SortOption = 'default' | 'university' | 'city' | 'field' | 'fee-asc' | 'fee-desc';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'طے شدہ ترتیب' },
  { value: 'university', label: 'جامعہ (الف بے)' },
  { value: 'city', label: 'شہر (الف بے)' },
  { value: 'field', label: 'شعبہ (الف بے)' },
  { value: 'fee-asc', label: 'فیس: کم سے زیادہ' },
  { value: 'fee-desc', label: 'فیس: زیادہ سے کم' },
];

// The six categorical filters participate in faceting: each one's available options are
// computed from programs matching every OTHER active filter, so picking a value in one
// narrows what's offered in the rest ("cascading" filters).
type FilterKey = 'city' | 'fieldGroup' | 'sector' | 'university' | 'degreeLevel' | 'programName';
type FilterState = Record<FilterKey, string>;

const FILTER_FIELD: Record<FilterKey, keyof UniversityProgram> = {
  city: 'city',
  fieldGroup: 'fieldGroup',
  sector: 'sector',
  university: 'universityName',
  degreeLevel: 'degreeLevel',
  programName: 'programNameEn',
};

function matchesFilters(program: UniversityProgram, filters: FilterState, excludeKey?: FilterKey): boolean {
  return (Object.keys(FILTER_FIELD) as FilterKey[]).every((key) => {
    if (key === excludeKey) return true;
    const value = filters[key];
    return value === 'all' || program[FILTER_FIELD[key]] === value;
  });
}

function distinctSorted(programs: UniversityProgram[], key: keyof UniversityProgram): string[] {
  return Array.from(new Set(programs.map((program) => String(program[key])))).sort();
}

function formatFeePkr(amount: number): string {
  return `${amount.toLocaleString('en-US')} روپے`;
}

export function UniversityFinderExplorer({ universityPrograms }: { universityPrograms: UniversityProgram[] }) {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('all');
  const [fieldGroup, setFieldGroup] = useState('all');
  const [sector, setSector] = useState('all');
  const [university, setUniversity] = useState('all');
  const [degreeLevel, setDegreeLevel] = useState('all');
  const [programName, setProgramName] = useState('all');
  const [includeFeeUnknown, setIncludeFeeUnknown] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const rawFilters: FilterState = { city, fieldGroup, sector, university, degreeLevel, programName };

  const cityOptions = useMemo(
    () => distinctSorted(universityPrograms.filter((p) => matchesFilters(p, rawFilters, 'city')), 'city'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [universityPrograms, fieldGroup, sector, university, degreeLevel, programName]
  );
  const fieldGroupOptions = useMemo(
    () => distinctSorted(universityPrograms.filter((p) => matchesFilters(p, rawFilters, 'fieldGroup')), 'fieldGroup'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [universityPrograms, city, sector, university, degreeLevel, programName]
  );
  const sectorOptions = useMemo(
    () => distinctSorted(universityPrograms.filter((p) => matchesFilters(p, rawFilters, 'sector')), 'sector'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [universityPrograms, city, fieldGroup, university, degreeLevel, programName]
  );
  const universityOptions = useMemo(
    () => distinctSorted(universityPrograms.filter((p) => matchesFilters(p, rawFilters, 'university')), 'universityName'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [universityPrograms, city, fieldGroup, sector, degreeLevel, programName]
  );
  const degreeLevelOptions = useMemo(
    () => distinctSorted(universityPrograms.filter((p) => matchesFilters(p, rawFilters, 'degreeLevel')), 'degreeLevel'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [universityPrograms, city, fieldGroup, sector, university, programName]
  );
  const programNameOptions = useMemo(
    () => distinctSorted(universityPrograms.filter((p) => matchesFilters(p, rawFilters, 'programName')), 'programNameEn'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [universityPrograms, city, fieldGroup, sector, university, degreeLevel]
  );

  // Derived ("soft reset") values: if a selection is no longer offered given the other active
  // filters, treat it as 'all' for filtering/display purposes without clearing the underlying
  // state — so it reappears automatically if the user relaxes the other filters again.
  const effectiveCity = cityOptions.includes(city) ? city : 'all';
  const effectiveFieldGroup = fieldGroupOptions.includes(fieldGroup) ? fieldGroup : 'all';
  const effectiveSector = sectorOptions.includes(sector) ? sector : 'all';
  const effectiveUniversity = universityOptions.includes(university) ? university : 'all';
  const effectiveDegreeLevel = degreeLevelOptions.includes(degreeLevel) ? degreeLevel : 'all';
  const effectiveProgramName = programNameOptions.includes(programName) ? programName : 'all';

  const cityComboOptions: ComboboxOption[] = useMemo(
    () =>
      cityOptions.map((item) => ({
        value: item,
        label: labelFor(cityLabelsUr, item),
        itemLabel: (
          <span className="flex flex-col">
            <span>{labelFor(cityLabelsUr, item)}</span>
            <span className="text-xs text-muted-foreground">{item}</span>
          </span>
        ),
        keywords: [item, labelFor(cityLabelsUr, item)],
      })),
    [cityOptions]
  );

  const universityComboOptions: ComboboxOption[] = useMemo(
    () =>
      universityOptions.map((item) => ({
        value: item,
        label: labelFor(universityNameLabelsUr, item),
        itemLabel: (
          <span className="flex flex-col">
            <span>{labelFor(universityNameLabelsUr, item)}</span>
            <span className="text-xs text-muted-foreground">{labelFor(universityShortNameEn, item)}</span>
          </span>
        ),
        keywords: [item, labelFor(universityNameLabelsUr, item), labelFor(universityShortNameEn, item)],
      })),
    [universityOptions]
  );

  const fieldGroupComboOptions: ComboboxOption[] = useMemo(
    () =>
      fieldGroupOptions.map((item) => ({
        value: item,
        label: labelFor(fieldGroupLabelsUr, item),
        itemLabel: (
          <span className="flex flex-col">
            <span>{labelFor(fieldGroupLabelsUr, item)}</span>
            <span className="text-xs text-muted-foreground">{item}</span>
          </span>
        ),
        keywords: [item, labelFor(fieldGroupLabelsUr, item)],
      })),
    [fieldGroupOptions]
  );

  const degreeLevelComboOptions: ComboboxOption[] = useMemo(
    () =>
      degreeLevelOptions.map((item) => ({
        value: item,
        label: labelFor(degreeLevelLabelsUr, item),
        itemLabel: (
          <span className="flex flex-col">
            <span>{labelFor(degreeLevelLabelsUr, item)}</span>
            <span className="text-xs text-muted-foreground">{item}</span>
          </span>
        ),
        keywords: [item, labelFor(degreeLevelLabelsUr, item)],
      })),
    [degreeLevelOptions]
  );

  const programNameComboOptions: ComboboxOption[] = useMemo(
    () =>
      programNameOptions.map((item) => ({
        value: item,
        label: item,
        keywords: [item],
      })),
    [programNameOptions]
  );

  const feeBounds = useMemo(() => {
    const amounts = universityPrograms
      .filter((program) => program.includeInMainFeeFilter && program.feeFilterAmountPkr != null)
      .map((program) => program.feeFilterAmountPkr as number);
    if (amounts.length === 0) return null;
    return { min: Math.min(...amounts), max: Math.max(...amounts) };
  }, [universityPrograms]);

  const [maxFee, setMaxFee] = useState<number>(() => feeBounds?.max ?? 0);

  const filtered = useMemo(() => {
    const trimmedQuery = query.trim();
    return universityPrograms.filter((program) => {
      if (
        trimmedQuery &&
        !program.universityName.includes(trimmedQuery) &&
        !program.programNameEn.toLowerCase().includes(trimmedQuery.toLowerCase()) &&
        !(program.programNameUr && program.programNameUr.includes(trimmedQuery))
      ) {
        return false;
      }
      if (effectiveCity !== 'all' && program.city !== effectiveCity) return false;
      if (effectiveFieldGroup !== 'all' && program.fieldGroup !== effectiveFieldGroup) return false;
      if (effectiveSector !== 'all' && program.sector !== effectiveSector) return false;
      if (effectiveUniversity !== 'all' && program.universityName !== effectiveUniversity) return false;
      if (effectiveDegreeLevel !== 'all' && program.degreeLevel !== effectiveDegreeLevel) return false;
      if (effectiveProgramName !== 'all' && program.programNameEn !== effectiveProgramName) return false;
      if (feeBounds) {
        if (program.includeInMainFeeFilter && program.feeFilterAmountPkr != null) {
          if (program.feeFilterAmountPkr > maxFee) return false;
        } else if (!includeFeeUnknown) {
          return false;
        }
      }
      return true;
    });
  }, [
    universityPrograms,
    query,
    effectiveCity,
    effectiveFieldGroup,
    effectiveSector,
    effectiveUniversity,
    effectiveDegreeLevel,
    effectiveProgramName,
    feeBounds,
    maxFee,
    includeFeeUnknown,
  ]);

  const universityCount = useMemo(() => new Set(filtered.map((program) => program.universityName)).size, [filtered]);

  const sorted = useMemo(() => {
    if (sortBy === 'default') return filtered;
    const hasFee = (program: UniversityProgram) => program.includeInMainFeeFilter && program.feeFilterAmountPkr != null;
    const list = [...filtered];
    switch (sortBy) {
      case 'university':
        list.sort((a, b) =>
          labelFor(universityNameLabelsUr, a.universityName).localeCompare(
            labelFor(universityNameLabelsUr, b.universityName),
            'ur'
          )
        );
        break;
      case 'city':
        list.sort((a, b) => labelFor(cityLabelsUr, a.city).localeCompare(labelFor(cityLabelsUr, b.city), 'ur'));
        break;
      case 'field':
        list.sort((a, b) =>
          labelFor(fieldGroupLabelsUr, a.fieldGroup).localeCompare(labelFor(fieldGroupLabelsUr, b.fieldGroup), 'ur')
        );
        break;
      case 'fee-asc':
        list.sort((a, b) => {
          if (hasFee(a) && hasFee(b)) return (a.feeFilterAmountPkr as number) - (b.feeFilterAmountPkr as number);
          if (hasFee(a)) return -1;
          if (hasFee(b)) return 1;
          return 0;
        });
        break;
      case 'fee-desc':
        list.sort((a, b) => {
          if (hasFee(a) && hasFee(b)) return (b.feeFilterAmountPkr as number) - (a.feeFilterAmountPkr as number);
          if (hasFee(a)) return -1;
          if (hasFee(b)) return 1;
          return 0;
        });
        break;
    }
    return list;
  }, [filtered, sortBy]);

  const resultsSignature = [
    query,
    effectiveCity,
    effectiveFieldGroup,
    effectiveSector,
    effectiveUniversity,
    effectiveDegreeLevel,
    effectiveProgramName,
    sortBy,
    maxFee,
    includeFeeUnknown,
  ].join('|');

  const { visibleCount, sentinelRef } = useInfiniteReveal(sorted.length, RESULTS_PAGE_SIZE, resultsSignature);

  const hasActiveFilters =
    query.trim() !== '' ||
    effectiveCity !== 'all' ||
    effectiveFieldGroup !== 'all' ||
    effectiveSector !== 'all' ||
    effectiveUniversity !== 'all' ||
    effectiveDegreeLevel !== 'all' ||
    effectiveProgramName !== 'all' ||
    !includeFeeUnknown ||
    (feeBounds ? maxFee !== feeBounds.max : false);

  const clearFilters = () => {
    setQuery('');
    setCity('all');
    setFieldGroup('all');
    setSector('all');
    setUniversity('all');
    setDegreeLevel('all');
    setProgramName('all');
    setIncludeFeeUnknown(true);
    if (feeBounds) setMaxFee(feeBounds.max);
  };

  return (
    <div>
      <div className="mb-8 space-y-6 rounded-3xl border border-border/60 bg-gradient-to-b from-card to-secondary/10 p-6 shadow-lg shadow-black/[0.03] md:p-7">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-foreground">تلاش اور فلٹرز</span>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="یونیورسٹی یا پروگرام تلاش کریں"
            className="h-11 rounded-xl border-border/60 bg-background pr-11 text-base shadow-sm"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FilterField label="جامعہ">
            <ComboboxFilter
              value={effectiveUniversity}
              onChange={setUniversity}
              options={universityComboOptions}
              allLabel="تمام جامعات"
              placeholder="جامعہ تلاش کریں"
              emptyText="کوئی جامعہ نہیں ملی۔"
            />
          </FilterField>

          <FilterField label="شہر">
            <ComboboxFilter
              value={effectiveCity}
              onChange={setCity}
              options={cityComboOptions}
              allLabel="تمام شہر"
              placeholder="شہر تلاش کریں"
              emptyText="کوئی شہر نہیں ملا۔"
            />
          </FilterField>

          <FilterField label="شعبہ">
            <ComboboxFilter
              value={effectiveFieldGroup}
              onChange={setFieldGroup}
              options={fieldGroupComboOptions}
              allLabel="تمام شعبہ جات"
              placeholder="شعبہ تلاش کریں"
              emptyText="کوئی شعبہ نہیں ملا۔"
            />
          </FilterField>

          <FilterField label="پروگرام">
            <ComboboxFilter
              value={effectiveProgramName}
              onChange={setProgramName}
              options={programNameComboOptions}
              allLabel="تمام پروگرام"
              placeholder="پروگرام تلاش کریں"
              emptyText="کوئی پروگرام نہیں ملا۔"
            />
          </FilterField>

          <FilterField label="پروگرام کی سطح">
            <ComboboxFilter
              value={effectiveDegreeLevel}
              onChange={setDegreeLevel}
              options={degreeLevelComboOptions}
              allLabel="تمام سطحیں"
              placeholder="سطح تلاش کریں"
              emptyText="کوئی سطح نہیں ملی۔"
            />
          </FilterField>

          <FilterField label="شعبہ (سرکاری/نجی)">
            <NativeSelect
              value={effectiveSector}
              onChange={(event) => setSector(event.target.value)}
              className={selectFieldClassName}
            >
              <NativeSelectOption value="all">سرکاری اور نجی دونوں</NativeSelectOption>
              {sectorOptions.map((item) => (
                <NativeSelectOption key={item} value={item}>
                  {labelFor(sectorLabelsUr, item)}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </FilterField>
        </div>

        {feeBounds ? (
          <div className="grid gap-5 rounded-2xl border border-border/50 bg-secondary/20 p-4 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                <span>زیادہ سے زیادہ فیس (پہلے سمسٹر کا تخمینہ)</span>
                <span className="font-semibold text-primary">{formatFeePkr(maxFee)} تک</span>
              </div>
              <Slider
                value={[maxFee]}
                onValueChange={([value]) => setMaxFee(value)}
                min={feeBounds.min}
                max={feeBounds.max}
                step={1000}
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={includeFeeUnknown} onCheckedChange={setIncludeFeeUnknown} id="fee-unknown-toggle" />
              <label htmlFor="fee-unknown-toggle" className="text-sm text-muted-foreground">
                فیس نامعلوم پروگرام بھی دکھائیں
              </label>
            </div>
          </div>
        ) : (
          <p className="rounded-2xl border border-border/50 bg-secondary/20 p-4 text-sm text-muted-foreground">
            اس وقت تصدیق شدہ فیس کی بنیاد پر فلٹر دستیاب نہیں — جیسے جیسے ڈیٹا اپڈیٹ ہو گا فلٹر فعال ہو جائے گا۔
          </p>
        )}
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{universityCount}</span> جامعات میں{' '}
          <span className="font-semibold text-foreground">{filtered.length}</span> پروگرام ملے
        </span>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <ArrowDownWideNarrow className="h-4 w-4 text-muted-foreground" />
            <NativeSelect
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="rounded-xl border-border/60 bg-card"
            >
              {sortOptions.map((option) => (
                <NativeSelectOption key={option.value} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          {hasActiveFilters ? (
            <button type="button" onClick={clearFilters} className="flex items-center gap-1 text-sm text-primary hover:underline">
              <X className="h-3.5 w-3.5" />
              فلٹر صاف کریں
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            <SlidersHorizontal className="h-6 w-6" />
          </div>
          <p className="text-lg text-muted-foreground">اس فلٹر سے کوئی پروگرام نہیں ملا۔</p>
          {hasActiveFilters ? (
            <button type="button" onClick={clearFilters} className="text-base text-primary hover:underline">
              تمام فلٹرز ہٹائیں
            </button>
          ) : null}
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {sorted.slice(0, visibleCount).map((program, index) => (
              <div key={program.id} className={index % 2 === 1 ? 'dark' : undefined}>
                <UniversityFinderCard program={program} />
              </div>
            ))}
          </div>

          {visibleCount < sorted.length ? (
            <div ref={sentinelRef} className="flex justify-center py-10">
              <span className="text-sm text-muted-foreground">مزید نتائج لوڈ ہو رہے ہیں…</span>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

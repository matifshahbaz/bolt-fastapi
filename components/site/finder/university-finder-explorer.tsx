'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { ArrowDownWideNarrow, Check, ChevronsUpDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { UniversityFinderCard } from '@/components/site/finder/university-finder-card';
import type { UniversityProgram } from '@/lib/finder-api';
import {
  cityLabelsUr,
  degreeLevelLabelsUr,
  fieldGroupLabelsUr,
  labelFor,
  universityNameLabelsUr,
} from '@/lib/university-finder-labels';
import { cn } from '@/lib/utils';

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

function ProgramNameFilter({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-9 w-full justify-between rounded-xl border-border/60 bg-secondary/30 px-3 font-normal transition-colors hover:bg-secondary/50"
        >
          <span className="truncate">{value === 'all' ? 'تمام پروگرام' : value}</span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <Command>
          <CommandInput placeholder="پروگرام تلاش کریں" />
          <CommandList>
            <CommandEmpty>کوئی پروگرام نہیں ملا۔</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="all"
                onSelect={() => {
                  onChange('all');
                  setOpen(false);
                }}
              >
                <Check className={cn('ml-2 h-4 w-4', value === 'all' ? 'opacity-100' : 'opacity-0')} />
                تمام پروگرام
              </CommandItem>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  <Check className={cn('ml-2 h-4 w-4', value === option ? 'opacity-100' : 'opacity-0')} />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
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

  const cities = useMemo(
    () => Array.from(new Set(universityPrograms.map((program) => program.city))).sort(),
    [universityPrograms]
  );
  const fieldGroups = useMemo(
    () => Array.from(new Set(universityPrograms.map((program) => program.fieldGroup))).sort(),
    [universityPrograms]
  );
  const universities = useMemo(
    () => Array.from(new Set(universityPrograms.map((program) => program.universityName))).sort(),
    [universityPrograms]
  );
  const degreeLevels = useMemo(
    () => Array.from(new Set(universityPrograms.map((program) => program.degreeLevel))).sort(),
    [universityPrograms]
  );
  const programNames = useMemo(
    () => Array.from(new Set(universityPrograms.map((program) => program.programNameEn))).sort(),
    [universityPrograms]
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
      if (city !== 'all' && program.city !== city) return false;
      if (fieldGroup !== 'all' && program.fieldGroup !== fieldGroup) return false;
      if (sector !== 'all' && program.sector !== sector) return false;
      if (university !== 'all' && program.universityName !== university) return false;
      if (degreeLevel !== 'all' && program.degreeLevel !== degreeLevel) return false;
      if (programName !== 'all' && program.programNameEn !== programName) return false;
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
    city,
    fieldGroup,
    sector,
    university,
    degreeLevel,
    programName,
    feeBounds,
    maxFee,
    includeFeeUnknown,
  ]);

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

  const hasActiveFilters =
    query.trim() !== '' ||
    city !== 'all' ||
    fieldGroup !== 'all' ||
    sector !== 'all' ||
    university !== 'all' ||
    degreeLevel !== 'all' ||
    programName !== 'all' ||
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
            <NativeSelect
              value={university}
              onChange={(event) => setUniversity(event.target.value)}
              className={selectFieldClassName}
            >
              <NativeSelectOption value="all">تمام جامعات</NativeSelectOption>
              {universities.map((item) => (
                <NativeSelectOption key={item} value={item}>
                  {labelFor(universityNameLabelsUr, item)}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </FilterField>

          <FilterField label="شہر">
            <NativeSelect value={city} onChange={(event) => setCity(event.target.value)} className={selectFieldClassName}>
              <NativeSelectOption value="all">تمام شہر</NativeSelectOption>
              {cities.map((item) => (
                <NativeSelectOption key={item} value={item}>
                  {labelFor(cityLabelsUr, item)}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </FilterField>

          <FilterField label="شعبہ">
            <NativeSelect
              value={fieldGroup}
              onChange={(event) => setFieldGroup(event.target.value)}
              className={selectFieldClassName}
            >
              <NativeSelectOption value="all">تمام شعبہ جات</NativeSelectOption>
              {fieldGroups.map((item) => (
                <NativeSelectOption key={item} value={item}>
                  {labelFor(fieldGroupLabelsUr, item)}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </FilterField>

          <FilterField label="پروگرام">
            <ProgramNameFilter value={programName} onChange={setProgramName} options={programNames} />
          </FilterField>

          <FilterField label="پروگرام کی سطح">
            <NativeSelect
              value={degreeLevel}
              onChange={(event) => setDegreeLevel(event.target.value)}
              className={selectFieldClassName}
            >
              <NativeSelectOption value="all">تمام سطحیں</NativeSelectOption>
              {degreeLevels.map((item) => (
                <NativeSelectOption key={item} value={item}>
                  {labelFor(degreeLevelLabelsUr, item)}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </FilterField>

          <FilterField label="شعبہ (سرکاری/نجی)">
            <NativeSelect value={sector} onChange={(event) => setSector(event.target.value)} className={selectFieldClassName}>
              <NativeSelectOption value="all">سرکاری اور نجی دونوں</NativeSelectOption>
              <NativeSelectOption value="public">صرف سرکاری</NativeSelectOption>
              <NativeSelectOption value="private">صرف نجی</NativeSelectOption>
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
        <div className="grid gap-6 md:grid-cols-2">
          {sorted.map((program) => (
            <UniversityFinderCard key={program.id} program={program} />
          ))}
        </div>
      )}
    </div>
  );
}

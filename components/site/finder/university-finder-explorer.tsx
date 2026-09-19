'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { UniversityFinderCard } from '@/components/site/finder/university-finder-card';
import type { UniversityProgram } from '@/lib/finder-api';

function formatFeePkr(amount: number): string {
  return `${amount.toLocaleString('en-US')} روپے`;
}

export function UniversityFinderExplorer({ universityPrograms }: { universityPrograms: UniversityProgram[] }) {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('all');
  const [fieldGroup, setFieldGroup] = useState('all');
  const [sector, setSector] = useState('all');
  const [includeFeeUnknown, setIncludeFeeUnknown] = useState(true);

  const cities = useMemo(
    () => Array.from(new Set(universityPrograms.map((program) => program.city))).sort(),
    [universityPrograms]
  );
  const fieldGroups = useMemo(
    () => Array.from(new Set(universityPrograms.map((program) => program.fieldGroup))).sort(),
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
      if (feeBounds) {
        if (program.includeInMainFeeFilter && program.feeFilterAmountPkr != null) {
          if (program.feeFilterAmountPkr > maxFee) return false;
        } else if (!includeFeeUnknown) {
          return false;
        }
      }
      return true;
    });
  }, [universityPrograms, query, city, fieldGroup, sector, feeBounds, maxFee, includeFeeUnknown]);

  return (
    <div>
      <div className="mb-8 space-y-4 rounded-2xl border bg-card p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="یونیورسٹی یا پروگرام تلاش کریں"
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

          <NativeSelect value={fieldGroup} onChange={(event) => setFieldGroup(event.target.value)} className="w-full">
            <NativeSelectOption value="all">تمام شعبہ جات</NativeSelectOption>
            {fieldGroups.map((item) => (
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

        {feeBounds ? (
          <div className="grid gap-4 border-t pt-4 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                <span>زیادہ سے زیادہ فیس (پہلے سمسٹر کا تخمینہ)</span>
                <span className="font-medium text-foreground">{formatFeePkr(maxFee)} تک</span>
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
          <p className="border-t pt-4 text-sm text-muted-foreground">
            اس وقت تصدیق شدہ فیس کی بنیاد پر فلٹر دستیاب نہیں — جیسے جیسے ڈیٹا اپڈیٹ ہو گا فلٹر فعال ہو جائے گا۔
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-lg text-muted-foreground">اس فلٹر سے کوئی پروگرام نہیں ملا۔</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((program) => (
            <UniversityFinderCard key={program.id} program={program} />
          ))}
        </div>
      )}
    </div>
  );
}

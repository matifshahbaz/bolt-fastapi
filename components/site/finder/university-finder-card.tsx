import {
  MapPin,
  GraduationCap,
  Banknote,
  ArrowLeft,
  Code2,
  Building2,
  Users,
  Palette,
  FlaskConical,
  Wrench,
  HeartPulse,
  Megaphone,
  Stethoscope,
  Sprout,
  Scale,
  Building,
  Pill,
  Landmark,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { UniversityProgram } from '@/lib/finder-api';
import {
  cityLabelsUr,
  degreeLevelLabelsUr,
  fieldGroupLabelsUr,
  labelFor,
  universityNameLabelsUr,
  universityShortNameEn,
} from '@/lib/university-finder-labels';

type FieldStyle = { icon: LucideIcon; iconBg: string; bar: string };

const fieldGroupStyles: Record<string, FieldStyle> = {
  'Computer Science & IT': {
    icon: Code2,
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30',
    bar: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
  },
  'Business & Management': {
    icon: Building2,
    iconBg: 'bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-500/30',
    bar: 'bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600',
  },
  'Social Sciences': {
    icon: Users,
    iconBg: 'bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-lg shadow-violet-500/30',
    bar: 'bg-gradient-to-r from-violet-400 via-violet-500 to-violet-600',
  },
  'Arts, Design & Humanities': {
    icon: Palette,
    iconBg: 'bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/30',
    bar: 'bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600',
  },
  'Natural Sciences': {
    icon: FlaskConical,
    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30',
    bar: 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600',
  },
  'Engineering / Technology': {
    icon: Wrench,
    iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30',
    bar: 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600',
  },
  Engineering: {
    icon: Wrench,
    iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30',
    bar: 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600',
  },
  'Health & Allied Sciences': {
    icon: HeartPulse,
    iconBg: 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30',
    bar: 'bg-gradient-to-r from-red-400 via-red-500 to-red-600',
  },
  'Media & Communication': {
    icon: Megaphone,
    iconBg: 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30',
    bar: 'bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600',
  },
  'Medical & Allied Health': {
    icon: Stethoscope,
    iconBg: 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30',
    bar: 'bg-gradient-to-r from-red-400 via-red-500 to-red-600',
  },
  'Agriculture & Food Sciences': {
    icon: Sprout,
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30',
    bar: 'bg-gradient-to-r from-green-400 via-green-500 to-green-600',
  },
  Education: {
    icon: GraduationCap,
    iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30',
    bar: 'bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600',
  },
  Law: {
    icon: Scale,
    iconBg: 'bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-lg shadow-slate-500/30',
    bar: 'bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600',
  },
  'Arts, Design & Media': {
    icon: Palette,
    iconBg: 'bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/30',
    bar: 'bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600',
  },
  'Arts & Humanities': {
    icon: Palette,
    iconBg: 'bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/30',
    bar: 'bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600',
  },
  Architecture: {
    icon: Building,
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30',
    bar: 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600',
  },
  'Health & Pharmacy': {
    icon: Pill,
    iconBg: 'bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/30',
    bar: 'bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600',
  },
  'Public Policy & Administration': {
    icon: Landmark,
    iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30',
    bar: 'bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600',
  },
};

const defaultFieldStyle: FieldStyle = {
  icon: GraduationCap,
  iconBg: 'bg-primary text-primary-foreground shadow-lg shadow-primary/30',
  bar: 'bg-gradient-to-r from-primary/70 via-primary to-primary/70',
};

function getFieldStyle(fieldGroup: string): FieldStyle {
  return fieldGroupStyles[fieldGroup] ?? defaultFieldStyle;
}

function formatFeePkr(amount: number): string {
  return `${amount.toLocaleString('en-US')} روپے`;
}

export function UniversityFinderCard({ program }: { program: UniversityProgram }) {
  const { icon: FieldIcon, iconBg, bar } = getFieldStyle(program.fieldGroup);

  return (
    <div className="card-hover group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-card to-secondary/10 shadow-md">
      <div className={`h-[3px] w-full ${bar}`} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/60 to-transparent dark:from-white/[0.05]" />

      <div className="relative flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}>
              <FieldIcon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-xl font-nastaliq text-accent leading-relaxed">
                {labelFor(universityNameLabelsUr, program.universityName)}
              </h3>
              <p className="text-sm tracking-wide text-muted-foreground">
                {labelFor(universityShortNameEn, program.universityName)}
              </p>
            </div>
          </div>
          <Badge
            className={
              program.sector === 'public'
                ? 'border border-primary/20 bg-gradient-to-r from-primary/15 to-primary/5 text-primary shadow-none hover:bg-primary/10'
                : 'border-transparent bg-accent text-accent-foreground shadow-sm shadow-accent/20'
            }
          >
            {program.sector === 'public' ? 'سرکاری' : 'نجی'}
          </Badge>
        </div>

        <p className="mb-4 flex items-center gap-1.5 text-base text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          {program.campusName} — {labelFor(cityLabelsUr, program.city)}, {program.province}
        </p>

        <div className="mb-4 rounded-2xl border border-border/50 bg-gradient-to-b from-secondary/60 to-secondary/30 p-4">
          <p className="font-medium leading-relaxed text-foreground">
            {program.programNameEn}
            {program.programNameUr ? <span className="text-muted-foreground"> — {program.programNameUr}</span> : null}
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5" />
              {labelFor(degreeLevelLabelsUr, program.degreeLevel)}
            </span>
            {program.durationYears ? <span>{program.durationYears} سال</span> : null}
            <span>{labelFor(fieldGroupLabelsUr, program.fieldGroup)}</span>
          </p>
        </div>

        <div className="mb-5">
          {program.includeInMainFeeFilter && program.feeFilterAmountPkr ? (
            <div className="flex items-start gap-2.5 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/10 to-primary/[0.03] p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Banknote className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {formatFeePkr(program.feeFilterAmountPkr)}
                  {program.feeBasisLabelUr ? (
                    <span className="text-sm font-normal text-muted-foreground"> — {program.feeBasisLabelUr}</span>
                  ) : null}
                </p>
                {program.feeWarningUr ? <p className="text-sm text-muted-foreground">{program.feeWarningUr}</p> : null}
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2 px-1">
              <Banknote className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="text-base text-muted-foreground">{program.feeDisplayUr ?? 'فیس ویب سائٹ پر واضح نہیں ملی'}</p>
            </div>
          )}
        </div>

        {program.programUrl ? (
          <a
            href={program.programUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta relative mt-auto flex items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-primary py-3 text-base font-medium text-primary-foreground shadow-md shadow-primary/25 transition-shadow hover:shadow-lg hover:shadow-primary/35"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
            <span className="relative">پروگرام کی تفصیل</span>
            <ArrowLeft className="relative h-4 w-4 transition-transform group-hover/cta:-translate-x-0.5" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

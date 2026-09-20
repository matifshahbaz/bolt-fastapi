import {
  Clock,
  BookOpen,
  Monitor,
  ArrowLeft,
  Bot,
  Code2,
  Palette,
  Megaphone,
  ShoppingCart,
  BarChart3,
  ShieldCheck,
  Briefcase,
  Laptop,
  Languages,
  Wallet,
  Building2,
  Wrench,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { CourseFinderListing } from '@/lib/finder-api';

type CategoryStyle = { icon: LucideIcon; iconBg: string; bar: string; metaBox: string; button: string };

const categoryStyles: Record<string, CategoryStyle> = {
  'مصنوعی ذہانت اور آٹومیشن': {
    icon: Bot,
    iconBg: 'bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-lg shadow-violet-500/30',
    bar: 'bg-gradient-to-r from-violet-400 via-violet-500 to-violet-600',
    metaBox: 'bg-violet-50/70 border-violet-100',
    button: 'bg-gradient-to-l from-violet-500 to-violet-600 shadow-violet-500/30 hover:shadow-violet-500/40',
  },
  'تکنیکی اور پیشہ ورانہ ہنر': {
    icon: Wrench,
    iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30',
    bar: 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600',
    metaBox: 'bg-amber-50/70 border-amber-100',
    button: 'bg-gradient-to-l from-amber-500 to-amber-600 shadow-amber-500/30 hover:shadow-amber-500/40',
  },
  'ڈیزائن اور ملٹی میڈیا': {
    icon: Palette,
    iconBg: 'bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/30',
    bar: 'bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600',
    metaBox: 'bg-rose-50/70 border-rose-100',
    button: 'bg-gradient-to-l from-rose-500 to-rose-600 shadow-rose-500/30 hover:shadow-rose-500/40',
  },
  'پروگرامنگ اور ڈیولپمنٹ': {
    icon: Code2,
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30',
    bar: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
    metaBox: 'bg-blue-50/70 border-blue-100',
    button: 'bg-gradient-to-l from-blue-500 to-blue-600 shadow-blue-500/30 hover:shadow-blue-500/40',
  },
  'ڈیجیٹل مارکیٹنگ': {
    icon: Megaphone,
    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30',
    bar: 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600',
    metaBox: 'bg-emerald-50/70 border-emerald-100',
    button: 'bg-gradient-to-l from-emerald-500 to-emerald-600 shadow-emerald-500/30 hover:shadow-emerald-500/40',
  },
  'ای کامرس': {
    icon: ShoppingCart,
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30',
    bar: 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600',
    metaBox: 'bg-orange-50/70 border-orange-100',
    button: 'bg-gradient-to-l from-orange-500 to-orange-600 shadow-orange-500/30 hover:shadow-orange-500/40',
  },
  'ڈیٹا اور تجزیہ': {
    icon: BarChart3,
    iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30',
    bar: 'bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600',
    metaBox: 'bg-indigo-50/70 border-indigo-100',
    button: 'bg-gradient-to-l from-indigo-500 to-indigo-600 shadow-indigo-500/30 hover:shadow-indigo-500/40',
  },
  'سائبر سکیورٹی اور نیٹ ورکنگ': {
    icon: ShieldCheck,
    iconBg: 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30',
    bar: 'bg-gradient-to-r from-red-400 via-red-500 to-red-600',
    metaBox: 'bg-red-50/70 border-red-100',
    button: 'bg-gradient-to-l from-red-500 to-red-600 shadow-red-500/30 hover:shadow-red-500/40',
  },
  'فری لانسنگ اور کیریئر': {
    icon: Briefcase,
    iconBg: 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30',
    bar: 'bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600',
    metaBox: 'bg-teal-50/70 border-teal-100',
    button: 'bg-gradient-to-l from-teal-500 to-teal-600 shadow-teal-500/30 hover:shadow-teal-500/40',
  },
  'دفتری اور ڈیجیٹل مہارتیں': {
    icon: Laptop,
    iconBg: 'bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-lg shadow-slate-500/30',
    bar: 'bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600',
    metaBox: 'bg-slate-50/70 border-slate-100',
    button: 'bg-gradient-to-l from-slate-500 to-slate-600 shadow-slate-500/30 hover:shadow-slate-500/40',
  },
  'زبانیں اور ابلاغ': {
    icon: Languages,
    iconBg: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/30',
    bar: 'bg-gradient-to-r from-fuchsia-400 via-fuchsia-500 to-fuchsia-600',
    metaBox: 'bg-fuchsia-50/70 border-fuchsia-100',
    button: 'bg-gradient-to-l from-fuchsia-500 to-fuchsia-600 shadow-fuchsia-500/30 hover:shadow-fuchsia-500/40',
  },
  'مالیات اور اکاؤنٹنگ': {
    icon: Wallet,
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30',
    bar: 'bg-gradient-to-r from-green-400 via-green-500 to-green-600',
    metaBox: 'bg-green-50/70 border-green-100',
    button: 'bg-gradient-to-l from-green-500 to-green-600 shadow-green-500/30 hover:shadow-green-500/40',
  },
  'کاروبار اور انتظام': {
    icon: Building2,
    iconBg: 'bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-500/30',
    bar: 'bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600',
    metaBox: 'bg-sky-50/70 border-sky-100',
    button: 'bg-gradient-to-l from-sky-500 to-sky-600 shadow-sky-500/30 hover:shadow-sky-500/40',
  },
};

const defaultCategoryStyle: CategoryStyle = {
  icon: GraduationCap,
  iconBg: 'bg-primary text-primary-foreground shadow-lg shadow-primary/30',
  bar: 'bg-gradient-to-r from-primary/70 via-primary to-primary/70',
  metaBox: 'bg-secondary/50 border-border/50',
  button: 'bg-primary shadow-primary/30 hover:shadow-primary/40',
};

function getCategoryStyle(subject: string): CategoryStyle {
  return categoryStyles[subject] ?? defaultCategoryStyle;
}

function deliveryModeLabel(mode: string | null): string | null {
  if (!mode) return null;
  const lower = mode.toLowerCase();
  const isOnline = lower.includes('online');
  const isPhysical = lower.includes('physical') || lower.includes('classroom');
  if (isOnline && isPhysical) return 'آن لائن یا کلاس روم';
  if (isPhysical) return 'کلاس روم';
  if (isOnline) {
    if (lower.includes('live')) return 'آن لائن (لائیو)';
    if (lower.includes('recorded')) return 'آن لائن (ریکارڈڈ)';
    return 'آن لائن';
  }
  return mode;
}

export function CourseFinderCard({ listing }: { listing: CourseFinderListing }) {
  const { icon: CategoryIcon, iconBg, bar, metaBox, button } = getCategoryStyle(listing.subject);

  return (
    <div className="card-hover group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-card to-secondary/10 shadow-md">
      <div className={`h-[3px] w-full ${bar}`} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/60 to-transparent dark:from-white/[0.05]" />

      <div className="relative flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}>
            <CategoryIcon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <Badge
            className={
              listing.priceType === 'free'
                ? 'border-transparent bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-sm shadow-emerald-500/30'
                : 'border border-border/60 bg-secondary/60 text-foreground'
            }
          >
            {listing.priceLabel ?? (listing.priceType === 'free' ? 'مفت' : 'ادائیگی')}
          </Badge>
        </div>

        <div className="mb-3">
          <h3 className="text-xl font-nastaliq text-accent leading-relaxed">{listing.title}</h3>
          {listing.titleEn ? <p className="mt-1 text-sm text-muted-foreground">{listing.titleEn}</p> : null}
        </div>

        {listing.description ? (
          <p className="mb-4 line-clamp-2 text-base text-muted-foreground leading-relaxed">{listing.description}</p>
        ) : null}

        {listing.provider ? <p className="mb-4 text-base text-muted-foreground">{listing.provider}</p> : null}

        <div className="mt-auto">
          <div className={`mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border p-3 text-sm text-muted-foreground ${metaBox}`}>
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {listing.subject}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {listing.durationLabel}
            </span>
            {listing.deliveryMode ? (
              <span className="flex items-center gap-1">
                <Monitor className="h-3.5 w-3.5" />
                {deliveryModeLabel(listing.deliveryMode)}
              </span>
            ) : null}
          </div>

          {listing.externalUrl ? (
            <a
              href={listing.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/cta relative flex items-center justify-center gap-1.5 overflow-hidden rounded-xl py-2.5 text-base font-medium text-white shadow-md transition-shadow hover:shadow-lg ${button}`}
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
              <span className="relative">تفصیلات دیکھیں</span>
              <ArrowLeft className="relative h-4 w-4 transition-transform group-hover/cta:-translate-x-0.5" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

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

type CategoryStyle = { icon: LucideIcon; iconBg: string; bar: string };

const categoryStyles: Record<string, CategoryStyle> = {
  'مصنوعی ذہانت اور آٹومیشن': {
    icon: Bot,
    iconBg: 'bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-lg shadow-violet-500/30',
    bar: 'bg-gradient-to-r from-violet-400 via-violet-500 to-violet-600',
  },
  'تکنیکی اور پیشہ ورانہ ہنر': {
    icon: Wrench,
    iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30',
    bar: 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600',
  },
  'ڈیزائن اور ملٹی میڈیا': {
    icon: Palette,
    iconBg: 'bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/30',
    bar: 'bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600',
  },
  'پروگرامنگ اور ڈیولپمنٹ': {
    icon: Code2,
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30',
    bar: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
  },
  'ڈیجیٹل مارکیٹنگ': {
    icon: Megaphone,
    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30',
    bar: 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600',
  },
  'ای کامرس': {
    icon: ShoppingCart,
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30',
    bar: 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600',
  },
  'ڈیٹا اور تجزیہ': {
    icon: BarChart3,
    iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30',
    bar: 'bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600',
  },
  'سائبر سکیورٹی اور نیٹ ورکنگ': {
    icon: ShieldCheck,
    iconBg: 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30',
    bar: 'bg-gradient-to-r from-red-400 via-red-500 to-red-600',
  },
  'فری لانسنگ اور کیریئر': {
    icon: Briefcase,
    iconBg: 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30',
    bar: 'bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600',
  },
  'دفتری اور ڈیجیٹل مہارتیں': {
    icon: Laptop,
    iconBg: 'bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-lg shadow-slate-500/30',
    bar: 'bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600',
  },
  'زبانیں اور ابلاغ': {
    icon: Languages,
    iconBg: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/30',
    bar: 'bg-gradient-to-r from-fuchsia-400 via-fuchsia-500 to-fuchsia-600',
  },
  'مالیات اور اکاؤنٹنگ': {
    icon: Wallet,
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30',
    bar: 'bg-gradient-to-r from-green-400 via-green-500 to-green-600',
  },
  'کاروبار اور انتظام': {
    icon: Building2,
    iconBg: 'bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-500/30',
    bar: 'bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600',
  },
};

const defaultCategoryStyle: CategoryStyle = {
  icon: GraduationCap,
  iconBg: 'bg-primary text-primary-foreground shadow-lg shadow-primary/30',
  bar: 'bg-gradient-to-r from-primary/70 via-primary to-primary/70',
};

function getCategoryStyle(subject: string): CategoryStyle {
  return categoryStyles[subject] ?? defaultCategoryStyle;
}

function deliveryModeLabel(mode: string | null): string | null {
  if (!mode) return null;
  // Some rows store a full editorial sentence ("<mode> — <city/campus confirmation note>"),
  // e.g. "بالمشافہ — لاہور کے کیمپس؛ دیگر مقامات پر اس کورس کی دستیابی کی تصدیق کریں". Only the
  // mode itself belongs on a card; the note after the dash is a data-quality caveat for editors.
  const corePart = mode.split('—')[0].trim();
  const lower = corePart.toLowerCase();
  const isOnline = lower.includes('online') || corePart.includes('آن لائن');
  const isPhysical = lower.includes('physical') || lower.includes('classroom') || corePart.includes('بالمشافہ');
  if (isOnline && isPhysical) return 'آن لائن یا کلاس روم';
  if (isPhysical) return 'کلاس روم';
  if (isOnline) {
    if (lower.includes('live')) return 'آن لائن (لائیو)';
    if (lower.includes('recorded')) return 'آن لائن (ریکارڈڈ)';
    return 'آن لائن';
  }
  return corePart || null;
}

export function CourseFinderCard({ listing }: { listing: CourseFinderListing }) {
  const { icon: CategoryIcon, iconBg, bar } = getCategoryStyle(listing.subject);

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
          <h3 className="text-2xl font-bold leading-snug text-foreground">{listing.title}</h3>
          {listing.titleEn ? <p className="mt-0.5 text-base text-muted-foreground">{listing.titleEn}</p> : null}
          {listing.provider ? (
            <p className="mt-1.5 font-nastaliq text-base text-accent">{listing.provider}</p>
          ) : null}
        </div>

        {listing.description ? (
          <p className="mb-4 line-clamp-2 text-base text-muted-foreground leading-relaxed">{listing.description}</p>
        ) : null}

        <div className="mt-auto">
          <div className="mb-4 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground/80">
              <BookOpen className="h-3 w-3" />
              {listing.subject}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground/80">
              <Clock className="h-3 w-3" />
              {listing.durationLabel}
            </span>
            {listing.deliveryMode ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground/80">
                <Monitor className="h-3 w-3" />
                {deliveryModeLabel(listing.deliveryMode)}
              </span>
            ) : null}
          </div>

          {listing.externalUrl ? (
            <a
              href={listing.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta flex items-center justify-end gap-1 border-t border-border/50 pt-3 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              تفصیلات دیکھیں
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover/cta:-translate-x-0.5" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

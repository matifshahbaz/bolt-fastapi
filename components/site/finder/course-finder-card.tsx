import {
  Clock,
  BookOpen,
  Monitor,
  Tag,
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

type CategoryStyle = { icon: LucideIcon; gradient: string };

const categoryStyles: Record<string, CategoryStyle> = {
  'مصنوعی ذہانت اور آٹومیشن': { icon: Bot, gradient: 'from-violet-500 to-purple-600' },
  'تکنیکی اور پیشہ ورانہ ہنر': { icon: Wrench, gradient: 'from-amber-500 to-orange-600' },
  'ڈیزائن اور ملٹی میڈیا': { icon: Palette, gradient: 'from-pink-500 to-rose-500' },
  'پروگرامنگ اور ڈیولپمنٹ': { icon: Code2, gradient: 'from-blue-500 to-cyan-500' },
  'ڈیجیٹل مارکیٹنگ': { icon: Megaphone, gradient: 'from-emerald-500 to-teal-500' },
  'ای کامرس': { icon: ShoppingCart, gradient: 'from-orange-500 to-red-500' },
  'ڈیٹا اور تجزیہ': { icon: BarChart3, gradient: 'from-indigo-500 to-blue-600' },
  'سائبر سکیورٹی اور نیٹ ورکنگ': { icon: ShieldCheck, gradient: 'from-red-500 to-rose-600' },
  'فری لانسنگ اور کیریئر': { icon: Briefcase, gradient: 'from-teal-500 to-emerald-600' },
  'دفتری اور ڈیجیٹل مہارتیں': { icon: Laptop, gradient: 'from-slate-500 to-gray-600' },
  'زبانیں اور ابلاغ': { icon: Languages, gradient: 'from-fuchsia-500 to-pink-600' },
  'مالیات اور اکاؤنٹنگ': { icon: Wallet, gradient: 'from-green-500 to-emerald-600' },
  'کاروبار اور انتظام': { icon: Building2, gradient: 'from-sky-500 to-blue-600' },
};

const defaultCategoryStyle: CategoryStyle = { icon: GraduationCap, gradient: 'from-primary to-accent' };

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
  const { icon: CategoryIcon, gradient } = getCategoryStyle(listing.subject);

  return (
    <div className="card-hover flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className={`relative flex h-28 shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}>
        <div className="absolute -left-5 -top-6 h-24 w-24 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -right-4 h-28 w-28 rounded-full bg-white/10" />
        <CategoryIcon className="relative h-11 w-11 text-white" strokeWidth={1.5} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <h3 className="text-xl font-nastaliq text-accent leading-relaxed">{listing.title}</h3>
            {listing.titleEn ? (
              <p className="text-sm text-muted-foreground">{listing.titleEn}</p>
            ) : null}
          </div>
          <Badge className={listing.priceType === 'free' ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-100' : 'bg-accent text-accent-foreground'}>
            {listing.priceLabel ?? (listing.priceType === 'free' ? 'مفت' : 'ادائیگی')}
          </Badge>
        </div>

        {listing.description ? (
          <p className="mb-4 line-clamp-2 text-base text-muted-foreground leading-relaxed">{listing.description}</p>
        ) : null}

        {listing.provider ? (
          <p className="mb-4 text-base text-muted-foreground">{listing.provider}</p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-4 border-t pt-4 text-base text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {listing.subject}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {listing.durationLabel}
          </span>
          {listing.deliveryMode ? (
            <span className="flex items-center gap-1">
              <Monitor className="h-4 w-4" />
              {deliveryModeLabel(listing.deliveryMode)}
            </span>
          ) : null}
          {listing.externalUrl ? (
            <a
              href={listing.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-auto flex items-center gap-1 text-primary hover:underline"
            >
              <Tag className="h-4 w-4" />
              تفصیلات
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

import { Clock, BookOpen, BarChart3, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { CourseFinderListing } from '@/lib/finder-api';

export function CourseFinderCard({ listing }: { listing: CourseFinderListing }) {
  return (
    <div className="card-hover flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-xl font-nastaliq text-accent leading-relaxed">{listing.title}</h3>
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
          <BarChart3 className="h-4 w-4" />
          {listing.level}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {listing.durationLabel}
        </span>
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
  );
}

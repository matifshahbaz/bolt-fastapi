import { Globe2, GraduationCap, CalendarClock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Scholarship } from '@/lib/finder-api';

export function ScholarshipFinderCard({ scholarship }: { scholarship: Scholarship }) {
  return (
    <div className="card-hover flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-xl font-nastaliq text-accent leading-relaxed">{scholarship.name}</h3>
        <Badge className="bg-accent text-accent-foreground">{scholarship.degreeLevel}</Badge>
      </div>

      {scholarship.description ? (
        <p className="mb-4 line-clamp-2 text-base text-muted-foreground leading-relaxed">{scholarship.description}</p>
      ) : null}

      <div className="mb-4 flex items-center gap-1 text-base text-muted-foreground">
        <Globe2 className="h-4 w-4" />
        {scholarship.country}
      </div>

      <div className="mb-4 flex items-start gap-2 text-base text-muted-foreground">
        <GraduationCap className="mt-0.5 h-4 w-4 shrink-0" />
        <span className="leading-relaxed">{scholarship.fieldOfStudy.join('، ')}</span>
      </div>

      {scholarship.deadlineLabel ? (
        <div className="mt-auto flex items-center gap-1 border-t pt-4 text-base text-muted-foreground">
          <CalendarClock className="h-4 w-4" />
          {scholarship.deadlineLabel}
        </div>
      ) : null}

      {scholarship.externalUrl ? (
        <a
          href={scholarship.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-base text-primary hover:underline"
        >
          مزید معلومات
        </a>
      ) : null}
    </div>
  );
}

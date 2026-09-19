import { MapPin, GraduationCap, Banknote, Calendar, ExternalLink, ClipboardList } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { UniversityProgram } from '@/lib/finder-api';

function formatFeePkr(amount: number): string {
  return `${amount.toLocaleString('en-US')} روپے`;
}

export function UniversityFinderCard({ program }: { program: UniversityProgram }) {
  return (
    <div className="card-hover flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-xl font-nastaliq text-accent leading-relaxed">{program.universityName}</h3>
        <Badge className={program.sector === 'public' ? 'bg-primary/10 text-primary hover:bg-primary/10' : 'bg-accent text-accent-foreground'}>
          {program.sector === 'public' ? 'سرکاری' : 'نجی'}
        </Badge>
      </div>

      <p className="mb-3 flex items-center gap-1 text-base text-muted-foreground">
        <MapPin className="h-4 w-4 shrink-0" />
        {program.campusName} — {program.city}, {program.province}
      </p>

      <div className="mb-4 rounded-xl bg-secondary/50 p-3">
        <p className="font-medium leading-relaxed text-foreground">
          {program.programNameEn}
          {program.programNameUr ? <span className="text-muted-foreground"> — {program.programNameUr}</span> : null}
        </p>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <GraduationCap className="h-3.5 w-3.5" />
            {program.degreeLevel}
          </span>
          {program.durationYears ? <span>{program.durationYears} سال</span> : null}
          <span>{program.fieldGroup}</span>
        </p>
      </div>

      <div className="mb-4">
        {program.includeInMainFeeFilter && program.feeFilterAmountPkr ? (
          <div className="flex items-start gap-2">
            <Banknote className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="font-medium text-foreground">
                {formatFeePkr(program.feeFilterAmountPkr)}
                {program.feeBasisLabelUr ? (
                  <span className="text-sm font-normal text-muted-foreground"> — {program.feeBasisLabelUr}</span>
                ) : null}
              </p>
              {program.feeWarningUr ? (
                <p className="text-sm text-muted-foreground">{program.feeWarningUr}</p>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2">
            <Banknote className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-base text-muted-foreground">{program.feeDisplayUr ?? 'فیس ویب سائٹ پر واضح نہیں ملی'}</p>
              <a
                href={program.feeUrl ?? program.programUrl ?? program.sourceUrl ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                فیس چیک کرنے کے لئے یونیورسٹی ویب سائٹ دیکھیں
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4 text-sm text-muted-foreground">
        {program.lastVerified ? (
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            آخری تصدیق: {program.lastVerified}
          </span>
        ) : null}

        <div className="mr-auto flex items-center gap-4">
          {program.admissionUrl ? (
            <a
              href={program.admissionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              <ClipboardList className="h-4 w-4" />
              داخلہ کی معلومات
            </a>
          ) : null}
          {program.programUrl ? (
            <a
              href={program.programUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              پروگرام کی تفصیل
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

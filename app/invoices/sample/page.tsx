import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, FileText, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Sample Invoice',
  description: 'Sample payment invoice format for Shama.pk courses.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SampleInvoicePage() {
  return (
    <div dir="ltr" className="min-h-screen bg-[#eef3f8] py-10">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Link
              href="/course/youth-career-guidance"
              className="mb-4 inline-flex items-center gap-2 font-sans text-sm font-medium text-[#175b8c] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to course
            </Link>
            <div className="flex items-center gap-3">
              <FileText className="h-7 w-7 text-[#175b8c]" />
              <h1 className="font-sans text-2xl font-bold leading-tight text-[#172033] sm:text-3xl">
                Customer invoice format
              </h1>
            </div>
            <p className="mt-2 max-w-2xl font-sans text-sm leading-6 text-[#566276]">
              This is the invoice layout customers will receive by email after
              a payment is confirmed.
            </p>
          </div>
          <Button asChild className="gap-2 bg-[#175b8c] hover:bg-[#12496f]">
            <Link href="/api/invoices/sample" target="_blank">
              <ExternalLink className="h-4 w-4" />
              Open printable version
            </Link>
          </Button>
        </div>

        <div className="mb-5 flex items-start gap-3 border border-[#d8c379] bg-[#fff8dc] px-4 py-3 font-sans text-sm leading-6 text-[#6c5200]">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
          <span>
            Compliance preview only. It is visibly marked as a sample and does
            not represent a completed transaction.
          </span>
        </div>

        <iframe
          src="/api/invoices/sample"
          title="Shama.pk sample invoice"
          className="h-[1050px] w-full border border-[#d9e2ea] bg-white shadow-sm"
        />
      </div>
    </div>
  );
}
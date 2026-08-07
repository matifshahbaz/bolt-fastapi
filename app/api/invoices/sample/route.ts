import { sampleInvoice, renderInvoiceHtml } from '@/lib/invoices';

export function GET() {
  return new Response(renderInvoiceHtml(sampleInvoice, true), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
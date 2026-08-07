export type InvoiceLineItem = {
  description: string;
  quantity: number;
  unitPrice: number;
};

export type Invoice = {
  invoiceNumber: string;
  transactionId: string;
  issuedAt: string;
  paidAt: string;
  currency: 'PKR';
  customer: {
    name: string;
    email: string;
  };
  items: InvoiceLineItem[];
};

const business = {
  name: process.env.SHAMA_BUSINESS_NAME || 'Shama.pk',
  email: process.env.SHAMA_BILLING_EMAIL || 'billing@shama.pk',
  address:
    process.env.SHAMA_BUSINESS_ADDRESS ||
    'Online education business, Pakistan',
  taxId: process.env.SHAMA_TAX_ID,
};

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[character] as string)
  );

export const formatPkr = (amount: number) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(amount);

export const invoiceTotal = (invoice: Invoice) =>
  invoice.items.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0
  );

export const createInvoiceNumber = (transactionId: string) => {
  const safeTransactionId = transactionId
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(-12);

  return `SH-${safeTransactionId || 'PAYMENT'}`;
};

export const sampleInvoice: Invoice = {
  invoiceNumber: 'SAMPLE-INV-0001',
  transactionId: 'SAMPLE-TRANSACTION-0001',
  issuedAt: '2026-08-06T10:00:00.000Z',
  paidAt: '2026-08-06T10:00:00.000Z',
  currency: 'PKR',
  customer: {
    name: 'Sample Customer',
    email: 'customer@example.com',
  },
  items: [
    {
      description: 'Youth Career Guidance Course',
      quantity: 1,
      unitPrice: 500,
    },
  ],
};

export function renderInvoiceHtml(invoice: Invoice, isSample = false) {
  const total = invoiceTotal(invoice);
  const dateFormatter = new Intl.DateTimeFormat('en-PK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Karachi',
  });
  const issuedDate = dateFormatter.format(new Date(invoice.issuedAt));
  const paidDate = dateFormatter.format(new Date(invoice.paidAt));
  const rows = invoice.items
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.description)}</td>
          <td class="number">${item.quantity}</td>
          <td class="number">${escapeHtml(formatPkr(item.unitPrice))}</td>
          <td class="number"><strong>${escapeHtml(
            formatPkr(item.quantity * item.unitPrice)
          )}</strong></td>
        </tr>`
    )
    .join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Invoice ${escapeHtml(invoice.invoiceNumber)}</title>
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; background: #eef3f8; color: #172033; font-family: Georgia, 'Times New Roman', serif; line-height: 1.5; }
      .page { width: min(760px, calc(100% - 32px)); margin: 32px auto; background: #fff; border-top: 6px solid #175b8c; box-shadow: 0 12px 40px rgba(23, 32, 51, .12); }
      .content { padding: 48px; }
      .sample { padding: 10px 24px; background: #fff2c7; color: #754c00; text-align: center; font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: .08em; }
      .header { display: flex; justify-content: space-between; gap: 32px; padding-bottom: 28px; border-bottom: 1px solid #d9e2ea; }
      .brand { color: #175b8c; font-family: Arial, sans-serif; font-size: 30px; font-weight: 800; }
      .invoice-title { margin: 0; font-family: Arial, sans-serif; font-size: 28px; letter-spacing: .08em; text-align: right; }
      .muted { color: #687386; font-family: Arial, sans-serif; font-size: 13px; }
      .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; padding: 30px 0; }
      .label { margin-bottom: 7px; color: #687386; font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
      .details { display: grid; grid-template-columns: auto 1fr; gap: 5px 18px; font-family: Arial, sans-serif; font-size: 13px; }
      .details strong { text-align: right; }
      table { width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 13px; }
      th { padding: 12px; background: #175b8c; color: #fff; font-size: 11px; letter-spacing: .06em; text-align: left; text-transform: uppercase; }
      td { padding: 15px 12px; border-bottom: 1px solid #d9e2ea; }
      .number { text-align: right; }
      .total { display: flex; justify-content: flex-end; align-items: center; gap: 32px; margin-top: 20px; font-family: Arial, sans-serif; }
      .total strong { color: #175b8c; font-size: 23px; }
      .paid { display: inline-block; margin-top: 32px; padding: 7px 13px; border: 1px solid #21875c; color: #176541; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: .08em; }
      .footer { padding: 22px 48px; background: #f7f9fb; color: #687386; font-family: Arial, sans-serif; font-size: 12px; text-align: center; }
      @media (max-width: 600px) { .content { padding: 28px 22px; } .header, .meta { grid-template-columns: 1fr; display: grid; } .invoice-title { text-align: left; } .details strong { text-align: left; } .page { margin: 16px auto; } }
      @media print { body { background: #fff; } .page { width: 100%; margin: 0; box-shadow: none; } }
    </style>
  </head>
  <body>
    <main class="page">
      ${
        isSample
          ? '<div class="sample">SAMPLE / PRO FORMA - NOT A COMPLETED TRANSACTION</div>'
          : ''
      }
      <div class="content">
        <header class="header">
          <div>
            <div class="brand">${escapeHtml(business.name)}</div>
            <div class="muted">${escapeHtml(business.address)}</div>
            <div class="muted">${escapeHtml(business.email)}</div>
            ${
              business.taxId
                ? `<div class="muted">Tax ID: ${escapeHtml(business.taxId)}</div>`
                : ''
            }
          </div>
          <div>
            <h1 class="invoice-title">INVOICE</h1>
            <div class="details">
              <span>Invoice</span><strong>${escapeHtml(invoice.invoiceNumber)}</strong>
              <span>Issued</span><strong>${escapeHtml(issuedDate)}</strong>
              <span>Paid</span><strong>${escapeHtml(paidDate)}</strong>
            </div>
          </div>
        </header>
        <section class="meta">
          <div>
            <div class="label">Billed to</div>
            <strong>${escapeHtml(invoice.customer.name)}</strong>
            <div class="muted">${escapeHtml(invoice.customer.email)}</div>
          </div>
          <div>
            <div class="label">Payment reference</div>
            <div>${escapeHtml(invoice.transactionId)}</div>
          </div>
        </section>
        <table>
          <thead><tr><th>Description</th><th class="number">Qty</th><th class="number">Unit price</th><th class="number">Amount</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <div class="total"><span>Total paid</span><strong>${escapeHtml(
          formatPkr(total)
        )}</strong></div>
        <div class="paid">PAID IN FULL</div>
      </div>
      <footer class="footer">Thank you for learning with ${escapeHtml(
        business.name
      )}. This invoice was generated after payment confirmation.</footer>
    </main>
  </body>
</html>`;
}
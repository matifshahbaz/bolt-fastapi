import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Building2, Globe2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ٹولز',
  description: 'شمع.pk کے مفت تلاش کے ٹولز: کورس، یونیورسٹی اور اسکالرشپ فائنڈر۔',
  alternates: { canonical: 'https://shama.pk/tools' },
};

const tools = [
  {
    href: '/tools/course-finder',
    title: 'کورس فائنڈر',
    description: 'مضمون، قیمت اور دورانیے کے مطابق موزوں کورس تلاش کریں۔',
    icon: GraduationCap,
  },
  {
    href: '/tools/university-finder',
    title: 'یونیورسٹی فائنڈر',
    description: 'شہر، پروگرام اور سرکاری یا نجی شعبے کے مطابق پاکستانی جامعات تلاش کریں۔',
    icon: Building2,
  },
  {
    href: '/tools/scholarship-finder',
    title: 'اسکالرشپ فائنڈر',
    description: 'ملک، ڈگری سطح اور شعبے کے مطابق بین الاقوامی اسکالرشپس تلاش کریں۔',
    icon: Globe2,
  },
];

export default function ToolsPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-nastaliq leading-[1.6] text-accent md:text-4xl lg:text-5xl">
            ٹولز
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            آپ کی تعلیمی اور کیریئر رہنمائی کے لیے مفت تلاش کے ٹولز
          </p>
        </div>
      </section>
      <section className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group block h-full">
              <div className="card-hover flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <tool.icon className="h-6 w-6" />
                </div>
                <h2 className="mb-2 text-xl font-nastaliq text-accent leading-relaxed">{tool.title}</h2>
                <p className="text-base text-muted-foreground leading-relaxed">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

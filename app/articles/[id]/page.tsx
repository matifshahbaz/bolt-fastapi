import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, Calendar, ArrowLeft, CheckCircle2, FlaskConical, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/site/article-card';
import { ArticleToc } from '@/components/site/article-toc';
import { getArticleById, getArticles } from '@/lib/content-api';

function isSubHeading(text: string) {
  return /^\s*[0-9۰-۹]+[.۔][0-9۰-۹]+/.test(text);
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [article, allArticles] = await Promise.all([
    getArticleById(params.id),
    getArticles(),
  ]);

  if (!article) {
    notFound();
  }

  const related = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const headingIdByIndex = new Map<number, string>();
  const headingItems = article.content.reduce<{ id: string; label: string }[]>(
    (items, section, index) => {
      if (section.type !== 'heading') {
        return items;
      }

      const label = section.text?.trim() ?? '';
      if (!label || isSubHeading(label)) {
        return items;
      }

      const id = `section-${items.length + 1}`;
      headingIdByIndex.set(index, id);
      items.push({ id, label });
      return items;
    },
    [],
  );

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/articles">
            <Button variant="ghost" className="mb-6 text-lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              واپس مضامین پر
            </Button>
          </Link>
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
            {article.category}
          </Badge>
          <h1 className="mb-6 text-3xl font-nastaliq leading-[1.6] text-black md:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-base text-black/80">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readingTime}
            </span>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="overflow-hidden rounded-2xl border bg-slate-50 shadow-lg">
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-auto w-full"
            loading="eager"
          />
        </div>
      </section>

      {/* Article Body */}
      <section className="bg-slate-100 py-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white px-5 py-10 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.55)] sm:px-9 lg:px-12">
            <ArticleToc
              items={headingItems}
              className="hidden lg:fixed lg:bottom-8 lg:left-6 lg:z-40 lg:block lg:w-[286px]"
            />
            <div>
              <article className="space-y-10">
            {article.content.map((section, idx) => {
              if (section.type === 'heading') {
                const headingId = headingIdByIndex.get(idx);
                return (
                  <h2
                    key={idx}
                    id={headingId}
                    className={`mt-12 mb-5 scroll-mt-28 text-3xl font-nastaliq leading-[1.7] md:text-4xl ${headingId ? 'text-[#2F5496]' : 'text-black'}`}
                  >
                    {section.text}
                  </h2>
                );
              }
              if (section.type === 'paragraph') {
                return (
                  <p
                    key={idx}
                    className="text-right text-2xl leading-[2.15] text-black"
                  >
                    {section.text}
                  </p>
                );
              }
              if (section.type === 'quote') {
                return (
                  <blockquote
                    key={idx}
                    className="border-r-4 border-primary pr-8 py-6 my-10 bg-primary/5 rounded-l-2xl shadow-sm"
                  >
                    <p className="text-2xl text-primary font-nastaliq leading-[2]">
                      {section.text}
                    </p>
                  </blockquote>
                );
              }
              if (section.type === 'callout') {
                const tone = section.tone ?? 'highlight';
                const Icon = tone === 'research' ? FlaskConical : Lightbulb;
                const toneClasses = tone === 'research'
                  ? 'border-emerald-200 bg-emerald-50/80 text-emerald-900'
                  : tone === 'tip'
                    ? 'border-orange-200 bg-orange-50/80 text-orange-900'
                    : 'border-primary/20 bg-primary/5 text-foreground';
                return (
                  <div key={idx} className={`rounded-3xl border px-8 py-7 shadow-sm ${toneClasses}`}>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80">
                        <Icon className="h-6 w-6" />
                      </div>
                      {section.title ? (
                        <h3 className="text-2xl font-nastaliq leading-relaxed text-black">{section.title}</h3>
                      ) : null}
                    </div>
                    {section.text ? <p className="text-2xl leading-[2.05] text-black">{section.text}</p> : null}
                  </div>
                );
              }
              if (section.type === 'checklist') {
                return (
                  <div key={idx} className="rounded-3xl border border-primary/15 bg-white p-8 shadow-sm">
                    {section.title ? (
                      <h3 className="mb-5 text-3xl font-nastaliq leading-relaxed text-black">
                        {section.title}
                      </h3>
                    ) : null}
                    <div className="space-y-4">
                      {(section.items ?? []).map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-start gap-4 rounded-2xl bg-secondary/40 px-5 py-4">
                          <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-primary" />
                          <p className="text-2xl leading-[1.95] text-black">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              if (section.type === 'image') {
                return (
                  <div
                    key={idx}
                    className="my-10 overflow-hidden rounded-3xl border bg-card shadow-lg"
                  >
                    <div className="bg-slate-50">
                      <img
                        src={section.src ?? ''}
                        alt={section.alt ?? ''}
                        className="h-auto w-full"
                        loading="lazy"
                      />
                    </div>
                    {section.alt ? (
                      <div className="border-t bg-white px-6 py-4">
                        <p className="text-xl leading-relaxed text-black/85">{section.alt}</p>
                      </div>
                    ) : null}
                  </div>
                );
              }
              return null;
              })}
          </article>

              {/* Author box */}
              <div className="mt-16 rounded-3xl border bg-secondary/30 p-8 flex items-center gap-5">
                <div className="relative h-16 w-16 rounded-full overflow-hidden shrink-0">
                  <Image
                    src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2"
                    alt={article.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-2xl text-black">{article.author}</p>
                  <p className="text-xl text-black/70">
                    کیریئر ماہر اور مصنف
                  </p>
                </div>
              </div>

              <div className="mt-10 lg:hidden">
                <ArticleToc items={headingItems} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-nastaliq text-foreground mb-8">
              متعلقہ مضامین
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

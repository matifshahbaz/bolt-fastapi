import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, Calendar, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/site/article-card';
import { articles } from '@/lib/data';

export default async function ArticleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const article = articles.find((a) => a.id === params.id);

  if (!article) {
    notFound();
  }

  const related = articles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-nastaliq text-foreground leading-[1.6] mb-6">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-base text-muted-foreground">
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
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Article Body */}
      <section className="py-12">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article className="space-y-6">
            {article.content.map((section, idx) => {
              if (section.type === 'heading') {
                return (
                  <h2
                    key={idx}
                    className="text-2xl md:text-3xl font-nastaliq text-foreground mt-8 mb-4 leading-relaxed"
                  >
                    {section.text}
                  </h2>
                );
              }
              if (section.type === 'paragraph') {
                return (
                  <p
                    key={idx}
                    className="text-lg text-muted-foreground leading-[2.2] text-justify"
                  >
                    {section.text}
                  </p>
                );
              }
              if (section.type === 'quote') {
                return (
                  <blockquote
                    key={idx}
                    className="border-r-4 border-primary pr-6 py-4 my-8 bg-primary/5 rounded-l-xl"
                  >
                    <p className="text-xl text-primary font-nastaliq leading-relaxed">
                      {section.text}
                    </p>
                  </blockquote>
                );
              }
              if (section.type === 'image') {
                return (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-xl overflow-hidden my-8"
                  >
                    <Image
                      src={section.src ?? ''}
                      alt={section.alt ?? ''}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              }
              return null;
            })}
          </article>

          {/* Author box */}
          <div className="mt-12 rounded-2xl border bg-secondary/30 p-6 flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden shrink-0">
              <Image
                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2"
                alt={article.author}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-lg text-foreground">{article.author}</p>
              <p className="text-base text-muted-foreground">
                کیریئر ماہر اور مصنف
              </p>
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

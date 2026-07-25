import { ArticlesBrowser } from '@/components/site/articles-browser';
import { getArticles, getCategories } from '@/lib/content-api';

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([
    getArticles(),
    getCategories(),
  ]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-nastaliq text-foreground mb-4 leading-[1.6]">
            مضامین
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            کیریئر رہنمائی، کاروبار، نوکوری تلاش اور مہارتوں پر اردو مضامین
          </p>
        </div>
      </section>

      <ArticlesBrowser articles={articles} categories={categories} />
    </div>
  );
}

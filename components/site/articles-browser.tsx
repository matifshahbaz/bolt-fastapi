'use client';

import { useState } from 'react';

import type { Article, Category } from '@/lib/data';
import { ArticleCard } from '@/components/site/article-card';

type ArticlesBrowserProps = {
  articles: Article[];
  categories: Category[];
};

export function ArticlesBrowser({ articles, categories }: ArticlesBrowserProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const availableCategories = categories.filter((category) =>
    articles.some((article) => article.category === category.name),
  );

  const filtered =
    activeCategory === 'all'
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <>
      <section className="border-b bg-white sticky top-16 z-40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`rounded-full px-5 py-2 text-lg transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'border-2 border-border bg-white text-foreground hover:border-primary hover:bg-primary/5'
              }`}
            >
              سب
            </button>
            {availableCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.name)}
                className={`rounded-full px-5 py-2 text-lg transition-all ${
                  activeCategory === category.name
                    ? 'bg-primary text-primary-foreground'
                    : 'border-2 border-border bg-white text-foreground hover:border-primary hover:bg-primary/5'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                اس زمرة میں ابھی کوئی مضمون نہیں ہے۔
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
'use client';

import { useState } from 'react';
import { ArticleCard } from '@/components/site/article-card';
import { articles, categories } from '@/lib/data';

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered =
    activeCategory === 'all'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

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

      {/* Category Filter */}
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
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`rounded-full px-5 py-2 text-lg transition-all ${
                  activeCategory === cat.name
                    ? 'bg-primary text-primary-foreground'
                    : 'border-2 border-border bg-white text-foreground hover:border-primary hover:bg-primary/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
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
    </div>
  );
}

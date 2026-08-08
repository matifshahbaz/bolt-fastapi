import type { MetadataRoute } from 'next';
import { publishedArticles } from '@/lib/data';

const siteUrl = 'https://shama.pk';

const publicRoutes = [
  '',
  '/articles',
  '/course',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
  '/refund-policy',
  '/compliance',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
  }));

  const articlePages = publishedArticles.map((article) => ({
    url: `${siteUrl}/articles/${article.id}`,
  }));

  return [...pages, ...articlePages];
}

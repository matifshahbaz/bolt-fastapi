import type { MetadataRoute } from 'next';
import { publishedArticles } from '@/lib/data';

const siteUrl = 'https://shama.pk';

const publicRoutes = [
  '',
  '/articles',
  '/courses',
  '/course/youth-career-guidance',
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
    url: `${siteUrl}/article/${article.id}`,
  }));

  return [...pages, ...articlePages];
}

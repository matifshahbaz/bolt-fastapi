import type { MetadataRoute } from 'next';
import { courses, publishedArticles } from '@/lib/data';

const siteUrl = 'https://shama.pk';

const publicRoutes = [
  '',
  '/articles',
  '/courses',
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

  const articlePages = publishedArticles
    .filter((article) => !article.noIndex)
    .map((article) => ({
      url: `${siteUrl}/article/${article.id}`,
    }));

  const coursePages = courses.map((course) => ({
    url: `${siteUrl}/course/${course.slug}`,
  }));

  return [...pages, ...coursePages, ...articlePages];
}

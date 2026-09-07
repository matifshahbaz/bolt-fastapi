import type { MetadataRoute } from 'next';
import { courses, publishedArticles } from '@/lib/data';
import { getIsoPublishedDate } from '@/lib/publish-date';
import { getGitLastModified, latestOf } from '@/lib/git-last-modified';

const siteUrl = 'https://shama.pk';

// Routes backed by exactly one (or two) source files, where git history of that
// file is a genuine last-modified signal for the page's content.
const staticRouteFiles: Record<string, string[]> = {
  '': ['app/page.tsx'],
  '/about': ['app/about/page.tsx'],
  '/contact': ['app/contact/page.tsx', 'app/contact/layout.tsx'],
  '/privacy-policy': ['app/privacy-policy/page.tsx'],
  '/terms-and-conditions': ['app/terms-and-conditions/page.tsx'],
  '/refund-policy': ['app/refund-policy/page.tsx'],
  '/compliance': ['app/compliance/page.tsx'],
};

// Courses defined in their own dedicated file get a genuine per-course git date.
// `youth-career-guidance` (featuredCourse) is still defined inline inside the
// shared lib/data.ts alongside unrelated content (categories, other articles),
// so that file's git history isn't a clean signal for this course specifically —
// lastModified is omitted for it rather than overstating freshness from unrelated edits.
const courseSourceFiles: Record<string, string> = {
  'excel-dashboard-course': 'lib/courses/excel-dashboard-course.ts',
  'web-development-learn-and-earn': 'lib/courses/web-development-learn-and-earn.ts',
};

function withLastModified(url: string, lastModified: string | undefined) {
  return lastModified ? { url, lastModified } : { url };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articleEntries = publishedArticles
    .filter((article) => !article.noIndex)
    .map((article) => ({
      url: `${siteUrl}/article/${article.id}`,
      lastModified: getIsoPublishedDate(article.publishedAt),
    }));

  const courseEntries = courses.map((course) => ({
    url: `${siteUrl}/course/${course.slug}`,
    lastModified: courseSourceFiles[course.slug]
      ? getGitLastModified(courseSourceFiles[course.slug])
      : undefined,
  }));

  const staticEntries = Object.entries(staticRouteFiles).map(([route, files]) =>
    withLastModified(`${siteUrl}${route}`, latestOf(files.map(getGitLastModified))),
  );

  // Listing pages take the latest known update among their children rather than
  // their own (nonexistent, since they're generated) source file.
  const articlesListing = withLastModified(
    `${siteUrl}/articles`,
    latestOf(articleEntries.map((entry) => entry.lastModified)),
  );
  const coursesListing = withLastModified(
    `${siteUrl}/courses`,
    latestOf(courseEntries.map((entry) => entry.lastModified)),
  );

  return [
    ...staticEntries,
    articlesListing,
    coursesListing,
    ...courseEntries.map((entry) => withLastModified(entry.url, entry.lastModified)),
    ...articleEntries.map((entry) => withLastModified(entry.url, entry.lastModified)),
  ];
}

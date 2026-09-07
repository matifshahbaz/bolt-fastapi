import { getArticles } from '@/lib/content-api';

export { default, generateMetadata } from '@/app/articles/[id]/page';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ id: article.id }));
}

// Every valid id is enumerated above from the bundled article registry, so any id
// not in that list is genuinely invalid — render Next's real 404 for it instead of
// falling back to an on-demand render that calls notFound() itself.
export const dynamicParams = false;

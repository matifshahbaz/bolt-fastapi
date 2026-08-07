import {
  articles as fallbackArticles,
  categories as fallbackCategories,
  featuredCourse as fallbackFeaturedCourse,
  type Article,
  type ArticleSection,
  type Category,
  type Course,
  type CourseLesson,
  type CourseModule,
  type Instructor,
  type LessonArticle,
} from '@/lib/data';
import { apiBaseUrl } from '@/lib/api';

type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
};

type ApiLesson = {
  id: string;
  kind: 'video' | 'text';
  title: string;
  duration: string;
  video_uid?: string | null;
  article?: {
    excerpt: string;
    cover_image: string;
    content: ApiArticleSection[];
  } | null;
};

type ApiCourseModule = {
  id: string;
  title: string;
  lessons: ApiLesson[];
};

type ApiInstructor = {
  name: string;
  title: string;
  bio: string;
};

type ApiCourse = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cover_image: string;
  duration: string;
  lessons: number;
  level: string;
  language: string;
  price: string;
  instructor: ApiInstructor;
  outcomes: string[];
  modules: ApiCourseModule[];
};

type ApiArticleSection = {
  type: 'heading' | 'paragraph' | 'quote' | 'image' | 'callout' | 'checklist';
  text?: string;
  src?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  items?: string[];
  tone?: 'research' | 'highlight' | 'tip';
  footer?: string;
};

type ApiArticle = {
  id: string;
  title: string;
  excerpt: string;
  cover_image: string;
  category: string;
  author: string;
  published_at: string;
  reading_time: string;
  content?: ApiArticleSection[];
};

async function fetchContent<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Content request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function mapCategory(category: ApiCategory): Category {
  return category;
}

function mapInstructor(instructor: ApiInstructor): Instructor {
  return instructor;
}

function mapCourseModule(module: ApiCourseModule): CourseModule {
  return {
    id: module.id,
    title: module.title,
    lessons: module.lessons.map(mapLesson),
  };
}

function mapLesson(lesson: ApiLesson): CourseLesson {
  return {
    id: lesson.id,
    kind: lesson.kind,
    title: lesson.title,
    duration: lesson.duration,
    videoUid: lesson.video_uid ?? undefined,
    article: lesson.article
      ? mapLessonArticle(lesson.article)
      : undefined,
  };
}

function mapLessonArticle(article: NonNullable<ApiLesson['article']>): LessonArticle {
  return {
    excerpt: article.excerpt,
    coverImage: article.cover_image,
    content: (article.content ?? []).map(mapArticleSection),
  };
}

function mapArticleSection(section: ApiArticleSection): ArticleSection {
  return section;
}

function mapCourse(course: ApiCourse): Course {
  return {
    id: course.id,
    title: course.title,
    subtitle: course.subtitle,
    description: course.description,
    coverImage: course.cover_image,
    duration: course.duration,
    lessons: course.lessons,
    level: course.level,
    language: course.language,
    price: course.price,
    instructor: mapInstructor(course.instructor),
    outcomes: course.outcomes,
    modules: course.modules.map(mapCourseModule),
  };
}

function mapArticle(article: ApiArticle): Article {
  return {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    coverImage: article.cover_image,
    category: article.category,
    author: article.author,
    publishedAt: article.published_at,
    readingTime: article.reading_time,
    content: (article.content ?? []).map(mapArticleSection),
  };
}

export async function getFeaturedCourse(): Promise<Course> {
  return fallbackFeaturedCourse;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await fetchContent<ApiCategory[]>('/api/v1/categories');
    return categories.map(mapCategory);
  } catch {
    return fallbackCategories;
  }
}

export async function getArticles(): Promise<Article[]> {
  const publicBundledArticles = fallbackArticles.filter((article) => !article.id.endsWith('-notes'));

  try {
    const remoteArticles = (await fetchContent<ApiArticle[]>('/api/v1/articles')).map(mapArticle);
    const bundledArticleIds = new Set(fallbackArticles.map((article) => article.id));

    return [
      ...publicBundledArticles,
      ...remoteArticles.filter(
        (article) => !bundledArticleIds.has(article.id) && !article.id.endsWith('-notes'),
      ),
    ];
  } catch {
    return publicBundledArticles;
  }
}

export async function getArticleById(articleId: string): Promise<Article | null> {
  const bundledArticle = fallbackArticles.find((article) => article.id === articleId);
  if (bundledArticle) {
    return bundledArticle;
  }

  try {
    const article = await fetchContent<ApiArticle>(`/api/v1/articles/${articleId}`);
    return mapArticle(article);
  } catch {
    return null;
  }
}
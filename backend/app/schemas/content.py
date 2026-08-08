from pydantic import BaseModel


class Category(BaseModel):
    id: str
    name: str
    slug: str
    icon: str
    color: str


class Lesson(BaseModel):
    id: str
    kind: str
    title: str
    duration: str
    hidden: bool = False
    coming_soon: bool = False
    video_uid: str | None = None
    article: "LessonArticle | None" = None


class LessonArticle(BaseModel):
    excerpt: str
    cover_image: str
    content: list["ArticleSection"]


class CourseModule(BaseModel):
    id: str
    title: str
    hidden: bool = False
    lessons: list[Lesson]


class Instructor(BaseModel):
    name: str
    title: str
    bio: str


class Course(BaseModel):
    id: str
    title: str
    subtitle: str
    description: str
    cover_image: str
    duration: str
    lessons: int
    level: str
    language: str
    price: str
    instructor: Instructor
    outcomes: list[str]
    modules: list[CourseModule]


class ArticleSection(BaseModel):
    type: str
    text: str | None = None
    src: str | None = None
    alt: str | None = None
    title: str | None = None
    subtitle: str | None = None
    items: list[str] | None = None
    tone: str | None = None
    footer: str | None = None


class ArticleSummary(BaseModel):
    id: str
    title: str
    excerpt: str
    cover_image: str
    category: str
    author: str
    published_at: str
    reading_time: str


class ArticleDetail(ArticleSummary):
    content: list[ArticleSection]
Lesson.model_rebuild()
LessonArticle.model_rebuild()
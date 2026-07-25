from fastapi import APIRouter, HTTPException

from app.schemas.content import ArticleDetail, ArticleSummary, Category, Course
from app.services.content_service import content_service

router = APIRouter()


@router.get("/categories", response_model=list[Category])
def list_categories() -> list[Category]:
    return content_service.list_categories()


@router.get("/courses/featured", response_model=Course)
def get_featured_course() -> Course:
    return content_service.get_featured_course()


@router.get("/articles", response_model=list[ArticleSummary])
def list_articles() -> list[ArticleSummary]:
    return content_service.list_articles()


@router.get("/articles/{article_id}", response_model=ArticleDetail)
def get_article(article_id: str) -> ArticleDetail:
    article = content_service.get_article(article_id)
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return article
from app.repositories.content_repository import ContentRepository
from app.schemas.content import ArticleDetail, ArticleSummary, Category, Course


class ContentService:
    def __init__(self, repository: ContentRepository) -> None:
        self._repository = repository

    def list_categories(self) -> list[Category]:
        return self._repository.list_categories()

    def get_featured_course(self) -> Course:
        return self._repository.get_featured_course()

    def list_articles(self) -> list[ArticleSummary]:
        return self._repository.list_articles()

    def get_article(self, article_id: str) -> ArticleDetail | None:
        return self._repository.get_article(article_id)


content_service = ContentService(ContentRepository())
from fastapi import APIRouter

from app.api.v1.endpoints import auth, contact, lms, media, site

api_router = APIRouter()
api_router.include_router(auth.router, tags=["auth"])
api_router.include_router(site.router, tags=["site"])
api_router.include_router(lms.router, tags=["lms"])
api_router.include_router(media.router, tags=["media"])
api_router.include_router(contact.router, tags=["contact"])
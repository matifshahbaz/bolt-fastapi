# Shama.pk FastAPI Backend

This backend provides a modular FastAPI service for shama.pk.

## Features

- Featured Urdu course API for "Career guidance for Pakistani youth"
- Articles API for Urdu content pages
- Contact form submission endpoint
- LMS auth, enrollments, and lesson progress
- CORS defaults for local development and shama.pk
- PostgreSQL-ready database layer using SQLAlchemy
- File-based contact message persistence for simple shared hosting deployments

## Structure

```
backend/
  app/
    api/
    core/
    repositories/
    schemas/
    services/
    main.py
  data/
  requirements.txt
```

## Run locally

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API will start on `http://127.0.0.1:8000`.

## Frontend integration

Set `NEXT_PUBLIC_API_BASE_URL` for the Next.js app to the backend origin, for example:

```bash
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

## Hostinger notes

- Deploy the Next.js frontend and FastAPI backend as separate apps.
- Point the frontend environment variable `NEXT_PUBLIC_API_BASE_URL` at the backend URL.
- Keep the `SHAMA_ALLOWED_ORIGINS` value aligned with the final frontend domains.
- Set `SHAMA_DATABASE_URL` to the PostgreSQL connection string from your Hostinger VPS.

## Cloudflare setup (Stream + Images)

Recommended order:

1. Configure and test Cloudflare integration locally.
2. Deploy backend on Hostinger VPS.
3. Set production environment variables and allowed origins.
4. Go live with signed playback and admin-only uploads.

Required backend env vars:

- `SHAMA_ADMIN_EMAILS` (comma-separated admin emails)
- `SHAMA_CLOUDFLARE_ACCOUNT_ID`
- `SHAMA_CLOUDFLARE_API_TOKEN`
- `SHAMA_CLOUDFLARE_STREAM_CUSTOMER_SUBDOMAIN`
- `SHAMA_CLOUDFLARE_STREAM_SIGNING_KEY_ID`
- `SHAMA_CLOUDFLARE_STREAM_SIGNING_KEY_SECRET`
- `SHAMA_CLOUDFLARE_STREAM_TOKEN_TTL_SECONDS`
- `SHAMA_CLOUDFLARE_STREAM_WATCH_COMPLETION_THRESHOLD` (default 50)
- `SHAMA_CLOUDFLARE_STREAM_LESSON_VIDEO_MAP_RAW` (JSON map of course lessons to Stream video UIDs)

### New API endpoints

- `GET /api/v1/lms/courses/{course_id}/modules/{module_id}/lessons/{lesson_index}/playback`
  - Requires authenticated enrolled user.
  - Returns short-lived signed iframe/HLS/DASH playback URLs.
- `POST /api/v1/lms/courses/{course_id}/modules/{module_id}/lessons/{lesson_index}/watch`
  - Payload: `{ "watched_percent": number }`
  - Marks lesson complete once threshold is reached.
- `POST /api/v1/media/stream/direct-upload`
  - Admin-only direct upload URL for Stream videos.
- `POST /api/v1/media/images/direct-upload`
  - Admin-only direct upload URL for Cloudflare Images.

- `POST /api/v1/auth/password-reset/request`
  - Payload: `{ "email": "user@example.com" }`
  - Returns a generic success message. In debug mode (or when `SHAMA_EXPOSE_PASSWORD_RESET_TOKEN=true`), also returns `reset_token` for integration testing.

- `POST /api/v1/auth/password-reset/confirm`
  - Payload: `{ "token": "...", "new_password": "new-strong-password" }`
  - Validates one-time reset token and updates the user's password.
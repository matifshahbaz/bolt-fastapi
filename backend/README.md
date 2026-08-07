# Shama.pk FastAPI Backend

This backend provides a modular FastAPI service for shama.pk.

## Features

- Featured Urdu course API for "Career guidance for Pakistani youth"
- Articles API for Urdu content pages
- Contact form submission endpoint
- LMS auth, enrollments, and lesson progress
- Manual JazzCash/bank payment proof submission and admin approval
- Admin student search, manual enrollment, access suspension/reactivation, and removal
- SMTP account, payment, approval, rejection, and password-reset emails
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

## Manual payments

The temporary checkout does not grant course access when a student uploads a screenshot. It creates a pending payment submission. An email allowlisted through `SHAMA_ADMIN_EMAILS` can review proofs at:

```text
https://shama.pk/admin/payments
```

Approving a payment activates the existing enrollment record. RapidGateway can later replace the submission/review step while keeping that enrollment activation boundary and the rest of the LMS unchanged.

Payment proof images are limited to JPEG, PNG, or WebP files up to 4 MB and are stored in the configured SQL database. The proof endpoint requires admin authentication.

Configure these groups in the backend hosting environment:

- `SHAMA_JAZZCASH_NUMBER` and `SHAMA_BANK_*` public payment instructions
- `SHAMA_ADMIN_EMAILS` and `SHAMA_ADMIN_NOTIFICATION_EMAIL`
- `SHAMA_FRONTEND_BASE_URL`
- `SHAMA_SMTP_HOST`, `SHAMA_SMTP_PORT`, `SHAMA_SMTP_USERNAME`, and `SHAMA_SMTP_PASSWORD`
- `SHAMA_SMTP_USE_TLS` or `SHAMA_SMTP_USE_SSL`, as required by the mail provider
- `SHAMA_EMAIL_FROM` and `SHAMA_EMAIL_FROM_NAME`

Keep the SMTP password only in the hosting environment. When SMTP is unavailable, account and payment operations still succeed and the backend logs the email delivery failure.

## Student enrollment administration

Allowlisted administrators see an **Admin** link after login and can manage registered accounts at:

```text
https://shama.pk/admin/students
```

The screen supports searching by name, email, mobile number, or location; manually granting course access by registered email; viewing enrollment state and completed lesson count; suspending or reactivating access; and permanently removing an enrollment. Permanent removal also deletes that student's saved progress for the course. Reactivation starts a new 30-day access window.

All student and enrollment administration endpoints require a bearer token belonging to an email configured in `SHAMA_ADMIN_EMAILS`.

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

- `POST /api/v1/lms/courses/{course_id}/payment-submissions`
  - Authenticated student submission. Access remains inactive while status is pending.
- `GET /api/v1/lms/courses/{course_id}/payment-submission`
  - Returns the student's latest review status.
- `GET /api/v1/lms/admin/payment-submissions`
  - Admin-only payment review list.
- `POST /api/v1/lms/admin/payment-submissions/{submission_id}/approve`
  - Admin-only approval that activates course enrollment.
- `POST /api/v1/lms/admin/payment-submissions/{submission_id}/reject`
  - Admin-only rejection with an optional review note.
- `GET /api/v1/lms/admin/students`
  - Admin-only registered-account and enrollment list with optional search.
- `POST /api/v1/lms/admin/enrollments`
  - Grants or reactivates course access for an existing registered email.
- `PATCH /api/v1/lms/admin/students/{user_id}/courses/{course_id}/enrollment`
  - Changes access status to active, inactive, expired, or refunded.
- `DELETE /api/v1/lms/admin/students/{user_id}/courses/{course_id}/enrollment`
  - Permanently removes enrollment and saved lesson progress.
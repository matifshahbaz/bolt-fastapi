# Repository Guide for Coding Agents

This file is vendor-neutral guidance for any coding assistant or engineer working in this repository. Read it before making changes. See `DEPLOYMENT.md` before changing production.

## Project Overview

Shama.pk is an Urdu-first education and career-guidance application with:

- A Next.js 13 App Router frontend
- React 18, TypeScript, Tailwind CSS, Radix UI, and Lucide icons
- A FastAPI backend using SQLAlchemy
- PostgreSQL in production and SQLite as the local fallback
- Bundled article and course content with selected backend API integrations

The production application is served at `https://shama.pk`.

## Runtime Baseline

Match production unless a task explicitly requires an upgrade:

- Node.js 20
- npm 10
- Python 3.12

The current framework versions are intentionally older than the newest releases. Do not perform framework or dependency upgrades as part of unrelated work.

## Important Paths

- `app/`: Next.js routes and layouts
- `components/`: shared UI and article-specific visual components
- `lib/data.ts`: bundled content registry and shared content types
- `lib/content-api.ts`: frontend content access and fallback behavior
- `lib/articles/`: typed bundled article definitions
- `public/articles/`: article images and other public media
- `backend/app/`: FastAPI application
- `backend/app/core/config.py`: backend configuration model and defaults
- `backend/.env.example`: configuration key reference, never production secrets
- `backend/data/`: ignored local data, including the SQLite development database

## Setup and Commands

Frontend setup:

```bash
npm ci
npm run dev -- -p 3001
```

Frontend validation:

```bash
npm run typecheck
npm run build
```

Backend setup on Windows PowerShell:

```powershell
python -m venv backend/.venv
backend/.venv/Scripts/python -m pip install -r backend/requirements.txt
```

Backend development server:

```powershell
Set-Location backend
.venv/Scripts/python -m uvicorn app.main:app --reload
```

The backend defaults to `http://127.0.0.1:8000`. The frontend uses `NEXT_PUBLIC_API_BASE_URL` when configured.

## Architecture Notes

- `getArticles()` and `getArticleById()` currently return bundled articles from `publishedArticles` in `lib/data.ts`.
- Categories may be fetched from the backend, with bundled categories as fallback.
- The canonical article route is `/article/[id]`.
- Middleware redirects legacy `/articles/[id]` URLs to `/article/[id]`.
- Article metadata and structured data are generated in `app/articles/[id]/page.tsx`.
- The shared article table of contents starts collapsed on all viewport sizes.
- Production frontend and backend are separate systemd services. See `DEPLOYMENT.md`.

## Publishing an Article

Use the established bundled-content pattern:

1. Add a typed article module under `lib/articles/`.
2. Put optimized web assets under `public/articles/` with stable descriptive names.
3. Import the article in `lib/data.ts`.
4. Add it to `publishedArticles`; list newest articles first.
5. Add English companion SEO metadata in `app/articles/[id]/page.tsx` when useful.
6. Use the final `image` content section for an article-specific footer graphic.
7. Verify `/articles`, `/article/<id>`, all images, metadata, and mobile layout.

Preserve Urdu text as UTF-8. Do not transliterate or rewrite supplied article copy unless requested. Add useful Urdu alt text for images.

## Engineering Conventions

- Follow existing patterns and keep changes narrowly scoped.
- Preserve public routes, data shapes, and APIs unless the task requires a change.
- Avoid unrelated formatting or dependency churn.
- Use existing UI components and Tailwind conventions.
- Use Lucide icons when an appropriate icon exists.
- Keep article and operational interfaces responsive and free of horizontal overflow.
- Do not revert changes you did not create.
- Do not commit or deploy unless explicitly requested.
- Never use destructive Git commands on a dirty worktree.

## Validation Expectations

For frontend changes, run at minimum:

```bash
npm run typecheck
```

Run `npm run build` before commits or production deployment. For user-facing pages, also verify the affected route in a browser at desktop and mobile widths. Confirm lazy-loaded images actually load after scrolling.

For backend changes, exercise the narrow API or test path involved and check:

```text
GET /health
```

Do not treat a successful compile as sufficient for authentication, payments, enrollment, email, or database changes.

## Secrets and Local-Only State

Never commit, print, or send these to an AI provider:

- `.env` files or production environment values
- SSH private keys
- Database credentials or dumps
- SMTP passwords
- Cloudflare API/signing secrets
- User access tokens or payment-proof data

Important state excluded by `.gitignore`:

- `.next/`
- `node_modules/`
- `backend/.venv/`
- `backend/data/*.db`
- `backend/data/*.jsonl`
- local `.env` files

These generated directories should be recreated, not copied between development environments. Back up meaningful local databases separately.

The editable source archive for articles is outside this repository at:

```text
C:\Users\97156\Desktop\Personal\Shama.pk\Articles
```

Published assets needed by the website must also exist under `public/` and be committed to Git.

## Git and Remote Repositories

The primary branch is `main`. Two GitHub remotes are currently used:

- `origin`: `https://github.com/matifshahbaz/bolt-fastapi.git`
- `hostinger`: `https://github.com/matifshahbaz/newJuly27-boltfast.git`

Production pulls from `origin/main`. Keep both remotes synchronized when explicitly asked to publish to both. Always fetch and confirm divergence before pushing.

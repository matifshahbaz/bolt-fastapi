# Shama.pk Deployment Runbook

This runbook documents the verified production layout and a vendor-neutral deployment process. It intentionally contains no passwords, tokens, private keys, or database connection strings.

## Production Topology

- Public site: `https://shama.pk`
- VPS SSH user and host: `deploy@187.77.145.132`
- Repository: `/var/www/bolt-fastapi`
- Production branch: `main`
- Git remote used by the VPS: `origin`
- Frontend: Next.js on `127.0.0.1:3000`
- Backend: FastAPI on `127.0.0.1:8000`
- Database: PostgreSQL on `127.0.0.1:5432`
- Reverse proxy: public ports 80 and 443

Systemd services:

- `shama-frontend.service`
- `shama-backend.service`

Verified production runtimes:

- Node.js 20
- npm 10
- Python 3.12

## Configuration and Secrets

Production configuration is not stored in Git:

- `/etc/shama/frontend.env`
- `/etc/shama/backend.env`
- `/home/deploy/.config/shama/smtp_password`

The environment files are root-owned. The SMTP password file must remain mode `600`. Store a secure copy in an approved password manager. Never paste these values into source files, issue trackers, deployment logs, or AI chats.

The frontend requires `NEXT_PUBLIC_API_BASE_URL`. Backend configuration uses `SHAMA_` variables documented in `backend/.env.example` and `backend/app/core/config.py`.

## Pre-Deployment Checklist

From the local repository:

```bash
git status --short
git fetch --all --prune
npm ci
npm run typecheck
npm run build
```

Requirements:

- The local worktree is clean.
- The intended commit is pushed to `origin/main`.
- Push to `hostinger/main` too when both mirrors must stay synchronized.
- Record the commit hash being deployed.
- Do not deploy unrelated changes together.

Check the VPS before changing it:

```bash
ssh deploy@187.77.145.132
cd /var/www/bolt-fastapi
git status -sb
git log -1 --oneline --decorate
systemctl is-active shama-frontend.service
systemctl is-active shama-backend.service
df -h /var/www
```

Stop if the VPS worktree is dirty or the branch cannot fast-forward. Investigate rather than discarding server changes.

## Frontend Deployment

Build in a temporary Git worktree so `next build` does not mutate the build currently serving production.

The following sequence assumes a clean VPS checkout and a commit already pushed to `origin/main`:

```bash
set -euo pipefail

REPO=/var/www/bolt-fastapi
cd "$REPO"

git fetch origin main
TARGET=$(git rev-parse origin/main)
PREVIOUS=$(git rev-parse --short HEAD)
SHORT=$(git rev-parse --short "$TARGET")
RELEASE="/var/www/bolt-fastapi-next-build-$SHORT"
ROLLBACK="/var/www/bolt-fastapi-next-rollback-$PREVIOUS"

test -z "$(git status --porcelain)"
test "$(git branch --show-current)" = "main"

if [ ! -e "$ROLLBACK" ]; then
  cp -a .next "$ROLLBACK"
fi

git merge --ff-only origin/main
git worktree add --detach "$RELEASE" "$TARGET"
ln -s "$REPO/node_modules" "$RELEASE/node_modules"

cd "$RELEASE"
npm run build

cd "$REPO"
OLD_BUILD="$REPO/.next-previous-$SHORT"
mv .next "$OLD_BUILD"
mv "$RELEASE/.next" .next
```

If the deploy user has passwordless restart permission:

```bash
sudo -n systemctl restart shama-frontend.service
```

On the current server, the deploy user does not have passwordless `sudo`. The service has `Restart=always`, so the deploy user can trigger a controlled restart of its own frontend process:

```bash
MAIN_PID=$(systemctl show shama-frontend.service -p MainPID --value)
test -n "$MAIN_PID"
kill "$MAIN_PID"
```

Systemd should immediately start a new process. Confirm a new PID and listener before cleanup.

## Frontend Verification

```bash
systemctl is-active shama-frontend.service
systemctl show shama-frontend.service -p MainPID -p ActiveEnterTimestamp
ss -ltnp | grep 127.0.0.1:3000
curl -fsS http://127.0.0.1:3000/ >/dev/null
curl -fsS https://shama.pk/ >/dev/null
```

Also request every changed route and representative new asset. For visual changes, inspect production in a browser at desktop and mobile widths. Confirm images load, the page has no horizontal overflow, and interactive controls work after hydration.

After successful verification:

```bash
git -C "$REPO" worktree remove --force "$RELEASE"
rm -rf "$OLD_BUILD"
git -C "$REPO" status -sb
```

Retain the named rollback directory until a later successful deployment. Do not accumulate unlimited rollback builds; keep a small, known set.

## Backend Deployment

Deploy the backend only when backend code or dependencies changed.

After fast-forwarding the clean production checkout:

```bash
cd /var/www/bolt-fastapi
backend/.venv/bin/python -m pip install -r backend/requirements.txt
```

Restart `shama-backend.service` with an authorized systemd command. If only the deploy-owned process can be signaled, first record its PID and confirm `Restart=always`, then terminate that PID and verify systemd starts a new one.

Validation:

```bash
systemctl is-active shama-backend.service
curl -fsS http://127.0.0.1:8000/health
```

There is currently no migration framework documented in this repository. Treat schema changes as high risk: back up PostgreSQL first, inspect the generated SQL, and define an explicit rollback.

## Database Backups

Git does not contain production data. Before backend, authentication, payment, enrollment, or schema changes:

1. Create a PostgreSQL custom-format dump with `pg_dump -Fc`.
2. Store it outside the application checkout with restricted permissions.
3. Retain an off-server or provider snapshot.
4. Test restoration periodically.

Use the actual database name from the protected production configuration. Do not copy the connection string into this document or a shell history entry.

Example to be run by an authorized administrator after creating a protected backup directory:

```bash
sudo -u postgres pg_dump -Fc --file=/var/backups/shama/shama-before-deploy.dump DATABASE_NAME
```

No Shama/PostgreSQL-specific scheduled backup timer was visible during the August 22, 2026 audit. Confirm Hostinger snapshot coverage and add an automated database backup policy.

## Rollback

Before every deployment, record:

- Previous Git commit
- New Git commit
- Rollback `.next` directory
- Whether backend dependencies or database state changed

For a frontend-only rollback, restore the matching previous source revision and its matching `.next` build, then restart `shama-frontend.service`. Source and build output must correspond to the same commit.

Do not run a destructive Git reset unless the production checkout is confirmed clean and the intended rollback commit is recorded. Database changes require a separate, tested rollback or restore plan.

## Incident Checks

```bash
systemctl status shama-frontend.service --no-pager
systemctl status shama-backend.service --no-pager
journalctl -u shama-frontend.service -n 100 --no-pager
journalctl -u shama-backend.service -n 100 --no-pager
ss -ltnp
```

Check internal listeners before blaming the reverse proxy. Verify public HTTPS only after localhost frontend/backend checks pass.
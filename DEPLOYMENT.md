# Shama.pk Deployment Runbook

This runbook documents the verified production layout and a vendor-neutral deployment process. It intentionally contains no passwords, tokens, private keys, or database connection strings.

Last audited over SSH: **August 24, 2026**. The checkout was clean at commit `91bb973999d270aa37e62c2858410190089dbdb5`. Treat commit hashes, process IDs, certificate dates, and disk usage below as audit evidence rather than permanent configuration.

## Production Topology

- Public site: `https://shama.pk`
- Public API: `https://api.shama.pk`
- VPS SSH user and host: `deploy@187.77.145.132`
- Hostname and OS: `srv1858902`, Ubuntu 24.04 LTS
- Repository: `/var/www/bolt-fastapi`
- Production branch: `main`
- Git remote used by the VPS: `origin`
- Frontend: Next.js on `127.0.0.1:3000`
- Backend: FastAPI on `127.0.0.1:8000`
- Database: PostgreSQL 16 on `127.0.0.1:5432`
- Reverse proxy: Nginx on public ports 80 and 443
- TLS: Let's Encrypt, renewed by enabled `certbot.timer`

Nginx routes `shama.pk` and `www.shama.pk` to the frontend, and `api.shama.pk` to the backend. The application and database listeners are loopback-only; SSH, HTTP, and HTTPS are the public listeners.

Systemd services:

| Unit | Runs as | Working directory | Command | Restart policy |
| --- | --- | --- | --- | --- |
| `shama-frontend.service` | `deploy:deploy` | `/var/www/bolt-fastapi` | `/usr/bin/npm run start -- -H 127.0.0.1 -p 3000` | `always` |
| `shama-backend.service` | `deploy:deploy` | `/var/www/bolt-fastapi/backend` | `backend/.venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000` | `always` |

Verified production runtimes:

- Node.js 20.20.2
- npm 10.8.2
- Python 3.12.3

## Configuration and Secrets

Production configuration is not stored in Git:

- `/etc/shama/frontend.env`
- `/etc/shama/backend.env`
- `/home/deploy/.config/shama/smtp_password`

The two environment files are `root:root` mode `600`. The SMTP password file is `deploy:deploy` mode `600`. Store a secure copy in an approved password manager. Never paste these values into source files, issue trackers, deployment logs, shell output captured by an AI tool, or AI chats.

The frontend accepts `NEXT_PUBLIC_API_BASE_URL`; production code defaults to `https://api.shama.pk` when it is unset. Because `NEXT_PUBLIC_*` values may be embedded by `next build`, supply any non-default value during both build and runtime. Backend configuration uses `SHAMA_` variables documented in `backend/.env.example` and `backend/app/core/config.py`.

Inspect file ownership without printing secret contents:

```bash
stat -c '%A %U:%G %n' \
  /etc/shama/frontend.env \
  /etc/shama/backend.env \
  /home/deploy/.config/shama/smtp_password
```

## Access and Responsibility Boundaries

The `deploy` account can fetch code, build releases, read service status and logs, and signal application processes that it owns. It cannot read the root-owned environment files and, as audited, does not have passwordless `sudo`. Systemd can still read the protected environment files before starting each service as `deploy`.

An authorized VPS administrator is required for:

- Editing `/etc/shama/*.env`, Nginx, systemd units, firewall rules, or certificate configuration
- Running PostgreSQL backups and restores as `postgres`
- Restarting or reloading system services directly
- Installing OS packages and applying security updates
- Adding, removing, or rotating SSH authorized keys

Keep at least two tested administrator access paths and the Hostinger account recovery method in an approved password manager. Before cancelling any development tool subscription, verify that access does not depend on credentials stored only in that tool.

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
git fetch origin main
git merge-base --is-ancestor HEAD origin/main
systemctl is-active shama-frontend.service
systemctl is-active shama-backend.service
df -h /var/www
```

Stop if the VPS worktree is dirty, the current commit is not an ancestor of `origin/main`, or a service is unhealthy. Investigate rather than discarding server changes.

## Restarting Deploy-Owned Services

Direct `systemctl restart` requires an administrator. Because both application units run as `deploy` with `Restart=always`, the deploy user can perform a controlled restart by terminating the current main process and verifying that systemd replaces it. Define this helper in the active SSH shell:

```bash
restart_owned_unit() {
  UNIT="$1"
  case "$UNIT" in
    shama-frontend.service|shama-backend.service) ;;
    *) echo "Refusing unexpected unit: $UNIT" >&2; return 2 ;;
  esac

  test "$(systemctl show "$UNIT" -p User --value)" = "$(id -un)"
  test "$(systemctl show "$UNIT" -p Restart --value)" = "always"

  OLD_PID=$(systemctl show "$UNIT" -p MainPID --value)
  test -n "$OLD_PID"
  test "$OLD_PID" != "0"
  kill "$OLD_PID"

  for ATTEMPT in $(seq 1 20); do
    NEW_PID=$(systemctl show "$UNIT" -p MainPID --value)
    if systemctl is-active --quiet "$UNIT" && \
       test -n "$NEW_PID" && \
       test "$NEW_PID" != "0" && \
       test "$NEW_PID" != "$OLD_PID"; then
      printf '%s restarted: %s -> %s\n' "$UNIT" "$OLD_PID" "$NEW_PID"
      return 0
    fi
    sleep 1
  done

  systemctl status "$UNIT" --no-pager
  return 1
}
```

Do not use this technique for units that do not run as `deploy` or do not have `Restart=always`.

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
ROLLBACK_DEPS="/var/www/bolt-fastapi-node-modules-rollback-$PREVIOUS"

test -z "$(git status --porcelain)"
test "$(git branch --show-current)" = "main"
git merge-base --is-ancestor HEAD "$TARGET"
test ! -e "$RELEASE"

DEPS_CHANGED=0
if ! git diff --quiet HEAD "$TARGET" -- package.json package-lock.json; then
  DEPS_CHANGED=1
  test ! -e "$ROLLBACK_DEPS"
fi

git worktree add --detach "$RELEASE" "$TARGET"

if test "$DEPS_CHANGED" = "1"; then
  cd "$RELEASE"
  npm ci
else
  ln -s "$REPO/node_modules" "$RELEASE/node_modules"
fi

cd "$RELEASE"
npm run build

cd "$REPO"
if [ ! -e "$ROLLBACK" ]; then
  cp -a .next "$ROLLBACK"
fi

git merge --ff-only "$TARGET"

OLD_BUILD="$REPO/.next-previous-$SHORT"
mv .next "$OLD_BUILD"
mv "$RELEASE/.next" .next

if test "$DEPS_CHANGED" = "1"; then
  mv "$REPO/node_modules" "$ROLLBACK_DEPS"
  mv "$RELEASE/node_modules" "$REPO/node_modules"
fi
```

The temporary worktree protects the live build from a failed compile. When dependency manifests changed, it also builds against a fresh `npm ci` result and preserves the previous `node_modules` beside the matching rollback build. Do not reuse a shared `node_modules` when `package.json` or `package-lock.json` changed.

If the deploy user has passwordless restart permission:

```bash
sudo -n systemctl restart shama-frontend.service
```

On the current server, the deploy user does not have passwordless `sudo`. Use the guarded helper defined above:

```bash
restart_owned_unit shama-frontend.service
```

## Frontend Verification

```bash
systemctl is-active shama-frontend.service
systemctl show shama-frontend.service -p MainPID -p ActiveEnterTimestamp
ss -ltnp | grep 127.0.0.1:3000
curl -fsS http://127.0.0.1:3000/ >/dev/null
curl -fsS https://shama.pk/ >/dev/null
curl -fsS https://www.shama.pk/ >/dev/null
```

Also request every changed route and representative new asset. For visual changes, inspect production in a browser at desktop and mobile widths. Confirm images load, the page has no horizontal overflow, and interactive controls work after hydration.

After successful verification:

```bash
git -C "$REPO" worktree remove --force "$RELEASE"
rm -rf "$OLD_BUILD"
git -C "$REPO" status -sb
```

Retain the named rollback directory and, when present, its matching `node_modules` rollback until a later successful deployment. Do not accumulate unlimited rollback builds; keep the current rollback plus one older known-good rollback, and remove older pairs only after recording their commit names.

## Backend Deployment

Deploy the backend only when backend code or dependencies changed.

After fast-forwarding the clean production checkout:

```bash
cd /var/www/bolt-fastapi
backend/.venv/bin/python -m pip install -r backend/requirements.txt
```

Restart `shama-backend.service` with an authorized systemd command or the guarded helper:

```bash
restart_owned_unit shama-backend.service
```

Validation:

```bash
systemctl is-active shama-backend.service
curl -fsS http://127.0.0.1:8000/health
curl -fsS https://api.shama.pk/health
```

There is currently no migration framework documented in this repository. Treat schema changes as high risk: back up PostgreSQL first, inspect the generated SQL, and define an explicit rollback.

## Database Backups

Git does not contain production data. Before backend, authentication, payment, enrollment, or schema changes:

1. Create a PostgreSQL custom-format dump with `pg_dump -Fc`.
2. Store it outside the application checkout with restricted permissions.
3. Retain an off-server or provider snapshot.
4. Test restoration periodically.

Use the actual database name from the protected production configuration. Do not copy the connection string into this document or a shell history entry.

Example to be run by an authorized administrator after creating a protected backup directory. Replace `DATABASE_NAME` locally; do not send its connection credentials through chat:

```bash
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
sudo install -d -m 0700 -o postgres -g postgres /var/backups/shama
sudo -u postgres pg_dump \
  --format=custom \
  --file="/var/backups/shama/shama-$STAMP.dump" \
  DATABASE_NAME
sudo -u postgres pg_restore \
  --list "/var/backups/shama/shama-$STAMP.dump" >/dev/null
sudo stat -c '%A %U:%G %s %n' "/var/backups/shama/shama-$STAMP.dump"
```

Copy encrypted backups off the VPS and define retention by business requirement. A backup is not proven until an administrator restores it into a separate test database and checks representative users, enrollments, payments, and lesson progress.

No Shama/PostgreSQL-specific scheduled backup timer or dump under `/var/backups` was visible to `deploy` during the August 24, 2026 audit. Confirm Hostinger snapshot coverage and add an automated database backup policy as an administrator. Do not claim backup coverage until both an off-server copy and a restore drill are verified.

## Nginx and TLS

The active site link is `/etc/nginx/sites-enabled/shama`, pointing at `/etc/nginx/sites-available/shama`. Validate a proxy or certificate change before reload:

```bash
sudo nginx -t
sudo systemctl reload nginx.service
curl -fsS https://shama.pk/ >/dev/null
curl -fsS https://api.shama.pk/health
```

Certificate inspection does not require privileged access:

```bash
openssl s_client -connect shama.pk:443 -servername shama.pk </dev/null 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates
systemctl is-enabled certbot.timer
```

At the audit, the certificate was valid from July 27 through October 25, 2026 and `certbot.timer` was enabled. An administrator should run `sudo certbot renew --dry-run` after Nginx, DNS, or firewall changes.

## Rollback

Before every deployment, record:

- Previous Git commit
- New Git commit
- Rollback `.next` directory
- Whether backend dependencies or database state changed

For a frontend-only rollback, restore the matching previous source revision and its matching `.next` build, then restart `shama-frontend.service`. If the failed release changed dependency manifests, also restore the matching `node_modules` rollback. Source, build output, and dependencies must correspond to the same commit.

Do not run a destructive Git reset unless the production checkout is confirmed clean and the intended rollback commit is recorded. Database changes require a separate, tested rollback or restore plan.

## Disaster Recovery Order

For a replacement VPS or total host loss:

1. Recover the Hostinger account, DNS control, administrator SSH access, and password-manager records.
2. Provision the documented OS and install Nginx, PostgreSQL 16, Node.js 20, npm 10, Python 3.12, Certbot, and Git.
3. Clone `origin/main` into `/var/www/bolt-fastapi` and verify the intended production commit.
4. Restore PostgreSQL into a non-public listener and validate the restored data before enabling traffic.
5. Recreate `/etc/shama/frontend.env`, `/etc/shama/backend.env`, and the SMTP password file with the ownership and modes documented above.
6. Run `npm ci`, `npm run build`, create `backend/.venv`, and install `backend/requirements.txt`.
7. Recreate the two systemd units and Nginx site using the topology and commands in this runbook.
8. Issue or restore certificates, enable services and timers, and validate localhost endpoints before public DNS or proxy traffic.
9. Test login, password reset, enrollment, payment administration, email, and representative course playback before declaring recovery complete.

Keep copies of the systemd unit files, Nginx site, secret inventory names, DNS records, and backup restore procedure in an access-controlled location outside the VPS. This repository intentionally does not contain secret values.

## Outstanding Operations Work

As of the August 24, 2026 audit:

- Automated PostgreSQL backups and an off-server restore drill were not verified.
- Nine legacy `.next` rollback directories were present under `/var/www`; prune old builds after retaining and recording two known-good releases.
- Passwordless service restart is intentionally unavailable to `deploy`; administrator access must remain recoverable.
- Firewall policy and Hostinger snapshot configuration were not verifiable from the unprivileged account.
- The current TLS certificate expires October 25, 2026; renewal automation is enabled but still needs periodic monitoring.

## Incident Checks

```bash
systemctl status shama-frontend.service --no-pager
systemctl status shama-backend.service --no-pager
journalctl -u shama-frontend.service -n 100 --no-pager
journalctl -u shama-backend.service -n 100 --no-pager
ss -ltnp
df -h /
```

Check internal listeners before blaming the reverse proxy. Verify public HTTPS only after localhost frontend/backend checks pass.
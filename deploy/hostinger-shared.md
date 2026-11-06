# Hosting Mob Limited on Hostinger (Shared Hosting, no Docker)

Shared hosting can run the **Laravel backend** (PHP + MySQL) but usually cannot run the
**Next.js frontend** (Node.js SSR) reliably. Recommended: use Hostinger **VPS** for the full
stack (see `deploy/hostinger.md`). If you must use shared hosting, follow this guide.

## 1. Backend (Laravel API)

### 1.1 Create MySQL database
In hPanel → Databases → MySQL Databases, create:
- Database name, username, password. Note the host (usually `localhost`).

### 1.2 Upload backend
Upload the contents of `backend/` to a folder, e.g. `public_html/api/` or a subdomain root.
Set the document root to the `public/` folder (hPanel → Domains → Manage → Document root).

### 1.3 Configure environment
Create `backend/.env` (or edit) with:

```env
APP_NAME="Mob Limited"
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:...   # generate locally
APP_URL=https://api.example.com
FRONTEND_URL=https://www.example.com
REVALIDATE_SECRET=<long-random-string>

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=<db_name>
DB_USERNAME=<db_user>
DB_PASSWORD=<db_password>

CACHE_STORE=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync

FILESYSTEM_DISK=public
# (use S3/R2 if you have credentials)

MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=465
MAIL_USERNAME=<mailbox>
MAIL_PASSWORD=<mailbox-password>
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=noreply@example.com
MAIL_FROM_NAME="Mob Limited"

SANCTUM_STATEFUL_DOMAINS=www.example.com,api.example.com
CORS_ALLOWED_ORIGINS=https://www.example.com,https://api.example.com
```

### 1.4 Install dependencies
If SSH is available:
```bash
cd ~/public_html/api
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan storage:link
php artisan migrate --force
php artisan db:seed --force
php artisan config:cache
php artisan route:cache
```

If no SSH, upload `vendor/` and `storage/` from a local build and run migrations via
a one-off PHP script or import the SQL dump.

### 1.5 Scheduler (publishing)
Shared hosting has no long-running daemon. Add a cron job in hPanel:
```
* * * * * cd /home/USER/public_html/api && php artisan schedule:run >> /dev/null 2>&1
```

### 1.6 Permissions
Ensure `storage/` and `bootstrap/cache/` are writable (755/775).

## 2. Frontend (Next.js)

Shared hosting usually cannot run `npm start` as a daemon. Options:

### Option A — Hostinger Node.js hosting (if available on your plan)
1. Create a Node.js app in hPanel pointing to the `frontend/` folder.
2. Set env vars `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`, `REVALIDATE_SECRET`.
3. Run `npm ci && npm run build` then start with `npm start` (or `node .next/standalone/server.js`).

### Option B — Build locally and upload a static export
Not recommended (loses SSR/ISR/admin revalidation). Only if no Node support:
```bash
# frontend/next.config.ts: add output: 'export'
npm run build
# upload the out/ folder to public_html
```
You will lose on-demand revalidation and dynamic metadata; content changes require a rebuild.

### Option C — Host frontend elsewhere (recommended)
Deploy the frontend on Vercel/Netlify (free tier) and point it at your Hostinger backend API.
This keeps the backend on Hostinger and gives you full Next.js SSR/ISR.

## 3. Notes

- `APP_DEBUG=false` and `APP_ENV=production` in production.
- `CACHE_STORE=file` and `QUEUE_CONNECTION=sync` avoid Redis.
- `FILESYSTEM_DISK=public` stores uploads locally; back up `storage/app/public`.
- If you hit memory/time limits during `composer install`, run it locally and upload `vendor/`.

For a fully managed, production-grade setup, use a Hostinger **VPS** with Docker
(see `deploy/hostinger.md`).
```<|end|><|start|>write to=assistant<|channel|>analysis<|message|>Created file successfully: deploy/hostinger-shared.md
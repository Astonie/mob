# Zambia Mining Corporation — Enterprise Platform

Production-ready, content-driven corporate platform for a modern mining company. **Custom CMS + public website** with secure APIs, SEO, and scalable architecture.

```
Visitors → Next.js 15 (ISR/RSC) → Laravel 11 API (/api/v1) → PostgreSQL + Redis + S3
```

> Build as a long-term enterprise platform — not a demo. Content-driven, security-by-design, clean separation.

---

## Stack

| Layer | Tech |
|-------|------|
| **Backend** | Laravel 11, PHP 8.3+, PostgreSQL 15, Redis 7, Sanctum, Spatie Permission, Pest |
| **Frontend** | Next.js 16, React 19, TypeScript strict, Tailwind 4, App Router, RSC/ISR |
| **Infra** | Docker & Compose, S3-compatible storage, Horizon, Scheduler |

---

## Quick Start

### Option A — Docker (recommended)

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env  # or create frontend/.env.local
docker compose up --build
```

- Backend: http://localhost:8000 — `GET /api/v1/health`
- Frontend: http://localhost:3000
- MinIO: http://localhost:9001 (minio/minio123)

Seeded accounts:

| Email | Password | Role |
|-------|----------|------|
| admin@mining.example | Admin123! | super-admin |
| editor@mining.example | Editor123! | editor |
| test@example.com | password | viewer |

### Option B — Local without Docker

**Backend**
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite  # or configure pgsql via DB_CONNECTION=pgsql
php artisan migrate:fresh --seed
php artisan serve --port=8000
```

**Frontend**
```bash
cd frontend
npm ci
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
echo "NEXT_PUBLIC_SITE_URL=http://localhost:3000" >> .env.local
echo "REVALIDATE_SECRET=local-secret" >> .env.local
npm run dev
```

---

## Architecture at a Glance

- **Two deployables:** `backend/` (Laravel API + CMS engine) and `frontend/` (Next.js public site). Communicate only via REST `/api/v1`.
- **Content-driven:** Every public pixel is CMS-editable. Pages = ordered `PageBlock` JSON (`hero`, `rich_text`, `stats`, `cta`, `project_grid`, etc.) → `BlockRenderer` in Next.js. Adding a page never touches frontend code.
- **Publishing workflow:** `draft → review → approved → published → archived` with `scheduled_at` + Scheduler every minute, revision snapshots, audit logs.
- **Auth:** Sanctum SPA cookie + bearer token (`cms` ability). Public reads are cached/throttled; admin routes are `auth:sanctum` + Policies/Gates (server-side, never FE).
- **Search:** `SearchEngine` contract → `DatabaseSearchEngine` (ILIKE + trigram) swappable to Meilisearch.

See `docs/architecture.md` (Phase 1 blueprint in repo) for ERD, RBAC matrix, block catalogue, deployment diagram.

---

## API

Base: `http://localhost:8000/api/v1`

**Public**
```
GET  /health
GET  /pages?slug=home  /pages/:slug
GET  /navigation?menu=main
GET  /projects  /projects/:slug  ?status=&mineral=&featured=
GET  /minerals  /minerals/:slug
GET  /news  /news/:slug  ?category=&tag=&featured=
GET  /careers  /careers/:slug
GET  /search?q=&type=
POST /contact-submissions  (throttle 5/min, honeypot)
POST /careers/:slug/applications  (multipart resume)
GET  /site-settings
```

**Admin** `auth:sanctum`
```
POST /auth/login  GET /auth/me  POST /auth/logout
GET  /admin/dashboard
CRUD /admin/projects  POST /admin/projects/:id/publish
CRUD /admin/minerals
CRUD /admin/news  POST /admin/news/:id/publish
CRUD /admin/pages  POST /admin/pages/:id/reorder
POST /admin/media/upload
CRUD /admin/navigation-menus  /admin/locations
GET  /admin/audit-logs  /admin/revisions
```

Auth example:
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mining.example","password":"Admin123!"}'
# → { data: { token, user } }
curl -H "Authorization: Bearer $TOKEN" http://localhost:8000/api/v1/admin/dashboard
```

On-demand ISR: `POST /api/revalidate?secret=...` (Next.js) — called by Laravel on publish (queue).

---

## CMS

Admin API is the CMS. A Next.js `(cms)/admin` shell can consume the same ` /api/v1/admin/*` endpoints (no Blade coupling). Current seed provides:

- Dashboard with KPIs, pending reviews, scheduled
- Pages + block reorder, publishing
- Projects/Minerals with M:N sync
- News with category/tag, scheduled publishing
- Media/upload, Navigation, Locations, Careers, Procurement, Documents, ESG/HSE, FAQs, SEO, SiteSettings, AuditLogs, Revisions

Permissions enforced via `spatie/laravel-permission` + Policies. Seed roles: `super-admin`, `content-admin`, `editor`, `publisher`, `media-manager`, `hr-manager`, `procurement-manager`, `comms-manager`, `viewer`.

---

## Frontend Routes ( ISR 600–3600 )

| Route | Data | Cache |
|-------|------|-------|
| `/` | `home` page blocks + featured projects/minerals/news | ISR 3600 |
| `/[slug]` | Dynamic CMS pages → BlockRenderer | ISR 3600 |
| `/projects` `/projects/[slug]` | Filter + mineral relation | ISR 600 / 3600 |
| `/minerals` `/minerals/[slug]` | Mineral + projects | ISR 3600 |
| `/news` `/news/[slug]` | Paginated + related | ISR 600 / 3600 |
| `/careers` `/careers/[slug]` | Open roles + application | ISR 600 |
| `/sustainability`, `/about`, `/contact`, `/search` | Static + CMS fallback | ISR |
| `/sitemap.xml`, `/robots.txt` | Generated from API | — |

Security headers (`X-Frame-Options`, `HSTS` via proxy), `next/image`, lazy below fold, CDN-ready storage.

---

## SEO

- `seo_settings` polymorphic per page/project/mineral/news/career
- `generateMetadata()` + `JsonLd` (Organization, Article, Breadcrumb, JobPosting)
- `sitemap.ts` / `robots.ts` from API, Open Graph, canonical, robots meta, structured data
- ISR keeps metadata fresh without rebuild

---

## Testing & Quality

**Backend**
```bash
cd backend
./vendor/bin/pint --test   # Laravel Pint
./vendor/bin/pest          # 18 tests: auth, public, admin, validation
./vendor/bin/pest --coverage
```

**Frontend**
```bash
cd frontend
npm run lint
npx tsc --noEmit
npm run build              # Turbopack, all 15 routes green
```

Accessibility target WCAG 2.2 AA: semantic HTML, keyboard nav, focus states, labels, alt, contrast.

---

## Environment Variables

**Backend** `backend/.env.example` — `APP_KEY`, `DB_CONNECTION` (pgsql/sqlite), `REDIS_HOST`, `AWS_*` (S3/R2/MinIO), `SANCTUM_STATEFUL_DOMAINS`, `FRONTEND_URL`, `REVALIDATE_SECRET`, `CORS_ALLOWED_ORIGINS`

**Frontend** `frontend/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATE_SECRET=local-secret-change-me
```

---

## Deployment

- **Docker**: multi-stage `backend/Dockerfile` (php-fpm) + `frontend/Dockerfile` (standalone). One command `docker compose up`.
- **Scheduler**: `php artisan schedule:run` every minute (publishes scheduled). Horizon for queues.
- **Storage**: `public` (CDN) vs `private` (signed URLs) disks — MinIO locally, S3/R2 in prod.
- **Health**: `GET /api/v1/health` checks DB/Redis. Frontend and backend have independent deploys, shared contract is OpenAPI.

For VPS/ECS/K8s: build images, push, wire `DB_*`, `REDIS_*`, `AWS_*` secrets via env, run migrations, seed, start queue worker + scheduler.

---

## Decisions & Risks

- Single tenant (add `company_id` for multi-tenant)
- English-only v1 (JSONB `translations` ready)
- No payment gateway (procurement = notice + registration)
- Image optimization via `next/image` + `intervention/image` thumbnails

See Architecture Blueprint (Phase 1) for full ERD, module breakdown, RBAC model, page-builder model and mitigation table.

---

## License

Proprietary — Zambia Mining Corporation. Demo seed data is synthetic but realistic (Kansanshi, Trident, Mushima) — not Lorem Ipsum.

---

Built as an enterprise platform — **content-driven, secure-by-design, maintainable**.

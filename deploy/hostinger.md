# Hosting Mob Limited on Hostinger (VPS + Docker)

This project ships as two containers (Laravel API + Next.js) plus PostgreSQL and Redis.
The recommended Hostinger product is a **VPS (KVM)** with Docker installed.

## 1. VPS prerequisites

- Ubuntu 22.04/24.04 VPS (2+ vCPU, 4+ GB RAM recommended)
- Docker + Docker Compose plugin installed
- Domain(s) pointed at the VPS IP (A records):
  - `example.com` / `www.example.com` → VPS IP
  - `api.example.com` → VPS IP
- Firewall open for `22`, `80`, `443` (keep `3000`/`8000` closed)

## 2. Clone and configure

```bash
git clone git@github.com:Astonie/mob.git
cd mob
cp .env.prod.example .env.prod
```

Edit `.env.prod` with real values (never commit it):

```env
APP_NAME="Mob Limited"
APP_KEY=base64:...          # generate: php -r "echo 'base64:'.base64_encode(random_bytes(32)).PHP_EOL;"
APP_URL=https://api.example.com
FRONTEND_URL=https://www.example.com
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_URL=https://www.example.com
REVALIDATE_SECRET=<long-random-string>
CORS_ALLOWED_ORIGINS=https://www.example.com,https://api.example.com
SANCTUM_STATEFUL_DOMAINS=www.example.com,api.example.com

DB_DATABASE=mining
DB_USERNAME=mining
DB_PASSWORD=<strong-password>

SEED_ADMIN_NAME=Administrator
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=<strong-password>

REDIS_PASSWORD=<strong-password>

MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=465
MAIL_USERNAME=<mailbox>
MAIL_PASSWORD=<mailbox-password>
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=noreply@example.com
MAIL_FROM_NAME="Mob Limited"

FILESYSTEM_DISK=s3            # or "public" if you use the local disk volume
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_DEFAULT_REGION=...
AWS_BUCKET=...
AWS_ENDPOINT=...
AWS_USE_PATH_STYLE_ENDPOINT=...
AWS_URL=...

SESSION_ENCRYPT=true
DB_SSLMODE=require
LOG_LEVEL=warning
BCRYPT_ROUNDS=12
```

## 3. Reverse proxy + TLS (Caddy example)

Install Caddy on the host:

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install -y caddy
```

Create `/etc/caddy/Caddyfile`:

```caddyfile
www.example.com, example.com {
    reverse_proxy 127.0.0.1:3000
}

api.example.com {
    reverse_proxy 127.0.0.1:8000
}
```

```bash
sudo systemctl reload caddy
```

Caddy provisions TLS certificates automatically.

## 4. Start the stack

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

On first boot the backend runs migrations + seeders:
- creates the super-admin from `SEED_ADMIN_*`
- seeds site settings, pages (Home, About, Services, News, Careers, Contact), navigation (with "Our Services" and "Our Team")

## 5. Verify

```bash
curl https://api.example.com/api/v1/health
curl -I https://www.example.com
```

Admin login: `https://www.example.com/admin/login` with the `SEED_ADMIN_*` credentials.

## 6. Updates / redeploy

```bash
git pull
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

## 7. Backups

- PostgreSQL: schedule `pg_dump` (cron) to a mounted volume / off-site storage.
- Media: if `FILESYSTEM_DISK=public`, back up the `backend_storage` Docker volume; if S3/R2, enable bucket versioning.
- Keep `.env.prod` in a password manager, not in git.

## Notes

- `NEXT_PUBLIC_*` values are baked into the frontend at build time — changing them requires `--build`.
- The prod compose binds the backend/frontend to `127.0.0.1` only; the reverse proxy is the public entry point.
- For shared hosting (no Docker), you would need PHP 8.3+, PostgreSQL, Redis and Node.js support — a VPS is strongly recommended.
```<|end|><|start|>write to=assistant<|channel|>analysis<|message|>Created file successfully: /Users/aiengineering/projects/mob/deploy/hostinger.md
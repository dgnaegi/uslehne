# uslehne

uslehne.ch — React + Node.js + PostgreSQL, deployed on Scalingo.

---

## Mac Setup (first time)

### 1. Homebrew

The package manager for macOS. Install it if you don't have it:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Node.js

```bash
brew install node
```

Verify:

```bash
node --version   # should be >= 20
npm --version
```

### 3. PostgreSQL

```bash
brew install postgresql@16
brew services start postgresql@16
```

Create the local database:

```bash
createdb uslehne
```

### 4. Scalingo CLI (for deployments)

```bash
brew install scalingo/stable/scalingo
scalingo login
```

---

## Third-party services setup

### Brevo (transactional email)

1. Create account at brevo.com (free tier: 300 emails/day)
2. Settings → SMTP & API → SMTP → **Generate a new SMTP key**
3. Settings → Senders & Domains → Domains → **Add `uslehne.ch`** → add the DNS records at your registrar
4. Set on Scalingo:

```bash
scalingo --region osc-fr1 --app uslehne env-set \
  BREVO_SMTP_USER=your@email.com \
  BREVO_SMTP_KEY=xsmtp-xxxx \
  APP_URL=https://uslehne.ch
```

### Scaleway S3 (image storage)

1. Scaleway console → Object Storage → create bucket in `fr-par`
2. IAM → API Keys → create key with Object Storage write access
3. Set on Scalingo:

```bash
scalingo --region osc-fr1 --app uslehne env-set \
  S3_BUCKET=your-bucket-name \
  S3_ACCESS_KEY_ID=xxxx \
  S3_SECRET_ACCESS_KEY=xxxx
```

> Both keys should be rotated annually — see [docs/MAINTENANCE.md](docs/MAINTENANCE.md).

---

## Run locally

```bash
# 1. Backend
cd backend
cp .env.example .env
# Edit .env: fill in DATABASE_URL, BREVO_SMTP_USER, BREVO_SMTP_KEY, APP_URL, S3_* values

npm install
npm run db:migrate:dev   # create tables
npm run db:seed          # optional: load demo data
npm run dev              # → http://localhost:3001

# 2. Frontend (new terminal tab)
cd frontend
npm install
npm run dev              # → http://localhost:5173
```

Health check:

```bash
curl http://localhost:3001/api/v1/health
```

---

## Deploy to Scalingo

Region: `osc-fr1`, app name: `uslehne`, git remote: `scalingo`

```bash
# Backend
git subtree push --prefix backend scalingo main

# Frontend
git subtree push --prefix frontend scalingo main
```

First deploy only — run DB migrations on the server:

```bash
scalingo --region osc-fr1 --app uslehne run -- npm --prefix backend run db:migrate
```

---

## Useful commands

| Command | What it does |
|---|---|
| `npm run lint` | Check for lint errors |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run format` | Format code with Prettier |
| `npm run db:migrate:dev` | Run new migrations locally |
| `npm run db:seed` | Seed demo data |
| `npm run db:studio` | Open Prisma Studio (DB GUI) |

# Skill: run

Start the local development environment for uslehne.

## Prerequisites

- PostgreSQL running locally
- `backend/.env` exists with a valid `DATABASE_URL`

## Steps

1. **Database migrations** (first time or after schema changes):
   ```bash
   cd backend && npx prisma migrate dev
   ```

2. **Start backend:**
   ```bash
   cd backend && npm install && npm run dev
   ```
   Runs on `http://localhost:3001` with file watching via tsx.

3. **Start frontend** (separate terminal):
   ```bash
   cd frontend && npm install && npm run dev
   ```
   Runs on `http://localhost:5173`, proxies `/api` → `:3001`.

## Health check

```bash
curl http://localhost:3001/api/v1/health
# → {"status":"ok","db":"connected","timestamp":"..."}
```

## Seed demo data

```bash
cd backend && npm run db:seed
```

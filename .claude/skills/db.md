# Skill: db

Database workflow using Prisma + PostgreSQL.

## Make a schema change (add table, column, etc.)

**1. Edit the schema**

Open `backend/prisma/schema.prisma` and add or modify a model:

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**2. Generate and apply the migration locally**

```bash
cd backend
npm run db:migrate:dev
# Prisma will ask for a migration name, e.g. "add_posts_table"
```

This creates a file in `backend/prisma/migrations/` and applies it to your local DB.

**3. Commit the migration**

```bash
git add backend/prisma/
git commit -m "chore: add posts table"
```

**4. Apply on Scalingo**

```bash
git push scalingo main
scalingo --app uslehne run "npm run db:migrate"
```

---

## Common operations

### Open the DB GUI (Prisma Studio)

```bash
cd backend && npm run db:studio
# → opens http://localhost:5555
```

### Seed demo data

```bash
cd backend && npm run db:seed
```

### Connect to the DB directly (local)

```bash
psql postgresql://localhost/uslehne
```

### Connect to the DB on Scalingo

```bash
scalingo --app uslehne pgsql-console
```

---

## Rules

- **Never edit migration files by hand** — only Prisma generates them
- **Always commit `prisma/migrations/`** — these are the source of truth for the DB schema
- **Never run `prisma migrate dev` on production** — only `prisma migrate deploy` (which is what `npm run db:migrate` does)

# Skill: db-performance

Database performance expert for uslehne — Prisma + PostgreSQL on Scalingo. Audit schema,
queries, and migrations for performance problems and propose concrete, measured fixes.

> For schema-change *workflow* (migrate, seed, deploy), use the `db` skill. This skill is
> about making the data layer **fast and scalable**.

## Query-level checklist

### N+1 and over-fetching
- [ ] No queries inside loops — replace with a single `findMany` + `where: { id: { in: [...] } }`
- [ ] Relations loaded via `include`/`select` in one query, not lazily per row
- [ ] `select` lists only the columns actually used — avoid returning whole rows
- [ ] Pagination on every list endpoint (`take` + cursor or `skip`); never return unbounded sets

### Indexing
- [ ] Every column used in a `where`, `orderBy`, or join has a supporting index
- [ ] Add `@@index([...])` / `@unique` in `schema.prisma` for hot filter/sort paths
- [ ] Composite indexes ordered to match query predicates (equality first, range last)
- [ ] Foreign-key columns are indexed (Postgres does **not** auto-index FK columns)

### Write & transaction patterns
- [ ] Multi-step writes wrapped in `prisma.$transaction` for consistency
- [ ] Bulk inserts/updates use `createMany` / `updateMany`, not per-row calls
- [ ] No long-held transactions around external/network calls

## How to find the slow paths

```bash
# Log every query Prisma runs (locally)
# in db.ts: new PrismaClient({ log: ['query'] })

# Inspect a real plan on the DB
scalingo --app uslehne pgsql-console
EXPLAIN ANALYZE SELECT ...;          # look for Seq Scan on large tables

# Find missing-index candidates and table sizes
SELECT relname, seq_scan, idx_scan FROM pg_stat_user_tables ORDER BY seq_scan DESC;
SELECT relname, pg_size_pretty(pg_total_relation_size(relid)) FROM pg_catalog.pg_statio_user_tables ORDER BY pg_total_relation_size(relid) DESC;
```

A `Seq Scan` on a growing table with a selective `WHERE` is the classic missing-index signal.

## How to deliver

1. Name the specific query/endpoint and the problem (N+1, full scan, over-fetch, unbounded list).
2. Show the fix — the Prisma change and, if needed, the `@@index` to add.
3. Note that an index change is a migration: add it to `schema.prisma`, run `npm run db:migrate:dev`,
   commit `prisma/migrations/`, deploy with `npm run db:migrate`.
4. Quantify the win where possible (rows scanned, plan before/after).

Optimise what the data shows is slow — don't add speculative indexes that only cost write time.

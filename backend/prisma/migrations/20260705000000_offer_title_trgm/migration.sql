CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX "Offer_title_trgm_idx" ON "Offer" USING gin (title gin_trgm_ops);

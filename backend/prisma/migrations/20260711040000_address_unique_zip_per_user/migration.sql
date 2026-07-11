-- Reassign Offers that point to an older duplicate address to the newest address for that userId+zip
WITH newest AS (
  SELECT DISTINCT ON ("userId", zip) id, "userId", zip
  FROM "Address"
  ORDER BY "userId", zip, "createdAt" DESC
),
to_reassign AS (
  SELECT a.id AS old_id, n.id AS new_id
  FROM "Address" a
  JOIN newest n ON n."userId" = a."userId" AND n.zip = a.zip AND n.id != a.id
)
UPDATE "Offer"
SET "addressId" = r.new_id
FROM to_reassign r
WHERE "Offer"."addressId" = r.old_id;

-- Remove duplicate zip codes per user (keep newest)
DELETE FROM "Address"
WHERE id NOT IN (
  SELECT DISTINCT ON ("userId", zip) id
  FROM "Address"
  ORDER BY "userId", zip, "createdAt" DESC
);

-- Prevent duplicate zip codes per user
CREATE UNIQUE INDEX "Address_userId_zip_key" ON "Address"("userId", "zip");

-- Remove duplicate zip codes per user (keep newest)
DELETE FROM "Address"
WHERE id IN (
  SELECT DISTINCT ON ("userId", zip) id
  FROM "Address"
  ORDER BY "userId", zip, "createdAt" ASC
)
AND id NOT IN (
  SELECT DISTINCT ON ("userId", zip) id
  FROM "Address"
  ORDER BY "userId", zip, "createdAt" DESC
);

-- Prevent duplicate zip codes per user
CREATE UNIQUE INDEX "Address_userId_zip_key" ON "Address"("userId", "zip");

-- Remove contact from Offer (moved back to Transaction/request)
ALTER TABLE "Offer" DROP COLUMN IF EXISTS "contactType";
ALTER TABLE "Offer" DROP COLUMN IF EXISTS "contactValue";

-- Add bilateral confirmation flags to Transaction
ALTER TABLE "Transaction" ADD COLUMN "ownerConfirmed" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Transaction" ADD COLUMN "requesterConfirmed" BOOLEAN NOT NULL DEFAULT false;

-- Replace unique constraint on Rating.transactionId with per-rater uniqueness
DROP INDEX IF EXISTS "Rating_transactionId_key";
ALTER TABLE "Rating" DROP CONSTRAINT IF EXISTS "Rating_transactionId_key";
CREATE UNIQUE INDEX "Rating_transactionId_raterId_key" ON "Rating"("transactionId", "raterId");

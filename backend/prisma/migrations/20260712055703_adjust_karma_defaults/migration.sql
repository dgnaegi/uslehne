/*
  Warnings:

  - The values [PHONE] on the enum `ContactType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContactType_new" AS ENUM ('SMS', 'WHATSAPP', 'SIGNAL', 'EMAIL');
ALTER TABLE "Transaction" ALTER COLUMN "contactType" TYPE "ContactType_new" USING ("contactType"::text::"ContactType_new");
ALTER TYPE "ContactType" RENAME TO "ContactType_old";
ALTER TYPE "ContactType_new" RENAME TO "ContactType";
DROP TYPE "ContactType_old";
COMMIT;

-- DropIndex
DROP INDEX "KarmaLedger_userId_createdAt_idx";

-- DropIndex
DROP INDEX "Offer_status_createdAt_idx";

-- DropIndex
DROP INDEX "Offer_title_trgm_idx";

-- DropIndex
DROP INDEX "Transaction_ownerId_createdAt_idx";

-- DropIndex
DROP INDEX "Transaction_requesterId_createdAt_idx";

-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "karma" SET DEFAULT 3;

-- CreateIndex
CREATE INDEX "KarmaLedger_userId_createdAt_idx" ON "KarmaLedger"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Offer_status_createdAt_idx" ON "Offer"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Transaction_ownerId_createdAt_idx" ON "Transaction"("ownerId", "createdAt");

-- CreateIndex
CREATE INDEX "Transaction_requesterId_createdAt_idx" ON "Transaction"("requesterId", "createdAt");

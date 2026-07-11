-- Rename kudos → karma throughout the schema

-- User
ALTER TABLE "User" RENAME COLUMN "kudosBalance" TO "karmaBalance";

-- Transaction
ALTER TABLE "Transaction" RENAME COLUMN "kudos" TO "karma";

-- Invite
ALTER TABLE "Invite" RENAME COLUMN "kudos" TO "karma";

-- KudoLedger → KarmaLedger
ALTER TABLE "KudoLedger" RENAME TO "KarmaLedger";
ALTER TABLE "KarmaLedger" RENAME CONSTRAINT "KudoLedger_pkey" TO "KarmaLedger_pkey";
ALTER TABLE "KarmaLedger" RENAME CONSTRAINT "KudoLedger_userId_fkey" TO "KarmaLedger_userId_fkey";
ALTER INDEX "KudoLedger_userId_createdAt_idx" RENAME TO "KarmaLedger_userId_createdAt_idx";

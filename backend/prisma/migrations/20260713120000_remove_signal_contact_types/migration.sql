-- RemoveEnumValues: SIGNAL and SIGNAL_USERNAME from ContactType
-- PostgreSQL does not support DROP VALUE on enums; recreate the type.

-- Convert any existing SIGNAL rows to SMS (phone number is compatible)
UPDATE "Transaction" SET "contactType" = 'SMS' WHERE "contactType" IN ('SIGNAL', 'SIGNAL_USERNAME');

-- Swap to new enum type
CREATE TYPE "ContactType_new" AS ENUM ('SMS', 'WHATSAPP', 'TELEGRAM', 'EMAIL');

ALTER TABLE "Transaction"
  ALTER COLUMN "contactType" TYPE "ContactType_new"
  USING "contactType"::text::"ContactType_new";

DROP TYPE "ContactType";

ALTER TYPE "ContactType_new" RENAME TO "ContactType";

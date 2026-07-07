-- Reset any RESERVED offers to AVAILABLE before removing the enum value
UPDATE "Offer" SET status = 'AVAILABLE' WHERE status = 'RESERVED';

-- Drop default before swapping the type
ALTER TABLE "Offer" ALTER COLUMN status DROP DEFAULT;

-- Recreate enum without RESERVED
ALTER TYPE "OfferStatus" RENAME TO "OfferStatus_old";
CREATE TYPE "OfferStatus" AS ENUM ('AVAILABLE', 'LENT', 'GIVEN', 'ARCHIVED');
ALTER TABLE "Offer" ALTER COLUMN status TYPE "OfferStatus" USING status::text::"OfferStatus";
DROP TYPE "OfferStatus_old";

-- Re-add default
ALTER TABLE "Offer" ALTER COLUMN status SET DEFAULT 'AVAILABLE'::"OfferStatus";

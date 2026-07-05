-- Drop street column from Address
ALTER TABLE "Address" DROP COLUMN "street";

-- Add contact fields to Offer
ALTER TABLE "Offer" ADD COLUMN "contactType" "ContactType" NOT NULL DEFAULT 'EMAIL';
ALTER TABLE "Offer" ADD COLUMN "contactValue" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Offer" ALTER COLUMN "contactType" DROP DEFAULT;
ALTER TABLE "Offer" ALTER COLUMN "contactValue" DROP DEFAULT;

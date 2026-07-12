-- Add product categories to offers; existing offers become ANDERE
CREATE TYPE "OfferCategory" AS ENUM ('KLEIDUNG', 'MOEBEL', 'HAUSHALT', 'ELEKTROGERAETE', 'KINDER', 'BUECHER', 'HOBBY', 'ANDERE');
ALTER TABLE "Offer" ADD COLUMN "category" "OfferCategory" NOT NULL DEFAULT 'ANDERE';
ALTER TABLE "Offer" ALTER COLUMN "category" DROP DEFAULT;

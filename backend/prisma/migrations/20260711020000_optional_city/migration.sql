-- Make city optional — no longer restricted to Zürich

ALTER TABLE "Address" ALTER COLUMN "city" DROP NOT NULL;

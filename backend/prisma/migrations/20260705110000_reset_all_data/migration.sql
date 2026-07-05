-- Wipe all application data for a clean production start (schema is kept).
TRUNCATE TABLE "Transaction", "Rating", "KudoLedger", "Invite", "Offer", "Address", "User" CASCADE;

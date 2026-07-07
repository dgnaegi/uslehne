-- Performance indexes for hot query paths

-- Offer feed: filters status=AVAILABLE, sorts by createdAt
CREATE INDEX "Offer_status_createdAt_idx" ON "Offer"("status", "createdAt" DESC);

-- Offer lookup by owner (my-offers page)
CREATE INDEX "Offer_ownerId_idx" ON "Offer"("ownerId");

-- Transaction lists by owner and requester
CREATE INDEX "Transaction_ownerId_createdAt_idx" ON "Transaction"("ownerId", "createdAt" DESC);
CREATE INDEX "Transaction_requesterId_createdAt_idx" ON "Transaction"("requesterId", "createdAt" DESC);

-- Offer request check: does a pending/accepted transaction exist for this offer?
CREATE INDEX "Transaction_offerId_status_idx" ON "Transaction"("offerId", "status");

-- Ratings lookup by recipient (user profile avgStars)
CREATE INDEX "Rating_ratedId_idx" ON "Rating"("ratedId");

-- Kudo ledger by user
CREATE INDEX "KudoLedger_userId_createdAt_idx" ON "KudoLedger"("userId", "createdAt" DESC);

-- Address lookup by user
CREATE INDEX "Address_userId_idx" ON "Address"("userId");

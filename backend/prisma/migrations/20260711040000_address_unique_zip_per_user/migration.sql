-- Prevent duplicate zip codes per user
CREATE UNIQUE INDEX "Address_userId_zip_key" ON "Address"("userId", "zip");

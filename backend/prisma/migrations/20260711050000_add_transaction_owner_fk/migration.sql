-- Add FK constraint for Transaction.ownerId → User.id
-- (relation was always logically present but missing the FK and Prisma @relation)
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

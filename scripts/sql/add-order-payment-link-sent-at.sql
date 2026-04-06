-- Idempotent: safe if column already exists (e.g. after migrate deploy).
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paymentLinkSentAt" TIMESTAMP(3);

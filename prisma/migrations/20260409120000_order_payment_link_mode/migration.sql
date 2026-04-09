-- Add admin-controlled payment-link mode to orders.
ALTER TABLE "Order"
ADD COLUMN "paymentLinkMode" TEXT NOT NULL DEFAULT 'FULL_ONLY';

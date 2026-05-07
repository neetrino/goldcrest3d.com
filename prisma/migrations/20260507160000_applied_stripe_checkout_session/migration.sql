-- CreateTable
CREATE TABLE "AppliedStripeCheckoutSession" (
    "stripeCheckoutSessionId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppliedStripeCheckoutSession_pkey" PRIMARY KEY ("stripeCheckoutSessionId")
);

-- CreateIndex
CREATE INDEX "AppliedStripeCheckoutSession_orderId_idx" ON "AppliedStripeCheckoutSession"("orderId");

-- AddForeignKey
ALTER TABLE "AppliedStripeCheckoutSession" ADD CONSTRAINT "AppliedStripeCheckoutSession_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

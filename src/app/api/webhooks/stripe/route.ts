import { NextRequest } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { AMD_MINOR_UNITS_PER_DRAM } from "@/constants/order-form";
import { applyPaidAmountToOrder } from "@/lib/payment/applyPaidAmount";
import { isSimulatedPaymentFlow } from "@/lib/payment/config";

const secretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = secretKey ? new Stripe(secretKey) : null;

export async function POST(request: NextRequest) {
  if (isSimulatedPaymentFlow()) {
    return new Response("OK", { status: 200 });
  }
  if (!stripe || !webhookSecret) {
    return new Response("Webhook not configured", { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature", { status: 400 });
  }

  let body: string;
  try {
    body = await request.text();
  } catch {
    return new Response("Invalid body", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return new Response("OK", { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = session.metadata?.orderId ?? session.client_reference_id;
  if (!orderId || typeof orderId !== "string") {
    return new Response("OK", { status: 200 });
  }

  const amountTotalMinor = session.amount_total ?? 0;

  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return new Response("OK", { status: 200 });

    const paidDeltaAmd = Math.round(amountTotalMinor / AMD_MINOR_UNITS_PER_DRAM);
    await applyPaidAmountToOrder(orderId, paidDeltaAmd);
  } catch (err) {
    logger.error("Stripe webhook: order update failed", err);
    return new Response("Database error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}

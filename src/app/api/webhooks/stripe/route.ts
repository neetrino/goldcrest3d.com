import { NextRequest } from "next/server";
import Stripe from "stripe";
import { logger } from "@/lib/logger";
import { processStripeCheckoutSessionCompleted } from "@/lib/payment/processStripeCheckoutSessionCompleted";
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

  try {
    await processStripeCheckoutSessionCompleted(session);
  } catch (err) {
    logger.error("Stripe webhook: checkout session processing failed", err);
    return new Response("Database error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}

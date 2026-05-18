import { randomBytes } from "node:crypto";

const MERCHANT_ORDER_NUMBER_MAX_LEN = 32;

/**
 * Unique merchant order number for register.do (max 32 chars per Arca spec).
 */
export function buildArcaMerchantOrderNumber(
  orderId: string,
  paymentIndex?: 0 | 1,
): string {
  const suffix = paymentIndex === 0 ? "a" : paymentIndex === 1 ? "b" : "f";
  const nonce = randomBytes(4).toString("hex");
  const base = `gc${orderId.replace(/\W/g, "").slice(0, 18)}${suffix}${nonce}`;
  return base.slice(0, MERCHANT_ORDER_NUMBER_MAX_LEN);
}

import { ARCA_ORDER_STATUS_PAID } from "@/constants/arca-payment";
import type { ArcaOrderStatusExtendedResponse } from "@/lib/arca/types";

const PAYMENT_STATE_DEPOSITED = "DEPOSITED";

/**
 * Whether Arca reports a completed one-stage payment (merchant manual + integration guide).
 */
export function isArcaPaymentDeposited(
  status: ArcaOrderStatusExtendedResponse,
): boolean {
  if (status.actionCode !== undefined && status.actionCode !== 0) {
    return false;
  }

  const paymentState = status.paymentAmountInfo?.paymentState;
  if (paymentState === PAYMENT_STATE_DEPOSITED) {
    return true;
  }

  return status.orderStatus === ARCA_ORDER_STATUS_PAID;
}

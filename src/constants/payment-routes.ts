/** Public routes for bank returnUrl / failUrl redirects (Arca hosted checkout). */
export const PAYMENT_RESULT_PATHS = {
  success: "/payment/success",
  fail: "/payment/fail",
  /** Bank-friendly alias — same handler as `success`. */
  returnUrl: "/returnUrl",
  /** Bank-friendly alias — same handler as `fail`. */
  failUrl: "/failUrl",
} as const;

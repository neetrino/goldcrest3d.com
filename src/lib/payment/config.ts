import { isArcaConfigured } from "@/lib/arca/config";

/** True when Arca REST credentials and options are set in the environment. */
export function isPaymentConfigured(): boolean {
  return isArcaConfigured();
}

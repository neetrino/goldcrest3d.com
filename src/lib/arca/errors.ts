/**
 * User-facing messages for Arca/iPay REST `errorCode` values (register.do, etc.).
 */
export function formatArcaApiError(
  errorCode: string | number | undefined,
  errorMessage: string | undefined,
): string {
  const code = errorCode === undefined || errorCode === null ? "" : String(errorCode);
  const gatewayMsg =
    typeof errorMessage === "string" && errorMessage.trim().length > 0
      ? errorMessage.trim()
      : "";

  switch (code) {
    case "5":
      return (
        "Arca rejected the API login (Access denied). " +
        "Use REST API userName/password from your bank (ARCA_API_USERNAME / ARCA_API_PASSWORD) — " +
        "not the epg.arca.am website login unless the bank confirmed they are the same."
      );
    case "1":
      return "This payment reference was already registered. Try Pay again.";
    case "3":
      return "Currency is not allowed for this merchant. Check ARCA_CURRENCY_CODE (USD = 840).";
    case "4":
      return gatewayMsg || "Arca request is missing a required field.";
    default:
      if (gatewayMsg) {
        return code ? `Arca (${code}): ${gatewayMsg}` : gatewayMsg;
      }
      return code ? `Arca payment error (code ${code}).` : "Arca payment error.";
  }
}

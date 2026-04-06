/**
 * Shared styles for admin "Send payment link" (orders list + order detail).
 */
export function getAdminSendPaymentLinkButtonClasses(options: {
  showFadedSentStyle: boolean;
  variant: "compact" | "default";
}): string {
  const { showFadedSentStyle, variant } = options;

  if (showFadedSentStyle) {
    return variant === "compact"
      ? "border border-neutral-200/90 bg-white/40 px-3 py-2 text-xs font-medium text-neutral-600/90 shadow-sm transition-[background-color,color] hover:bg-white/60 hover:text-neutral-700 sm:px-4 sm:text-sm"
      : "border border-neutral-200/90 bg-white/40 px-4 py-2 text-sm font-medium text-neutral-600/90 shadow-sm transition-[background-color,color] hover:bg-white/60 hover:text-neutral-700";
  }

  return variant === "compact"
    ? "bg-[var(--foreground)] px-3 py-2 text-xs font-medium text-[var(--background)] transition-opacity hover:opacity-90 sm:px-4 sm:text-sm"
    : "bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90";
}

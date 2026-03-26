/**
 * R2 բանալու վերջին հատվածը — ադմինի «ընթացիկ ֆայլ» տողերի համար։
 */
export function formatR2ObjectDisplayName(r2ObjectKey: string | null): string | null {
  if (!r2ObjectKey) return null;
  const trimmed = r2ObjectKey.trim();
  if (!trimmed) return null;
  const segment = trimmed.split("/").pop();
  return segment ?? trimmed;
}

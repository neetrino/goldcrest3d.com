import { getR2PublicUrl } from "@/lib/storage";

/**
 * Публичный URL для отображения по ключу объекта R2.
 * Если R2_PUBLIC_URL не задан — null (лендинг должен использовать fallback из констант).
 */
export function resolveSiteMediaDisplayUrl(r2ObjectKey: string): string | null {
  return getR2PublicUrl(r2ObjectKey);
}

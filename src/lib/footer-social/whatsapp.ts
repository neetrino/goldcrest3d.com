const WHATSAPP_MIN_DIGITS = 8;
const WHATSAPP_MAX_DIGITS = 15;

export function normalizeWhatsAppPhoneNumber(value: string): string {
  return value.replace(/\D+/g, "");
}

export function isValidWhatsAppPhoneNumber(value: string): boolean {
  const digits = normalizeWhatsAppPhoneNumber(value);
  return digits.length >= WHATSAPP_MIN_DIGITS && digits.length <= WHATSAPP_MAX_DIGITS;
}

export function toWhatsAppChatLink(phone: string | null): string | null {
  if (!phone || phone.trim().length === 0) {
    return null;
  }
  if (!isValidWhatsAppPhoneNumber(phone)) {
    return null;
  }
  return `https://wa.me/${normalizeWhatsAppPhoneNumber(phone)}`;
}

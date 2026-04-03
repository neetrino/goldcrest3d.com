/** Default lead avatar (public/images/avatar-default.svg). */
export const LEAD_AVATAR_DEFAULT_SRC = "/images/avatar-default.svg";

export function formatListTime(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const d = new Date(date);
  if (d >= today) {
    return d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  if (d >= yesterday) return "Yesterday";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export function getSubject(message: string): string {
  const firstLine = message.split(/\r?\n/)[0]?.trim() ?? "";
  if (firstLine.length > 50) return firstLine.slice(0, 47) + "...";
  return firstLine || "Contact form submission";
}

export function getPreview(message: string, maxLength: number = 80): string {
  const oneLine = message.replace(/\r?\n/g, " ").trim();
  if (oneLine.length <= maxLength) return oneLine;
  return oneLine.slice(0, maxLength) + "...";
}

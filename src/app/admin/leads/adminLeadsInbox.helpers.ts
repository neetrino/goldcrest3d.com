/** Default lead avatar (public/images/avatar-default.svg). */
export const LEAD_AVATAR_DEFAULT_SRC = "/images/avatar-default.svg";

export const ICON_PDF =
  "https://www.figma.com/api/mcp/asset/b01bcc0e-3b49-47f5-abd1-f2f04513a605";
export const ICON_IMAGE =
  "https://www.figma.com/api/mcp/asset/b9057f6d-ed9b-4160-ae47-5899ca81e6eb";

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

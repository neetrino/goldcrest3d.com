/**
 * Lead-reply email: inline logo attachment (CID) + fetch fallback for serverless.
 */

import { readFileSync } from "fs";
import { join } from "path";

import { type Attachment } from "resend";

/** Public path — fallback `img src` if logo bytes cannot be loaded. */
export const LEAD_REPLY_LOGO_PATH = "/images/email-logo-mark.png";

/** Resend inline CID — referenced as `cid:…` in HTML. */
export const LEAD_REPLY_LOGO_CONTENT_ID = "goldcrest-reply-logo";

const LEAD_REPLY_LOGO_FILE = join(
  process.cwd(),
  "public",
  "images",
  "email-logo-mark.png",
);

function leadReplyLogoAttachmentFromBuffer(content: Buffer): Attachment {
  return {
    content,
    filename: "email-logo-mark.png",
    contentType: "image/png",
    contentId: LEAD_REPLY_LOGO_CONTENT_ID,
  };
}

/** Distinct origins to try when fetching logo (server-side). */
function collectLogoFetchBaseUrls(): string[] {
  const seen = new Set<string>();
  const add = (raw: string | undefined) => {
    const u = raw?.trim().replace(/\/$/, "");
    if (!u) return;
    const normalized = u.startsWith("http") ? u : `https://${u}`;
    seen.add(normalized);
  };
  add(process.env.AUTH_URL);
  add(process.env.VERCEL_URL);
  return [...seen];
}

/**
 * Logo bytes for inline CID — avoids remote `img src` (AUTH_URL / CDN issues).
 * Tries disk then fetch from AUTH_URL / VERCEL_URL.
 */
export async function loadLeadReplyLogoAttachment(): Promise<Attachment | null> {
  try {
    return leadReplyLogoAttachmentFromBuffer(readFileSync(LEAD_REPLY_LOGO_FILE));
  } catch {
    /* public/ may be missing from serverless bundle */
  }
  for (const base of collectLogoFetchBaseUrls()) {
    try {
      const res = await fetch(`${base}${LEAD_REPLY_LOGO_PATH}`);
      if (!res.ok) continue;
      return leadReplyLogoAttachmentFromBuffer(
        Buffer.from(await res.arrayBuffer()),
      );
    } catch {
      continue;
    }
  }
  return null;
}

"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendReplyToLead } from "@/lib/email";

export type ReplyToLeadResult = { error?: string; sent?: boolean };

const MAX_BODY_LENGTH = 10_000;

/**
 * Server Action: send reply email to lead (client).
 * Admin only; lead must exist.
 */
export async function replyToLeadAction(
  leadId: string,
  _prev: ReplyToLeadResult,
  formData: FormData,
): Promise<ReplyToLeadResult> {
  const session = await auth();
  if (!session?.user) return { error: "Մուտքը անհրաժեշտ է։" };

  const body = formData.get("body");
  if (typeof body !== "string" || !body.trim()) {
    return { error: "Մուտքագրե՛ք պատասխանի տեքստը։" };
  }
  if (body.length > MAX_BODY_LENGTH) {
    return { error: "Տեքստը չափից երկար է։" };
  }

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
  });
  if (!lead) return { error: "Հայտը չի գտնվել։" };

  const result = await sendReplyToLead({
    to: lead.email,
    body: body.trim(),
  });

  if (!result.success) return { error: result.error };
  return { sent: true };
}

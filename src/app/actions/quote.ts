"use server";

import { R2_PREFIXES } from "@/constants";
import { prisma } from "@/lib/db";
import { sendNewLeadNotificationToAdmin } from "@/lib/email";
import { logger } from "@/lib/logger";
import { uploadToR2 } from "@/lib/storage";
import { validateQuoteAttachment } from "@/lib/validations/quoteAttachment";
import { quoteFormSchema } from "@/lib/validations/quoteForm";

const FORM_FIELD_ATTACHMENT = "attachment";

export type QuoteSubmitResult =
  | { success: true }
  | { success: false; error: string }
  | null;

/**
 * Server Action: validate quote form, upload optional file to R2, create Lead.
 * Signature compatible with useActionState(prevState, formData).
 */
export async function submitQuote(
  _prev: QuoteSubmitResult,
  formData: FormData,
): Promise<QuoteSubmitResult> {
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const message = formData.get("message");
  const file = formData.get(FORM_FIELD_ATTACHMENT);

  const parsed = quoteFormSchema.safeParse({
    fullName: typeof fullName === "string" ? fullName : "",
    email: typeof email === "string" ? email : "",
    message: typeof message === "string" ? message : "",
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.fullName?.[0] ?? first.email?.[0] ?? first.message?.[0] ?? "Invalid data";
    return { success: false, error: msg };
  }

  const fileForUpload = file instanceof File ? file : null;
  const attachmentError = validateQuoteAttachment(fileForUpload);
  if (attachmentError) return { success: false, error: attachmentError };

  const attachmentKeys: string[] = [];
  if (fileForUpload && fileForUpload.size > 0) {
    const key = await uploadToR2(R2_PREFIXES.QUOTES, fileForUpload);
    if (key) attachmentKeys.push(key);
  }

  try {
    await prisma.lead.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        message: parsed.data.message,
        attachmentKeys,
      },
    });
  } catch (err) {
    logger.error("submitQuote: lead create failed", err);
    return { success: false, error: "Request could not be saved. Please try again later." };
  }

  await sendNewLeadNotificationToAdmin({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    message: parsed.data.message,
    attachmentCount: attachmentKeys.length,
  });

  return { success: true };
}

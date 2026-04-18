"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { extractCanvasRichTextHtml } from "@/lib/canvas-rich-text/canvas-rich-text-form";
import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";
import { FOUNDER_SECTION_ID } from "@/lib/founder-section/founder-section-id";
import { founderSectionCopyFormSchema } from "@/lib/validations/founderSectionCopy";

export type FounderSectionCopyActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateFounderSection(): void {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<FounderSectionCopyActionResult | null> {
  const session = await requireAdminSession();
  if (!session) {
    return { ok: false, error: "Unauthorized." };
  }
  return null;
}

/**
 * Server action — compatible with `useActionState` (prevState, formData).
 */
export async function updateFounderSectionCopy(
  _prev: FounderSectionCopyActionResult | null,
  formData: FormData,
): Promise<FounderSectionCopyActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = founderSectionCopyFormSchema.safeParse({
    name: formData.get("name"),
    body: extractCanvasRichTextHtml({
      html: String(formData.get("body") ?? ""),
      docJson: (formData.get("bodyDoc") as string | null) ?? "",
    }),
    bodyDoc: formData.get("bodyDoc"),
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg = first.name?.[0] ?? first.body?.[0] ?? first.bodyDoc?.[0] ?? "Invalid input.";
    return { ok: false, error: msg };
  }

  const { name, body } = parsed.data;
  const bodyStored = finalizeHeroBannerBodyHtml(body);

  try {
    await prisma.founderSectionCopy.upsert({
      where: { id: FOUNDER_SECTION_ID },
      create: {
        id: FOUNDER_SECTION_ID,
        name,
        body: bodyStored,
      },
      update: { name, body: bodyStored },
    });
  } catch (err) {
    logger.error("updateFounderSectionCopy: failed to upsert", err);
    return {
      ok: false,
      error: "Could not save. Try again or check the database connection.",
    };
  }

  revalidateFounderSection();
  return { ok: true };
}

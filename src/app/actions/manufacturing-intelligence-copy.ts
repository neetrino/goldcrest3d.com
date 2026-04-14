"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";
import { MANUFACTURING_INTELLIGENCE_COPY_ID } from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-copy-id";
import { manufacturingIntelligenceCopyFormSchema } from "@/lib/validations/manufacturingIntelligenceCopy";

export type ManufacturingIntelligenceCopyActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateManufacturingCopy(): void {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<ManufacturingIntelligenceCopyActionResult | null> {
  const session = await requireAdminSession();
  if (!session) {
    return { ok: false, error: "Unauthorized." };
  }
  return null;
}

/**
 * Server action — compatible with `useActionState` (prevState, formData).
 */
export async function updateManufacturingIntelligenceCopy(
  _prev: ManufacturingIntelligenceCopyActionResult | null,
  formData: FormData,
): Promise<ManufacturingIntelligenceCopyActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = manufacturingIntelligenceCopyFormSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.title?.[0] ?? first.body?.[0] ?? "Invalid input.";
    return { ok: false, error: msg };
  }

  const { title, body } = parsed.data;
  const bodyStored = finalizeHeroBannerBodyHtml(body);

  try {
    await prisma.manufacturingIntelligenceCopy.upsert({
      where: { id: MANUFACTURING_INTELLIGENCE_COPY_ID },
      create: {
        id: MANUFACTURING_INTELLIGENCE_COPY_ID,
        title,
        body: bodyStored,
      },
      update: { title, body: bodyStored },
    });
  } catch (err) {
    logger.error("updateManufacturingIntelligenceCopy: failed to upsert", err);
    return {
      ok: false,
      error: "Could not save. Try again or check the database connection.",
    };
  }

  revalidateManufacturingCopy();
  return { ok: true };
}

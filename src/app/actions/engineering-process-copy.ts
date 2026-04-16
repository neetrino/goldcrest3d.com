"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { ENGINEERING_PROCESS_COPY_ID } from "@/lib/engineering-process-copy/engineering-process-copy-id";
import { logger } from "@/lib/logger";
import { engineeringProcessCopyFormSchema } from "@/lib/validations/engineeringProcessCopy";

export type EngineeringProcessCopyActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateEngineeringProcessCopy(): void {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<EngineeringProcessCopyActionResult | null> {
  const session = await requireAdminSession();
  if (!session) {
    return { ok: false, error: "Unauthorized." };
  }
  return null;
}

/**
 * Server action — compatible with `useActionState` (prevState, formData).
 */
export async function updateEngineeringProcessCopy(
  _prev: EngineeringProcessCopyActionResult | null,
  formData: FormData,
): Promise<EngineeringProcessCopyActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = engineeringProcessCopyFormSchema.safeParse({
    sectionTitle: formData.get("sectionTitle"),
    step1Title: formData.get("step1Title"),
    step1Subtitle: formData.get("step1Subtitle"),
    step1Description: formData.get("step1Description"),
    step2Title: formData.get("step2Title"),
    step2Subtitle: formData.get("step2Subtitle"),
    step2Description: formData.get("step2Description"),
    step3Title: formData.get("step3Title"),
    step3Subtitle: formData.get("step3Subtitle"),
    step3Description: formData.get("step3Description"),
    step4Title: formData.get("step4Title"),
    step4Subtitle: formData.get("step4Subtitle"),
    step4Description: formData.get("step4Description"),
    step5Title: formData.get("step5Title"),
    step5Subtitle: formData.get("step5Subtitle"),
    step5Description: formData.get("step5Description"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const msg =
      fieldErrors.sectionTitle?.[0] ??
      fieldErrors.step1Title?.[0] ??
      fieldErrors.step1Subtitle?.[0] ??
      fieldErrors.step1Description?.[0] ??
      fieldErrors.step2Title?.[0] ??
      fieldErrors.step2Subtitle?.[0] ??
      fieldErrors.step2Description?.[0] ??
      fieldErrors.step3Title?.[0] ??
      fieldErrors.step3Subtitle?.[0] ??
      fieldErrors.step3Description?.[0] ??
      fieldErrors.step4Title?.[0] ??
      fieldErrors.step4Subtitle?.[0] ??
      fieldErrors.step4Description?.[0] ??
      fieldErrors.step5Title?.[0] ??
      fieldErrors.step5Subtitle?.[0] ??
      fieldErrors.step5Description?.[0] ??
      "Invalid input.";
    return { ok: false, error: msg };
  }

  try {
    await prisma.engineeringProcessCopy.upsert({
      where: { id: ENGINEERING_PROCESS_COPY_ID },
      create: {
        id: ENGINEERING_PROCESS_COPY_ID,
        ...parsed.data,
      },
      update: parsed.data,
    });
  } catch (err) {
    logger.error("updateEngineeringProcessCopy: failed to upsert", err);
    return {
      ok: false,
      error: "Could not save. Try again or check the database connection.",
    };
  }

  revalidateEngineeringProcessCopy();
  return { ok: true };
}


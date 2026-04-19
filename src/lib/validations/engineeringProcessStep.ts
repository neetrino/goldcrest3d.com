import { z } from "zod";
import { ENGINEERING_PROCESS_STEP_KEYS } from "@/lib/engineering-process/engineering-process.types";

const MAX_TITLE_LEN = 280;
const MAX_DESCRIPTION_LEN = 4000;

const ENGINEERING_PROCESS_STEP_KEY_SET = new Set<string>(
  Object.values(ENGINEERING_PROCESS_STEP_KEYS),
);

export const engineeringProcessStepFormSchema = z.object({
  stepKey: z
    .string()
    .refine((value) => ENGINEERING_PROCESS_STEP_KEY_SET.has(value), "Invalid process step."),
  title: z.string().max(MAX_TITLE_LEN, `Title max ${MAX_TITLE_LEN} chars`),
  description: z
    .string()
    .max(MAX_DESCRIPTION_LEN, `Description max ${MAX_DESCRIPTION_LEN} chars`),
});

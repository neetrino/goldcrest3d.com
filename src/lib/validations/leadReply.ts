import { z } from "zod";

const MAX_BODY_LENGTH = 10_000;

export const leadReplySchema = z.object({
  body: z
    .string()
    .min(1, "Please enter the reply text.")
    .max(MAX_BODY_LENGTH, "Text is too long."),
});

export type LeadReplyData = z.infer<typeof leadReplySchema>;

import { z } from "zod";

const MAX_SECTION_TITLE_LEN = 280;
const MAX_STEP_TITLE_LEN = 280;
const MAX_STEP_SUBTITLE_LEN = 280;
const MAX_STEP_DESCRIPTION_LEN = 4000;

const optionalTrimmed = (max: number, label: string) =>
  z.preprocess(
    (value) => {
      if (value === null || value === undefined) return "";
      return value;
    },
    z
      .string()
      .max(max, `${label} must be at most ${max} characters`)
      .transform((s) => s.trim()),
  );

export const engineeringProcessCopyFormSchema = z.object({
  sectionTitle: optionalTrimmed(MAX_SECTION_TITLE_LEN, "Section title"),
  step1Title: optionalTrimmed(MAX_STEP_TITLE_LEN, "Step 1 title"),
  step1Subtitle: optionalTrimmed(MAX_STEP_SUBTITLE_LEN, "Step 1 subtitle"),
  step1Description: optionalTrimmed(MAX_STEP_DESCRIPTION_LEN, "Step 1 description"),
  step2Title: optionalTrimmed(MAX_STEP_TITLE_LEN, "Step 2 title"),
  step2Subtitle: optionalTrimmed(MAX_STEP_SUBTITLE_LEN, "Step 2 subtitle"),
  step2Description: optionalTrimmed(MAX_STEP_DESCRIPTION_LEN, "Step 2 description"),
  step3Title: optionalTrimmed(MAX_STEP_TITLE_LEN, "Step 3 title"),
  step3Subtitle: optionalTrimmed(MAX_STEP_SUBTITLE_LEN, "Step 3 subtitle"),
  step3Description: optionalTrimmed(MAX_STEP_DESCRIPTION_LEN, "Step 3 description"),
  step4Title: optionalTrimmed(MAX_STEP_TITLE_LEN, "Step 4 title"),
  step4Subtitle: optionalTrimmed(MAX_STEP_SUBTITLE_LEN, "Step 4 subtitle"),
  step4Description: optionalTrimmed(MAX_STEP_DESCRIPTION_LEN, "Step 4 description"),
  step5Title: optionalTrimmed(MAX_STEP_TITLE_LEN, "Step 5 title"),
  step5Subtitle: optionalTrimmed(MAX_STEP_SUBTITLE_LEN, "Step 5 subtitle"),
  step5Description: optionalTrimmed(MAX_STEP_DESCRIPTION_LEN, "Step 5 description"),
});


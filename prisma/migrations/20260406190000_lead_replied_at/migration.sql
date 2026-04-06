-- One admin reply per lead: set when the first successful reply email is sent.
ALTER TABLE "Lead" ADD COLUMN "repliedAt" TIMESTAMP(3);

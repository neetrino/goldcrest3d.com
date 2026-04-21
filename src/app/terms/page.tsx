import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import {
  TERMS_OF_SERVICE_INTRO,
  TERMS_OF_SERVICE_LAST_UPDATED,
  TERMS_OF_SERVICE_SECTIONS,
} from "@/lib/legal/terms-of-service.content";

export const metadata: Metadata = {
  title: "Terms of Service | Goldcrest 3D",
  description: "Terms of Service for Goldcrest 3D services and website.",
};

export default function TermsOfServicePage() {
  return (
    <LegalDocumentPage
      title="Terms of Service"
      lastUpdated={TERMS_OF_SERVICE_LAST_UPDATED}
      intro={TERMS_OF_SERVICE_INTRO}
      sections={TERMS_OF_SERVICE_SECTIONS}
    />
  );
}

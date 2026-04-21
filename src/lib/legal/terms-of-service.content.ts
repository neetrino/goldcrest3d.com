import type { LegalDocumentContent } from "@/lib/legal/legal-content.types";

export const termsOfServiceContent: LegalDocumentContent = {
  title: "Terms of Service",
  lastUpdated: "April 21, 2026",
  introduction: [
    "These Terms of Service (\"Terms\") govern your use of www.goldcrest3d.com and all services provided by Goldcrest 3D (\"we\", \"us\", \"our\").",
    "Please read these Terms carefully before starting a project. By placing an order or using our services, you agree to these Terms.",
  ],
  sections: [
    {
      title: "1. Order Process",
      paragraphs: [
        "Our standard order process is structured for clarity and predictable delivery.",
      ],
      bullets: [
        "You send a photo, sketch, or draft and project details for quotation.",
        "We review the materials, provide a quote, and create your account for collaboration.",
        "After mutual confirmation, you pay a 40% prepayment and we start the project.",
        "When the model is ready, preview screenshots are shared in your account.",
        "After final payment, we deliver the complete package to your account order section, including .3dm, .stl, and supporting information files.",
      ],
    },
    {
      title: "2. Refund Policy",
      paragraphs: [
        "A refund of the prepayment may be considered if you provide a clear and reasonable explanation that delivered work does not correspond to requirements confirmed at the initial order stage.",
      ],
    },
    {
      title: "3. Changes and Modifications",
      paragraphs: [
        "Minor revisions are generally provided at no additional charge.",
        "Major revisions or new requests after model completion are billed separately. Any additional pricing is discussed and approved by you before extra work begins.",
      ],
    },
    {
      title: "4. Payment and Transaction Security",
      paragraphs: [
        "Payments are processed through secure methods, including 3-D Secure technology (such as Verified by Visa and MasterCard SecureCode), to reduce unauthorized card use.",
        "We also follow PCI DSS-aligned practices intended to reduce cardholder fraud and identity theft risk.",
      ],
    },
    {
      title: "5. Confidentiality and Exclusiveness",
      paragraphs: [
        "For projects involving custom sketches or exclusive concepts, we can enter into a mutual Non-Disclosure Agreement (NDA).",
        "We do not resell custom models or reuse client-provided sketches and ideas outside the agreed project scope.",
      ],
    },
    {
      title: "6. Quality Control",
      paragraphs: [
        "Before delivery, model files pass quality control checks using specialized software.",
        "We are familiar with common 3D printing and manufacturing requirements and prepare files for production-ready use.",
      ],
    },
    {
      title: "7. Third-Party Websites",
      paragraphs: [
        "Our service may include links to third-party websites or services. We do not control and are not responsible for third-party content, privacy policies, or practices.",
        "Use of third-party resources is at your own discretion, and we recommend reviewing their terms and policies.",
      ],
    },
    {
      title: "8. Changes to Terms",
      paragraphs: [
        "We may modify or replace these Terms at our discretion. For material changes, we aim to provide at least 30 days notice before updated Terms take effect.",
        "Continued use of our services after updated Terms become effective means you accept the revised Terms.",
      ],
    },
  ],
  contactEmail: "info@goldcrest3d.com",
};

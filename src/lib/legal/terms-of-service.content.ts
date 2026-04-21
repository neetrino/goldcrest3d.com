import type { LegalSection } from "@/lib/legal/legal-content.types";

export const TERMS_OF_SERVICE_LAST_UPDATED = "April 21, 2026";

export const TERMS_OF_SERVICE_INTRO = [
  "These Terms of Service (\"Terms\") govern your use of www.goldcrest3d.com and any related services provided by Goldcrest 3D (\"we\", \"us\", or \"our\").",
  "By requesting a quote, placing an order, or using our services, you agree to these Terms.",
];

export const TERMS_OF_SERVICE_SECTIONS: LegalSection[] = [
  {
    title: "Service Scope",
    paragraphs: [
      "We provide 3D jewelry CAD and related modeling services based on materials and instructions supplied by the customer.",
      "The customer is responsible for the accuracy, completeness, and legality of submitted references, sketches, and instructions.",
    ],
  },
  {
    title: "Order Process",
    paragraphs: [
      "Our standard workflow is as follows:",
    ],
    bullets: [
      "You submit a photo, sketch, or draft with project details for quotation.",
      "We review your materials, provide a quote, and create your account for project communication.",
      "After mutual confirmation, a 40% prepayment is required to start work.",
      "We share preview screenshots in your account when the model is ready.",
      "After final payment, we deliver the completed package through your account.",
      "Typical deliverables include .3dm, .stl, and a detailed information file.",
    ],
  },
  {
    title: "Changes and Modifications",
    paragraphs: [
      "Minor edits are usually included at no additional charge.",
      "Major revisions, scope changes, or additional requests after model completion may require extra payment. Any additional cost is communicated and confirmed before work continues.",
    ],
  },
  {
    title: "Pricing and Payment",
    paragraphs: [
      "Payments are processed using secure methods and fraud-prevention protocols, including 3-D Secure mechanisms where available.",
      "We apply payment security controls consistent with PCI DSS principles through our payment flow and providers.",
    ],
  },
  {
    title: "Refund Policy",
    paragraphs: [
      "If the delivered work materially does not match the confirmed requirements agreed at the initial project stage, you may request a refund with a clear written explanation.",
      "Refund decisions are made after review of project scope, approved requirements, and delivered result.",
    ],
  },
  {
    title: "Intellectual Property and Confidentiality",
    paragraphs: [
      "Customer-provided sketches, concepts, and proprietary ideas remain confidential.",
      "When needed, we can sign a mutual non-disclosure agreement (NDA).",
      "We do not resell custom models or reuse exclusive client concepts without explicit written permission.",
    ],
  },
  {
    title: "Quality Control",
    paragraphs: [
      "Before delivery, files pass through quality checks using specialized software and practical production validation standards.",
      "We design outputs with manufacturing readiness in mind for common 3D printing and production workflows.",
    ],
  },
  {
    title: "Third-Party Websites",
    paragraphs: [
      "Our service may contain links to third-party websites or services not controlled by us.",
      "We are not responsible for third-party content, availability, or privacy practices, and your use of those services is at your own risk.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages arising from use of our services.",
      "Our total liability for any claim related to a specific order is limited to the amount paid by the customer for that order.",
    ],
  },
  {
    title: "Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time. Material updates become effective no earlier than 30 days after publication unless immediate changes are required by law or security reasons.",
      "Continued use of our services after revised Terms take effect means you accept the updated Terms.",
    ],
  },
  {
    title: "Governing Law",
    paragraphs: [
      "These Terms are governed by applicable laws of the jurisdiction where Goldcrest 3D operates, unless mandatory law provides otherwise.",
    ],
  },
  {
    title: "Contact",
    paragraphs: ["For questions about these Terms, contact info@goldcrest3d.com."],
  },
];

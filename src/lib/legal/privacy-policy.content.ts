import type { LegalSection } from "@/lib/legal/legal-content.types";

export const PRIVACY_POLICY_LAST_UPDATED = "April 21, 2026";

export const PRIVACY_POLICY_INTRO = [
  "This Privacy Policy explains how Goldcrest 3D (\"we\", \"us\", or \"our\") collects, uses, stores, and protects personal information when you use www.goldcrest3d.com and related services.",
  "By using our website or submitting information to request a quote, place an order, or contact us, you agree to the practices described in this policy.",
];

export const PRIVACY_POLICY_SECTIONS: LegalSection[] = [
  {
    title: "Information We Collect",
    paragraphs: [
      "We collect personal information that you provide directly to us, including when you contact us, request a quote, or place an order.",
    ],
    bullets: [
      "Full name",
      "Email address",
      "Phone number",
      "Project details, sketches, and attachments",
      "Order and transaction-related details",
    ],
  },
  {
    title: "When We Collect Information",
    paragraphs: [
      "We collect information when you submit forms on our website, communicate with us by email, request a quote, place an order, or provide updates related to your project.",
    ],
  },
  {
    title: "How We Use Information",
    paragraphs: [
      "We use collected information only for legitimate business purposes related to our services.",
    ],
    bullets: [
      "To provide quotations and process orders",
      "To communicate during project execution",
      "To personalize your experience and service delivery",
      "To process payments and maintain order records",
      "To improve our website and customer support",
      "To send service-related updates and important notices",
    ],
  },
  {
    title: "Cookies and Tracking",
    paragraphs: [
      "We do not use cookies for behavioral ad tracking. Your browser may still store technical cookies required for core website functionality and security.",
      "You can control cookies through your browser settings. Disabling cookies may affect certain website features.",
    ],
  },
  {
    title: "Sharing of Information",
    paragraphs: [
      "We do not sell, rent, or trade your personal information.",
      "We may share limited information with trusted service providers only when required to operate our services, such as secure payment processing or hosting, and only under confidentiality and security obligations.",
    ],
  },
  {
    title: "Third-Party Links",
    paragraphs: [
      "Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or policies of those external sites.",
    ],
  },
  {
    title: "Data Security",
    paragraphs: [
      "We use commercially reasonable administrative, technical, and organizational safeguards to protect personal information from unauthorized access, disclosure, alteration, or destruction.",
      "Payment card processing is handled through secure, industry-standard methods, including 3-D Secure and PCI DSS aligned controls where applicable.",
    ],
  },
  {
    title: "Data Breach Response",
    paragraphs: [
      "If we become aware of a personal data breach that may affect your rights or security, we will investigate promptly and notify affected users as required by applicable law.",
    ],
  },
  {
    title: "Your Rights and Choices",
    paragraphs: [
      "Depending on your location and applicable law, you may have rights to access, correct, update, or request deletion of your personal information.",
      "You may also opt out of marketing emails at any time by contacting us.",
    ],
  },
  {
    title: "Children's Privacy",
    paragraphs: [
      "Our services are not directed to children under 13, and we do not knowingly collect personal information from children.",
    ],
  },
  {
    title: "Policy Changes",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Any material changes will be posted on this page with a revised \"Last updated\" date.",
    ],
  },
  {
    title: "Contact",
    paragraphs: ["For privacy-related questions, contact us at info@goldcrest3d.com."],
  },
];

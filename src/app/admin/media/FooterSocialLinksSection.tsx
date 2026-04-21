"use client";

import { updateFooterSocialLinks, type SiteMediaActionResult } from "@/app/actions/site-media";
import type { FooterSocialLinks } from "@/lib/footer-social/footer-social.keys";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, type FormEvent } from "react";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { ModelingSlotFormMessages } from "./ModelingSlotFormMessages";

type FooterSocialLinksSectionProps = {
  links: FooterSocialLinks;
};

const ALLOWED_PHONE_INPUT_CHARACTERS = /^[\d\s()+-]*$/;
const INVALID_PHONE_CHARACTERS_REGEX = /[^\d\s()+-]+/g;
const WHATSAPP_PHONE_ALLOWED_CHARS_MESSAGE =
  "Only digits, spaces, plus (+), parentheses (), and hyphen (-) are allowed.";

function sanitizeWhatsAppPhoneInput(value: string): string {
  return value.replace(INVALID_PHONE_CHARACTERS_REGEX, "");
}

export function FooterSocialLinksSection({ links }: FooterSocialLinksSectionProps) {
  const router = useRouter();
  const [saveState, saveAction] = useActionState<SiteMediaActionResult | null, FormData>(
    updateFooterSocialLinks,
    null,
  );
  const [whatsappPhoneInputError, setWhatsappPhoneInputError] = useState<string | null>(null);

  useEffect(() => {
    if (saveState?.ok) {
      router.refresh();
    }
  }, [router, saveState?.ok]);

  const handleWhatsAppPhoneInput = (event: FormEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget;
    const nextValue = inputElement.value;
    const sanitizedValue = sanitizeWhatsAppPhoneInput(nextValue);

    if (sanitizedValue !== nextValue) {
      inputElement.value = sanitizedValue;
      setWhatsappPhoneInputError(WHATSAPP_PHONE_ALLOWED_CHARS_MESSAGE);
      return;
    }

    if (ALLOWED_PHONE_INPUT_CHARACTERS.test(nextValue)) {
      setWhatsappPhoneInputError(null);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-sm sm:p-8">
      <div className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          Footer follow links
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
          Footer Social Links
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Manage destination URLs for Footer &quot;Follow&quot; icons. Leave a field empty to hide
          that icon on the public site.
        </p>
      </div>

      <form action={saveAction} className="mt-6 space-y-4 rounded-xl border border-slate-200/90 bg-white p-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Instagram URL</span>
          <input
            type="url"
            name="instagram"
            placeholder="https://www.instagram.com/your-handle/"
            defaultValue={links.instagram ?? ""}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Behance URL</span>
          <input
            type="url"
            name="behance"
            placeholder="https://www.behance.net/your-profile"
            defaultValue={links.behance ?? ""}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">LinkedIn URL</span>
          <input
            type="url"
            name="linkedin"
            placeholder="https://www.linkedin.com/company/your-company/"
            defaultValue={links.linkedin ?? ""}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">YouTube URL</span>
          <input
            type="url"
            name="youtube"
            placeholder="https://www.youtube.com/@your-channel"
            defaultValue={links.youtube ?? ""}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">WhatsApp Phone</span>
          <input
            type="tel"
            name="whatsappPhone"
            placeholder="+374 (00) 000 - 000"
            defaultValue={links.whatsappPhone ?? ""}
            onInput={handleWhatsAppPhoneInput}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
          />
          {whatsappPhoneInputError ? (
            <span className="text-xs text-red-600">{whatsappPhoneInputError}</span>
          ) : null}
          <span className="text-xs text-slate-500">
            Used for Footer Direct Line / WhatsApp link.
          </span>
        </label>

        <ModelingSlotFormMessages state={saveState} />
        <MediaFormSubmitButton pendingLabel="Saving…">Save social links</MediaFormSubmitButton>
      </form>
    </section>
  );
}

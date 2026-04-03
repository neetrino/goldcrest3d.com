"use client";

import { useActionState, useRef, type KeyboardEvent } from "react";
import { replyToLeadAction, type ReplyToLeadResult } from "@/app/actions/lead";

type LeadReplyFormProps = {
  leadId: string;
  leadEmail: string;
  /** "card" = standalone card (e.g. detail page), "inbox" = Figma reply bar style */
  variant?: "card" | "inbox";
};

export function LeadReplyForm({
  leadId,
  leadEmail,
  variant = "card",
}: LeadReplyFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const initialState: ReplyToLeadResult = {};
  const [state, formAction] = useActionState<
    ReplyToLeadResult,
    FormData
  >(
    (prev, formData) => replyToLeadAction(leadId, prev, formData),
    initialState,
  );

  const handleReplyKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }
    event.preventDefault();
    formRef.current?.requestSubmit();
  };

  if (variant === "inbox") {
    return (
      <div className="border border-slate-200 bg-white">
        <form ref={formRef} action={formAction}>
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <span className="min-w-0 break-all text-[12px] font-bold text-slate-400">
              Reply to: {leadEmail}
            </span>
          </div>
          <div className="p-4">
            <textarea
              id="reply-body-inbox"
              name="body"
              rows={5}
              required
              onKeyDown={handleReplyKeyDown}
              className="w-full resize-none rounded border-0 bg-transparent px-0 py-2 text-[14px] text-[var(--foreground)] placeholder:text-gray-500 focus:outline-none"
              placeholder="Write your response here..."
            />
            {state?.error && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {state.error}
              </p>
            )}
            {state?.sent && (
              <p className="mt-2 text-sm text-green-600" role="status">
                Email sent.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
            <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
              Automatic signature enabled
            </span>
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end lg:w-auto">
              <button
                type="reset"
                className="min-h-[44px] rounded-lg px-4 py-2 text-[14px] font-semibold text-slate-600 hover:bg-slate-100 lg:min-h-0"
              >
                Discard
              </button>
              <button
                type="submit"
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[var(--foreground)] px-6 py-2 text-[14px] font-bold text-white hover:opacity-90 lg:min-h-0"
              >
                Send Reply
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">
        Reply to the requester
      </h2>
      <p className="mt-1 text-sm text-neutral-500">
        Email will be sent to <strong className="text-neutral-700">{leadEmail}</strong>.
      </p>
      <form
        ref={formRef}
        action={formAction}
        className="mt-5 space-y-4"
      >
        <div>
          <label
            htmlFor="reply-body"
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            Reply text
          </label>
          <textarea
            id="reply-body"
            name="body"
            rows={5}
            required
            onKeyDown={handleReplyKeyDown}
            className="mt-1.5 w-full rounded-md border border-neutral-300 bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400/30"
            placeholder="Write your reply..."
          />
        </div>
        {state?.error && (
          <p className="text-sm text-red-600" role="alert">
            {state.error}
          </p>
        )}
        {state?.sent && (
          <p className="text-sm text-green-600" role="status">
            Email sent.
          </p>
        )}
        <button
          type="submit"
          className="rounded-md bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90"
        >
          Send
        </button>
      </form>
    </div>
  );
}

"use client";

import { useActionState } from "react";
import { replyToLeadAction, type ReplyToLeadResult } from "@/app/actions/lead";

type LeadReplyFormProps = {
  leadId: string;
  leadEmail: string;
};

export function LeadReplyForm({ leadId, leadEmail }: LeadReplyFormProps) {
  const initialState: ReplyToLeadResult = {};
  const [state, formAction] = useActionState<
    ReplyToLeadResult,
    FormData
  >(
    (prev, formData) => replyToLeadAction(leadId, prev, formData),
    initialState,
  );

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">
        Reply to the requester
      </h2>
      <p className="mt-1 text-sm text-neutral-500">
        Email will be sent to <strong className="text-neutral-700">{leadEmail}</strong>.
      </p>
      <form action={formAction} className="mt-5 space-y-4">
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

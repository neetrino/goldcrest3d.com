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
    <div className="border border-neutral-200 rounded-md p-4 space-y-3">
      <h2 className="text-lg font-medium">Պատասխանել հայտի հեղինակին</h2>
      <p className="text-sm text-neutral-600">
        Էլ. փոստը կուղարկվի <strong>{leadEmail}</strong> հասցեին։
      </p>
      <form action={formAction} className="space-y-3">
        <div>
          <label
            htmlFor="reply-body"
            className="block text-sm font-medium text-[var(--foreground)] mb-1"
          >
            Պատասխանի տեքստ
          </label>
          <textarea
            id="reply-body"
            name="body"
            rows={5}
            required
            className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-neutral-500"
            placeholder="Գրեք Ձեր պատասխանը..."
          />
        </div>
        {state?.error && (
          <p className="text-sm text-red-600" role="alert">
            {state.error}
          </p>
        )}
        {state?.sent && (
          <p className="text-sm text-green-600">Էլ. փոստը ուղարկվել է։</p>
        )}
        <button
          type="submit"
          className="py-2 px-4 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500"
        >
          Ուղարկել
        </button>
      </form>
    </div>
  );
}

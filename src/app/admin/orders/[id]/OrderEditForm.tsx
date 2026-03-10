"use client";

import { useActionState } from "react";
import { updateOrder, FORM_FIELD_PRODUCT_IMAGE } from "@/app/actions/order";
import type { UpdateOrderResult } from "@/app/actions/order";
import type { Order } from "@prisma/client";

const initialState: UpdateOrderResult = null;

const inputClass =
  "w-full rounded border border-[var(--foreground)]/20 bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--foreground)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]/30 disabled:opacity-60";

type Props = { order: Order };

export function OrderEditForm({ order }: Props) {
  const [state, formAction, isPending] = useActionState<
    UpdateOrderResult,
    FormData
  >((prev, formData) => updateOrder(order.id, prev, formData), initialState);

  return (
    <form
      action={formAction}
      className="max-w-xl space-y-4"
      aria-describedby={state?.error ? "order-edit-error" : undefined}
    >
      <div>
        <label
          htmlFor="order-edit-clientName"
          className="mb-1 block text-sm font-medium text-[var(--foreground)]/80"
        >
          Հաճախորդի անուն
        </label>
        <input
          id="order-edit-clientName"
          name="clientName"
          type="text"
          required
          maxLength={120}
          defaultValue={order.clientName}
          disabled={isPending}
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor="order-edit-clientEmail"
          className="mb-1 block text-sm font-medium text-[var(--foreground)]/80"
        >
          Հաճախորդի email
        </label>
        <input
          id="order-edit-clientEmail"
          name="clientEmail"
          type="email"
          required
          defaultValue={order.clientEmail}
          disabled={isPending}
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor="order-edit-productTitle"
          className="mb-1 block text-sm font-medium text-[var(--foreground)]/80"
        >
          Ապրանքի անվանում
        </label>
        <input
          id="order-edit-productTitle"
          name="productTitle"
          type="text"
          required
          maxLength={200}
          defaultValue={order.productTitle}
          disabled={isPending}
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor="order-edit-productImage"
          className="mb-1 block text-sm font-medium text-[var(--foreground)]/80"
        >
          Ապրանքի նկար (փոխել — նոր ֆայլ ընտրել)
        </label>
        <input
          id="order-edit-productImage"
          name={FORM_FIELD_PRODUCT_IMAGE}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={isPending}
          className="w-full text-sm text-[var(--foreground)]/80 file:mr-2 file:rounded file:border file:border-[var(--foreground)]/20 file:bg-[var(--foreground)]/5 file:px-3 file:py-1.5 file:text-sm file:text-[var(--foreground)]"
        />
        {order.productImageKey && (
          <p className="mt-1 text-xs text-neutral-500">
            Ընթացիկ: {order.productImageKey.split("/").pop()}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="order-edit-priceCents"
          className="mb-1 block text-sm font-medium text-[var(--foreground)]/80"
        >
          Գին (դրամ)
        </label>
        <input
          id="order-edit-priceCents"
          name="priceCents"
          type="number"
          required
          min={0}
          step={1}
          defaultValue={order.priceCents}
          disabled={isPending}
          className={inputClass}
        />
      </div>
      <div>
        <span className="mb-1 block text-sm font-medium text-[var(--foreground)]/80">
          Վճարման տեսակ
        </span>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentType"
              value="FULL"
              defaultChecked={order.paymentType === "FULL"}
              disabled={isPending}
              className="rounded border-[var(--foreground)]/30"
            />
            <span className="text-sm">FULL</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentType"
              value="SPLIT"
              defaultChecked={order.paymentType === "SPLIT"}
              disabled={isPending}
              className="rounded border-[var(--foreground)]/30"
            />
            <span className="text-sm">SPLIT (50–50)</span>
          </label>
        </div>
      </div>
      {state?.error && (
        <p
          id="order-edit-error"
          className="text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {state.error}
        </p>
      )}
      {state?.updated && (
        <p className="text-sm text-green-600 dark:text-green-400" role="status">
          Պատվերը թարմացվել է։
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? "Թարմացվում է…" : "Թարմացնել"}
      </button>
    </form>
  );
}

"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateOrder } from "@/app/actions/order";
import type { UpdateOrderResult } from "@/app/actions/order";
import { FORM_FIELD_PRODUCT_IMAGE } from "@/constants/order-form";
import { ORDER_PAYMENT_LINK_MODE } from "@/constants/order-payment-link-mode";
import type { Order } from "@/generated/prisma/client";

const initialState: UpdateOrderResult = null;

const inputClass =
  "mt-1.5 w-full rounded-md border border-neutral-300 bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400/30 disabled:opacity-60";

type OrderEditFormProps = {
  order: Order;
  paymentLinkMode: "FULL_ONLY" | "SPLIT_ENABLED";
  onPaymentLinkModeChange: (mode: "FULL_ONLY" | "SPLIT_ENABLED") => void;
};

export function OrderEditForm({
  order,
  paymentLinkMode,
  onPaymentLinkModeChange,
}: OrderEditFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    UpdateOrderResult,
    FormData
  >((prev, formData) => updateOrder(order.id, prev, formData), initialState);

  useEffect(() => {
    if (!state?.updated) return;
    router.refresh();
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="space-y-5"
      aria-describedby={state?.error ? "order-edit-error" : undefined}
    >
      <div>
        <label
          htmlFor="order-edit-clientName"
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Client name
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
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Client email
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
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Product title
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
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Product image (change — select new file)
        </label>
        <input
          id="order-edit-productImage"
          name={FORM_FIELD_PRODUCT_IMAGE}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={isPending}
          className="mt-1.5 w-full text-sm text-neutral-600 file:mr-3 file:rounded-md file:border file:border-neutral-300 file:bg-neutral-50 file:px-3 file:py-2 file:text-sm file:text-[var(--foreground)] file:transition-colors hover:file:bg-neutral-100"
        />
        {order.productImageKey && (
          <p className="mt-1 text-xs text-neutral-500">
            Current: {order.productImageKey.split("/").pop()}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="order-edit-priceCents"
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Price (AMD)
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
      <fieldset>
        <legend className="block text-sm font-medium text-[var(--foreground)]">
          Payment link mode
        </legend>
        <p className="mt-1 text-xs text-neutral-500">
          Choose what payment option(s) the client will see when opening the
          payment link.
        </p>
        <div className="mt-2 flex flex-col gap-3">
          <label className="flex cursor-pointer items-start gap-2">
            <input
              type="radio"
              name="paymentLinkMode"
              value={ORDER_PAYMENT_LINK_MODE.FULL_ONLY}
              checked={paymentLinkMode === ORDER_PAYMENT_LINK_MODE.FULL_ONLY}
              onChange={() => onPaymentLinkModeChange(ORDER_PAYMENT_LINK_MODE.FULL_ONLY)}
              disabled={isPending}
              className="mt-0.5 rounded border-[var(--foreground)]/30"
            />
            <span className="text-sm">
              <span className="font-medium text-neutral-900">Full-only</span>
              <span className="block text-neutral-600">
                Client sees only Pay in Full.
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-2">
            <input
              type="radio"
              name="paymentLinkMode"
              value={ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED}
              checked={paymentLinkMode === ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED}
              onChange={() =>
                onPaymentLinkModeChange(ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED)
              }
              disabled={isPending}
              className="mt-0.5 rounded border-[var(--foreground)]/30"
            />
            <span className="text-sm">
              <span className="font-medium text-neutral-900">Enable 50/50</span>
              <span className="block text-neutral-600">
                Client can choose Pay in Full or Pay 50/50.
              </span>
            </span>
          </label>
        </div>
      </fieldset>
      {state?.error && (
        <p
          id="order-edit-error"
          className="text-sm text-red-600"
          role="alert"
        >
          {state.error}
        </p>
      )}
      {state?.updated && (
        <p className="text-sm text-green-600" role="status">
          Order updated.
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? "Updating…" : "Update"}
      </button>
    </form>
  );
}

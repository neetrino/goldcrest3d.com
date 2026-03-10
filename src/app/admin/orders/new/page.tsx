import Link from "next/link";
import { OrderNewForm } from "./OrderNewForm";

export default function AdminOrderNewPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <Link
        href="/admin/orders"
        className="text-sm text-neutral-600 hover:text-[var(--foreground)]"
      >
        ← Պատվերներ
      </Link>
      <h1 className="text-xl font-semibold">Նոր պատվեր</h1>
      <OrderNewForm />
    </div>
  );
}

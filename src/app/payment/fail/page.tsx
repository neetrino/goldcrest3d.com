import type { Metadata } from "next";

import { PaymentFailView } from "@/components/payment/PaymentFailView";

export const metadata: Metadata = {
  title: "Payment Failed | Goldcrest 3D",
  description: "Your payment could not be completed.",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function PaymentFailPage(props: Props) {
  return <PaymentFailView {...props} />;
}

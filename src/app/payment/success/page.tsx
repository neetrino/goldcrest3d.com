import type { Metadata } from "next";

import { PaymentSuccessView } from "@/components/payment/PaymentSuccessView";

export const metadata: Metadata = {
  title: "Payment Successful | Goldcrest 3D",
  description: "Your payment was completed successfully.",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function PaymentSuccessPage(props: Props) {
  return <PaymentSuccessView {...props} />;
}

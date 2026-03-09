/**
 * Client payment view (public link from email).
 * Total / Paid / Remaining / Payment type.
 */
type Props = { params: Promise<{ token: string }> };

export default async function OrderPaymentPage({ params }: Props) {
  const { token } = await params;
  return (
    <main>
      <h1>Order — {token}</h1>
    </main>
  );
}

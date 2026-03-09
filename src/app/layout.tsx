import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Goldcrest 3D — Մոդելավորում և արտադրություն",
  description:
    "Goldcrest-ի 3D մոդելավորման և արտադրության ծառայություններ։ CAD, պրոտոտիպավորում, արտադրություն։",
  keywords: ["3D մոդելավորում", "CAD", "արտադրություն", "պրոտոտիպ", "Goldcrest"],
  openGraph: {
    title: "Goldcrest 3D — Մոդելավորում և արտադրություն",
    description:
      "Goldcrest-ի 3D մոդելավորման և արտադրության ծառայություններ։",
    locale: "hy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hy">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

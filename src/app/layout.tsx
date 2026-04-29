import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Goldcrest 3D — Modelling and manufacturing",
  description:
    "Goldcrest 3D modelling and manufacturing services. CAD, prototyping, production.",
  keywords: ["3D modelling", "CAD", "manufacturing", "prototype", "Goldcrest"],
  openGraph: {
    title: "Goldcrest 3D — Modelling and manufacturing",
    description:
      "Goldcrest 3D modelling and manufacturing services.",
    locale: "en",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

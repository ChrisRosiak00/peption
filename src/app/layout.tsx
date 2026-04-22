import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peption — Your peptide journey, powered by knowledge",
  description:
    "Peption is an educational community for peptide protocols. Research, tracking, community support and an AI peptide expert — all in one place.",
  applicationName: "Peption",
  keywords: [
    "peptides",
    "peptide education",
    "retatrutide",
    "semaglutide",
    "tirzepatide",
    "community",
    "tracking",
  ],
  openGraph: {
    title: "Peption — Your peptide journey, powered by knowledge",
    description:
      "Science. Support. Community. All in one place. Track protocols, join the conversation, and learn from an AI peptide expert.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#8b5cf6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} h-full antialiased`}>
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

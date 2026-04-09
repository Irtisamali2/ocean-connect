import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ocean Connect | Overseas Recruitment & Microsoft MicroDegree Pakistan",
  description:
    "Pakistan's trusted overseas HR placement agency and Microsoft MicroDegree partner. Recruit, train, and place your career globally with Ocean Connect.",
  keywords:
    "overseas recruitment Pakistan, Microsoft MicroDegree Pakistan, jobs abroad Pakistan, IT certifications Pakistan, Gulf jobs, BEOE licensed agency",
  openGraph: {
    title: "Ocean Connect | Recruit. Train. Place. Globally.",
    description:
      "Connecting Pakistan's talent with global employers. Microsoft-authorized MicroDegree IT certifications. Your bridge to global opportunity.",
    type: "website",
    locale: "en_PK",
    siteName: "Ocean Connect",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocean Connect | Overseas Recruitment & IT Certifications Pakistan",
    description:
      "Pakistan's trusted partner for overseas careers & Microsoft MicroDegree certifications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

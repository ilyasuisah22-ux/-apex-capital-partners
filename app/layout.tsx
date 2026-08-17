import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Apex Capital Partners | Citizenship & Investment Advisory", template: "%s | Apex Capital Partners" },
  description: "Private, considered guidance for citizenship by investment, property investment, travel, visas, and accommodation from Saint Kitts and Nevis.",
  openGraph: { title: "Apex Capital Partners", description: "Citizenship, investment, and global mobility guidance.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${serif.variable} ${sans.variable}`}><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /><WhatsAppButton /></body></html>;
}

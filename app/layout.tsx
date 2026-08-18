import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteChrome } from "@/components/layout/site-chrome";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const themeScript = `(function(){try{var t=localStorage.getItem("apex-theme");document.documentElement.dataset.theme=(t==="dark"||t==="light")?t:"light";}catch(e){document.documentElement.dataset.theme="light";}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Apex Capital Partners | Citizenship & Investment Advisory", template: "%s | Apex Capital Partners" },
  description: "Private, considered guidance for citizenship by investment, property investment, travel, visas, and accommodation from Saint Kitts and Nevis.",
  openGraph: { title: "Apex Capital Partners", description: "Citizenship, investment, and global mobility guidance.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body className={`${serif.variable} ${sans.variable}`}><ThemeProvider><SiteChrome>{children}</SiteChrome></ThemeProvider></body></html>;
}

"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

export function SiteChrome({ children }: Readonly<{ children: React.ReactNode }>) {
  const isAdmin = usePathname().startsWith("/admin");
  if (isAdmin) return <>{children}</>;
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /><WhatsAppButton /></>;
}

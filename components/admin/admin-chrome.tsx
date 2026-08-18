"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/layout/brand-logo";
import { AdminLogout } from "@/components/admin/admin-logout";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function AdminChrome({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return children;
  return <div className="admin-shell"><header className="admin-header"><BrandLogo /><span className="admin-label">Owner workspace</span><ThemeToggle /><AdminLogout /></header><nav className="admin-nav" aria-label="Admin navigation"><Link href="/admin">Dashboard</Link><Link href="/admin/media">Media</Link><Link href="/admin/inquiries">Inquiries</Link></nav>{children}</div>;
}

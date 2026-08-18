import Link from "next/link";
import { navigation, whatsappUrl } from "@/lib/constants";
import { ArrowUpRight } from "@/components/ui/icons";
import { BrandLogo } from "./brand-logo";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return <header className="site-header"><div className="shell header-inner"><BrandLogo /><nav className="desktop-nav" aria-label="Primary navigation">{navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><a className="header-contact" href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight className="size-4" /></a><MobileNav /></div></header>;
}

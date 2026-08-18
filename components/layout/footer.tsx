import Link from "next/link";
import { company, navigation, services, whatsappUrl } from "@/lib/constants";
import { BrandLogo } from "./brand-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Footer() {
  return <footer className="site-footer"><div className="shell footer-main"><div className="footer-brand"><BrandLogo inverse /><p>Private guidance for citizenship, investment, and considered international movement.</p><ThemeToggle inverse /></div><div><h2>Navigate</h2>{navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div><div><h2>Services</h2>{services.map((service) => <Link key={service.slug} href={`/${service.slug}`}>{service.title}</Link>)}</div><div><h2>Contact</h2><a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a><a href={`mailto:${company.email}`}>{company.email}</a><span>{company.location}</span><a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp</a><span className="muted">Social channels coming after URL confirmation.</span></div></div><div className="shell footer-legal"><span>© {new Date().getFullYear()} Apex Capital Partners</span><p>Information is general and does not guarantee eligibility, approval, timing, investment returns, or visa-free entry. Program and entry requirements may change and require case-specific verification. Apex Capital Partners does not claim government affiliation.</p><Link className="owner-login-link" href="/admin/login">Owner Login</Link></div></footer>;
}

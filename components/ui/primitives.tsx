import Link from "next/link";
import { ArrowUpRight } from "./icons";
import { Globe } from "./globe";

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`eyebrow ${dark ? "text-brass" : "text-ink/60"}`}>{children}</p>;
}

export function TextLink({ href, children, inverse = false }: { href: string; children: React.ReactNode; inverse?: boolean }) {
  return <Link href={href} className={`text-link ${inverse ? "text-ivory" : "text-ink"}`}><span>{children}</span><ArrowUpRight className="size-4" /></Link>;
}

export function PageHero({ eyebrow, title, intro, index }: { eyebrow: string; title: string; intro: string; index?: string }) {
  return <section className="page-hero dark-section"><div className="shell page-hero-grid"><div><Eyebrow dark>{eyebrow}</Eyebrow><h1>{title}</h1></div><div className="page-hero-aside">{index && <span className="hero-index">{index}</span>}<p>{intro}</p></div></div></section>;
}

export function Atlas({ compact = false }: { compact?: boolean }) {
  if (!compact) return <Globe />;
  return <div className="atlas atlas-compact" aria-hidden="true"><div className="atlas-ring ring-one" /><div className="atlas-ring ring-two" /><div className="atlas-ring ring-three" /><div className="atlas-axis axis-a" /><div className="atlas-axis axis-b" /><span className="atlas-dot dot-a" /><span className="atlas-dot dot-b" /><span className="atlas-dot dot-c" /><div className="atlas-label"><small>15.18 N</small><strong>SKN</strong><small>62.58 W</small></div></div>;
}

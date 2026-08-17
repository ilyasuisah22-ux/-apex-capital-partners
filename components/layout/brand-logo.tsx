import Link from "next/link";

export function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  // Replace this isolated text lockup with the supplied original logo asset when available.
  return <Link href="/" className={`brand ${inverse ? "brand-inverse" : ""}`} aria-label="Apex Capital Partners home"><span className="brand-apex">APEX</span><span className="brand-capital">Capital Partners</span><span className="brand-advisory">Boutique Investment Advisory</span></Link>;
}

import Link from "next/link";
import { Eyebrow } from "@/components/ui/primitives";
import { marriottOpportunity, whatsappUrl } from "@/lib/constants";

export function MarriottHero() {
  const hero = marriottOpportunity.hero;
  return (
    <section className="page-hero dark-section marriott-hero">
      <div className="shell page-hero-grid">
        <div className="marriott-hero-copy">
          <Eyebrow dark>{hero.eyebrow}</Eyebrow>
          <h1>{hero.title}</h1>
          <p className="marriott-hero-subtitle">{hero.subtitle}</p>
          <div className="button-row">
            <Link className="button brass" href="#consultation">{hero.primaryCta}</Link>
            <a className="button outline" href={whatsappUrl(undefined, hero.whatsappMessage)} target="_blank" rel="noreferrer">{hero.secondaryCta}</a>
          </div>
        </div>
        <div className="page-hero-aside">
          <span className="hero-index">{hero.index}</span>
          <p>{hero.supportingText}</p>
        </div>
      </div>
      <div className="shell hero-foot">
        <span>Investment advisory</span>
        <span>Citizenship guidance</span>
        <span>Travel coordination</span>
        <span>17.3026° N / 62.7177° W</span>
      </div>
    </section>
  );
}
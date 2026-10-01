import Link from "next/link";
import { marriottOpportunity } from "@/lib/constants";

export function MarriottFeaturedCard({ eyebrow, buttonLabel }: { eyebrow?: string; buttonLabel?: string }) {
  const featured = marriottOpportunity.featured;
  return (
    <article className="featured-opportunity-card">
      <p className="eyebrow featured-eyebrow">{eyebrow ?? featured.eyebrow}</p>
      <h2>{featured.title}</h2>
      <p className="featured-subtitle">{featured.subtitle}</p>
      <p className="lead">{featured.description}</p>
      <div className="featured-meta">
        <span>{marriottOpportunity.programme}</span>
        <span>{marriottOpportunity.benefitUnit}</span>
      </div>
      <Link className="button brass" href={`/${marriottOpportunity.slug}`}>{buttonLabel ?? featured.buttonLabel}</Link>
    </article>
  );
}
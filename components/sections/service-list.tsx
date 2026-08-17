import { services } from "@/lib/constants";
import { TextLink } from "@/components/ui/primitives";

export function ServiceList({ limit }: { limit?: number }) {
  return <div className="service-list">{services.slice(0, limit).map((service) => <article key={service.slug} className="service-row"><span className="service-number">{service.accent}</span><div><p className="eyebrow text-ink/60">{service.eyebrow}</p><h3>{service.title}</h3></div><p>{service.summary}</p><TextLink href={`/${service.slug}`}>Explore</TextLink></article>)}</div>;
}

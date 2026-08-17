import type { Metadata } from "next";
import { PageHero, Eyebrow } from "@/components/ui/primitives";
import { ServiceList } from "@/components/sections/service-list";
import { ContactCta } from "@/components/sections/contact-cta";

export const metadata: Metadata = { title: "Services", description: "Citizenship, property investment, travel, tourist visa, and hotel accommodation support." };
export default function ServicesPage() { return <><PageHero eyebrow="Advisory services" title="Support shaped around real movement." intro="Five focused services connected by one principle: understand the context before deciding the next step." index="02" /><section className="light-section services-page"><div className="shell section-heading"><div><Eyebrow>Full scope</Eyebrow><h2>From investment inquiry to arrival.</h2></div><p>Explore each service, its boundaries, and the practical process we use to begin.</p></div><div className="shell"><ServiceList /></div></section><ContactCta /></>; }

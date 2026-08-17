import { TextLink, Eyebrow } from "@/components/ui/primitives";

export function ContactCta() {
  return <section className="contact-cta dark-section"><div className="shell cta-grid"><Eyebrow dark>Begin privately</Eyebrow><h2>A considered first conversation.</h2><div><p>Tell us what you are exploring. We will help frame the right questions and identify a practical next step.</p><TextLink href="/contact" inverse>Make an inquiry</TextLink></div></div></section>;
}

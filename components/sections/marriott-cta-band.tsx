import Link from "next/link";
import { company, marriottOpportunity, whatsappUrl } from "@/lib/constants";

export function MarriottCtaBand() {
  const hero = marriottOpportunity.hero;
  return (
    <section className="marriott-cta-band">
      <div className="shell">
        <h2>A considered first conversation.</h2>
        <p>Tell us what you are exploring. We will help frame the right questions and identify a practical next step.</p>
        <div className="marriott-cta-row">
          <Link className="button brass" href="#consultation">{hero.primaryCta}</Link>
          <a className="button outline" href={whatsappUrl(company.whatsapp[0], hero.whatsappMessage)} target="_blank" rel="noreferrer">{hero.secondaryCta}</a>
          <a className="button outline" href={whatsappUrl(company.whatsapp[0], "Hello Apex Capital Partners, I would like to speak with an advisor about the St. Kitts & Nevis Marriott Public Benefit Opportunity.")} target="_blank" rel="noreferrer">Speak With an Advisor</a>
        </div>
      </div>
    </section>
  );
}
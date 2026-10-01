import { Eyebrow } from "@/components/ui/primitives";
import { marriottOpportunity } from "@/lib/constants";

export function MarriottBenefits() {
  return (
    <section className="marriott-section light-section">
      <div className="shell">
        <div className="section-heading">
          <div>
            <Eyebrow>Exclusive Hospitality Benefits</Eyebrow>
            <h2>Benefits associated with the applicable project offer</h2>
          </div>
          <p>Hospitality benefits may be available as part of the applicable project offer. Contact Apex Capital Partners for the current benefit structure and eligibility requirements.</p>
        </div>
        <div className="marriott-grid">
          {marriottOpportunity.benefits.map((benefit) => <article className="marriott-card" key={benefit.title}><h3>{benefit.title}</h3><p>{benefit.description}</p></article>)}
        </div>
        <div className="marriott-info-box marriott-info-box-tight">
          <h3>About promotional hospitality benefits</h3>
          <p>Where a project offer includes hospitality or promotional benefits, the current scope, recognition, eligibility and duration of those benefits are confirmed by Apex Capital Partners and the applicable project documentation. This page does not independently certify any specific number, value, conversion or lifetime of hospitality benefits.</p>
        </div>
      </div>
    </section>
  );
}
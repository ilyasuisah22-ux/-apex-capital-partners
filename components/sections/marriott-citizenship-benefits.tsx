import { Eyebrow } from "@/components/ui/primitives";
import { marriottOpportunity } from "@/lib/constants";

export function MarriottCitizenshipBenefits() {
  return (
    <section className="marriott-section light-section">
      <div className="shell">
        <div className="section-heading">
          <div>
            <Eyebrow>Why Consider St. Kitts & Nevis Citizenship?</Eyebrow>
            <h2>Considerations associated with the programme</h2>
          </div>
          <p>These are general considerations, not guarantees. Confirm current programme requirements and obtain appropriate professional advice before making decisions.</p>
        </div>
        <div className="marriott-grid">
          {marriottOpportunity.citizenshipBenefits.map((benefit) => <article className="marriott-card" key={benefit.title}><h3>{benefit.title}</h3><p>{benefit.description}</p></article>)}
        </div>
        <div className="marriott-info-box marriott-info-box-tight">
          <h3>Travel privileges and taxation</h3>
          <p>Access to international destinations is subject to each destination&apos;s current entry and visa requirements, and travel privileges can change. St. Kitts & Nevis should not be presented as a universal tax solution; explore the potential international planning considerations with qualified professional advice.</p>
        </div>
      </div>
    </section>
  );
}
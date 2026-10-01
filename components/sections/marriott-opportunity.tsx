import { Eyebrow } from "@/components/ui/primitives";

export function MarriottOpportunitySection() {
  return (
    <section className="marriott-section light-section">
      <div className="shell">
        <div className="section-heading">
          <div>
            <Eyebrow>Investment Opportunity</Eyebrow>
            <h2>A Public Benefit opportunity associated with the Royal St. Kitts Beach Resort</h2>
          </div>
          <p>Apex Capital Partners supports prospective applicants exploring the St. Kitts & Nevis Citizenship by Investment programme and the Public Benefit Option associated with the Royal St. Kitts Beach Resort, commonly referred to as the St. Kitts Marriott.</p>
        </div>
        <div className="marriott-panel">
          <h3>How this opportunity is presented</h3>
          <p>The Royal St. Kitts Beach Resort is associated with a Public Benefit Option under the St. Kitts & Nevis Citizenship by Investment framework. Investment amounts, fees, processing times, travel privileges and project benefits are subject to current official programme and project requirements. Contact Apex Capital Partners for the current benefit structure and eligibility requirements before making decisions.</p>
          <p className="marriott-note">This page does not state that any particular applicant qualifies, that citizenship will be granted, or that any investment return is assured. Requirements are confirmed on a case-by-case basis with the relevant authorities and qualified independent advisers.</p>
        </div>
      </div>
    </section>
  );
}
import { Eyebrow } from "@/components/ui/primitives";
import { marriottOpportunity } from "@/lib/constants";

export function MarriottProcess() {
  return (
    <section className="marriott-section light-section">
      <div className="shell">
        <div className="section-heading">
          <div>
            <Eyebrow>How the Process Works</Eyebrow>
            <h2>A measured sequence, not a promise of timing</h2>
          </div>
          <p>Each step is coordinated with the applicant and the relevant authorities. Processing times depend on application completeness, due diligence, government processing and applicable programme requirements.</p>
        </div>
        <div className="marriott-process">
          {marriottOpportunity.processSteps.map((step) => <article key={step.step}><span className="step-num">{step.step}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}
        </div>
        <div className="marriott-info-box marriott-info-box-tight">
          <h3>Typical processing timeframe</h3>
          <p>Typical processing timeframe may vary. Processing times depend on application completeness, due diligence, government processing and applicable programme requirements. No specific outcome, approval or completion date is promised or guaranteed.</p>
        </div>
      </div>
    </section>
  );
}
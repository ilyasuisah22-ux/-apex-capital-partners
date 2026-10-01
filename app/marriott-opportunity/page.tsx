import type { Metadata } from "next";
import { marriottOpportunity } from "@/lib/constants";
import { Eyebrow } from "@/components/ui/primitives";
import { MarriottHero } from "@/components/sections/marriott-hero";
import { MarriottOpportunitySection } from "@/components/sections/marriott-opportunity";
import { MarriottBenefits } from "@/components/sections/marriott-benefits";
import { MarriottCitizenshipBenefits } from "@/components/sections/marriott-citizenship-benefits";
import { MarriottProcess } from "@/components/sections/marriott-process";
import { MarriottCtaBand } from "@/components/sections/marriott-cta-band";
import { MarriottOpportunityForm } from "@/components/forms/marriott-opportunity-form";

export const metadata: Metadata = {
  title: "St. Kitts & Nevis Citizenship by Investment | Marriott Opportunity",
  description: "Explore the St. Kitts & Nevis Citizenship by Investment programme and the Marriott Public Benefit Opportunity with Apex Capital Partners.",
  alternates: { canonical: "/marriott-opportunity" },
  openGraph: {
    title: "St. Kitts & Nevis Citizenship by Investment | Marriott Opportunity",
    description: "Explore the St. Kitts & Nevis Citizenship by Investment programme and the Marriott Public Benefit Opportunity with Apex Capital Partners.",
    url: "/marriott-opportunity",
    type: "website",
  },
};

export default function MarriottOpportunityPage() {
  return (
    <>
      <MarriottHero />
      <MarriottOpportunitySection />
      <MarriottBenefits />
      <MarriottCitizenshipBenefits />
      <MarriottProcess />
      <MarriottCtaBand />
      <section className="marriott-section light-section" id="consultation">
        <div className="shell marriott-form-wrap">
          <div className="marriott-panel">
            <MarriottOpportunityForm />
          </div>
          <aside className="marriott-side">
            <div className="marriott-info-box">
              <h3>Important Programme Information</h3>
              <p>{marriottOpportunity.importantProgrammeInfo}</p>
            </div>
            <div className="marriott-info-box">
              <h3>Buy-back arrangements</h3>
              <p>Buy-back arrangements may be available subject to applicable project terms. Contact Apex Capital Partners for current details.</p>
            </div>
            <div className="marriott-info-box">
              <h3>Official source</h3>
              <p>For current programme requirements, refer to the official St. Kitts &amp; Nevis Citizenship by Investment Unit.</p>
              <a className="text-link" href={marriottOpportunity.officialSourceUrl} target="_blank" rel="noreferrer">Visit the official Citizenship by Investment Unit site</a>
            </div>
          </aside>
        </div>
      </section>
      <section className="marriott-disclaimer light-section">
        <div className="shell marriott-disclaimer-inner">
          <Eyebrow>Important Notice</Eyebrow>
          <p className="text-ink/60">{marriottOpportunity.disclaimer}</p>
        </div>
      </section>
    </>
  );
}
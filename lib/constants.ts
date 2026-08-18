export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const company = {
  name: "Apex Capital Partners",
  strapline: "Boutique Investment Advisory",
  phone: "+1 869 661 3887",
  email: "ApexCapitalPartners.Hmt@gmail.com",
  location: "Saint Kitts and Nevis, Caribbean",
  whatsapp: ["+1 869 661 3887", "+234 803 847 2265", "+234 805 035 4644"],
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Citizenship", href: "/citizenship" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  accent: string;
  detailHeading: string;
  boundary: string;
  composition: "pathway" | "evaluation" | "itinerary" | "checklist" | "stay";
  steps: readonly { title: string; description: string }[];
};

export const services: readonly Service[] = [
  {
    slug: "citizenship",
    title: "Citizenship by Investment",
    eyebrow: "Global mobility",
    summary: "Considered guidance for individuals and families exploring Saint Kitts and Nevis citizenship by investment.",
    description: "We help clients understand the investment concept, organize questions, and prepare for case-specific professional review. Eligibility, program terms, and entry rules must always be verified.",
    accent: "01",
    detailHeading: "A private route to informed review.",
    boundary: "Eligibility and program decisions remain subject to current official requirements and independent case review.",
    composition: "pathway",
    steps: [
      { title: "Private discovery", description: "Clarify applicant circumstances, family considerations, mobility priorities, and the purpose behind the inquiry." },
      { title: "Pathway orientation", description: "Review the investment concept and identify current program details that require professional verification." },
      { title: "Case-specific next steps", description: "Prepare focused questions and appropriate referrals without implying eligibility, timing, or approval." },
    ],
  },
  {
    slug: "services/property-investment",
    title: "Property Investment",
    eyebrow: "Opportunity review",
    summary: "A disciplined framework for property discovery and opportunity evaluation.",
    description: "Support begins with your objectives and preferences, followed by structured opportunity review and coordination of relevant questions. No investment return is promised or guaranteed.",
    accent: "02",
    detailHeading: "Evaluate the opportunity, not only the address.",
    boundary: "Property availability, valuation, legal standing, and potential returns require independent confirmation. No return is promised or guaranteed.",
    composition: "evaluation",
    steps: [
      { title: "Define investment criteria", description: "Set location, property type, intended use, budget context, holding priorities, and tolerance for uncertainty." },
      { title: "Review relevant opportunities", description: "Compare suitable opportunities against the agreed criteria, separating available facts from projections or assumptions." },
      { title: "Coordinate independent checks", description: "Identify legal, financial, valuation, title, and provider questions for confirmation by qualified independent parties." },
    ],
  },
  {
    slug: "services/travel-assistance",
    title: "Travel Assistance",
    eyebrow: "Practical coordination",
    summary: "Responsive support for the moving parts of a considered international itinerary.",
    description: "We help organize practical travel requirements around your itinerary, preferences, and timing, while making clear where third-party confirmations remain necessary.",
    accent: "03",
    detailHeading: "Build the journey around its real dependencies.",
    boundary: "Schedules, entry requirements, fares, and third-party arrangements remain subject to current provider and authority confirmation.",
    composition: "itinerary",
    steps: [
      { title: "Share itinerary needs", description: "Outline destinations, dates, travellers, connections, priorities, and any practical constraints affecting the journey." },
      { title: "Coordinate practical options", description: "Organize relevant routing and support options around the sequence of the itinerary and available information." },
      { title: "Confirm arrangements directly", description: "Verify schedules, availability, entry conditions, and final terms with each responsible provider or authority." },
    ],
  },
  {
    slug: "services/tourist-visa",
    title: "Tourist Visa",
    eyebrow: "Application support",
    summary: "Structured preparation support for tourist visa applications and documentation.",
    description: "We assist with application preparation and document organization based on available requirements. Decisions remain solely with the relevant authority and approval is never guaranteed.",
    accent: "04",
    detailHeading: "Document readiness before submission.",
    boundary: "Only the relevant immigration or consular authority decides an application. Preparation support cannot guarantee a visa or decision time.",
    composition: "checklist",
    steps: [
      { title: "Review destination requirements", description: "Check currently available destination guidance against nationality, residence, travel purpose, and intended dates." },
      { title: "Organize application materials", description: "Arrange the applicant's forms and supporting documents into a clear readiness checklist, noting missing items." },
      { title: "Prepare for independent submission", description: "Review the assembled application for completeness before the applicant submits directly through the required channel." },
    ],
  },
  {
    slug: "services/hotel-accommodation",
    title: "Hotel Accommodation",
    eyebrow: "Stay planning",
    summary: "Accommodation planning aligned with your itinerary, priorities, and preferred pace.",
    description: "We narrow accommodation options around location, comfort, timing, and travel purpose, with availability and booking terms confirmed through the relevant provider.",
    accent: "05",
    detailHeading: "Make the stay serve the itinerary.",
    boundary: "Room availability, rates, amenities, cancellation terms, and booking confirmation remain with the accommodation provider.",
    composition: "stay",
    steps: [
      { title: "Understand stay preferences", description: "Define dates, location, room needs, comfort level, travel purpose, accessibility needs, and preferred pace." },
      { title: "Curate suitable options", description: "Narrow available accommodation choices by how well they support the itinerary rather than by category alone." },
      { title: "Coordinate booking details", description: "Confirm live availability, total terms, amenities, and cancellation conditions directly with the selected provider." },
    ],
  },
] as const;

export const citizenshipRegions = [
  { region: "Europe", detail: "Schengen Zone (26 countries), UK and Ireland", stay: "Up to 90-180 days" },
  { region: "Asia", detail: "China, Singapore and South Korea", stay: "Up to 30-90 days" },
  { region: "Gulf", detail: "Saudi Arabia and UAE", stay: "90 days" },
  { region: "Americas", detail: "OECS nations and Caribbean Community", stay: "Free movement and extended stays" },
] as const;

export type MediaRecord = {
  id: string;
  type: "image" | "video";
  title: string;
  category: string;
  description: string;
  motif: "coast" | "architecture" | "route" | "horizon" | "stone";
};

export const mediaRecords: readonly MediaRecord[] = [
  { id: "m1", type: "image", title: "Island Perspective", category: "Saint Kitts and Nevis", description: "An editorial placeholder for future original location imagery.", motif: "coast" },
  { id: "m2", type: "image", title: "Private Office", category: "Our Approach", description: "Reserved for a future view of the advisory environment.", motif: "architecture" },
  { id: "m3", type: "image", title: "Routes Considered", category: "Global Mobility", description: "A visual study of deliberate international movement.", motif: "route" },
  { id: "m4", type: "image", title: "Caribbean Horizon", category: "Perspective", description: "Reserved for original regional photography.", motif: "horizon" },
  { id: "m5", type: "image", title: "Material & Place", category: "Investment", description: "A future editorial study of property and setting.", motif: "stone" },
  { id: "v1", type: "video", title: "Citizenship in Context", category: "Presentation preview", description: "A future briefing on citizenship by investment considerations.", motif: "route" },
  { id: "v2", type: "video", title: "A Considered Approach", category: "Presentation preview", description: "A future introduction to the Apex advisory process.", motif: "architecture" },
  { id: "v3", type: "video", title: "Planning Global Mobility", category: "Presentation preview", description: "A future discussion of family and travel considerations.", motif: "coast" },
] as const;

export function whatsappUrl(number: string = company.whatsapp[0], message = "Hello Apex Capital Partners, I would like to discuss your advisory services.") {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

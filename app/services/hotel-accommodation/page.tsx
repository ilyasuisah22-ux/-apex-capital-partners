import type { Metadata } from "next"; import { services } from "@/lib/constants"; import { ServiceDetail } from "@/components/services/service-detail";
export const metadata: Metadata = { title: "Hotel Accommodation", description: "Accommodation planning aligned with itinerary and preferences." };
export default function Page(){ return <ServiceDetail service={services[4]} title="A stay aligned with the journey." />; }

import type { Metadata } from "next"; import { services } from "@/lib/constants"; import { ServiceDetail } from "@/components/services/service-detail";
export const metadata: Metadata = { title: "Travel Assistance", description: "Practical trip coordination support tailored to your itinerary." };
export default function Page(){ return <ServiceDetail service={services[2]} title="Travel with fewer loose ends." />; }

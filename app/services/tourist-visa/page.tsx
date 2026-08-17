import type { Metadata } from "next"; import { services } from "@/lib/constants"; import { ServiceDetail } from "@/components/services/service-detail";
export const metadata: Metadata = { title: "Tourist Visa", description: "Tourist visa application preparation support without approval guarantees." };
export default function Page(){ return <ServiceDetail service={services[3]} title="Preparation, clearly organized." />; }

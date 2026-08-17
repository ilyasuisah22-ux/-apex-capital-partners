import type { Metadata } from "next"; import { services } from "@/lib/constants"; import { ServiceDetail } from "@/components/services/service-detail";
export const metadata: Metadata = { title: "Property Investment", description: "Property discovery and opportunity evaluation support without guaranteed returns." };
export default function Page(){ return <ServiceDetail service={services[1]} title="Property, considered in context." />; }

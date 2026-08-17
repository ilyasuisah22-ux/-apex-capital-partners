import { whatsappUrl } from "@/lib/constants";
import { ArrowUpRight } from "@/components/ui/icons";

export function WhatsAppButton() {
  return <a className="floating-whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Contact Apex Capital Partners on WhatsApp"><span>WA</span><ArrowUpRight className="size-4" /></a>;
}

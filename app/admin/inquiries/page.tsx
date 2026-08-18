import { InquiryManager } from "@/components/admin/inquiry-manager";
import { requireAdmin } from "@/lib/supabase/auth";
export default async function AdminInquiriesPage() { const { supabase } = await requireAdmin(); const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false }); return <InquiryManager initialInquiries={data ?? []} />; }

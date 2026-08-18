import { MediaManager } from "@/components/admin/media-manager";
import { requireAdmin } from "@/lib/supabase/auth";
export default async function AdminMediaPage() { const { supabase } = await requireAdmin(); const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false }); return <MediaManager initialMedia={data ?? []} />; }

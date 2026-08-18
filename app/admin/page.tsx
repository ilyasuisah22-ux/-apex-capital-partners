import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/auth";

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdmin();
  let images = 0, videos = 0, totalInquiries = 0, newInquiries = 0;
  if (supabase) { const media = await supabase.from("media").select("media_type"); images = media.data?.filter((item) => item.media_type === "image").length ?? 0; videos = media.data?.filter((item) => item.media_type === "video").length ?? 0; const inquiries = await supabase.from("inquiries").select("status"); totalInquiries = inquiries.data?.length ?? 0; newInquiries = inquiries.data?.filter((item) => item.status === "new").length ?? 0; }
  return <main className="admin-page"><div className="admin-page-heading"><div><p className="eyebrow text-brass">Dashboard</p><h1>Good to see you.</h1><p>Here is the current activity on your website.</p></div></div><div className="admin-stat-grid"><Link href="/admin/media"><strong>{images} / 5</strong><span>Active images</span></Link><Link href="/admin/media"><strong>{videos} / 3</strong><span>Active videos</span></Link><Link href="/admin/inquiries"><strong>{newInquiries}</strong><span>New inquiries</span></Link><Link href="/admin/inquiries"><strong>{totalInquiries}</strong><span>Total inquiries</span></Link></div><div className="admin-quick-links"><Link href="/admin/media" className="admin-panel"><span>Media</span><strong>Update images and videos</strong></Link><Link href="/admin/inquiries" className="admin-panel"><span>Inquiries</span><strong>Review and follow up with visitors</strong></Link></div></main>;
}

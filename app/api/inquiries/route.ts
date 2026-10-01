import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { sendInquiryNotification } from "@/lib/email";
import { getPublicEnv } from "@/lib/config";

const recentSubmissions = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const previous = recentSubmissions.get(ip) ?? 0;
    if (Date.now() - previous < 30_000) return NextResponse.json({ error: "Please wait before sending another inquiry." }, { status: 429 });
    let body: unknown;
    try { body = await request.json(); } catch { return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 }); }
    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success || parsed.data.website) return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
    if (!getPublicEnv()) return NextResponse.json({ error: "Inquiry service is not configured yet." }, { status: 503 });
    const supabase = await createSupabaseServerClient();
    if (!supabase) return NextResponse.json({ error: "Inquiry service is not configured yet." }, { status: 503 });
    const inquiry = { full_name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, country: parsed.data.country, service: parsed.data.service, number_of_applicants: parsed.data.applicants, message: parsed.data.message };
    let { error } = await supabase.from("inquiries").insert({ ...inquiry, category: parsed.data.category });
    if (error && /category/i.test(error.message)) {
      // The optional source column has not been applied to this database yet.
      // Save the inquiry anyway so no submission is lost, then apply supabase/schema.sql.
      console.warn("Inquiry source column is unavailable. Apply supabase/schema.sql; saving the inquiry without its category.");
      ({ error } = await supabase.from("inquiries").insert(inquiry));
    }
    if (error) return NextResponse.json({ error: "We could not save your inquiry. Please try again." }, { status: 500 });
    recentSubmissions.set(ip, Date.now());
    try { const notification = await sendInquiryNotification(parsed.data); if (!notification.sent) console.warn("Inquiry saved without email notification:", notification.reason); } catch (emailError) { console.error("Inquiry email notification failed", emailError); }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry submission failed", error);
    return NextResponse.json({ error: "We could not process your inquiry. Please try again." }, { status: 500 });
  }
}

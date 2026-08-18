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
    const { data, error } = await supabase.from("inquiries").insert({ full_name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, country: parsed.data.country, service: parsed.data.service, number_of_applicants: parsed.data.applicants, message: parsed.data.message }).select("id").single();
    if (error || !data) return NextResponse.json({ error: "We could not save your inquiry. Please try again." }, { status: 500 });
    recentSubmissions.set(ip, Date.now());
    try { await sendInquiryNotification(parsed.data); } catch (emailError) { console.error("Inquiry email notification failed", emailError); }
    return NextResponse.json({ ok: true, id: data.id });
  } catch (error) {
    console.error("Inquiry submission failed", error);
    return NextResponse.json({ error: "We could not process your inquiry. Please try again." }, { status: 500 });
  }
}

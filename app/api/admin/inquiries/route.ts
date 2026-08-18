import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/supabase/auth";
import { inquiryStatusSchema } from "@/lib/validation";

export async function GET() {
  const { supabase, isAdmin } = await getAdminContext();
  if (!supabase) return NextResponse.json({ error: "Backend is not configured." }, { status: 503 });
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
  const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: "Could not load inquiries." }, { status: 500 });
  return NextResponse.json({ inquiries: data });
}

export async function PATCH(request: Request) {
  const { supabase, isAdmin } = await getAdminContext();
  if (!supabase) return NextResponse.json({ error: "Backend is not configured." }, { status: 503 });
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
  const body = await request.json().catch(() => null) as { id?: string; status?: string } | null;
  const status = inquiryStatusSchema.safeParse(body?.status);
  if (!body?.id || !status.success) return NextResponse.json({ error: "Invalid inquiry update." }, { status: 400 });
  const { error } = await supabase.from("inquiries").update({ status: status.data }).eq("id", body.id);
  if (error) return NextResponse.json({ error: "Could not update inquiry." }, { status: 500 });
  return NextResponse.json({ ok: true });
}

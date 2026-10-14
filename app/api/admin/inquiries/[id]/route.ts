import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/supabase/auth";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { supabase, isAdmin } = await getAdminContext();
  if (!supabase) return NextResponse.json({ error: "Backend is not configured." }, { status: 503 });
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized." }, { status: 403 });

  const { id } = await params;
  if (!id || !UUID_RE.test(id)) return NextResponse.json({ error: "Invalid inquiry id." }, { status: 400 });

  const { data: inquiry, error: findError } = await supabase
    .from("inquiries")
    .select("id, status")
    .eq("id", id)
    .maybeSingle();

  if (findError) return NextResponse.json({ error: "Could not load inquiry." }, { status: 500 });
  if (!inquiry) return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
  if (inquiry.status !== "completed") {
    return NextResponse.json({ error: "Only completed inquiries can be deleted." }, { status: 409 });
  }

  const { error, count } = await supabase
    .from("inquiries")
    .delete({ count: "exact" })
    .eq("id", id)
    .eq("status", "completed");

  if (error) {
    if (/row level security|policy/i.test(error.message)) {
      return NextResponse.json({ error: "Delete is not permitted by the database security policy. Apply the inquiry delete policy from supabase/schema.sql." }, { status: 403 });
    }
    return NextResponse.json({ error: "Could not delete inquiry." }, { status: 500 });
  }
  if (!count) return NextResponse.json({ error: "Inquiry could not be deleted." }, { status: 409 });
  return NextResponse.json({ ok: true });
}
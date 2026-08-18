import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminContext } from "@/lib/supabase/auth";
import { deleteFromSupabaseStorage } from "@/lib/supabase/storage";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { supabase, isAdmin } = await getAdminContext();
  if (!supabase) return NextResponse.json({ error: "Backend is not configured." }, { status: 503 });
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
  const { id } = await params;
  const { data, error: findError } = await supabase.from("media").select("storage_path").eq("id", id).single();
  if (findError || !data) return NextResponse.json({ error: "Media was not found." }, { status: 404 });
  try { await deleteFromSupabaseStorage(data.storage_path); } catch (error) { console.error("Supabase Storage delete failed", error); return NextResponse.json({ error: "Media could not be deleted from storage." }, { status: 502 }); }
  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Storage was updated, but the media record could not be removed. Contact support before retrying." }, { status: 500 });
  revalidatePath("/", "page");
  revalidatePath("/media", "page");
  return NextResponse.json({ ok: true });
}

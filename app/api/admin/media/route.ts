import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/supabase/auth";
import { deleteFromR2, uploadToR2 } from "@/lib/r2";
import { MAX_IMAGES, MAX_VIDEOS, validateMediaFile } from "@/lib/validation";
import { randomUUID } from "node:crypto";

export async function GET() {
  const { supabase, isAdmin } = await getAdminContext();
  if (!supabase) return NextResponse.json({ error: "Backend is not configured." }, { status: 503 });
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
  const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: "Could not load media." }, { status: 500 });
  return NextResponse.json({ media: data });
}

export async function POST(request: Request) {
  const { supabase, isAdmin } = await getAdminContext();
  if (!supabase) return NextResponse.json({ error: "Backend is not configured." }, { status: 503 });
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
    const validation = validateMediaFile(file);
    if (!validation.ok) return NextResponse.json({ error: validation.message }, { status: 400 });
    const { count } = await supabase.from("media").select("id", { count: "exact", head: true }).eq("media_type", validation.mediaType);
    const limit = validation.mediaType === "image" ? MAX_IMAGES : MAX_VIDEOS;
    if ((count ?? 0) >= limit) return NextResponse.json({ error: `Maximum number of ${validation.mediaType}s reached. Delete an existing ${validation.mediaType} before uploading another.` }, { status: 409 });
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const key = `${validation.mediaType}s/${randomUUID()}-${safeName}`;
    const publicUrl = await uploadToR2(key, new Uint8Array(await file.arrayBuffer()), file.type);
    const { data, error } = await supabase.from("media").insert({ file_name: safeName, original_file_name: file.name, media_type: validation.mediaType, storage_key: key, public_url: publicUrl, file_size: file.size, mime_type: file.type }).select("*").single();
    if (error || !data) { try { await deleteFromR2(key); } catch (cleanupError) { console.error("R2 cleanup failed", cleanupError); } return NextResponse.json({ error: "Upload could not be completed." }, { status: 500 }); }
    return NextResponse.json({ media: data }, { status: 201 });
  } catch (error) {
    console.error("Media upload failed", error);
    return NextResponse.json({ error: "Upload failed. Check storage configuration and try again." }, { status: 500 });
  }
}

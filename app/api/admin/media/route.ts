import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminContext } from "@/lib/supabase/auth";
import { deleteFromSupabaseStorage, uploadToSupabaseStorage } from "@/lib/supabase/storage";
import { mediaLimitReached, validateMediaFile } from "@/lib/validation";
import { randomUUID } from "node:crypto";
import { convertImageToWebP, optimizedImageMimeType } from "@/lib/media-conversion";

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
    if (mediaLimitReached(validation.mediaType, count ?? 0)) return NextResponse.json({ error: `Maximum number of ${validation.mediaType}s reached. Delete an existing ${validation.mediaType} before uploading another.` }, { status: 409 });
    const requestedName = String(form.get("name") ?? "").trim();
    const sourceName = requestedName || file.name;
    const safeStem = sourceName.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || "media";
    const sourceBytes = new Uint8Array(await file.arrayBuffer());
    const isImage = validation.mediaType === "image";
    const uploadBytes = isImage ? await convertImageToWebP(sourceBytes) : sourceBytes;
    const uploadMimeType = isImage ? optimizedImageMimeType : file.type;
    const uploadExtension = isImage ? "webp" : file.type === "video/webm" ? "webm" : "mp4";
    const uploadName = `${safeStem}.${uploadExtension}`;
    const key = `${validation.mediaType}s/${randomUUID()}-${uploadName}`;
    const publicUrl = await uploadToSupabaseStorage(key, uploadBytes, uploadMimeType);
    const { data, error } = await supabase.from("media").insert({ file_name: uploadName, original_file_name: file.name, media_type: validation.mediaType, storage_path: key, public_url: publicUrl, file_size: uploadBytes.byteLength, mime_type: uploadMimeType }).select("*").single();
    if (error || !data) { try { await deleteFromSupabaseStorage(key); } catch (cleanupError) { console.error("Supabase Storage cleanup failed", cleanupError); } return NextResponse.json({ error: "Upload could not be completed." }, { status: 500 }); }
     revalidatePath("/", "page");
     revalidatePath("/media", "page");
     return NextResponse.json({ media: data }, { status: 201 });
  } catch (error) {
    console.error("Media upload failed", error);
    return NextResponse.json({ error: "Upload failed. Check storage configuration and try again." }, { status: 500 });
  }
}

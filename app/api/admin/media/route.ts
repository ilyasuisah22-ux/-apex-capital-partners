import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminContext } from "@/lib/supabase/auth";
import { MAX_IMAGE_BYTES, MAX_VIDEOS, MAX_VIDEO_BYTES, MAX_IMAGES } from "@/lib/media-validation";
import { CLOUDINARY_PREFIX, deleteCloudinaryAsset, getCloudinaryAsset } from "@/lib/cloudinary";

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
    const body = await request.json() as { publicId?: string; originalName?: string; name?: string; mediaType?: "image" | "video"; resourceType?: "image" | "video" };
    if (!body.publicId || !body.originalName || !body.mediaType || body.resourceType !== body.mediaType || !body.publicId.startsWith(`apex/${body.mediaType}s/`)) return NextResponse.json({ error: "Incomplete Cloudinary upload details." }, { status: 400 });
    const { count } = await supabase.from("media").select("id", { count: "exact", head: true }).eq("media_type", body.mediaType);
    const limit = body.mediaType === "image" ? MAX_IMAGES : MAX_VIDEOS;
    if ((count ?? 0) >= limit) { await deleteCloudinaryAsset(body.publicId, body.mediaType); return NextResponse.json({ error: `Maximum number of ${body.mediaType}s reached. Delete an existing ${body.mediaType} before uploading another.` }, { status: 409 }); }
    const asset = await getCloudinaryAsset(body.publicId, body.mediaType);
    if (body.mediaType === "image" && asset.format !== "webp") { await deleteCloudinaryAsset(body.publicId, body.mediaType); return NextResponse.json({ error: "Cloudinary did not convert the image to WebP." }, { status: 502 }); }
    const maxBytes = body.mediaType === "image" ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
    if (asset.bytes > maxBytes) { await deleteCloudinaryAsset(body.publicId, body.mediaType); return NextResponse.json({ error: `The uploaded ${body.mediaType} exceeds the size limit.` }, { status: 400 }); }
    const safeStem = (body.name || body.originalName).replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || "media";
    const extension = body.mediaType === "image" ? "webp" : asset.format || "mp4";
    const fileName = `${safeStem}.${extension}`;
    const publicUrl = asset.secure_url.replace("/upload/", body.mediaType === "image" ? "/upload/q_auto/" : "/upload/f_auto,q_auto/");
    const { data, error } = await supabase.from("media").insert({ file_name: fileName, original_file_name: body.originalName, media_type: body.mediaType, storage_path: `${CLOUDINARY_PREFIX}${body.publicId}`, public_url: publicUrl, file_size: asset.bytes, mime_type: body.mediaType === "image" ? "image/webp" : `video/${asset.format || "mp4"}` }).select("*").single();
    if (error || !data) { await deleteCloudinaryAsset(body.publicId, body.mediaType); return NextResponse.json({ error: "Media metadata could not be saved." }, { status: 500 }); }
     revalidatePath("/", "page");
     revalidatePath("/media", "page");
     return NextResponse.json({ media: data }, { status: 201 });
  } catch (error) {
    console.error("Media upload failed", error);
    return NextResponse.json({ error: "Upload failed. Check storage configuration and try again." }, { status: 500 });
  }
}

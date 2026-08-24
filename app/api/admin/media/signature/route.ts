import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getAdminContext } from "@/lib/supabase/auth";
import { createUploadSignature } from "@/lib/cloudinary";
import { MAX_IMAGES, MAX_VIDEOS } from "@/lib/media-validation";

export async function POST(request: Request) {
  const { supabase, isAdmin } = await getAdminContext();
  if (!supabase) return NextResponse.json({ error: "Backend is not configured." }, { status: 503 });
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
  try {
    const body = await request.json() as { name?: string; mediaType?: "image" | "video" };
    if (body.mediaType !== "image" && body.mediaType !== "video") return NextResponse.json({ error: "Invalid media type." }, { status: 400 });
    const { count } = await supabase.from("media").select("id", { count: "exact", head: true }).eq("media_type", body.mediaType);
    const limit = body.mediaType === "image" ? MAX_IMAGES : MAX_VIDEOS;
    if ((count ?? 0) >= limit) return NextResponse.json({ error: `Maximum number of ${body.mediaType}s reached. Delete an existing ${body.mediaType} before uploading another.` }, { status: 409 });
    const publicId = `apex/${body.mediaType}s/${randomUUID()}-${(body.name || "media").replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 80)}`;
    return NextResponse.json(createUploadSignature(publicId, Math.floor(Date.now() / 1000)));
  } catch (error) {
    console.error("Cloudinary signature failed", error);
    return NextResponse.json({ error: "Cloudinary is not configured." }, { status: 503 });
  }
}

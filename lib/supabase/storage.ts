import { createSupabaseServerClient } from "@/lib/supabase/server";

export const MEDIA_BUCKET = "apex-media";

export async function uploadToSupabaseStorage(path: string, body: Uint8Array, contentType: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Media storage is not configured.");
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, body, { contentType, cacheControl: "3600", upsert: false });
  if (error) throw new Error(error.message);
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function deleteFromSupabaseStorage(path: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Media storage is not configured.");
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([path]);
  if (error) throw new Error(error.message);
}

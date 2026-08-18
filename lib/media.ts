import { mediaRecords, type MediaRecord } from "@/lib/constants";
import { getPublicEnv } from "@/lib/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type PublicMedia = MediaRecord & { public_url?: string; file_name?: string; file_size?: number; mime_type?: string; created_at?: string };

export async function getPublicMedia() {
  const fallback = mediaRecords.map((item) => ({ ...item }));
  if (!getPublicEnv()) return fallback;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from("media").select("id,file_name,media_type,public_url,file_size,mime_type,created_at").order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((item) => ({ id: item.id, type: item.media_type, title: item.file_name, category: item.media_type === "image" ? "Published image" : "Published video", description: "Published by Apex Capital Partners.", motif: item.media_type === "image" ? "architecture" : "route", public_url: item.public_url, file_name: item.file_name, file_size: item.file_size, mime_type: item.mime_type, created_at: item.created_at })) as PublicMedia[];
}

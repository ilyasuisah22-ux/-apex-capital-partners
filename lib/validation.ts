import { z } from "zod";
import { services } from "@/lib/constants";

const serviceNames = [...services.map((item) => item.title), "Other"] as const;

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(40),
  country: z.string().trim().min(2).max(100),
  service: z.enum(serviceNames),
  applicants: z.coerce.number().int().min(1).max(100),
  message: z.string().trim().min(20).max(5000),
  website: z.string().max(0).optional(),
});

export const inquiryStatusSchema = z.enum(["new", "contacted", "in_progress", "completed", "archived"]);

export const mediaTypeSchema = z.enum(["image", "video"]);
export const allowedImageMimeTypes = ["image/jpeg", "image/png", "image/webp"] as const;
export const allowedVideoMimeTypes = ["video/mp4", "video/webm"] as const;
export const MAX_IMAGES = 5;
export const MAX_VIDEOS = 3;
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 100 * 1024 * 1024;

export function validateMediaFile(file: File) {
  const isImage = (allowedImageMimeTypes as readonly string[]).includes(file.type);
  const isVideo = (allowedVideoMimeTypes as readonly string[]).includes(file.type);
  if (!isImage && !isVideo) return { ok: false as const, message: "Unsupported file type. Use JPG, PNG, WEBP, MP4, or WEBM." };
  if (isImage && file.size > MAX_IMAGE_BYTES) return { ok: false as const, message: "Image is too large. Maximum size is 10 MB." };
  if (isVideo && file.size > MAX_VIDEO_BYTES) return { ok: false as const, message: "Video is too large. Maximum size is 100 MB." };
  return { ok: true as const, mediaType: isImage ? "image" as const : "video" as const };
}

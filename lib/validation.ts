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
export { allowedImageMimeTypes, allowedVideoMimeTypes, MAX_IMAGES, MAX_VIDEOS, MAX_IMAGE_BYTES, MAX_VIDEO_BYTES, mediaLimitReached, validateMediaFile } from "@/lib/media-validation";

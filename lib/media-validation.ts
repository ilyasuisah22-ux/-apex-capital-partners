export const allowedImageMimeTypes = ["image/jpeg", "image/png", "image/webp"] as const;
export const allowedVideoMimeTypes = ["video/mp4", "video/webm"] as const;
export const MAX_IMAGES = 5;
export const MAX_VIDEOS = 3;
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 100 * 1024 * 1024;

type UploadFile = Pick<File, "type" | "size">;

export function validateMediaFile(file: UploadFile) {
  const isImage = (allowedImageMimeTypes as readonly string[]).includes(file.type);
  const isVideo = (allowedVideoMimeTypes as readonly string[]).includes(file.type);
  if (!isImage && !isVideo) return { ok: false as const, message: "Unsupported file type. Use JPG, PNG, WEBP, MP4, or WEBM." };
  if (isImage && file.size > MAX_IMAGE_BYTES) return { ok: false as const, message: "Image is too large. Maximum size is 10 MB." };
  if (isVideo && file.size > MAX_VIDEO_BYTES) return { ok: false as const, message: "Video is too large. Maximum size is 100 MB." };
  return { ok: true as const, mediaType: isImage ? "image" as const : "video" as const };
}

export function mediaLimitReached(mediaType: "image" | "video", currentCount: number) {
  return currentCount >= (mediaType === "image" ? MAX_IMAGES : MAX_VIDEOS);
}

import { v2 as cloudinary } from "cloudinary";
import { getCloudinaryEnv } from "@/lib/config";

export const CLOUDINARY_PREFIX = "cloudinary:";

function configuredCloudinary() {
  const env = getCloudinaryEnv();
  if (!env) throw new Error("Cloudinary is not configured.");
  cloudinary.config({ cloud_name: env.CLOUDINARY_CLOUD_NAME, api_key: env.CLOUDINARY_API_KEY, api_secret: env.CLOUDINARY_API_SECRET, secure: true });
  return cloudinary;
}

export function createUploadSignature(publicId: string, timestamp: number, resourceType: "image" | "video") {
  const client = configuredCloudinary();
  const env = getCloudinaryEnv();
  if (!env) throw new Error("Cloudinary is not configured.");
  const format = resourceType === "image" ? "webp" : undefined;
  const signedParameters = format ? { format, public_id: publicId, timestamp } : { public_id: publicId, timestamp };
  const signature = client.utils.api_sign_request(signedParameters, env.CLOUDINARY_API_SECRET);
  return { signature, timestamp, publicId, format, cloudName: env.CLOUDINARY_CLOUD_NAME, apiKey: env.CLOUDINARY_API_KEY };
}

export async function getCloudinaryAsset(publicId: string, resourceType: "image" | "video") {
  return configuredCloudinary().api.resource(publicId, { resource_type: resourceType });
}

export async function deleteCloudinaryAsset(publicId: string, resourceType: "image" | "video") {
  await configuredCloudinary().uploader.destroy(publicId, { resource_type: resourceType, invalidate: true });
}

import { z } from "zod";

const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const serverSchema = publicSchema.extend({
  CLOUDINARY_CLOUD_NAME: z.string().min(1).optional(),
  CLOUDINARY_API_KEY: z.string().min(1).optional(),
  CLOUDINARY_API_SECRET: z.string().min(1).optional(),
  NOTIFICATION_EMAIL: z.string().email().optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM_EMAIL: z.string().min(1).optional(),
});

const cloudinarySchema = z.object({
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
});

function parse<T extends z.ZodType>(schema: T) {
  const result = schema.safeParse(process.env);
  if (!result.success) return null;
  return result.data as z.infer<T>;
}

export function getPublicEnv() {
  const result = publicSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  return result.success ? result.data : null;
}

export function getServerEnv() {
  return parse(serverSchema);
}

export function getCloudinaryEnv() {
  const result = cloudinarySchema.safeParse(process.env);
  return result.success ? result.data : null;
}

export function requireServerEnv() {
  const env = getServerEnv();
  if (!env) throw new Error("Required server environment variables are not configured.");
  return env;
}

export function isBackendConfigured() {
  return getPublicEnv() !== null;
}

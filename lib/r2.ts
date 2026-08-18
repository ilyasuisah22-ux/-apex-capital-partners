import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getServerEnv, isR2Configured } from "@/lib/config";

function client() {
  const env = getServerEnv();
  if (!isR2Configured() || !env?.R2_ACCOUNT_ID || !env.R2_ACCESS_KEY_ID || !env.R2_SECRET_ACCESS_KEY) return null;
  return { s3: new S3Client({ region: "auto", endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY } }), env };
}

export async function uploadToR2(key: string, body: Uint8Array, contentType: string) {
  const configured = client();
  if (!configured || !configured.env.R2_BUCKET_NAME) throw new Error("Media storage is not configured.");
  await configured.s3.send(new PutObjectCommand({ Bucket: configured.env.R2_BUCKET_NAME, Key: key, Body: body, ContentType: contentType }));
  return `${configured.env.R2_PUBLIC_BASE_URL}/${key}`;
}

export async function deleteFromR2(key: string) {
  const configured = client();
  if (!configured || !configured.env.R2_BUCKET_NAME) throw new Error("Media storage is not configured.");
  await configured.s3.send(new DeleteObjectCommand({ Bucket: configured.env.R2_BUCKET_NAME, Key: key }));
}

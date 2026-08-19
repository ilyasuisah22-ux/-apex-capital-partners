import sharp from "sharp";

export const optimizedImageMimeType = "image/webp";

export async function convertImageToWebP(input: Uint8Array) {
  const output = await sharp(input).rotate().webp({ quality: 82, effort: 4 }).toBuffer();
  return new Uint8Array(output);
}

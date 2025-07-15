import { put } from "@vercel/blob";

export async function uploadFileToBlob(
  file: File,
  pathname: string
): Promise<string> {
  try {
    const { url } = await put(pathname, file, {
      access: "public",
    });
    return url;
  } catch (error) {
    console.error("Error uploading file to Vercel Blob:", error);
    throw new Error("Failed to upload file.");
  }
}

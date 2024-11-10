'use server';

import { promises as fs } from 'fs';
import * as path from 'path';

/**
 * Converts a base64 string to an image file and saves it in the specified folder.
 * @param base64String - The base64-encoded image string.
 * @param folderPath - The path to the folder where the image will be saved.
 * @param fileName - Optional. The name of the image file. If not provided, a default name is generated.
 * @returns A promise that resolves when the image is saved.
 */
export async function base64ToImage(
  base64String: string,
  folderPath: string,
  fileName?: string,
): Promise<void> {
  // Ensure the folder exists
  try {
    await fs.access(folderPath);
  } catch {
    await fs.mkdir(folderPath, { recursive: true });
  }

  // Extract the MIME type and base64 data
  const matches = base64String.match(/^data:(.+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Invalid base64 string format.');
  }
  const mimeType = matches[1];
  const base64Data = matches[2];

  // Convert base64 string to a buffer
  const buffer = Buffer.from(base64Data, 'base64');

  // Determine the file extension based on the MIME type
  const extensionMap: { [key: string]: string } = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/bmp': '.bmp',
    'image/svg+xml': '.svg',
  };
  const extension = extensionMap[mimeType];
  if (!extension) {
    throw new Error(`Unsupported image type: ${mimeType}`);
  }

  // Generate or sanitize the file name
  if (!fileName) {
    fileName = `image_${Date.now()}${extension}`;
  } else {
    fileName = path.basename(fileName, path.extname(fileName)) + extension;
  }

  const filePath = path.join(folderPath, fileName);

  // Write the image buffer to a file
  await fs.writeFile(filePath, buffer);
}

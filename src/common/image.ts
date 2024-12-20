import { readFileSync } from "node:fs";

export function loadBuffer(path: string): Buffer {
  const faviconFile = readFileSync(path);
  const faviconToBase64 = Buffer.from(faviconFile).toString('base64');
  return Buffer.from(faviconToBase64, 'base64');
}
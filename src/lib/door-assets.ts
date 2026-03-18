/** Static URL for images under `public/doors` (本项目内素材). */
export function doorImageSrc(folder: string, filename: string): string {
  return `/doors/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;
}

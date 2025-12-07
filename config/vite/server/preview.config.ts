import type { PreviewOptions } from 'vite'

export function createPreviewConfig(previewPort: number): PreviewOptions {
  return {
    open: true,
    host: true,
    port: previewPort,
    strictPort: true,
    cors: true,
  }
}

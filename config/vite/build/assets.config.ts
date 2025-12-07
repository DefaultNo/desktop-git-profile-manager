import path from 'path'

export function createAssetFileNames(assetInfo: { names?: string[] }): string {
  const fileName = assetInfo.names?.[0]
  if (!fileName) return 'assets/[name]-[hash][extname]'

  const ext = path.extname(fileName)

  if (ext === '.css') return 'assets/css/[name]-[hash][extname]'
  if (/\.(png|jpe?g|svg|gif)$/.test(ext)) return 'assets/images/[name]-[hash][extname]'
  if (/\.(woff2?|ttf|eot)$/.test(ext)) return 'assets/fonts/[name]-[hash][extname]'

  return 'assets/[ext]/[name]-[hash][extname]'
}

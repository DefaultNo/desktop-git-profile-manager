export function createManualChunks(id: string): string | undefined {
  /* react */

  /* DO NOT USE IN REACT V19+ (BREAKS THE BUILD)
  if (/\bnode_modules\/(react|react-dom|react-router-dom)\b/.test(id)) {
    return 'react-vendor'
  }
   */

  /* utils */
  if (/\bnode_modules\/(axios)\b/.test(id)) {
    return 'utils-vendor'
  }

  /* other */
  if (id.includes('node_modules')) {
    return 'vendor'
  }

  return undefined
}

export interface ViteEnvironment {
  mode: string
  isDev: boolean
  isProd: boolean
  isStage: boolean
}

export interface ViteEnvVars {
  VITE_PORT: string
  VITE_OUT_DIR: string
  VITE_SOURCEMAP: string
  VITE_PREVIEW_PORT: string
  VITE_OPEN_BROWSER: string
  VITE_BUNDLE_ANALYZE: string
}


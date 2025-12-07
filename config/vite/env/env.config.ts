import { loadEnv } from 'vite'
import type { ViteEnvironment, ViteEnvVars } from '../types'

export function loadEnvironment(mode: string): ViteEnvVars {
  return loadEnv(mode, process.cwd(), '') as unknown as ViteEnvVars;
}

export function parsePorts(env: ViteEnvVars): { port: number; previewPort: number } {
  const port = parseInt(env.VITE_PORT || '3000', 10)
  const previewPort = parseInt(env.VITE_PREVIEW_PORT || '3000', 10)

  return {
    port,
    previewPort
  }
}

export function createDefines(environment: ViteEnvironment): Record<string, boolean> {
  return {
    __DEV__: environment.isDev,
    __PROD__: environment.isProd,
    __STAGE__: environment.isStage,
  }
}

export function createEnvironment(mode: string): ViteEnvironment {
  const isDev = mode === 'development'
  const isProd = mode === 'production'
  const isStage = mode === 'staging'

  return {
    isDev,
    isProd,
    isStage,
    mode,
  };
}

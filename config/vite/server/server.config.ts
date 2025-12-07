import {ServerOptions} from "vite"
import type { ViteEnvironment, ViteEnvVars } from '../types'

export function createServerConfig(environment: ViteEnvironment, env: ViteEnvVars, port: number): ServerOptions {
  return {
    port,
    host: true,
    strictPort: true,
    hmr: true,
    open: env.VITE_OPEN_BROWSER === 'true' || false,
    cors: true,
    watch: {
      usePolling: true,
      interval: 1000,
    }
  };
}

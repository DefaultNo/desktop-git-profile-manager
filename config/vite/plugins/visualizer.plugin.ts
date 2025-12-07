import type { PluginOption } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import type { ViteEnvironment, ViteEnvVars } from '../types'

export function createVisualizerPlugin(
  environment: ViteEnvironment,
  env: ViteEnvVars
): PluginOption | false {
  if (!environment.isProd || env.VITE_BUNDLE_ANALYZE !== 'true') {
    return false;
  }

  return visualizer({
    filename: 'build/stats.html',
    open: env.VITE_BUNDLE_ANALYZE === 'true',
    gzipSize: true,
    brotliSize: true,
    template: 'treemap',
  }) as PluginOption
}

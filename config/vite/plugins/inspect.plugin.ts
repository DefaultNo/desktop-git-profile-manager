import Inspect from 'vite-plugin-inspect'
import type { PluginOption } from 'vite'
import type { ViteEnvironment } from '../types'

export function createInspectPlugin(environment: ViteEnvironment): PluginOption | false {
  if (!environment.isDev) {
    return false
  }

  return Inspect()
}

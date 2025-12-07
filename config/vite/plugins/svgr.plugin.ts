import svgr from 'vite-plugin-svgr'
import type { PluginOption } from 'vite'

export function createSVGRPlugin(): PluginOption {
  return svgr()
}

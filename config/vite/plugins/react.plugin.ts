import react from '@vitejs/plugin-react-swc'
import type { PluginOption } from 'vite'

export function createReactPlugin(): PluginOption {
  return react()
}

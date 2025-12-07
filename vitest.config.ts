import { defineConfig } from 'vite'
import viteConfig from './vite.config'
import { createVitestConfig } from './config'

export default defineConfig(({ mode, command }) => {
  const resolvedViteConfig = viteConfig({ mode, command })
  return createVitestConfig({ mode, command }, resolvedViteConfig)
})
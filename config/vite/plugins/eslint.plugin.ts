// @ts-ignore - vite-plugin-eslint types issue
import eslint from 'vite-plugin-eslint'
import type { PluginOption } from 'vite'
import type { ViteEnvironment } from '../types'

export function createESLintPlugin(environment: ViteEnvironment): PluginOption | false {
  if (!environment.isDev) {
    return false;
  }

  return eslint({
    fix: true,
    cache: true,
    lintOnStart: true,
    include: ['src/**/*.{ts,tsx,js,jsx}'],
    cacheLocation: 'node_modules/.cache/.eslintcache',
    exclude: ['node_modules', 'build', 'src/app/typings/**/*.d.ts'],
  });
}

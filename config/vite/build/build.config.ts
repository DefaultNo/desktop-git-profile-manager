import path from 'path'
import { BuildOptions } from "vite"
import { createManualChunks } from './chunks.config'
import { createAssetFileNames } from './assets.config'
import type { ViteEnvironment, ViteEnvVars } from '../types'

export function createBuildConfig(environment: ViteEnvironment, env: ViteEnvVars): BuildOptions {
  const sourcemap = environment.isDev || environment.isStage || env.VITE_SOURCEMAP === 'true'

  return {
    target: 'es2022',
    cssCodeSplit: true,
    outDir: env.VITE_OUT_DIR || 'build',
    sourcemap,
    minify: environment.isProd ? 'esbuild' : false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: path.resolve(process.cwd(), './index.html'),
      },
      output: {
        format: 'esm',
        entryFileNames: environment.isDev ? 'assets/js/[name].js'
                                          : 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/chunks/[name]-[hash].js',
        assetFileNames: createAssetFileNames,
        manualChunks: createManualChunks,
      },
    },
  };
}

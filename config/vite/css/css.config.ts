import {CSSOptions} from "vite"
import type { ViteEnvironment } from '../types'
import { createPostCSSPlugins } from './postcss.config'

export function createCSSConfig(environment: ViteEnvironment): CSSOptions {
  return {
    postcss: {
      plugins: createPostCSSPlugins(environment),
    },
    modules: {
      localsConvention: 'camelCase' as const,
      generateScopedName: environment.isDev
        ? '[path][name]__[local]--[hash:base64:8]'
        : '[hash:base64:8]',
    },
    devSourcemap: environment.isDev,
  }
}

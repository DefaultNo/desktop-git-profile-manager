import type { UserConfig } from 'vite'
import { createCSSConfig } from './css'
import { createPlugins } from './plugins'
import { createResolveConfig } from './resolve'
import { createBuildConfig, createESBuildConfig } from './build'
import { createServerConfig, createPreviewConfig } from './server'
import { loadEnvironment, createEnvironment, parsePorts, createDefines } from './env'

export function createViteConfig(mode: string): UserConfig {
  const env = loadEnvironment(mode);
  const environment = createEnvironment(mode);
  const { port, previewPort } = parsePorts(env);

  return {
    base: './',

    envPrefix: ['VITE_', 'APP_'],

    server: createServerConfig(environment, env, port),

    preview: createPreviewConfig(previewPort),

    plugins: createPlugins(environment, env),

    css: createCSSConfig(environment),

    resolve: createResolveConfig(),

    define: createDefines(environment),

    assetsInclude: ['**/*.csv'],

    esbuild: createESBuildConfig(environment),

    build: createBuildConfig(environment, env),
  }
}

import type { PluginOption } from 'vite';
import { createSVGRPlugin } from './svgr.plugin'
import { createReactPlugin } from './react.plugin'
import { createESLintPlugin } from './eslint.plugin'
import { createInspectPlugin } from './inspect.plugin'
import { createVisualizerPlugin } from './visualizer.plugin'
import type { ViteEnvironment, ViteEnvVars } from '../types'

export function createPlugins(
  environment: ViteEnvironment,
  env: ViteEnvVars
): PluginOption[] {
  const plugins: (PluginOption | false)[] = [
    createSVGRPlugin(),
    createReactPlugin(),
    createInspectPlugin(environment),
    createESLintPlugin(environment),
    createVisualizerPlugin(environment, env),
  ];

  return plugins.filter(Boolean)
}

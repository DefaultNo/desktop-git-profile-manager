import { ESBuildOptions } from 'vite'
import type { ViteEnvironment } from '../types'

export function createESBuildConfig(environment: ViteEnvironment): ESBuildOptions  {
  return {
    drop: environment.isProd ? ['console', 'debugger'] : [],
    legalComments: environment.isProd ? 'none' : 'inline',
  }
}

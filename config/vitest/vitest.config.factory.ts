import { UserConfig } from "vite"
import { mergeConfig } from 'vitest/config'

import { createTestProjects } from './projects'
import type { VitestEnvironment } from './types'

export function createVitestConfig(environment: VitestEnvironment, viteConfig: UserConfig): UserConfig {
  const aliases = viteConfig.resolve?.alias as Record<string, string>

  const testConfig = {
    test: {
      projects: createTestProjects(aliases),
    },
    resolve: {
      alias: aliases,
    },
  }

  return mergeConfig(viteConfig, testConfig)
}

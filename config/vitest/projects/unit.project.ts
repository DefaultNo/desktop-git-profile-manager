import { ViteUserConfig } from "vitest/config"

export function createUnitProject(aliases?: Record<string, string>): ViteUserConfig {
  return {
    test: {
      name: 'unit',
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      browser: {
        enabled: true,
        provider: 'playwright',
        instances: [
          { browser: 'chromium' },
        ],
      },
    },
    resolve: {
      alias: aliases,
    },
  }
}

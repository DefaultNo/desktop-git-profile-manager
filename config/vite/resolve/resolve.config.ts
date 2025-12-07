import path from 'path'
import { UserConfig } from "vite"

export function createResolveConfig(): NonNullable<UserConfig['resolve']> {
  return {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  };
}

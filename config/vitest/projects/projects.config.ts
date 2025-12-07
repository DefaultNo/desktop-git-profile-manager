import {ViteUserConfig} from "vitest/config"
import { createUnitProject } from './unit.project'

export function createTestProjects(aliases?: Record<string, string>): ViteUserConfig[] {
  return [
    createUnitProject(aliases)
  ]
}

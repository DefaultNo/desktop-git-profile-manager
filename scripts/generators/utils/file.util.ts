import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'

import type {
	ITemplateContext,
} from '../types/generator.types'

export const ensureDir = (dirPath: string): void => {
	if (!existsSync(dirPath)) {
		mkdirSync(dirPath, { recursive: true })
	}
}

export const fileExists = (filePath: string): boolean => {
	return existsSync(filePath)
}

export const processTemplate = (templatePath: string, context: ITemplateContext): string => {
	const template = readFileSync(templatePath, 'utf-8')

	return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
		const value = context[key as keyof ITemplateContext]
		return String(value ?? match)
	})
}

export const writeFile = (filePath: string, content: string): void => {
	ensureDir(dirname(filePath))
	writeFileSync(filePath, content, 'utf-8')
}

export const getProjectRoot = (): string => {
	return process.cwd()
}

export const resolvePath = (...paths: string[]): string => {
	return join(getProjectRoot(), ...paths)
}

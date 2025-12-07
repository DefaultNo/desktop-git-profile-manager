import { join } from 'path'

import type {
	IGeneratorConfig,
	ITemplateContext,
} from '../types/generator.types'
import {
	fileExists,
	processTemplate,
	resolvePath,
	writeFile,
} from './file.util'

export const generateFromConfig = (
	config: IGeneratorConfig,
	context: ITemplateContext,
	options: { checkExisting?: boolean } = {},
): void => {
	const targetPath = processTemplateString(config.targetPath, context)
	const fullTargetPath = resolvePath(targetPath)

	if (options.checkExisting && fileExists(fullTargetPath)) {
		throw new Error(`Target already exists: ${fullTargetPath}`)
	}

	console.log(`Target path: ${fullTargetPath}`)

	for (const template of config.templates) {
		if (template.condition && !template.condition(context)) {
			continue
		}

		const templatePath = resolvePath('scripts', 'generators', 'templates', template.templatePath)
		const outputPath = processTemplateString(template.outputPath, context)
		const fullOutputPath = join(fullTargetPath, outputPath)

		if (!fileExists(templatePath)) {
			throw new Error(`Template not found: ${templatePath}`)
		}

		const content = processTemplate(templatePath, context)

		writeFile(fullOutputPath, content)

		console.log(`  ${fullOutputPath}`)
	}
}

const processTemplateString = (template: string, context: ITemplateContext): string => {
	return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
		const value = context[key as keyof ITemplateContext]

		return String(value ?? match)
	})
}

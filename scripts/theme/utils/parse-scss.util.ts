import fs from 'fs'
import path from 'path'

export interface CSSVariable {
	name: string;
	value: string;
	kebabCase: string;
	camelCase: string;
}

export interface ParsedTheme {
	themeName: string;
	variables: CSSVariable[];
	filePath: string;
}

export const extractCSSVariables = (scssContent: string): CSSVariable[] => {
	const regex = /--([a-zA-Z][a-zA-Z0-9-]*)\s*:\s*([^;]+);/g
	const variables: CSSVariable[] = []
	let match

	while ((match = regex.exec(scssContent)) !== null) {
		const kebabCase = match[1]
		const value = match[2]?.trim()

		if (typeof kebabCase === 'string' && typeof value === 'string') {
			const camelCase = kebabCase
				.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
				.replace(/-(\d)/g, '$1')

			variables.push({
				name: `--${kebabCase}`,
				value,
				kebabCase,
				camelCase,
			})
		}
	}

	return variables.filter((variable, index, self) =>
		index === self.findIndex(v => v.kebabCase === variable.kebabCase),
	)
}

export const parseThemeFile = (filePath: string): ParsedTheme | null => {
	try {
		const scssContent = fs.readFileSync(filePath, 'utf-8')
		const fileName = path.basename(filePath, '.scss')
		const variables = extractCSSVariables(scssContent)

		if (variables.length === 0) {
			console.warn(`No CSS variables found in ${filePath}`)
			return null
		}

		return {
			themeName: fileName,
			variables,
			filePath,
		}
	}
	catch (error) {
		console.error(`Error parsing ${filePath}:`, error)
		return null
	}
}

export const parseAllThemes = (themesDir: string): ParsedTheme[] => {
	try {
		const files = fs.readdirSync(themesDir)
		const scssFiles = files.filter(file => file.endsWith('.scss'))

		const parsedThemes = scssFiles
			.map(file => parseThemeFile(path.join(themesDir, file)))
			.filter((theme): theme is ParsedTheme => theme !== null)

		return parsedThemes
	}
	catch (error) {
		console.error(`Error reading themes directory ${themesDir}:`, error)
		return []
	}
}

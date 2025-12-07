import type {
	CSSVariable,
} from './parse-scss.util'

export const extractCSSVariablesFromCSS = (cssContent: string): CSSVariable[] => {
	const variables: CSSVariable[] = []

	const cssVarRegex = /--([a-zA-Z][a-zA-Z0-9-]*)\s*:\s*([^;}]+)/g
	let match

	while ((match = cssVarRegex.exec(cssContent)) !== null) {
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

export const extractThemeSpecificVariables = (
	cssContent: string,
	themeSelector: string,
): CSSVariable[] => {
	let selectorToFind = themeSelector

	if (themeSelector === ':root') {
		selectorToFind = '(?::root|\\[data-theme=light\\])'
	} else {
		selectorToFind = themeSelector.replace(/"/g, '')
	}

	const blockRegex = new RegExp(`${selectorToFind}[^{]*{([^}]+)}`, 'gs')
	const variables: CSSVariable[] = []
	let match

	while ((match = blockRegex.exec(cssContent)) !== null) {
		const [blockContent] = match

		const blockVariables = extractCSSVariablesFromCSS(blockContent)
		variables.push(...blockVariables)
	}

	return variables
}

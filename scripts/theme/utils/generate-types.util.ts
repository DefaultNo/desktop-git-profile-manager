import type {
	CSSVariable,
} from './parse-scss.util'

export const generateThemeColorsInterface = (variables: CSSVariable[]): string => {
	const uniqueVariables = variables.filter((variable, index, self) =>
		index === self.findIndex(v => v.camelCase === variable.camelCase),
	)

	const interfaceProps = uniqueVariables
		.map(variable => `\t/** CSS variable: ${variable.name} */\n\t${variable.camelCase}: string;`)
		.join('\n')

	return `/**
 * Theme colors extracted from SCSS files
 * Auto-generated - DO NOT EDIT MANUALLY!
 */
export interface IThemeColors {
${interfaceProps}
}`
}


export const generateCSSVariablesConstants = (variables: CSSVariable[]): string => {
	const uniqueVariables = variables.filter((variable, index, self) =>
		index === self.findIndex(v => v.camelCase === variable.camelCase),
	)

	const constants = uniqueVariables
		.map(variable => `\t${variable.camelCase}: '${variable.name}',`)
		.join('\n')

	return `/**
 * CSS variable names mapping
 * Auto-generated - DO NOT EDIT MANUALLY!
 */
export const THEME_CSS_VARIABLES = {
${constants}
} as const`
}


export const generateTypesFile = (allVariables: CSSVariable[]): string => {
	const interfaceCode = generateThemeColorsInterface(allVariables)
	const constantsCode = generateCSSVariablesConstants(allVariables)

	return `${interfaceCode}

${constantsCode}
`
}

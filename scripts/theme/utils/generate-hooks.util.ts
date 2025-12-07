import type {
	CSSVariable,
} from './parse-scss.util'

export const generateUseThemeColorsHook = (variables: CSSVariable[]): string => {
	const uniqueVariables = variables.filter((variable, index, self) =>
		index === self.findIndex(v => v.camelCase === variable.camelCase),
	)

	const hookProps = uniqueVariables
		.map(variable => `\t\t${variable.camelCase}: getCSSVar('${variable.name}'),`)
		.join('\n')

	return `
import {
	useMemo,
} from 'react'

import {
	useTheme,
} from '@/shared/lib/hooks'

import type {
	IThemeColors,
} from './theme-colors.types'

/**
 * Hook that provides direct access to current theme colors
 * Auto-generated from SCSS files - DO NOT EDIT MANUALLY!
 * 
 * @param mode - 'computed' returns actual RGB values, 'css' returns CSS variables
 * @returns object with current theme colors
 */
export const useThemeColors = (mode: 'computed' | 'css' = 'computed'): IThemeColors => {
	const { actualTheme, stylesReady } = useTheme()

	return useMemo(() => {
		const getCSSVar = (varName: string): string => {
			if (typeof window === 'undefined') {
				return ''
			}

			if (mode === 'css') {
				return \`var(\${varName})\`
			}

			if (!stylesReady) {
				return ''
			}

			const value = getComputedStyle(document.documentElement)
				.getPropertyValue(varName)
				.trim()

			return value
		}

		return {
			${hookProps}
		}
	// eslint-disable-next-line
	}, [actualTheme, stylesReady, mode])
}`
}

export const generateHooksFile = (variables: CSSVariable[]): string => {
	const useThemeColorsCode = generateUseThemeColorsHook(variables)

	const imports = `import {
	useMemo,
} from 'react'

import {
	useTheme,
} from '@/shared/lib/hooks'

import type {
	IThemeColors,
} from './theme-colors.types'`

	const cleanUseThemeColors = useThemeColorsCode
		.replace(/import[\s\S]*?from.*?\n\n/g, '')
		.replace(/import[\s\S]*?} from.*?\n\n/g, '')

	return `${imports}

${cleanUseThemeColors}

/**
 * Hook that provides CSS variables for theme colors (no flickering)
 * Use this when you want smooth transitions without computed values
 * 
 * @returns object with CSS variable references
 */
export const useThemeColorsCSS = (): IThemeColors => {
	return useThemeColors('css')
}
`
}

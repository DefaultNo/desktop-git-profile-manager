import type {
	ThemeName,
} from '@/app/config/theme'

/**
 * Determines the preferred system theme
 * @returns "dark" if the system prefers a dark theme, otherwise "light"
 */
export const getSystemPreferredTheme = (): 'light' | 'dark' => {
	if (typeof window === 'undefined') {
		return 'light'
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches ?
		'dark' :
		'light'
}

/**
 * Creates a listener for system theme changes
 */
export const createSystemThemeListener = (
	callback: (theme: 'light' | 'dark') => void,
): (() => void) => {
	if (typeof window === 'undefined') {
		// eslint-disable-next-line
		return (): void => {}
	}

	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

	const handleChange = (e: MediaQueryListEvent): void => {
		callback(e.matches ?
			'dark' :
			'light')
	}

	mediaQuery.addEventListener('change', handleChange)

	return (): void => {
		mediaQuery.removeEventListener('change', handleChange)
	}
}

/**
 * Determines the actual theme for the system theme
 * @param selectedTheme - the theme selected by the user
 */
export const resolveSystemTheme = (selectedTheme: ThemeName): Exclude<ThemeName, 'system'> => {
	if (selectedTheme === 'system') {
		return getSystemPreferredTheme()
	}

	return selectedTheme
}

export const isSystemTheme = (theme: ThemeName): theme is 'system' => {
	return theme === 'system'
}

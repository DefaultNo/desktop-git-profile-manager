import type {
	ThemeName,
} from '@/app/config/theme'
import {
	THEME_CONFIG,
} from '@/app/config/theme'

export const isValidTheme = (theme: unknown): theme is ThemeName => {
	return typeof theme === 'string' && theme in THEME_CONFIG
}

export const getThemeValid = (theme: unknown, fallback: ThemeName = 'light'): ThemeName => {
	return isValidTheme(theme) ?
		theme :
		fallback
}

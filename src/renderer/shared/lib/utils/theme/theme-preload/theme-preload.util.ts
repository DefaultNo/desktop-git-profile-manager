import type {
	ThemeName,
} from '@/app/config/theme'
import {
	PRELOAD_THEMES,
} from '@/app/config/theme'

import {
	loadTheme,
} from '../theme-load'

/**
 * Preloads specified themes
 */
export const preloadThemes = async(themes: ReadonlyArray<ThemeName>): Promise<void> => {
	const loadPromises = themes.map(async theme => {
		return loadTheme(theme)
	})
	await Promise.allSettled(loadPromises)
}

/**
 * Preloads popular themes based on configuration
 */
export const preloadBaseThemes = async(): Promise<void> => {
	await preloadThemes(PRELOAD_THEMES)
}

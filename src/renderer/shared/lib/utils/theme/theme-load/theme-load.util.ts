import type {
	ThemeName,
} from '@/app/config/theme'
import {
	THEME_MODULES,
} from '@/app/config/theme'

import {
	isThemeLoaded,
	isThemeLoading,
	markThemeAsFailed,
	markThemeAsLoaded,
	markThemeAsLoading,
} from '../theme-load-state'

/**
 * Loads theme dynamically if not already loaded
 */
export const loadTheme = async(themeName: ThemeName): Promise<boolean> => {
	if (isThemeLoaded(themeName)) {
		return true
	}

	if (isThemeLoading(themeName)) {
		return waitForThemeLoad(themeName)
	}

	const themeModule = THEME_MODULES[themeName]

	if (!themeModule) {
		markThemeAsFailed(themeName)
		return false
	}

	markThemeAsLoading(themeName)

	try {
		await themeModule.loader()
		markThemeAsLoaded(themeName)

		return true
	}
	// eslint-disable-next-line
	catch(error) {
		markThemeAsFailed(themeName)

		return false
	}
}

/**
 * Waits for theme to finish loading
 */
const waitForThemeLoad = async(themeName: ThemeName): Promise<boolean> => {
	return new Promise((resolve) => {
		const checkInterval = setInterval(() => {
			if (isThemeLoaded(themeName)) {
				clearInterval(checkInterval)
				resolve(true)
			}
			else if (!isThemeLoading(themeName)) {
				clearInterval(checkInterval)
				resolve(false)
			}
		}, 50)
	})
}

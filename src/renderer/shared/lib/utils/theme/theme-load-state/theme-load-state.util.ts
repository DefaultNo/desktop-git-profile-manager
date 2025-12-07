import type {
	IThemeLoadState,
	ThemeName,
} from '@/app/config/theme'
import {
	ALWAYS_LOADED_THEMES,
} from '@/app/config/theme'

/**
 * Global state for theme loading
 */
const themeLoadState: IThemeLoadState = {
	loaded:  new Set(ALWAYS_LOADED_THEMES),
	loading: new Set(),
	failed:  new Set(),
}

/**
 * Marks theme as loading
 */
export const markThemeAsLoading = (themeName: ThemeName): void => {
	themeLoadState.loading.add(themeName)
}

/**
 * Marks theme as loaded successfully
 */
export const markThemeAsLoaded = (themeName: ThemeName): void => {
	themeLoadState.loaded.add(themeName)
	themeLoadState.loading.delete(themeName)
}

/**
 * Marks theme as failed to load
 */
export const markThemeAsFailed = (themeName: ThemeName): void => {
	themeLoadState.failed.add(themeName)
	themeLoadState.loading.delete(themeName)
}

/**
 * Checks if theme is already loaded
 */
export const isThemeLoaded = (themeName: ThemeName): boolean => {
	return themeLoadState.loaded.has(themeName)
}

/**
 * Checks if theme is currently loading
 */
export const isThemeLoading = (themeName: ThemeName): boolean => {
	return themeLoadState.loading.has(themeName)
}

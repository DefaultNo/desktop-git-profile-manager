import type {
	IThemeConfig,
	ThemeName,
} from '@/app/config/theme'
import {
	THEME_CONFIG,
} from '@/app/config/theme'

export const getAllThemes = (): Array<IThemeConfig> => {
	return Object.values(THEME_CONFIG).sort((a, b) => {
		return a.order - b.order
	})
}

export const getThemeOrder = (): ReadonlyArray<ThemeName> => {
	return getAllThemes().map(theme => {
		return theme.name
	})
}

export const getThemeConfig = (themeName: ThemeName): IThemeConfig => {
	return THEME_CONFIG[themeName]
}

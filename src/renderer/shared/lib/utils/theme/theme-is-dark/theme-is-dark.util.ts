import type {
	ThemeName,
} from '@/app/config/theme'

import {
	getThemeConfig,
} from '../theme-config'

export const isDarkTheme = (theme: ThemeName): boolean => {
	return getThemeConfig(theme).isDark
}


import type {
	ThemeName,
} from '@/app/config/theme'

import {
	getThemeOrder,
} from '../theme-config'

export const THEME_ORDER: ReadonlyArray<ThemeName> = getThemeOrder()

export const getNextTheme = (currentTheme: ThemeName): ThemeName => {
	const currentIndex = THEME_ORDER.indexOf(currentTheme)
	const nextIndex = (currentIndex + 1) % THEME_ORDER.length

	return THEME_ORDER[nextIndex]!
}

export const getPreviousTheme = (currentTheme: ThemeName): ThemeName => {
	const currentIndex = THEME_ORDER.indexOf(currentTheme)
	const previousIndex = currentIndex === 0 ?
		THEME_ORDER.length - 1 :
		currentIndex - 1

	return THEME_ORDER[previousIndex]!
}

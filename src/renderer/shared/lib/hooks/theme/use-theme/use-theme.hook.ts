import {
	useContext,
} from 'react'

import type {
	IThemeContextValue,
} from '@/app/contexts/theme'
import {
	ThemeContext,
} from '@/app/contexts/theme'

export const useTheme = (): IThemeContextValue => {
	const context = useContext(ThemeContext)

	if (!context) {
		throw new Error('useTheme must be used within ThemeProvider')
	}

	return context
}

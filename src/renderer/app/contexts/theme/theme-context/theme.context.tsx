import {
	createContext,
} from 'react'

import type {
	IThemeContextValue,
} from './theme-context.types'

export const ThemeContext = createContext<IThemeContextValue | null>(null)

import type {
	ReactNode,
} from 'react'

import type {
	ThemeName,
} from '@/app/config/theme'

export interface IThemeProviderProps {
	children:      ReactNode
	defaultTheme?: ThemeName
}

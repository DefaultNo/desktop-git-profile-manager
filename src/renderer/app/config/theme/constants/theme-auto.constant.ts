import type {
	IThemeAutoConfig,
} from '../types'

export const DEFAULT_THEME_AUTO_CONFIG: IThemeAutoConfig = {
	enabled:    false,
	lightStart: '06:00',
	darkStart:  '18:00',
	lightTheme: 'light',
	darkTheme:  'dark',
} as const

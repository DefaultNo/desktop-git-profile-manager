import type {
	IThemeConfig,
	ThemeName,
} from '../types'

export const THEME_CONFIG: Record<ThemeName, IThemeConfig> = {
	system: {
		name:        'system',
		displayName: 'System',
		isDark:      false,
		description: 'Follow system theme preference',
		order:       0,
		isSystem:    true,
	},
	light: {
		name:        'light',
		displayName: 'Light',
		isDark:      false,
		description: 'Light theme',
		order:       1,
	},
	dark: {
		name:        'dark',
		displayName: 'Dark',
		isDark:      true,
		description: 'Dark theme',
		order:       2,
	},
	solarized: {
		name:        'solarized',
		displayName: 'Solarized',
		isDark:      true,
		description: 'Solarized dark theme schema',
		order:       3,
	},
	dracula: {
		name:        'dracula',
		displayName: 'Dracula',
		isDark:      true,
		description: 'Dracula dark theme schema',
		order:       4,
	},
} as const

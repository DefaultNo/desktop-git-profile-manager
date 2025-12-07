import type {
	IThemeModule,
	ThemeName,
} from '../types'

export const THEME_MODULES: Partial<Record<ThemeName, IThemeModule>> = {
	dark: {
		loader:  async() => {
			return import('@/app/styles/themes/dark.scss')
		},
		preload: true,
	},
	solarized: {
		loader:  async() => {
			return import('@/app/styles/themes/solarized.scss')
		},
		preload: false,
	},
	dracula: {
		loader:  async() => {
			return import('@/app/styles/themes/dracula.scss')
		},
		preload: false,
	},
} as const

export const ALWAYS_LOADED_THEMES: ReadonlyArray<ThemeName> = [
	'light',
	'system',
] as const

export const PRELOAD_THEMES: ReadonlyArray<ThemeName> = Object.entries(THEME_MODULES)
	.filter(([, module]) => {
		return module.preload
	})
	.map(([theme]) => {
		return theme as ThemeName
	})

import type {
	ThemeName,
} from './theme.types'

export interface IThemeAutoConfig {
	lightTheme: Exclude<ThemeName, 'system'>
	darkTheme:  Exclude<ThemeName, 'system'>
	enabled:    boolean
	lightStart: string;
	darkStart:  string;
}

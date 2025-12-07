export type ThemeName = 'solarized' | 'dracula' | 'system' | 'light' | 'dark'

export interface IThemeConfig {
	name:         ThemeName;
	isDark:       boolean;
	isSystem?:    boolean;
	description?: string;
	order:        number;
	displayName:  string;
}

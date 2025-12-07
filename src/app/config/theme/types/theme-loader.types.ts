import type {
	ThemeName,
} from './theme.types'

export interface IThemeLoadState {
	loading: Set<ThemeName>;
	failed:  Set<ThemeName>;
	loaded:  Set<ThemeName>;
}

export interface IThemeModule {
	loader:   () => Promise<unknown>;
	preload?: boolean;
}

import type {
	IThemeAutoConfig,
	ThemeName,
} from '@/app/config/theme'

export interface IThemeContextValue {
	autoTheme: {
		setConfig: (config: IThemeAutoConfig) => void;
		config:    IThemeAutoConfig;
		toggle:    () => void;
	};
	setTheme:        (theme: ThemeName) => Promise<void>;
	actualTheme:     Exclude<ThemeName, 'system'>;
	availableThemes: ReadonlyArray<ThemeName>;
	toggleTheme:     () => Promise<void>;
	togglePrevTheme: () => Promise<void>;
	currentTheme:    ThemeName;
	isDark:          boolean;
	stylesReady:     boolean;
}

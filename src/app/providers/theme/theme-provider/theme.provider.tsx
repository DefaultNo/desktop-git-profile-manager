import React, {
	useCallback, useEffect, useState,
} from 'react'

import type {
	IThemeAutoConfig,
	ThemeName,
} from '@/app/config/theme'
import {
	DEFAULT_THEME_AUTO_CONFIG,
} from '@/app/config/theme'
import type {
	IThemeContextValue,
} from '@/app/contexts/theme'
import {
	ThemeContext,
} from '@/app/contexts/theme'

import {
	createSystemThemeListener,
	getNextTheme,
	getPreviousTheme,
	getSystemPreferredTheme,
	getThemeTimeBased,
	getThemeValid,
	isDarkTheme,
	isSystemTheme,
	loadTheme,
	preloadBaseThemes,
	resolveSystemTheme,
	THEME_ORDER,
} from '@/shared/lib/utils'
import {
	LOCAL_STORAGE_KEYS,
} from '@/shared/model/enums'

import type {
	IThemeProviderProps,
} from './theme-provider.types'

export const ThemeProvider: React.FC<IThemeProviderProps> = ({
	children,
	defaultTheme = 'light',
}) => {
	const [selectedTheme, setSelectedTheme] = useState<ThemeName>(() => {
		try {
			const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME)
			return getThemeValid(saved, defaultTheme)
		}
		catch {
			return defaultTheme
		}
	})

	const [autoThemeConfig, setAutoThemeConfig] = useState<IThemeAutoConfig>(() => {
		try {
			const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME_AUTO_MODE)
			return saved ?
				JSON.parse(saved) :
				DEFAULT_THEME_AUTO_CONFIG
		}
		catch {
			return DEFAULT_THEME_AUTO_CONFIG
		}
	})

	const [actualTheme, setActualTheme] = useState<Exclude<ThemeName, 'system'>>(() => {
		const theme = getThemeValid(localStorage.getItem(LOCAL_STORAGE_KEYS.THEME), defaultTheme)

		let autoConfig: IThemeAutoConfig

		try {
			const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME_AUTO_MODE)
			autoConfig = saved ?
				JSON.parse(saved) :
				DEFAULT_THEME_AUTO_CONFIG
		}
		catch {
			autoConfig = DEFAULT_THEME_AUTO_CONFIG
		}

		if (theme === 'system' && autoConfig.enabled) {
			return getThemeTimeBased(autoConfig)
		}

		return resolveSystemTheme(theme)
	})

	const [stylesReady, setStylesReady] = useState<boolean>(false)

	useEffect(() => {
		const loadInitialThemeStyles = async(): Promise<void> => {
			if (actualTheme !== 'light') {
				await loadTheme(actualTheme)
			}

			await new Promise(resolve => {
				requestAnimationFrame(resolve)
			})

			setStylesReady(true)
		}

		loadInitialThemeStyles()
	// eslint-disable-next-line
	}, [])

	useEffect(() => {
		const updateActualTheme = async(): Promise<void> => {
			let newActualTheme: Exclude<ThemeName, 'system'>

			if (!isSystemTheme(selectedTheme)) {
				newActualTheme = selectedTheme
			}
			else if (autoThemeConfig.enabled) {
				newActualTheme = getThemeTimeBased(autoThemeConfig)
			}
			else {
				newActualTheme = getSystemPreferredTheme()
			}

			setStylesReady(false)

			if (newActualTheme !== 'light') {
				await loadTheme(newActualTheme)
			}

			setActualTheme(newActualTheme)

			await new Promise(resolve => {
				requestAnimationFrame(resolve)
			})
			setStylesReady(true)
		}

		updateActualTheme()

		if (isSystemTheme(selectedTheme) && !autoThemeConfig.enabled) {
			return createSystemThemeListener(async(newSystemTheme) => {
				setStylesReady(false)

				if (newSystemTheme !== 'light') {
					await loadTheme(newSystemTheme)
				}

				setActualTheme(newSystemTheme)

				await new Promise(resolve => {
					requestAnimationFrame(resolve)
				})

				setStylesReady(true)
			})
		}

		return undefined
	}, [selectedTheme, autoThemeConfig])

	useEffect(() => {
		preloadBaseThemes()
	}, [])

	useEffect(() => {
		const loadInitialTheme = async(): Promise<void> => {
			if (selectedTheme !== 'light' && selectedTheme !== 'system') {
				await loadTheme(selectedTheme)
			}
		}

		loadInitialTheme()
	}, [selectedTheme])

	const setTheme = useCallback(async(theme: ThemeName) => {
		setStylesReady(false)
		const loaded = await loadTheme(theme)

		if (loaded) {
			setSelectedTheme(theme)
			localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, theme)

			await new Promise(resolve => {
				requestAnimationFrame(resolve)
			})

			setStylesReady(true)
		}
	}, [])

	const toggleTheme = useCallback(async() => {
		const nextTheme = getNextTheme(selectedTheme)
		await setTheme(nextTheme)
	}, [selectedTheme, setTheme])

	const togglePrevTheme = useCallback(async() => {
		const prevTheme = getPreviousTheme(selectedTheme)
		await setTheme(prevTheme)
	}, [selectedTheme, setTheme])

	const setAutoConfig = useCallback((config: IThemeAutoConfig) => {
		setAutoThemeConfig(config)
		localStorage.setItem(LOCAL_STORAGE_KEYS.THEME_AUTO_MODE, JSON.stringify(config))
	}, [])

	const toggleAutoTheme = useCallback(() => {
		const newConfig = {
			...autoThemeConfig,
			enabled: !autoThemeConfig.enabled,
		}

		setAutoConfig(newConfig)
	}, [autoThemeConfig, setAutoConfig])

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', actualTheme)
	}, [actualTheme])

	const isDark = isDarkTheme(actualTheme)

	const value: IThemeContextValue = {
		isDark,
		setTheme,
		toggleTheme,
		togglePrevTheme,
		currentTheme:    selectedTheme,
		actualTheme,
		availableThemes: THEME_ORDER,
		stylesReady,
		autoTheme:       {
			config:    autoThemeConfig,
			setConfig: setAutoConfig,
			toggle:    toggleAutoTheme,
		},
	}

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	)
}

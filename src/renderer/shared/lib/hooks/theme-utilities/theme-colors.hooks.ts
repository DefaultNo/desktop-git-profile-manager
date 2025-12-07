
// THIS FILE IS AUTO-GENERATED FROM SCSS THEME FILES
// DO NOT EDIT MANUALLY - RUN 'yarn run theme:generate' TO REGENERATE
// GENERATED AT: 2025-12-07T18:53:56.545Z

import {
	useMemo,
} from 'react'

import {
	useTheme,
} from '@/shared/lib/hooks'

import type {
	IThemeColors,
} from './theme-colors.types'

/**
 * Hook that provides direct access to current theme colors
 * Auto-generated from SCSS files - DO NOT EDIT MANUALLY!
 *
 * @param mode - 'computed' returns actual RGB values, 'css' returns CSS variables
 * @returns object with current theme colors
 */
export const useThemeColors = (mode: 'computed' | 'css' = 'computed'): IThemeColors => {
	const {
		actualTheme, stylesReady,
	} = useTheme()

	return useMemo(() => {
		const getCSSVar = (varName: string): string => {
			if (typeof window === 'undefined') {
				return ''
			}

			if (mode === 'css') {
				return `var(${varName})`
			}

			if (!stylesReady) {
				return ''
			}

			const value = getComputedStyle(document.documentElement)
				.getPropertyValue(varName)
				.trim()

			return value
		}

		return {
			primaryColor:              getCSSVar('--primary-color'),
			onPrimaryColor:            getCSSVar('--on-primary-color'),
			surfaceColor:              getCSSVar('--surface-color'),
			onSurfaceColor:            getCSSVar('--on-surface-color'),
			neutralColor50:            getCSSVar('--neutral-color-50'),
			neutralColor50Rgb:         getCSSVar('--neutral-color-50-rgb'),
			neutralColor50Opacity100:  getCSSVar('--neutral-color-50-opacity-100'),
			neutralColor50Opacity80:   getCSSVar('--neutral-color-50-opacity-80'),
			neutralColor50Opacity60:   getCSSVar('--neutral-color-50-opacity-60'),
			neutralColor50Opacity40:   getCSSVar('--neutral-color-50-opacity-40'),
			neutralColor50Opacity20:   getCSSVar('--neutral-color-50-opacity-20'),
			neutralColor100:           getCSSVar('--neutral-color-100'),
			neutralColor100Rgb:        getCSSVar('--neutral-color-100-rgb'),
			neutralColor100Opacity100: getCSSVar('--neutral-color-100-opacity-100'),
			neutralColor100Opacity80:  getCSSVar('--neutral-color-100-opacity-80'),
			neutralColor100Opacity60:  getCSSVar('--neutral-color-100-opacity-60'),
			neutralColor100Opacity40:  getCSSVar('--neutral-color-100-opacity-40'),
			neutralColor100Opacity20:  getCSSVar('--neutral-color-100-opacity-20'),
			neutralColor200:           getCSSVar('--neutral-color-200'),
			neutralColor200Rgb:        getCSSVar('--neutral-color-200-rgb'),
			neutralColor200Opacity100: getCSSVar('--neutral-color-200-opacity-100'),
			neutralColor200Opacity80:  getCSSVar('--neutral-color-200-opacity-80'),
			neutralColor200Opacity60:  getCSSVar('--neutral-color-200-opacity-60'),
			neutralColor200Opacity40:  getCSSVar('--neutral-color-200-opacity-40'),
			neutralColor200Opacity20:  getCSSVar('--neutral-color-200-opacity-20'),
			neutralColor300:           getCSSVar('--neutral-color-300'),
			neutralColor300Rgb:        getCSSVar('--neutral-color-300-rgb'),
			neutralColor300Opacity100: getCSSVar('--neutral-color-300-opacity-100'),
			neutralColor300Opacity80:  getCSSVar('--neutral-color-300-opacity-80'),
			neutralColor300Opacity60:  getCSSVar('--neutral-color-300-opacity-60'),
			neutralColor300Opacity40:  getCSSVar('--neutral-color-300-opacity-40'),
			neutralColor300Opacity20:  getCSSVar('--neutral-color-300-opacity-20'),
			neutralColor400:           getCSSVar('--neutral-color-400'),
			neutralColor400Rgb:        getCSSVar('--neutral-color-400-rgb'),
			neutralColor400Opacity100: getCSSVar('--neutral-color-400-opacity-100'),
			neutralColor400Opacity80:  getCSSVar('--neutral-color-400-opacity-80'),
			neutralColor400Opacity60:  getCSSVar('--neutral-color-400-opacity-60'),
			neutralColor400Opacity40:  getCSSVar('--neutral-color-400-opacity-40'),
			neutralColor400Opacity20:  getCSSVar('--neutral-color-400-opacity-20'),
			neutralColor500:           getCSSVar('--neutral-color-500'),
			neutralColor500Rgb:        getCSSVar('--neutral-color-500-rgb'),
			neutralColor500Opacity100: getCSSVar('--neutral-color-500-opacity-100'),
			neutralColor500Opacity80:  getCSSVar('--neutral-color-500-opacity-80'),
			neutralColor500Opacity60:  getCSSVar('--neutral-color-500-opacity-60'),
			neutralColor500Opacity40:  getCSSVar('--neutral-color-500-opacity-40'),
			neutralColor500Opacity20:  getCSSVar('--neutral-color-500-opacity-20'),
			neutralColor600:           getCSSVar('--neutral-color-600'),
			neutralColor600Rgb:        getCSSVar('--neutral-color-600-rgb'),
			neutralColor600Opacity100: getCSSVar('--neutral-color-600-opacity-100'),
			neutralColor600Opacity80:  getCSSVar('--neutral-color-600-opacity-80'),
			neutralColor600Opacity60:  getCSSVar('--neutral-color-600-opacity-60'),
			neutralColor600Opacity40:  getCSSVar('--neutral-color-600-opacity-40'),
			neutralColor600Opacity20:  getCSSVar('--neutral-color-600-opacity-20'),
			neutralColor700:           getCSSVar('--neutral-color-700'),
			neutralColor700Rgb:        getCSSVar('--neutral-color-700-rgb'),
			neutralColor700Opacity100: getCSSVar('--neutral-color-700-opacity-100'),
			neutralColor700Opacity80:  getCSSVar('--neutral-color-700-opacity-80'),
			neutralColor700Opacity60:  getCSSVar('--neutral-color-700-opacity-60'),
			neutralColor700Opacity40:  getCSSVar('--neutral-color-700-opacity-40'),
			neutralColor700Opacity20:  getCSSVar('--neutral-color-700-opacity-20'),
			neutralColor800:           getCSSVar('--neutral-color-800'),
			neutralColor800Rgb:        getCSSVar('--neutral-color-800-rgb'),
			neutralColor800Opacity100: getCSSVar('--neutral-color-800-opacity-100'),
			neutralColor800Opacity80:  getCSSVar('--neutral-color-800-opacity-80'),
			neutralColor800Opacity60:  getCSSVar('--neutral-color-800-opacity-60'),
			neutralColor800Opacity40:  getCSSVar('--neutral-color-800-opacity-40'),
			neutralColor800Opacity20:  getCSSVar('--neutral-color-800-opacity-20'),
			neutralColor900:           getCSSVar('--neutral-color-900'),
			neutralColor900Rgb:        getCSSVar('--neutral-color-900-rgb'),
			neutralColor900Opacity100: getCSSVar('--neutral-color-900-opacity-100'),
			neutralColor900Opacity80:  getCSSVar('--neutral-color-900-opacity-80'),
			neutralColor900Opacity60:  getCSSVar('--neutral-color-900-opacity-60'),
			neutralColor900Opacity40:  getCSSVar('--neutral-color-900-opacity-40'),
			neutralColor900Opacity20:  getCSSVar('--neutral-color-900-opacity-20'),
		}
	// eslint-disable-next-line
	}, [actualTheme, stylesReady, mode])
}

/**
 * Hook that provides CSS variables for theme colors (no flickering)
 * Use this when you want smooth transitions without computed values
 *
 * @returns object with CSS variable references
 */
export const useThemeColorsCSS = (): IThemeColors => {
	return useThemeColors('css')
}

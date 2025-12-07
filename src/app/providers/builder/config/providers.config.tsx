import {
	ErrorBoundary,
} from 'react-error-boundary'
import {
	BrowserRouter,
} from 'react-router-dom'

import {
	I18nProvider,
} from '../../i18n'
import {
	ThemeProvider,
} from '../../theme'
import type {
	IProviderDefinition,
} from '../types'
import {
	createProviderDefinition,
} from '../utils'

export const PROVIDERS_DEFINITIONS: Array<IProviderDefinition> = [
	createProviderDefinition(
		ErrorBoundary,
		{
			fallback: (
				<div>[SET_HERE_ERROR_FALLBACK]</div>
			),
		},
		'error-boundary',
		1,
	),

	createProviderDefinition(
		ThemeProvider,
		{
			defaultTheme: 'light' as const,
		},
		'theme',
		2,
	),

	createProviderDefinition(
		I18nProvider,
		{
			fallback: (
				<div>[SET_HERE_I18N_LOADING_FALLBACK]</div>
			),
		},
		'i18n',
		3,
	),

	createProviderDefinition(
		BrowserRouter,
		{
		},
		'router',
		4,
	),
]

export const DEV_PROVIDERS_DEFINITIONS: Array<IProviderDefinition> = [
	...PROVIDERS_DEFINITIONS,
]

export const STAGE_PROVIDERS_DEFINITIONS: Array<IProviderDefinition> = [
	...PROVIDERS_DEFINITIONS,
]

export const PROD_PROVIDERS_DEFINITIONS: Array<IProviderDefinition> = [
	...PROVIDERS_DEFINITIONS,
]

export const PROVIDER_DEFINITIONS = {
	ERROR_BOUNDARY: PROVIDERS_DEFINITIONS[0],
	THEME:          PROVIDERS_DEFINITIONS[1],
	I18N:           PROVIDERS_DEFINITIONS[2],
	ROUTER:         PROVIDERS_DEFINITIONS[3],
} as const


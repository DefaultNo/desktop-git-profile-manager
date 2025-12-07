import {
	DEV_PROVIDERS_DEFINITIONS,
	PROD_PROVIDERS_DEFINITIONS,
	STAGE_PROVIDERS_DEFINITIONS,
} from '../config'
import type {
	IProviderDefinition,
} from '../types'

export const getProvidersConfig = (): Array<IProviderDefinition> => {
	const mode = import.meta.env.MODE

	switch (mode) {
		case 'development':
			return DEV_PROVIDERS_DEFINITIONS
		case 'staging':
			return STAGE_PROVIDERS_DEFINITIONS
		case 'production':
			return PROD_PROVIDERS_DEFINITIONS
		default:
			return DEV_PROVIDERS_DEFINITIONS
	}
}

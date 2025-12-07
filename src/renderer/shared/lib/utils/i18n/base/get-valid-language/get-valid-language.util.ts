import type {
	SupportedLanguage,
} from '@/app/config/i18n'
import {
	I18N_CONFIG,
} from '@/app/config/i18n'

import {
	isSupportedLanguage,
} from '../is-supported-language'

export const getValidLanguage = (lang?: string): SupportedLanguage => {
	if (!lang) {
		return I18N_CONFIG.LANGUAGE.default
	}

	const [baseLang] = lang.split('-')

	return isSupportedLanguage(baseLang) ?
		baseLang :
		I18N_CONFIG.LANGUAGE.default
}

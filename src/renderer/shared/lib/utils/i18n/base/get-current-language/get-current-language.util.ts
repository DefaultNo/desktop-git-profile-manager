import type {
	SupportedLanguage,
} from '@/app/config/i18n'
import {
	i18nInstance,
} from '@/app/config/i18n'

import {
	getValidLanguage,
} from '../get-valid-language'

export const getCurrentLanguage = (): SupportedLanguage => {
	const currentLang = i18nInstance.language
	return getValidLanguage(currentLang)
}

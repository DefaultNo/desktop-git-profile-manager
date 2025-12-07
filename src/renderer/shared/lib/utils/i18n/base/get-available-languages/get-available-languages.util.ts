import type {
	SupportedLanguage,
} from '@/app/config/i18n'
import {
	I18N_CONFIG,
} from '@/app/config/i18n'

export const getAvailableLanguages = (): Array<SupportedLanguage> => {
	return [...I18N_CONFIG.LANGUAGE.supported]
}

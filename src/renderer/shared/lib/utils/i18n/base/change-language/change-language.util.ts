import type {
	SupportedLanguage,
} from '@/app/config/i18n'
import {
	i18nInstance,
} from '@/app/config/i18n'

export const changeLanguage = async(language: SupportedLanguage): Promise<void> => {
	await i18nInstance.changeLanguage(language)
	localStorage.setItem('i18nextLng', language)
	document.documentElement.lang = language
}

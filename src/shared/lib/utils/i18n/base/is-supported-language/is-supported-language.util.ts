import type {
	SupportedLanguage,
} from '@/app/config/i18n'
import {
	I18N_CONFIG,
} from '@/app/config/i18n'

export const isSupportedLanguage = (lang: undefined | string): lang is SupportedLanguage => {
	if (!lang) {
		return false
	}

	return I18N_CONFIG.LANGUAGE.supported.includes(lang as SupportedLanguage)
}

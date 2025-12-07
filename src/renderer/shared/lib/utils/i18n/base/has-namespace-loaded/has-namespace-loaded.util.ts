import type {
	Namespace, SupportedLanguage,
} from '@/app/config/i18n'
import {
	i18nInstance,
} from '@/app/config/i18n'

import {
	getCurrentLanguage,
} from '../get-current-language'

export const hasNamespaceLoaded = (
	namespace: Namespace,
	language?: SupportedLanguage,
): boolean => {
	const lang = language ?? getCurrentLanguage()
	return i18nInstance.hasResourceBundle(lang, namespace)
}

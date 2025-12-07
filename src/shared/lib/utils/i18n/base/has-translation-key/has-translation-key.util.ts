import type {
	Namespace, SupportedLanguage,
} from '@/app/config/i18n'
import {
	i18nInstance,
} from '@/app/config/i18n'

import {
	formatTranslationKey,
} from '../format-translation-key'
import {
	getCurrentLanguage,
} from '../get-current-language'

export const hasTranslationKey = (
	key: string,
	namespace?: Namespace,
	language?: SupportedLanguage,
): boolean => {
	const lang = language ?? getCurrentLanguage()
	const fullKey = formatTranslationKey(key, namespace)

	return i18nInstance.exists(fullKey, {
		lng: lang,
	})
}

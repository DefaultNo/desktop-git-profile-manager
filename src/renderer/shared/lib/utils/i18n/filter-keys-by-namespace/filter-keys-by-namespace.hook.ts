import type {
	NamespacedTranslationKeys, Resources,
} from '@/app/config/i18n'

import {
	isKeyFromNamespace,
} from '../base/is-key-from-namespace'

export const filterKeysByNamespace = <TNamespace extends keyof Resources>(
	keys: Array<NamespacedTranslationKeys>,
	namespace: TNamespace,
): Array<NamespacedTranslationKeys> => {
	return keys.filter(key => {
		return isKeyFromNamespace(key, namespace)
	})
}

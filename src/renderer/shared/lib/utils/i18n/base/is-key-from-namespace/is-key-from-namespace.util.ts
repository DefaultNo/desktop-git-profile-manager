import type {
	NamespacedTranslationKeys, Resources,
} from '@/app/config/i18n'

export const isKeyFromNamespace = <TNamespace extends keyof Resources>(
	key: NamespacedTranslationKeys,
	namespace: TNamespace,
): key is NamespacedTranslationKeys => {
	return key.startsWith(`${namespace}:`)
}

import type {
	KeysForNamespace, NamespacedTranslationKeys, Resources,
} from '@/app/config/i18n'

export const createTranslationKey = <TNamespace extends keyof Resources>(
	namespace: TNamespace,
	key: KeysForNamespace<TNamespace>,
): NamespacedTranslationKeys => {
	return `${namespace}:${key}` as NamespacedTranslationKeys
}

import type {
	ExtractKeyPath, ExtractNamespace, NamespacedTranslationKeys,
} from '@/app/config/i18n'

export const parseTranslationKey = <T extends NamespacedTranslationKeys>(
	key: T,
): {
	namespace: ExtractNamespace<T>
	keyPath:   ExtractKeyPath<T>
} => {
	const [namespace, keyPath] = key.split(':') as [ExtractNamespace<T>, ExtractKeyPath<T>]
	return {
		namespace, keyPath,
	}
}

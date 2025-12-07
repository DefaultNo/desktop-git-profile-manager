import type {
	NamespacedTranslationKeys,
} from '@/app/config/i18n'

export const defineTranslationKeys = <T extends Record<string, NamespacedTranslationKeys>>(
	keys: T,
): T => {
	return keys
}

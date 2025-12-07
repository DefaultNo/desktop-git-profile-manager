import type {
	Namespace,
} from '@/app/config/i18n'

export const formatTranslationKey = (key: string, namespace?: Namespace): string => {
	return namespace ?
		`${namespace}:${key}` :
		key
}

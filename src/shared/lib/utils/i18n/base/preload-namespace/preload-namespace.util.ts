import type {
	Namespace,
} from '@/app/config/i18n'
import {
	i18nInstance,
} from '@/app/config/i18n'

export const preloadNamespace = async(
	namespace: Array<Namespace> | Namespace,
): Promise<void> => {
	if (Array.isArray(namespace)) {
		await Promise.all(
			namespace.map(async ns => {
				return i18nInstance.loadNamespaces(ns)
			}),
		)
	}
	else {
		await i18nInstance.loadNamespaces(namespace)
	}
}

import type {
	TOptions,
} from 'i18next'
import type {
	useTranslation,
} from 'react-i18next'

import type {
	NamespacedTranslationKeys, Resources,
} from '@/app/config/i18n'

type FilterKeysByNamespace<TNamespace extends keyof Resources> =
	Extract<NamespacedTranslationKeys, `${TNamespace}:${string}`>

export type NamespaceTranslationFunction<TNamespace extends keyof Resources> = (
	key: FilterKeysByNamespace<TNamespace>,
	options?: TOptions,
) => string

export interface ITypedNamespaceTranslationReturn<TNamespace extends keyof Resources> {
	i18n:      ReturnType<typeof useTranslation>['i18n']
	t:         NamespaceTranslationFunction<TNamespace>
	namespace: TNamespace
	isLoading: boolean
	isReady:   boolean
}

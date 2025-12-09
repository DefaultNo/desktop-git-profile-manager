import type {
	useTranslation,
} from 'react-i18next'

import type {
	Resources,
} from '@/app/config/i18n'

import type {
	NamespacedTFunction, TypedTFunction,
} from '@/shared/model/types/i18n'

export interface ITypedMultipleTranslationReturn<TNamespace extends keyof Resources> {
	getNamespaceT: <TSelectedNamespace extends TNamespace>(
		selectedNamespace: TSelectedNamespace,
	) => TypedTFunction<TSelectedNamespace>
	i18n:       ReturnType<typeof useTranslation>['i18n']
	t:          NamespacedTFunction
	namespaces: Array<TNamespace>
	isLoading:  boolean
	isReady:    boolean
}

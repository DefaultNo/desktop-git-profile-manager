import {
	useCallback,
} from 'react'
import {
	useTranslation,
} from 'react-i18next'

import type {
	NamespacedTranslationKeys, Resources,
} from '@/app/config/i18n'

import type {
	ITypedNamespaceTranslationReturn,
	NamespaceTranslationFunction,
} from './use-typed-namespace-translation.types'

export const useTypedNamespaceTranslation = <TNamespace extends keyof Resources>(
	namespace: TNamespace,
): ITypedNamespaceTranslationReturn<TNamespace> => {
	const {
		t: originalT, i18n,
	} = useTranslation()

	const t = useCallback<NamespaceTranslationFunction<TNamespace>>((key, options?) => {
		return originalT(key as NamespacedTranslationKeys, options)
	}, [originalT])

	return {
		t,
		i18n,
		namespace,
		isReady:   i18n.isInitialized,
		isLoading: !i18n.isInitialized,
	}
}

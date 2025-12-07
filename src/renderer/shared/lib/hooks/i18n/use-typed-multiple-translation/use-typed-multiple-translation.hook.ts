import type {
	TOptions,
} from 'i18next'
import {
	useCallback,
} from 'react'
import {
	useTranslation,
} from 'react-i18next'

import type {
	KeysForNamespace, NamespacedTranslationKeys, Resources,
} from '@/app/config/i18n'

import type {
	NamespacedTFunction, TypedTFunction,
} from '@/shared/model/types/i18n'

import type {
	ITypedMultipleTranslationReturn,
} from './use-typed-multiple-translation.types'

export const useTypedMultipleTranslation = <TNamespace extends keyof Resources>(
	namespaces: Array<TNamespace>,
): ITypedMultipleTranslationReturn<TNamespace> => {
	const {
		t: originalT, i18n,
	} = useTranslation(namespaces)

	const getNamespaceT = useCallback(
		<TSelectedNamespace extends TNamespace>(selectedNamespace: TSelectedNamespace,
		): TypedTFunction<TSelectedNamespace> => {
			return (key: KeysForNamespace<TSelectedNamespace>, options?: TOptions): string => {
				return originalT(`${selectedNamespace}:${key}`, options)
			}
		}, [originalT],
	)

	const t = useCallback<NamespacedTFunction>((key: NamespacedTranslationKeys, options?: TOptions): string => {
		return originalT(key, options)
	}, [originalT])

	return {
		t,
		getNamespaceT,
		i18n,
		namespaces,
		isReady:   i18n.isInitialized,
		isLoading: !i18n.isInitialized,
	}
}

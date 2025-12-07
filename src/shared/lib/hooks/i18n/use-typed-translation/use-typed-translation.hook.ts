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
	NamespacedTranslationKeys,
} from '@/app/config/i18n'

import type {
	NamespacedTFunction,
} from '@/shared/model/types/i18n'

import type {
	ITypedTranslationReturn,
} from './use-typed-translation.types'

export const useTypedTranslation = (): ITypedTranslationReturn => {
	const {
		t: originalT, i18n,
	} = useTranslation()

	const t = useCallback<NamespacedTFunction>((key: NamespacedTranslationKeys, options?: TOptions): string => {
		return originalT(key, options)
	}, [originalT])

	return {
		t,
		i18n,
		isReady:   i18n.isInitialized,
		isLoading: !i18n.isInitialized,
	}
}

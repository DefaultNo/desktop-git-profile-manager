import type {
	useTranslation,
} from 'react-i18next'

import type {
	NamespacedTFunction,
} from '@/shared/model/types/i18n'

export interface ITypedTranslationReturn {
	i18n:      ReturnType<typeof useTranslation>['i18n']
	t:         NamespacedTFunction
	isLoading: boolean
	isReady:   boolean
}

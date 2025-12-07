import type {
	useTranslation,
} from 'react-i18next'
import type {
	TypedNamespacedTFunction,
	TypedNamespaceTFunction,
} from 'src/shared/model/types/i18n'

import type {
	SupportedLanguage,
} from '@/app/config/i18n'
import type {
	KeysForNamespace, NamespacedTranslationKeys, Resources,
} from '@/app/config/i18n'

export interface IUseI18nReturn {
	createKey:          <TNamespace extends keyof Resources>(namespace: TNamespace, key: KeysForNamespace<TNamespace>) => NamespacedTranslationKeys
	isKeyFromNamespace: <TNamespace extends keyof Resources>(key: NamespacedTranslationKeys, namespace: TNamespace) => boolean
	getNamespaceT:      <TNamespace extends keyof Resources>(namespace: TNamespace) => TypedNamespaceTFunction<TNamespace>
	tNamespace:         <TNamespace extends keyof Resources>(namespace: TNamespace) => TypedNamespaceTFunction<TNamespace>
	parseKey:           (key: NamespacedTranslationKeys) => {
		namespace: string; keyPath: string
	}
	switchLanguage:     (language: SupportedLanguage) => Promise<void>
	setLanguage:        (language: SupportedLanguage) => Promise<void>
	i18n:               ReturnType<typeof useTranslation>['i18n']
	availableLanguages: Array<SupportedLanguage>
	t:                  TypedNamespacedTFunction
	toggleLanguage:     () => Promise<void>
	currentLanguage:    SupportedLanguage
	isLoading:          boolean
	isReady:            boolean
}

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
	KeysForNamespace,
	NamespacedTranslationKeys,
	Resources,
	SupportedLanguage,
} from '@/app/config/i18n'

import {
	changeLanguage,
	createTranslationKey,
	getAvailableLanguages,
	getCurrentLanguage,
	isKeyFromNamespace,
	parseTranslationKey,
} from '@/shared/lib/utils/i18n'

import type {
	IUseI18nReturn,
} from './use-i18n.types'

export const useI18n = (): IUseI18nReturn => {
	const {
		t: originalT, i18n,
	} = useTranslation()

	const t = useCallback((key: NamespacedTranslationKeys, options?: TOptions): string => {
		return originalT(key, options)
	}, [originalT])

	const tNamespace = useCallback(<TNamespace extends keyof Resources>(namespace: TNamespace) => {
		return (key: KeysForNamespace<TNamespace>, options?: TOptions): string => {
			return originalT(`${namespace}:${key}`, options)
		}
	}, [originalT])

	const getNamespaceT = useCallback(<TNamespace extends keyof Resources>(namespace: TNamespace) => {
		return (key: KeysForNamespace<TNamespace>, options?: TOptions): string => {
			return originalT(`${namespace}:${key}`, options)
		}
	}, [originalT])

	const setLanguage = useCallback(async(language: SupportedLanguage): Promise<void> => {
		await changeLanguage(language)
	}, [])

	const switchLanguage = useCallback(async(language: SupportedLanguage): Promise<void> => {
		const currentLang = getCurrentLanguage()

		if (currentLang === language) {
			return
		}

		await changeLanguage(language)
	}, [])

	const toggleLanguage = useCallback(async(): Promise<void> => {
		const currentLang = getCurrentLanguage()

		const availableLanguages = getAvailableLanguages()
		const currentIndex: number = availableLanguages.indexOf(currentLang)

		const nextIndex: number = (currentIndex + 1) % availableLanguages.length
		const nextLanguage = availableLanguages[nextIndex]

		if (!nextLanguage) {
			return
		}

		await changeLanguage(nextLanguage)
	}, [])

	const createKey = useCallback(<TNamespace extends keyof Resources>(
		namespace: TNamespace,
		key: KeysForNamespace<TNamespace>,
	): NamespacedTranslationKeys => {
		return createTranslationKey(namespace, key)
	}, [])

	const parseKey = useCallback((key: NamespacedTranslationKeys): {
		namespace: string; keyPath: string
	} => {
		return parseTranslationKey(key)
	}, [])

	const isKeyFromNamespaceFn = useCallback(<TNamespace extends keyof Resources>(
		key: NamespacedTranslationKeys,
		namespace: TNamespace,
	): boolean => {
		return isKeyFromNamespace(key, namespace)
	}, [])

	const currentLanguage = getCurrentLanguage()
	const availableLanguages = getAvailableLanguages()
	const isReady = i18n.isInitialized
	const isLoading = !isReady

	return {
		t,
		tNamespace,
		i18n,
		isReady,
		isLoading,
		currentLanguage,
		availableLanguages,
		setLanguage,
		switchLanguage,
		toggleLanguage,
		createKey,
		parseKey,
		isKeyFromNamespace: isKeyFromNamespaceFn,
		getNamespaceT,
	}
}

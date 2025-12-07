import type {
	TOptions,
} from 'i18next'

import type {
	KeysForNamespace, NamespacedTranslationKeys, Resources,
} from '@/app/config/i18n'

export type TypedTFunction<TNamespace extends keyof Resources> = (
	key: KeysForNamespace<TNamespace>,
	options?: TOptions
) => string

export type NamespacedTFunction = (
	key: NamespacedTranslationKeys,
	options?: TOptions
) => string

export type TypedNamespacedTFunction = (
	key: NamespacedTranslationKeys,
	options?: TOptions
) => string

export type TypedNamespaceTFunction<TNamespace extends keyof Resources> = (
	key: KeysForNamespace<TNamespace>,
	options?: TOptions
) => string

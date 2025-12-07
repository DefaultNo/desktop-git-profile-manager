import type {
	I18N_CONFIG,
} from '../constants/languages.constant'

export type SupportedLanguage = typeof I18N_CONFIG.LANGUAGE.supported[number]

export type Namespace = typeof I18N_CONFIG.NAMESPACES.list[number]


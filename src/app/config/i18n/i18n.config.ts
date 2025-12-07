import i18next, {
	type InitOptions,
} from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import {
	initReactI18next,
} from 'react-i18next'

import {
	I18N_CONFIG,
} from './constants/languages.constant'

const isDevelopment = import.meta.env.MODE === 'development'

const i18nConfig: InitOptions = {
	lng:           undefined,
	fallbackLng:   I18N_CONFIG.LANGUAGE.fallback,
	supportedLngs: [...I18N_CONFIG.LANGUAGE.supported],

	ns:         [...I18N_CONFIG.NAMESPACES.list],
	defaultNS:  I18N_CONFIG.NAMESPACES.default,
	fallbackNS: I18N_CONFIG.NAMESPACES.default,

	load:    'languageOnly',
	preload: [I18N_CONFIG.LANGUAGE.default],

	debug: isDevelopment,

	react: {
		useSuspense:                true,
		bindI18n:                   'languageChanged loaded',
		bindI18nStore:              'added removed',
		transEmptyNodeValue:        '',
		transSupportBasicHtmlNodes: true,
		transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'span'],
	},

	interpolation: {
		escapeValue:     false,
		formatSeparator: ',',
	},

	detection: I18N_CONFIG.LANGUAGE_DETECTOR_OPTIONS,
	backend:   I18N_CONFIG.BACKEND_OPTIONS,

	saveMissing:   isDevelopment,
	saveMissingTo: 'current',

	cleanCode:    true,
	keySeparator: '.',
	nsSeparator:  ':',

	returnEmptyString: false,
	returnNull:        false,
	returnObjects:     false,

	partialBundledLanguages: true,
}

export const i18nInstance = i18next
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)

i18nInstance.init(i18nConfig)

export default i18nInstance

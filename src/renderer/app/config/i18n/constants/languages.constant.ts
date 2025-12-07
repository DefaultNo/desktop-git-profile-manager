import type {
	DetectorOptions,
} from 'i18next-browser-languagedetector'
import type {
	HttpBackendOptions,
} from 'i18next-http-backend/cjs'

export const I18N_CONFIG = Object.freeze({
	LANGUAGE: {
		supported: ['en', 'ru'] as const,
		default:   'en' as const,
		fallback:  'en' as const,
		names:     {
			en: 'English',
			ru: 'Русский',
		} as const,
	},

	NAMESPACES: {
		list:    ['common', 'auth', 'user'] as const,
		default: 'common' as const,
	},

	LANGUAGE_DETECTOR_OPTIONS: {
		order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],

		lookupQuerystring:  'lng',
		lookupLocalStorage: 'i18nextLng',
		caches:             ['localStorage'],
		excludeCacheFor:    ['cimode'],

		convertDetectedLanguage: (lng: string): string => {
			const [baseLang] = lng.split('-')

			return baseLang ?? lng
		},
	} satisfies DetectorOptions,

	BACKEND_OPTIONS: {
		loadPath:       '/locales/{{lng}}/{{ns}}.json',
		requestOptions: {
			cache:       'default',
			credentials: 'same-origin',
			mode:        'cors' as RequestMode,
		},
		reloadInterval: false,
		crossDomain:    false,
	} satisfies HttpBackendOptions,
})

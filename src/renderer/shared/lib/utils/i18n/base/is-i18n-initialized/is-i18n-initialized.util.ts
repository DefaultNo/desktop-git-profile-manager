import {
	i18nInstance,
} from '@/app/config/i18n'

export const isI18nInitialized = (): boolean => {
	return i18nInstance.isInitialized
}

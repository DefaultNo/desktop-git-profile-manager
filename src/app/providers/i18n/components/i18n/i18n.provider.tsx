import React, {
	type ReactNode, Suspense,
} from 'react'
import {
	I18nextProvider,
} from 'react-i18next'

import {
	i18nInstance,
} from '@/app/config/i18n'

interface II18nProviderProps {
	children:  ReactNode
	fallback?: ReactNode
}

const I18nProvider: React.FC<II18nProviderProps> = ({
	children,
	fallback = <div>[SET_HERE_FALLBACK]</div>,
}) => {
	return (
		<I18nextProvider i18n={i18nInstance}>
			<Suspense fallback={fallback}>
				{children}
			</Suspense>
		</I18nextProvider>
	)
}

export default I18nProvider

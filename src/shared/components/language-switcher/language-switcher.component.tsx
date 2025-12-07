import React from 'react'

import {
	I18N_CONFIG,
} from '@/app/config/i18n'

import {
	useI18n,
} from '@/shared/lib/hooks'

interface ILanguageSwitcherProps {
	showLabels?: boolean
}

export const LanguageSwitcher: React.FC<ILanguageSwitcherProps> = ({
	showLabels = true,
}) => {
	const {
		currentLanguage, availableLanguages, switchLanguage, isLoading,
	} = useI18n()

	return (
		<select
			disabled={isLoading}
			value={currentLanguage}
			aria-label='Select language'
			onChange={async(e) => {
				return switchLanguage(e.target.value as typeof currentLanguage)
			}}
		>
			{availableLanguages.map((language) => {
				return (
					<option key={language} value={language}>
						{showLabels ?
							I18N_CONFIG.LANGUAGE.names[language] :
							language.toUpperCase()}
					</option>
				)
			})}
		</select>
	)
}

export default LanguageSwitcher


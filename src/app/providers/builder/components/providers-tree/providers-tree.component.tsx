import type {
	FC,
	ReactNode,
} from 'react'

import type {
	IProviderDefinition,
} from '../../types'
import {
	buildValidatedProvidersTree,
	getProvidersConfig,
} from '../../utils'

interface IProvidersTreeProps {
	additionalProviders?: Array<IProviderDefinition>
	customProviders?:     Array<IProviderDefinition>
	children:             ReactNode
}

export const ProvidersTree: FC<IProvidersTreeProps> = ({
	children,
	additionalProviders = [],
	customProviders,
}): ReactNode => {
	const providers = customProviders ?? [
		...getProvidersConfig(),
		...additionalProviders,
	]

	return buildValidatedProvidersTree({
		providers,
		children,
	})
}

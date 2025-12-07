import {
	AppRouterKeys,
} from '@/shared/model/constants'

import {
	HomePage,
} from '@/pages/home'

import {
	AppRoutes,
} from '../../enums'
import {
	defineRoutes,
} from '../../helpers'

export const publicRoutes = defineRoutes({
	[AppRoutes.HOME]: {
		path:     AppRouterKeys.HOME,
		element:  <HomePage />,
		authOnly: false,
	},
})

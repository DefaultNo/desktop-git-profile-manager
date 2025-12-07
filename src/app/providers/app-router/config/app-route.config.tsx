import {
	AppRoutes,
} from '@/app/providers/app-router/enums'

import {
	AppRouterKeys,
} from '@/shared/model/constants'

import {
	HomePage,
} from '@/pages/home'

import {
	combineRoutes,
} from '../helpers'
import {
	adminRoutes,
	authRoutes,
	publicRoutes,
} from './routes'

export const appRouteConfig = combineRoutes(
	publicRoutes,
	authRoutes,
	adminRoutes,

	{
		[AppRoutes.ALL_MATCH]: {
			path:     AppRouterKeys.ALL_MATCH,
			element:  <HomePage />,
			authOnly: false,
		},
	},
)

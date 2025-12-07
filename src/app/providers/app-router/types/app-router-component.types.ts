import type {
	JSX,
} from 'react'

import type {
	AppRouteProps,
} from './app-routes.types'

export type RenderRouteFn = (
	route: AppRouteProps,
	parentAuthOnly?: boolean,
	parentGuestOnly?: boolean,
	keyPrefix?: string
) => JSX.Element

import type {
	JSX,
} from 'react'
import {
	Route,
} from 'react-router-dom'

import type {
	RenderRouteFn,
} from '@/app/providers/app-router/types'

import {
	AppRouteElementWrapper,
} from '../components'

const resolveFlag = (
	explicit?: boolean,
	parent = false,
): boolean => {
	return explicit ?? parent
}

export const renderRoute: RenderRouteFn = (
	route,
	parentAuthOnly = false,
	parentGuestOnly = false,
	keyPrefix = '',
): JSX.Element => {
	const {
		path,
		roles,
		element,
		children,
		authOnly: explicitAuth,
		guestOnly: explicitGuest,
		layout: Layout,
		roleComponents,
	} = route

	if (!element) {
		throw new Error(`[App Router]: route "${path}" has no element. Set element in route config!`)
	}

	const routeKey = keyPrefix ?
		`${keyPrefix}-${path}` :
		path

	const authOnly = resolveFlag(explicitAuth, parentAuthOnly)
	const guestOnly = resolveFlag(explicitGuest, parentGuestOnly)

	const elementWrapper = (
		<AppRouteElementWrapper
			roles={roles}
			layout={Layout}
			element={element}
			authOnly={authOnly}
			guestOnly={guestOnly}
			roleComponents={roleComponents}
		/>
	)

	return (
		<Route path={path} key={routeKey} element={elementWrapper}>
			{children?.map((route, index) => {
				return renderRoute(route, authOnly, guestOnly, `${routeKey}-${String(index)}`)
			})}
		</Route>
	)
}

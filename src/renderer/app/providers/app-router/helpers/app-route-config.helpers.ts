import type {
	AppRouteProps,
	PartialRouteConfig,
	RouteConfig,
} from '../types'

export const defineRoutes = <T extends PartialRouteConfig>(routes: T): T => {
	return routes
}

export const combineRoutes = (...routeGroups: Array<PartialRouteConfig>): RouteConfig => {
	const combined: PartialRouteConfig = {
	}

	for (const routeGroup of routeGroups) {
		Object.assign(combined, routeGroup)
	}

	return combined as RouteConfig
}

export const createRouteGroup = (
	baseConfig: Partial<AppRouteProps>,
	routes: PartialRouteConfig,
): PartialRouteConfig => {
	const extendedRoutes: Record<string, AppRouteProps> = {
	}

	for (const [key, route] of Object.entries(routes)) {
		const mergedRoute: AppRouteProps = {
			...baseConfig,
			...route,
		} as AppRouteProps

		if (baseConfig.roles && route.roles) {
			mergedRoute.roles = [
				...new Set([
					...baseConfig.roles,
					...route.roles,
				]),
			]
		}

		extendedRoutes[key] = mergedRoute
	}

	return extendedRoutes
}

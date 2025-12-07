import type {
	ComponentType, ReactNode,
} from 'react'
import type {
	RouteObject,
} from 'react-router-dom'

import type {
	AppRouterKeys,
} from '@/shared/model/constants'

import type {
	UserRole,
} from '@/modules/user'

import type {
	AppRoutes,
} from '../enums'

export type RouterPath = typeof AppRouterKeys[keyof typeof AppRouterKeys]

export type AppRouteProps = {
	layout?:         ComponentType<{
		children: ReactNode
	}>
	roleComponents?: Partial<Record<UserRole, ReactNode>>;
	children?:       Array<AppRouteProps>;
	roles?:          Array<UserRole>;
	path:            RouterPath
	guestOnly?:      boolean;
	authOnly?:       boolean;
} & RouteObject

export type RouteConfig = Record<AppRoutes, AppRouteProps>
export type PartialRouteConfig = Partial<RouteConfig>

import type {
	JSX,
} from 'react'
import {
	Navigate, useLocation,
} from 'react-router-dom'

import {
	AppRouterKeys,
} from '@/shared/model/constants'

import {
	useAuthStore,
} from '@/modules/auth'
import {
	UserRole,
} from '@/modules/user'

import {
	shouldRedirectFromGuest,
	shouldRedirectToForbidden,
	shouldRedirectToLogin,
	useHasRequiredRoles,
} from '../../helpers'
import type {
	AppRequireAuthProps,
} from '../../types'

export const AppRequireAuth = (props: AppRequireAuthProps): JSX.Element => {
	const {
		roles,
		children,
		guestOnly,
	} = props

	const {
		user,
		isAuth,
	} = useAuthStore()

	const location = useLocation()
	const userRoles: Array<UserRole> = user ?
		[user.role] :
		[]

	const hasRequiredRoles = useHasRequiredRoles(roles, userRoles)

	if (shouldRedirectFromGuest(guestOnly, isAuth)) {
		const getRedirectPath = (): string => {
			if (userRoles.includes(UserRole.ADMIN)) {
				return AppRouterKeys.ADMIN
			}

			return AppRouterKeys.HOME
		}

		return <Navigate replace to={getRedirectPath()} />
	}

	if (shouldRedirectToLogin(guestOnly, isAuth)) {
		return (
			<Navigate
				replace
				to={AppRouterKeys.SIGN_IN}
				state={{
					from: location,
				}}
			/>
		)
	}

	if (shouldRedirectToForbidden(guestOnly, hasRequiredRoles)) {
		return (
			<Navigate
				replace
				to={AppRouterKeys.FORBIDDEN}
				state={{
					from: location,
				}}
			/>
		)
	}

	return children
}

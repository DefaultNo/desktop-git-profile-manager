import {
	useMemo,
} from 'react'

import type {
	UserRole,
} from '@/modules/user'

export const useHasRequiredRoles = (
	roles: Array<UserRole> | undefined,
	userRoles: Array<UserRole>,
): boolean => {
	return useMemo(() => {
		if (!roles || roles.length === 0) {
			return true
		}
		return roles.some((role) => {
			return userRoles.includes(role)
		})
	}, [roles, userRoles])
}

export const shouldRedirectFromGuest = (guestOnly: undefined | boolean, isAuth: boolean): boolean => {
	return Boolean(guestOnly) && isAuth
}

export const shouldRedirectToLogin = (guestOnly: undefined | boolean, isAuth: boolean): boolean => {
	return !guestOnly && !isAuth
}

export const shouldRedirectToForbidden = (guestOnly: undefined | boolean, hasRequiredRoles: boolean): boolean => {
	return !guestOnly && !hasRequiredRoles
}

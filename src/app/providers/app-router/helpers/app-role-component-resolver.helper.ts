import type {
	ReactNode,
} from 'react'

import type {
	UserRole,
} from '@/modules/user'

export const resolveElementByRole = (
	element: ReactNode,
	roleComponents: Partial<Record<UserRole, ReactNode>> | undefined,
	userRole: UserRole | null,
): ReactNode => {
	if (!roleComponents || !userRole) {
		return element
	}

	return roleComponents[userRole] ?? element
}

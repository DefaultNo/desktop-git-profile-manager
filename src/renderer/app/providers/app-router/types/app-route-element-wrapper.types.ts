import type {
	ComponentType,
	ReactNode,
} from 'react'

import type {
	UserRole,
} from '@/modules/user'

export interface IRouteElementWrapperProps {
	layout?:         ComponentType<{
		children: ReactNode
	}>
	roleComponents?: Partial<Record<UserRole, ReactNode>>
	roles:           Array<UserRole> | undefined
	element:         ReactNode
	guestOnly:       boolean
	authOnly:        boolean
}

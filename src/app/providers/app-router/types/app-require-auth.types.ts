import type {
	JSX,
} from 'react'

import type {
	UserRole,
} from '@/modules/user'

export type AppRequireAuthProps = {
	guestOnly: undefined | boolean
	roles?:    Array<UserRole>;
	children:  JSX.Element;
}

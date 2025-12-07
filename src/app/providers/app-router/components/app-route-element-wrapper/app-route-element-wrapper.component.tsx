import type {
	JSX,
} from 'react'
import {
	Suspense,
} from 'react'

import {
	useAuthStore,
} from '@/modules/auth'

import {
	resolveElementByRole,
} from '../../helpers'
import type {
	IRouteElementWrapperProps,
} from '../../types'
import {
	AppRequireAuth,
} from '../app-require-auth/app-require-auth.component'

const AppRouteElementWrapper = (props: IRouteElementWrapperProps): JSX.Element => {
	const {
		element,
		roles,
		guestOnly,
		authOnly,
		layout: Layout,
		roleComponents,
	} = props

	const {
		user,
	} = useAuthStore()
	const userRole = user?.role ?? null

	const resolvedElement = resolveElementByRole(element, roleComponents, userRole)

	let wrapped = <Suspense fallback={<div>[SET_HERE_PAGE_LOADER]</div>}>{resolvedElement}</Suspense>

	if (authOnly || guestOnly) {
		wrapped = (
			<AppRequireAuth roles={roles} guestOnly={guestOnly}>
				{wrapped}
			</AppRequireAuth>
		)
	}

	if (Layout) {
		wrapped = <Layout>{wrapped}</Layout>
	}

	return wrapped
}

export default AppRouteElementWrapper

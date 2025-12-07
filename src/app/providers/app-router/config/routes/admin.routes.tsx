import {
	defineRoutes,
} from '../../helpers'

export const adminRoutes = defineRoutes({
	/*
	[AppRoutes.ADMIN_DASHBOARD]: {
		path:     AppRouterKeys.ADMIN,
		element:  <AdminDashboard />,
		authOnly: true,
		roles:    [UserRole.ADMIN],
	},
	*/
})

/*
export const adminRoutes = createRouteGroup(
	{
		authOnly: true,
		roles: [UserRole.ADMIN],
		layout: AdminLayout,
	},
	defineRoutes({
		[AppRoutes.ADMIN_DASHBOARD]: {
			path: AppRouterKeys.ADMIN,
			element: <AdminDashboard />
		},
		[AppRoutes.ADMIN_USERS]: {
			path: AppRouterKeys.ADMIN_USERS,
			element: <AdminUsers />
		},
		[AppRoutes.ADMIN_SETTINGS]: {
			path: AppRouterKeys.ADMIN_SETTINGS,
			element: <AdminSettings />
		}
	})
)
*/

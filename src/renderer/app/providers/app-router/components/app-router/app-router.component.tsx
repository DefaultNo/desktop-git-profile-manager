import type {
	JSX,
} from 'react'
import {
	memo,
} from 'react'
import {
	Routes,
} from 'react-router-dom'

import {
	appRouteConfig,
} from '../../config'
import {
	renderRoute,
} from '../../helpers'

const AppRouter = (): JSX.Element => {
	return (
		<Routes>
			{
				Object.values(appRouteConfig).map((route) => {
					return renderRoute(route)
				})
			}
		</Routes>
	)
}

export default memo(AppRouter)

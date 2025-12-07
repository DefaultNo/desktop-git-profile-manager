import './app/styles/index.scss'

import {
	StrictMode,
} from 'react'
import {
	createRoot,
} from 'react-dom/client'

import {
	AppRouter,
} from './app/providers/app-router'
import {
	ProvidersTree,
} from './app/providers/builder'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ProvidersTree>
			<AppRouter />
		</ProvidersTree>
	</StrictMode>,
)

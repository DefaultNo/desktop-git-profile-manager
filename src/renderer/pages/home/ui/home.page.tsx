import {
	memo,
} from 'react'

import {
	ThemeExample,
} from '@/shared/components'

import {
	UserBlock,
} from '@/modules/user'

const HomePage = memo(() => {
	return (
		<div
			style={{
				display:         'flex',
				flexDirection:   'column',
				gap:             '12px',
			}}
		>
			<ThemeExample />
			<UserBlock />
		</div>
	)
})

HomePage.displayName = 'HomePage'
export default HomePage

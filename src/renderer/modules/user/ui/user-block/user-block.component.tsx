import {
	memo,
} from 'react'

import {
	UserCard,
} from '../../components'

export const UserBlock = memo(() => {
	return (
		<div>
			<UserCard name='Name' />
		</div>
	)
})

UserBlock.displayName = 'UserBlock'

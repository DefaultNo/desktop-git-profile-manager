import type {
	JSX,
} from 'react'
import {
	memo,
} from 'react'

import type {
	IUserCardProps,
} from './user-card.types'

export const UserCard = memo((props: IUserCardProps): JSX.Element => {
	const {
		name,
	} = props

	return (
		<div>User Card {name}</div>
	)
})

UserCard.displayName = 'UserCard'

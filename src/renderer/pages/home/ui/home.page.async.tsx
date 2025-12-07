import {
	lazy,
} from 'react'

export const HomePageAsync = lazy(async() => {
	return import('./home.page')
})

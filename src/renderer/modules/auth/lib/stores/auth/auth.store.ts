import {
	create,
} from 'zustand'
import {
	persist,
} from 'zustand/middleware'

import {
	LOCAL_STORAGE_KEYS,
} from '@/shared/model/enums'

import type {
	IAuthStoreState,
} from '../../../model/types'

export const useAuthStore = create<IAuthStoreState>()(
	persist((set) => {
		return {
			user:         null,
			isAuth:       false,
			initializing: true,
			accessToken:  null,

			finishInitializing: (): void => {
				set({
					initializing: false,
				})
			},
			setUser: (user): void => {
				set({
					user,
				})
			},
			setAccessToken: (token): void => {
				set({
					isAuth:      true,
					accessToken: token,
				})
			},
			logout: (): void => {
				set({
					user:        null,
					isAuth:      false,
					accessToken: null,
				})
			},
		}
	}, {
		name:       LOCAL_STORAGE_KEYS.AUTH,
		partialize: (state) => {
			return {
				accessToken: state.accessToken,
			}
		},
	}),
)

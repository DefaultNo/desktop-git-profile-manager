import type {
	IUser,
} from '@/modules/user'

export interface IAuthStoreState {
	setUser:            (user: IUser | null) => void
	setAccessToken:     (token: string) => void
	accessToken:        string | null
	user:               IUser | null
	finishInitializing: () => void
	logout:             () => void
	initializing:       boolean
	isAuth:             boolean
}

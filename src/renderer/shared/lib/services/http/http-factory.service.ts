import {
	mainAxios,
} from '../axios'
import {
	HttpService,
} from './http.service'
import {
	EnhancedWithAuthHttpService,
} from './http-auth.service'

export class HttpFactoryService {
	public createHttpService(): HttpService {
		return new HttpService(mainAxios)
	}

	public createAuthHttpService(): EnhancedWithAuthHttpService {
		return new EnhancedWithAuthHttpService(this.createHttpService())
	}
}

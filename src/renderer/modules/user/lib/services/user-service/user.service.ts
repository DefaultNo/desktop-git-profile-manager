import type {
	EnhancedWithAuthHttpService,
} from '@/shared/lib/services'
import {
	HttpFactoryService,
} from '@/shared/lib/services'

class UserService {
	private readonly URL = 'user'

	private readonly httpService: EnhancedWithAuthHttpService

	constructor() {
		this.httpService = new HttpFactoryService().createAuthHttpService()
	}

	public async create(data: unknown): Promise<unknown> {
		return this.httpService.post(this.URL, data)
	}

	public async read(): Promise<unknown> {
		return this.httpService.get(this.URL)
	}

	public async update(data: unknown): Promise<unknown> {
		return this.httpService.patch(this.URL, data)
	}

	public async delete(): Promise<unknown> {
		return this.httpService.delete(this.URL)
	}
}

export const userService = new UserService()

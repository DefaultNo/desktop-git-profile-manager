export class PathBuilder {
	private static getParamKeys(path: string): Array<string> {
		const matches = path.matchAll(/:([a-zA-Z0-9_]+)/g)
		const keys: Array<string> = []

		for (const match of matches) {
			const [, key] = match

			if (key) {
				keys.push(key)
			}
		}

		return keys
	}

	public static requiredParams(path: string): Array<string> {
		return this.getParamKeys(path)
	}

	public static missingParams(
		path: string,
		params: Record<string, string | number> = {
		},
	): Array<string> {
		return this.getParamKeys(path).filter((key) => {
			return !(key in params)
		})
	}

	public static build(
		path: string,
		params: Record<string, string | number>,
	): string {
		const missing = this.missingParams(path, params)

		if (missing.length > 0) {
			throw new Error(`Missing params for path: ${missing.join(', ')}`)
		}

		return this.safe(path, params)
	}

	public static safe(
		path: string,
		params: Record<string, string | number>,
	): string {
		return Object.entries(params).reduce((path, [key, value]) => {
			return path.replace(`:${key}`, String(value))
		}, path)
	}
}

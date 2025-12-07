export const toPascalCase = (str: string): string => {
	return str
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.split(/[-_\s]+/)
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join('')
}

export const toCamelCase = (str: string): string => {
	const pascal = toPascalCase(str)
	return pascal.charAt(0).toLowerCase() + pascal.slice(1)
}

export const toKebabCase = (str: string): string => {
	return str
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/[\s_]+/g, '-')
		.toLowerCase()
}

export const validateComponentName = (name: string): boolean => {
	return /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(name)
}

export const validateModuleName = (name: string): boolean => {
	return /^[a-z][a-z0-9-]*$/.test(name)
}

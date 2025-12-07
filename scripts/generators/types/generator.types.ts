export interface IGeneratorOptions {
	name: string
	module?: string
	withTests?: boolean
	withStories?: boolean
	withScss?: boolean
}

export interface ITemplateContext {
	componentName: string
	componentNamePascal: string
	componentNameKebab: string
	componentNameCamel: string
	moduleName?: string
	moduleNamePascal?: string
	withTests: boolean
	withStories: boolean
	withSCSS: boolean
}

export interface IGeneratorConfig {
	type: 'component' | 'module' | 'service' | 'hook'
	targetPath: string
	templates: ITemplateFile[]
}

export interface ITemplateFile {
	templatePath: string
	outputPath: string
	condition?: (context: ITemplateContext) => boolean
}

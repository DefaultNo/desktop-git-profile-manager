import type {
	IGeneratorConfig,
} from '../types/generator.types'

export const serviceGeneratorConfig: IGeneratorConfig = {
	type: 'service',
	targetPath: 'src/modules/{{moduleName}}/lib/services/{{componentNameKebab}}-service',
	templates: [
		{
			templatePath: 'service/service.ts.template',
			outputPath: '{{componentNameKebab}}.service.ts',
		},
		{
			templatePath: 'service/service.types.ts.template',
			outputPath: '{{componentNameKebab}}.types.ts',
		},
		{
			templatePath: 'service/index.ts.template',
			outputPath: 'index.ts',
		},
		{
			templatePath: 'service/service.spec.ts.template',
			outputPath: '__tests__/{{componentNameKebab}}.service.spec.ts',
			condition: (context) => context.withTests,
		},
	],
}

export const sharedServiceGeneratorConfig: IGeneratorConfig = {
	type: 'service',
	targetPath: 'src/shared/lib/services/{{componentNameKebab}}',
	templates: serviceGeneratorConfig.templates,
}

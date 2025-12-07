import type {
	IGeneratorConfig,
} from '../types/generator.types'

export const hookGeneratorConfig: IGeneratorConfig = {
	type: 'hook',
	targetPath: 'src/modules/{{moduleName}}/lib/hooks/{{componentNameKebab}}',
	templates: [
		{
			templatePath: 'hook/hook.ts.template',
			outputPath: '{{componentNameKebab}}.hook.ts',
		},
		{
			templatePath: 'hook/hook.types.ts.template',
			outputPath: '{{componentNameKebab}}.types.ts',
		},
		{
			templatePath: 'hook/index.ts.template',
			outputPath: 'index.ts',
		},
		{
			templatePath: 'hook/hook.spec.ts.template',
			outputPath: '__tests__/{{componentNameKebab}}.hook.spec.ts',
			condition: (context) => context.withTests,
		},
	],
}

export const sharedHookGeneratorConfig: IGeneratorConfig = {
	type: 'hook',
	targetPath: 'src/shared/lib/hooks/{{componentNameKebab}}',
	templates: hookGeneratorConfig.templates,
}

import type {
	IGeneratorConfig,
} from '../types/generator.types'

export const componentGeneratorConfig: IGeneratorConfig = {
	type: 'component',
	targetPath: 'src/shared/components/{{componentNameKebab}}',
	templates: [
		{
			templatePath: 'component/component.tsx.template',
			outputPath: '{{componentNameKebab}}.component.tsx',
		},
		{
			templatePath: 'component/component.types.ts.template',
			outputPath: '{{componentNameKebab}}.types.ts',
		},
		{
			templatePath: 'component/index.ts.template',
			outputPath: 'index.ts',
		},
		{
			templatePath: 'component/component.stories.tsx.template',
			outputPath: '{{componentNameKebab}}.stories.tsx',
			condition: (context) => context.withStories,
		},
		{
			templatePath: 'component/component.spec.tsx.template',
			outputPath: '__tests__/{{componentNameKebab}}.spec.tsx',
			condition: (context) => context.withTests,
		},
		{
			templatePath: 'component/component.module.scss.template',
			outputPath: '{{componentNameKebab}}.module.scss',
			condition: (context) => context.withSCSS,
		},
	],
}

export const moduleComponentGeneratorConfig: IGeneratorConfig = {
	type: 'component',
	targetPath: 'src/modules/{{moduleName}}/components/{{componentNameKebab}}',
	templates: componentGeneratorConfig.templates,
}

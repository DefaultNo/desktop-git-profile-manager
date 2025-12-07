import type {
	IGeneratorConfig,
} from '../types/generator.types'

export const moduleGeneratorConfig: IGeneratorConfig = {
	type: 'module',
	targetPath: 'src/modules/{{componentNameKebab}}',
	templates: [
		{
			templatePath: 'module/index.ts.template',
			outputPath: 'index.ts',
		},
		{
			templatePath: 'module/components/index.ts.template',
			outputPath: 'components/index.ts',
		},
		{
			templatePath: 'module/lib/index.ts.template',
			outputPath: 'lib/index.ts',
		},
		{
			templatePath: 'module/lib/hooks/index.ts.template',
			outputPath: 'lib/hooks/index.ts',
		},
		{
			templatePath: 'module/lib/services/index.ts.template',
			outputPath: 'lib/services/index.ts',
		},
		{
			templatePath: 'module/lib/utils/index.ts.template',
			outputPath: 'lib/utils/index.ts',
		},
		{
			templatePath: 'module/model/index.ts.template',
			outputPath: 'model/index.ts',
		},
		{
			templatePath: 'module/model/types/index.ts.template',
			outputPath: 'model/types/index.ts',
		},
		{
			templatePath: 'module/model/constants/index.ts.template',
			outputPath: 'model/constants/index.ts',
		},
		{
			templatePath: 'module/model/enums/index.ts.template',
			outputPath: 'model/enums/index.ts',
		},
		{
			templatePath: 'module/ui/index.ts.template',
			outputPath: 'ui/index.ts',
		},
	],
}

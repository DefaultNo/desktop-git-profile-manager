#!/usr/bin/env tsx

import chalk from 'chalk'

import {
	componentGeneratorConfig,
	hookGeneratorConfig,
	moduleComponentGeneratorConfig,
	moduleGeneratorConfig,
	serviceGeneratorConfig,
	sharedHookGeneratorConfig,
	sharedServiceGeneratorConfig,
} from './configs'
import type {
	IGeneratorOptions,
	ITemplateContext,
} from './types/generator.types'
import {
	generateFromConfig,
} from './utils/generator.util'
import {
	toCamelCase,
	toKebabCase,
	toPascalCase,
	validateComponentName,
	validateModuleName,
} from './utils/string.util'

class CodeGenerator {
	private readonly args: string[]

	constructor() {
		this.args = process.argv.slice(2)
	}

	public run(): void {
		try {
			if (this.args.length === 0) {
				this.showHelp()
				return
			}

			const command = this.args[0]

			switch (command) {
				case 'component': {
					this.generateComponent()
					break
				}
				case 'module': {
					this.generateModule()
					break
				}
				case 'service': {
					this.generateService()
					break
				}
				case 'hook': {
					this.generateHook()
					break
				}
				case '--help':
				case '-h': {
					this.showHelp()
					break
				}
				default: {
					console.error(chalk.redBright(`Unknown command: ${command}`))
					this.showHelp()
					process.exit(1)
				}
			}
		} catch (error) {
			console.error(chalk.redBright('Generation failed:'), error)
			process.exit(1)
		}
	}

	private generateComponent(): void {
		const options = this.parseComponentOptions()

		if (!validateComponentName(options.name)) {
			console.error(chalk.redBright('Invalid component name. Use only letters, numbers, and hyphens.'))
			process.exit(1)
		}

		const context = this.createTemplateContext(options)
		const config = options.module ? moduleComponentGeneratorConfig : componentGeneratorConfig

		console.log(chalk.blueBright(`Creating component: ${context.componentNamePascal}`))

		generateFromConfig(config, context, { checkExisting: true })

		console.log(chalk.greenBright('Component created successfully!'))
		console.log(chalk.yellowBright('Don\'t forget to export it in the appropriate index.ts file'))
	}

	private generateModule(): void {
		const name = this.args[1]

		if (!name) {
			console.error(chalk.redBright('Module name is required'))
			process.exit(1)
		}

		if (!validateModuleName(name)) {
			console.error(chalk.redBright('Invalid module name. Use lowercase letters and hyphens only.'))
			process.exit(1)
		}

		const context = this.createTemplateContext({ name })

		console.log(chalk.blueBright(`Creating module: ${name}`))

		generateFromConfig(moduleGeneratorConfig, context, { checkExisting: true })

		console.log(chalk.greenBright('Module created successfully!'))
	}

	private generateService(): void {
		const options = this.parseServiceOptions()

		if (!validateComponentName(options.name)) {
			console.error(chalk.redBright('Invalid service name. Use only letters, numbers, and hyphens.'))
			process.exit(1)
		}

		const context = this.createTemplateContext(options)
		const config = options.module ? serviceGeneratorConfig : sharedServiceGeneratorConfig

		console.log(chalk.blueBright(`Creating service: ${context.componentNamePascal}Service`))

		generateFromConfig(config, context, { checkExisting: true })

		console.log(chalk.greenBright('Service created successfully!'))
	}

	private generateHook(): void {
		const options = this.parseHookOptions()

		if (!validateComponentName(options.name)) {
			console.error(chalk.redBright('Invalid hook name. Use only letters, numbers, and hyphens.'))
			process.exit(1)
		}

		const context = this.createTemplateContext(options)
		const config = options.module ? hookGeneratorConfig : sharedHookGeneratorConfig

		console.log(chalk.blueBright(`Creating hook: ${context.componentNameCamel}`))

		generateFromConfig(config, context, { checkExisting: true })

		console.log(chalk.greenBright('Hook created successfully!'))
	}

	private parseComponentOptions(): IGeneratorOptions {
		return this.parseOptions()
	}

	private parseServiceOptions(): IGeneratorOptions {
		return this.parseOptions()
	}

	private parseHookOptions(): IGeneratorOptions {
		return this.parseOptions()
	}

	private parseOptions(): IGeneratorOptions {
		const name = this.args[1]

		if (!name) {
			console.error(chalk.redBright('Name is required'))
			process.exit(1)
		}

		const options: IGeneratorOptions = {
			name,
			withTests: this.args.includes('--with-tests'),
			withStories: this.args.includes('--with-stories'),
			withScss: this.args.includes('--with-scss'),
		}

		const moduleIndex = this.args.findIndex(arg => arg === '--module')
		if (moduleIndex !== -1 && this.args[moduleIndex + 1]) {
			options.module = this.args[moduleIndex + 1]
		}

		return options
	}

	private createTemplateContext(options: IGeneratorOptions): ITemplateContext {
		return {
			componentName: options.name,
			componentNamePascal: toPascalCase(options.name),
			componentNameKebab: toKebabCase(options.name),
			componentNameCamel: toCamelCase(options.name),
			moduleName: options.module,
			moduleNamePascal: options.module ? toPascalCase(options.module) : undefined,
			withTests: options.withTests ?? false,
			withStories: options.withStories ?? false,
			withSCSS: options.withScss ?? false,
		}
	}

	private showHelp(): void {
		console.log(chalk.bold.cyanBright('\nCode Generator\n'))

		console.log(chalk.blueBright('Usage:'))
		console.log('  yarn generate <command> [options]\n')

		console.log(chalk.blueBright('Commands:'))
		console.log('  component <name>  Generate a new component')
		console.log('  module <name>     Generate a new module')
		console.log('  service <name>    Generate a new service')
		console.log('  hook <name>       Generate a new hook\n')

		console.log(chalk.blueBright('Options:'))
		console.log('  --module <name>   Place in specific module (for component/service/hook)')
		console.log('  --with-tests      Generate test file')
		console.log('  --with-scss       Generate SCSS module file (components only)\n')

		console.log(chalk.blueBright('Examples:'))
		console.log('  yarn generate component button')
		console.log('  yarn generate component product-card --module shop --with-tests --with-stories')
		console.log('  yarn generate service auth --module auth --with-tests')
		console.log('  yarn generate hook use-auth --module auth')
		console.log('  yarn generate module shop')
		console.log('  yarn generate --help\n')
	}
}

const generator = new CodeGenerator()
generator.run()

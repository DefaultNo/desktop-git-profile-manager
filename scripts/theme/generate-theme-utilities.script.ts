import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

import {
	compileThemeWithDependencies,
	CSSVariable,
	extractThemeSpecificVariables,
	generateHooksFile,
	generateTypesFile,
} from './utils'

const CONFIG = {
	themesDir: 'src/renderer/app/styles/themes',
	outputDir: 'src/renderer/shared/lib/hooks/theme-utilities',
	typesFileName: 'theme-colors.types.ts',
	hooksFileName: 'theme-colors.hooks.ts',
	indexFileName: 'index.ts',
}

const ensureDirectoryExists = (dirPath: string): void => {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true })
		console.log(chalk.green(`Created directory: ${dirPath}`))
	}
}

const writeGeneratedFile = (filePath: string, content: string): void => {
	const header = ` /* eslint-disable @typescript-eslint/explicit-function-return-type */

// THIS FILE IS AUTO-GENERATED FROM SCSS THEME FILES
// DO NOT EDIT MANUALLY - RUN 'yarn run theme:generate' TO REGENERATE
// GENERATED AT: ${new Date().toISOString()}
  
  `

	const fullContent = header + content

	fs.writeFileSync(filePath, fullContent, 'utf-8')
	console.log(chalk.cyanBright(`┃ Generated: ${filePath}`))
}

const generateThemeUtilitiesFromCSS = async (): Promise<void> => {
	console.log(chalk.blueBright('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
	console.log(chalk.blueBright('┃ Generating theme utilities from compiled SCSS...'))

	console.log(chalk.blueBright(`┃ Scanning themes in: ${CONFIG.themesDir}`))

	try {
		const files = fs.readdirSync(CONFIG.themesDir)
		const scssFiles = files.filter(file => file.endsWith('.scss'))

		if (scssFiles.length === 0) {
			console.error(chalk.red('┃ No SCSS theme files found'))
			process.exit(1)
		}

		console.log(chalk.blueBright('┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
		console.log(chalk.cyanBright(`┃ Found ${scssFiles.length} theme files:`))

		const allVariables: CSSVariable[] = []

		for (const file of scssFiles) {
			const filePath = path.join(CONFIG.themesDir, file)
			const themeName = path.basename(file, '.scss')

			console.log(chalk.cyanBright(`┃  - Compiling ${themeName}...`))

			try {
				const compiledCSS = await compileThemeWithDependencies(filePath)

				const themeSelector = themeName === 'light' ? ':root' : `[data-theme="${themeName}"]`
				const variables = extractThemeSpecificVariables(compiledCSS, themeSelector)

				console.log(chalk.cyanBright(`┃    Found ${variables.length} variables (including mixins)`))
				allVariables.push(...variables)
			}
			catch (error) {
				console.warn(chalk.yellow(`┃ Failed to compile ${themeName}: ${error}`))
			}
		}

		const uniqueVariables = allVariables.filter((variable, index, self) =>
			index === self.findIndex(v => v.camelCase === variable.camelCase),
		)

		console.log(chalk.cyanBright('┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
		console.log(chalk.cyanBright(`┃ Total unique CSS variables: ${uniqueVariables.length}`))
		console.log(chalk.cyanBright('┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))

		ensureDirectoryExists(CONFIG.outputDir)

		const typesContent = generateTypesFile(uniqueVariables)
		const typesPath = path.join(CONFIG.outputDir, CONFIG.typesFileName)
		writeGeneratedFile(typesPath, typesContent)

		const hooksContent = generateHooksFile(uniqueVariables)
		const hooksPath = path.join(CONFIG.outputDir, CONFIG.hooksFileName)
		writeGeneratedFile(hooksPath, hooksContent)

		const indexContent = `
export * from './${CONFIG.typesFileName.replace('.ts', '')}'
export * from './${CONFIG.hooksFileName.replace('.ts', '')}'
`

		const indexPath = path.join(CONFIG.outputDir, CONFIG.indexFileName)
		writeGeneratedFile(indexPath, indexContent)

		console.log(chalk.greenBright('┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
		console.log(chalk.greenBright('┃ Theme utilities generation completed successfully!'))
		console.log(chalk.greenBright(`┃ Generated files in: ${CONFIG.outputDir}`))
		console.log(chalk.greenBright('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
	}
	catch (error) {
		console.error(chalk.red('┃ Error during theme utilities generation:'), error)
		process.exit(1)
	}
}

generateThemeUtilitiesFromCSS()

export { generateThemeUtilitiesFromCSS }

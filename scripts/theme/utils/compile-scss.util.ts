import fs from 'fs'
import path from 'path'
import * as sass from 'sass'

export const compileSCSSFile = async (scssFilePath: string): Promise<string> => {
	try {
		const result = sass.compile(scssFilePath, {
			loadPaths: [
				path.dirname(scssFilePath),
				'src/app/styles',
				'src/app/styles/variables',
				'src/app/styles/mixins',
			],
			style: 'expanded',
		})

		return result.css
	}
	catch (error) {
		console.error(`Error compiling SCSS file ${scssFilePath}:`, error)
		throw error
	}
}

export const compileThemeWithDependencies = async (themeFilePath: string): Promise<string> => {
	const themeName = path.basename(themeFilePath, '.scss')

	const tempScssContent = `
@use '../variables/colors.scss' as *;
@use '../mixins/mixins' as *;
@use './${themeName}.scss';
`

	const tempDir = path.dirname(themeFilePath)
	const tempFilePath = path.join(tempDir, `temp-${themeName}.scss`)

	try {
		fs.writeFileSync(tempFilePath, tempScssContent)

		const compiledCSS = await compileSCSSFile(tempFilePath)

		fs.unlinkSync(tempFilePath)

		return compiledCSS
	}
	catch (error) {
		if (fs.existsSync(tempFilePath)) {
			fs.unlinkSync(tempFilePath)
		}

		throw error
	}
}

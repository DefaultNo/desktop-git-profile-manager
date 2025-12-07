const config = {
	'src/**/*.{js,jsx,ts,tsx}': [
		'yarn run eslint:fix',
	],

	'*.{css,scss}': [
		'yarn run stylelint:fix',
	],
}

export default config
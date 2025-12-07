import {
	memo,
} from 'react'

import {
	useTheme,
	useThemeColors,
} from '@/shared/lib/hooks'
import {
	getAllThemes,
} from '@/shared/lib/utils'

import styles from './theme-example.module.scss'

export const ThemeExample = memo(() => {
	const {
		currentTheme,
		setTheme,
		toggleTheme,
		togglePrevTheme,
		autoTheme,
		isDark,
	} = useTheme()

	const colors = useThemeColors('css')
	// const colorsVariables = useThemeColorsCSS()

	const themes = getAllThemes()

	return (
		<div className={styles['container']}>
			<h3 className={styles['title']}>Theme Example</h3>

			<p className={styles['current']}>
				Current: <strong>{currentTheme}</strong> ({
					isDark ?
						'dark' :
						'light'
				})
			</p>

			<div className={styles['buttons']}>
				{themes.map(theme => {
					return (
						<button
							key={theme.name}
							onClick={() => {
								setTheme(theme.name)
							}}
							className={
								currentTheme === theme.name ?
									styles['theme-button-active'] :
									styles['theme-button']
							}
						>
							{theme.displayName}
						</button>
					)
				})}
			</div>

			<div className={styles['toggle-buttons']}>
				<button
					onClick={togglePrevTheme}
					className={styles['toggle-button']}
				>
					Previous
				</button>

				<button
					onClick={toggleTheme}
					className={styles['toggle-button']}
				>
					Next
				</button>
			</div>

			<div className={styles['auto-section']}>
				<h4 className={styles['auto-title']}>Auto Mode (Time-based)</h4>

				<button
					onClick={autoTheme.toggle}
					className={
						autoTheme.config.enabled ?
							styles['auto-button-active'] :
							styles['auto-button']
					}
				>
					{
						autoTheme.config.enabled ?
							'Disable Auto' :
							'Enable Auto'
					}
				</button>

				{autoTheme.config.enabled && (
					<div className={styles['auto-info']}>
						<p>Light: {autoTheme.config.lightStart} - {autoTheme.config.darkStart}</p>
						<p>Dark: {autoTheme.config.darkStart} - {autoTheme.config.lightStart}</p>
						<p>Select &#39;System&#39; theme to use auto mode</p>
					</div>
				)}
			</div>

			<div className={styles['colors-demo']}>
				<h4>Auto-generated colors:</h4>
				<div className={styles['color-grid']}>
					<div className={styles['color-item']} style={{
						backgroundColor: colors.primaryColor,
					}}>
						<span
							style={{
								color: colors.onPrimaryColor,
							}}
						>
							Primary
						</span>
					</div>
					<div className={styles['color-item']} style={{
						backgroundColor: colors.surfaceColor,
					}}>
						<span
							style={{
								color: colors.onSurfaceColor,
							}}
						>
							Surface
						</span>
					</div>
				</div>
				<p className={styles['colors-info']}>
					Colors automatically extracted from SCSS
				</p>
			</div>
		</div>
	)
})

ThemeExample.displayName = 'ThemeExample'

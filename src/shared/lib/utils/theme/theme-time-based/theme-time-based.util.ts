import type {
	IThemeAutoConfig,
	ThemeName,
} from '@/app/config/theme'

/**
 * Determines which theme should be active based on current time
 * Simple approach - check once when called, no timers
 * @param config - auto theme configuration
 * @returns theme that should be active now
 */
export const getThemeTimeBased = (config: IThemeAutoConfig): Exclude<ThemeName, 'system'> => {
	if (!config.enabled) {
		return config.lightTheme
	}

	const currentMinutes = getCurrentMinutes()
	const lightStartMinutes = parseTimeToMinutes(config.lightStart)
	const darkStartMinutes = parseTimeToMinutes(config.darkStart)

	if (darkStartMinutes > lightStartMinutes) {
		const isDarkTime = currentMinutes >= darkStartMinutes || currentMinutes < lightStartMinutes
		return isDarkTime ?
			config.darkTheme :
			config.lightTheme
	}

	const isLightTime = currentMinutes >= lightStartMinutes && currentMinutes < darkStartMinutes
	return isLightTime ?
		config.lightTheme :
		config.darkTheme
}

const parseTimeToMinutes = (timeString: string): number => {
	const [hours, minutes] = timeString.split(':').map(Number)
	return ((hours ?? 0) * 60) + (minutes ?? 0)
}

const getCurrentMinutes = (): number => {
	const now = new Date()
	return (now.getHours() * 60) + now.getMinutes()
}

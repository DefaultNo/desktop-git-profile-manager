/// <reference types="vite/client" />
import type * as React from 'react'

declare module '*.module.scss' {
	const classes: Record<string, string>
	export default classes
}

declare module '*.svg' {
	export const ReactComponent: React.FunctionComponent<
        {
        	title?: string
        } & React.SVGProps<SVGSVGElement>
	>

	const src: string
	export default src
}

declare global {
	const __DEV__: boolean
	const __STAGE__: boolean
	const __PROD__: boolean
}

export {}

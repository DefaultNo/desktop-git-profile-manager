import type {
	ComponentType,
	ReactNode,
} from 'react'

export interface IProviderProps {
	children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IProviderDefinition<TProps = any> {
	props?:    Omit<TProps, 'children'>
	component: ComponentType<TProps>
	order:     number
	id:        string
}

export interface IProviderTreeConfig {
	providers: Array<IProviderDefinition>
	children:  ReactNode
}

export type ProvidersTreeResult = ReactNode

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ProviderDefinitionCreator<TProps = any> =
	(props: Omit<TProps, 'children'>, id: string, order: number) => IProviderDefinition<TProps>

export type ExtractProviderProps<T> = T extends ComponentType<infer P> ? P : never

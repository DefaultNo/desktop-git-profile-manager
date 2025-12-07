import type React from 'react'
import {
	createElement,
} from 'react'

import type {
	IProviderDefinition,
	IProviderTreeConfig,
	ProviderDefinitionCreator,
	ProvidersTreeResult,
} from '../types'

export const buildProvidersTree = (config: IProviderTreeConfig): ProvidersTreeResult => {
	const {
		providers, children,
	} = config

	const sortedProviders = [...providers].sort((a, b) => {
		return a.order - b.order
	})

	return sortedProviders.reduceRight((acc, provider) => {
		const {
			component: Component, props = {
			}, id,
		} = provider

		const debugProps = import.meta.env.DEV ?
			{
				'data-provider-id': id,
			} :
			{
			}

		return createElement(
			Component,
			{
				...props,
				...debugProps,
				children: acc,
			} as never,
		)
	}, children)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createProviderDefinition = <TProps = any>(
	component: React.ComponentType<TProps>,
	props: Omit<TProps, 'children'>,
	id: string,
	order: number,
): IProviderDefinition<TProps> => {
	return {
		component,
		props,
		id,
		order,
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createProviderFactory = <TProps = any>(
	component: React.ComponentType<TProps>,
): ProviderDefinitionCreator<TProps> => {
	return (props, id, order) => {
		return createProviderDefinition(component, props, id, order)
	}
}

export const validateProviders = (providers: Array<IProviderDefinition>): void => {
	const orders = new Set<number>()
	const ids = new Set<string>()

	for (const provider of providers) {
		if (orders.has(provider.order)) {
			throw new Error(`Duplicate provider order: ${String(provider.order)}`)
		}

		if (ids.has(provider.id)) {
			throw new Error(`Duplicate provider id: ${provider.id}`)
		}

		orders.add(provider.order)
		ids.add(provider.id)
	}
}

export const buildValidatedProvidersTree = (config: IProviderTreeConfig): ProvidersTreeResult => {
	validateProviders(config.providers)
	return buildProvidersTree(config)
}

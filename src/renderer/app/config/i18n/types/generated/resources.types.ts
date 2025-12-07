/* eslint-disable */
    
/* 
* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT IT MANUALLY!
* 
* Supported languages in the "locales folder": en, ru
* MAKE SURE THAT THE SUPPORTED LANGUAGES ARE SPECIFIED IN THE I18N CONFIG!
*
* The main language for types: en
* Generated at: 2025-08-16T07:27:46.676Z
*/

interface AuthResourcesNested {
  one: string
}

interface AuthResources {
  example: string
  some: string
  nested: AuthResourcesNested
}

interface CommonResources {
  welcome: string
  hello: string
}

interface Resources {
  auth: AuthResources
  common: CommonResources
}

export type AuthKeys = 'example' | 'some' | 'nested.one'

export type CommonKeys = 'welcome' | 'hello'

export type AllTranslationKeys = AuthKeys | CommonKeys

export type NamespacedTranslationKeys = 'auth:example' | 'auth:some' | 'auth:nested.one' | 'common:welcome' | 'common:hello'

export type TranslationKey = NamespacedTranslationKeys

export type ExtractNamespace<T extends NamespacedTranslationKeys> = 
  T extends `${infer NS}:${string}` ? NS : never

export type ExtractKeyPath<T extends NamespacedTranslationKeys> = 
  T extends `${string}:${infer K}` ? K : never

export type KeysForNamespace<NS extends keyof Resources> =   NS extends 'auth' ? AuthKeys :
  NS extends 'common' ? CommonKeys :
  never

export type { Resources }

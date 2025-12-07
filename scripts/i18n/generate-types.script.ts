#!/usr/bin/env node

import {promises as fs} from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface TranslationResource {
  [key: string]: string | TranslationResource
}

interface Resources {
  [namespace: string]: TranslationResource
}

async function getAvailableLanguages(): Promise<string[]> {
  const localesDir = path.resolve(__dirname, '../../public/locales')

  try {
    const items = await fs.readdir(localesDir, { withFileTypes: true })

    return items
        .filter(item => item.isDirectory())
        .map(item => item.name)

  } catch (error) {
    return []
  }
}

function cleanNamespaceData(data: TranslationResource): TranslationResource {
  const cleaned: TranslationResource = {}

  for (const [key, value] of Object.entries(data)) {
    if (key.includes(':')) {
      continue
    }

    if (typeof value === 'object' && value !== null) {
      cleaned[key] = cleanNamespaceData(value)
    } else {
      cleaned[key] = value
    }
  }

  return cleaned
}

function generateInterface(obj: TranslationResource, interfaceName: string, depth = 0): string {
  const indent = '  '.repeat(depth)
  let result = `${indent}interface ${interfaceName} {\n`

  for (const [key, value] of Object.entries(obj)) {
    const formattedKey = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key) ? key : `'${key}'`

    if (typeof value === 'object' && value !== null) {
      const nestedInterfaceName = `${interfaceName}${key.charAt(0).toUpperCase()}${key.slice(1)}`
      result += `${indent}  ${formattedKey}: ${nestedInterfaceName}\n`
    } else {
      result += `${indent}  ${formattedKey}: string\n`
    }
  }

  result += `${indent}}\n\n`

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      const nestedInterfaceName = `${interfaceName}${key.charAt(0).toUpperCase()}${key.slice(1)}`
      result = generateInterface(value, nestedInterfaceName, depth) + result
    }
  }

  return result
}

function generateKeyPaths(obj: TranslationResource, prefix = ''): string[] {
  const keys: string[] = []

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'object' && value !== null) {
      keys.push(...generateKeyPaths(value, currentPath))
    } else {
      keys.push(`'${currentPath}'`)
    }
  }

  return keys
}

async function generateTypesScript() {
  try {
    const localesDir = path.resolve(__dirname, '../../public/locales')
    const outputDir = path.resolve(__dirname, '../../src/app/config/i18n/types/generated')

    await fs.mkdir(outputDir, { recursive: true })

    const languages = await getAvailableLanguages()
    if (languages.length === 0) {
      console.log('No languages found, using English by default')
      languages.push('en')
    }

    const primaryLang = languages[0] ?? 'en'
    const primaryDir = path.join(localesDir, primaryLang)

    const files = await fs.readdir(primaryDir)
    const jsonFiles = files.filter(file => file.endsWith('.json'))

    const resources: Resources = {}
    const namespaceInterfaces: string[] = []
    const namespacePaths: { [namespace: string]: string[] } = {}

    for (const file of jsonFiles) {
      const namespace = path.basename(file, '.json')
      const filePath = path.join(primaryDir, file)
      const content = await fs.readFile(filePath, 'utf-8')
      const data = JSON.parse(content) as TranslationResource

      const cleanedData = cleanNamespaceData(data)

      resources[namespace] = cleanedData

      const interfaceName = `${namespace.charAt(0).toUpperCase()}${namespace.slice(1)}Resources`
      const interfaceCode = generateInterface(cleanedData, interfaceName)
      namespaceInterfaces.push(interfaceCode.trim())

      namespacePaths[namespace] = generateKeyPaths(cleanedData)
    }

    const resourcesInterface = `interface Resources {\n${Object.keys(resources)
        .map(ns => `  ${ns}: ${ns.charAt(0).toUpperCase()}${ns.slice(1)}Resources`)
        .join('\n')}\n}`

    const keyUnions = Object.entries(namespacePaths)
        .map(([namespace, paths]) => {
          const typeName = `${namespace.charAt(0).toUpperCase()}${namespace.slice(1)}Keys`
          return `export type ${typeName} = ${paths.join(' | ')}`
        })
        .join('\n\n')

    const allKeysUnion = `export type AllTranslationKeys = ${Object.keys(namespacePaths)
        .map(ns => `${ns.charAt(0).toUpperCase()}${ns.slice(1)}Keys`)
        .join(' | ')}`

    const namespacedKeys = Object.entries(namespacePaths)
        .map(([namespace, paths]) => {
          return paths.map(path => {
            const keyPath = path.slice(1, -1)
            return `'${namespace}:${keyPath}'`
          })
        })
        .flat()

    const namespacedKeysUnion = `export type NamespacedTranslationKeys = ${namespacedKeys.join(' | ')}`

    const generatedCode = `/* eslint-disable */
    
/* 
* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT IT MANUALLY!
* 
* Supported languages in the "locales folder": ${languages.join(', ')}
* MAKE SURE THAT THE SUPPORTED LANGUAGES ARE SPECIFIED IN THE I18N CONFIG!
*
* The main language for types: ${primaryLang}
* Generated at: ${new Date().toISOString()}
*/

${namespaceInterfaces.join('\n\n')}

${resourcesInterface}

${keyUnions}

${allKeysUnion}

${namespacedKeysUnion}

export type TranslationKey = NamespacedTranslationKeys

export type ExtractNamespace<T extends NamespacedTranslationKeys> = 
  T extends \`\${infer NS}:\${string}\` ? NS : never

export type ExtractKeyPath<T extends NamespacedTranslationKeys> = 
  T extends \`\${string}:\${infer K}\` ? K : never

export type KeysForNamespace<NS extends keyof Resources> = ${Object.keys(namespacePaths)
        .map(ns => `  NS extends '${ns}' ? ${ns.charAt(0).toUpperCase()}${ns.slice(1)}Keys :`)
        .join('\n')}
  never

export type { Resources }
`

    const outputPath = path.join(outputDir, 'resources.types.ts')
    await fs.writeFile(outputPath, generatedCode, 'utf-8')
  } catch (error) {
    process.exit(1)
  }
}

generateTypesScript()

export { generateTypesScript }
#!/usr/bin/env node

import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface TranslationResource {
  [key: string]: string | TranslationResource
}

interface Resources {
  [language: string]: {
    [namespace: string]: TranslationResource
  }
}

async function getAvailableLanguages(): Promise<string[]> {
  const localesDir = path.resolve(__dirname, '../../public/locales')

  try {
    const items = await fs.readdir(localesDir, { withFileTypes: true })
    const languages = items
      .filter(item => item.isDirectory())
      .map(item => item.name)

    console.log('Languages found:', languages)
    return languages
  } catch (error) {
    console.log('The "locales" folder was not found, empty list is used!')
    return []
  }
}

function filterEmptyTranslations(data: TranslationResource): TranslationResource {
  const filtered: TranslationResource = {}

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'object' && value !== null) {
      const filteredValue = filterEmptyTranslations(value)
      if (Object.keys(filteredValue).length > 0) {
        filtered[key] = filteredValue
      }
    } else if (value && value !== '') {
      filtered[key] = value
    }
  }

  return filtered
}

async function createBackup(): Promise<Resources> {
  const localesDir = path.resolve(__dirname, '../../public/locales')
  const backup: Resources = {}

  try {
    const languages = await getAvailableLanguages()

    for (const lang of languages) {
      const langDir = path.join(localesDir, lang)
      backup[lang] = {}

      try {
        const files = await fs.readdir(langDir)
        const jsonFiles = files.filter(file => file.endsWith('.json'))

        for (const file of jsonFiles) {
          const namespace = path.basename(file, '.json')
          const filePath = path.join(langDir, file)
          const content = await fs.readFile(filePath, 'utf-8')
          const data = JSON.parse(content) as TranslationResource

          const filteredData = filterEmptyTranslations(data)
          if (Object.keys(filteredData).length > 0) {
            backup[lang][namespace] = filteredData
          }
        }
      } catch (error) {
        console.log(`Error processing language ${lang}:`, error)
      }
    }

    console.log('A backup copy of existing translations has been created')
    console.log('Found languages:', Object.keys(backup))

    for (const [lang, namespaces] of Object.entries(backup)) {
      console.log(`   ${lang}:`)
      for (const [namespace, data] of Object.entries(namespaces)) {
        const keyCount = countKeys(data)
        console.log(`     ${namespace}: ${keyCount} keys`)
      }
    }

  } catch (error) {
    console.error('Error creating backup:', error)
  }

  return backup
}

function countKeys(obj: TranslationResource): number {
  let count = 0

  for (const [_, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      count += countKeys(value)
    } else {
      count++
    }
  }

  return count
}

function mergeTranslations(existing: TranslationResource, newData: TranslationResource): TranslationResource {
  const merged: TranslationResource = { ...existing }

  for (const [key, value] of Object.entries(newData)) {
    if (typeof value === 'object' && value !== null) {
      if (merged[key] && typeof merged[key] === 'object') {
        merged[key] = mergeTranslations(merged[key] as TranslationResource, value)
      } else {
        merged[key] = value
      }
    } else {
      if (!merged[key] || merged[key] === '') {
        merged[key] = value
      }
    }
  }

  return merged
}

function runI18nScanner(): void {
  try {
    console.log('[i18next-scanner]: Scanning for new keys...')

    execSync('yarn run i18n:scan', {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '../..')
    })

    console.log('[i18next-scanner] Scanning complete.')
  } catch (error) {
    console.error('[i18next-scanner]: Error while starting:', error)
    throw error
  }
}

async function restoreAndMergeTranslations(backup: Resources): Promise<void> {
  const localesDir = path.resolve(__dirname, '../../public/locales')

  try {
    const languages = await getAvailableLanguages()

    for (const lang of languages) {
      const langDir = path.join(localesDir, lang)

      try {
        const files = await fs.readdir(langDir)
        const jsonFiles = files.filter(file => file.endsWith('.json'))

        for (const file of jsonFiles) {
          const namespace = path.basename(file, '.json')
          const filePath = path.join(langDir, file)

          const currentContent = await fs.readFile(filePath, 'utf-8')
          const currentData = JSON.parse(currentContent) as TranslationResource

          const backupData = backup[lang]?.[namespace] || {}

          const mergedData = mergeTranslations(backupData, currentData)

          const currentString = JSON.stringify(currentData, null, 2)
          const mergedString = JSON.stringify(mergedData, null, 2)

          if (currentString !== mergedString) {
            await fs.writeFile(filePath, mergedString, 'utf-8')
            console.log(`Updated ${lang}/${namespace}.json`)
          } else {
            console.log(`No changes needed for ${lang}/${namespace}.json`)
          }
        }
      } catch (error) {
        console.log(`Error processing language ${lang}:`, error)
      }
    }

    console.log('All translations have been restored and merged.')

  } catch (error) {
    console.error('Error restoring translations:', error)
    throw error
  }
}

async function generateTypes(): Promise<void> {
  try {
    console.log('Generating TypeScript types...')

    execSync('yarn run i18n:generate-types', {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '../..')
    })

    console.log('Types generated successfully')
  } catch (error) {
    console.error('Types generated successfully:', error)
    throw error
  }
}

async function cleanupOldBackups(maxBackups: number = 10): Promise<void> {
  const maxBackupsEnv = process.env['I18N_MAX_BACKUPS']
  const maxBackupsToKeep = maxBackupsEnv ? parseInt(maxBackupsEnv, 10) : maxBackups


  if (isNaN(maxBackupsToKeep) || maxBackupsToKeep < 1) {
    console.log(`Invalid I18N_MAX_BACKUPS value: ${maxBackupsEnv}, using default: ${maxBackups}`)
  }

  const actualMaxBackups = isNaN(maxBackupsToKeep) || maxBackupsToKeep < 1 ? maxBackups : maxBackupsToKeep

  const backupsDir = path.resolve(__dirname, '../../backups/i18n')

  try {
    const items = await fs.readdir(backupsDir, { withFileTypes: true })
    const backupDirs = items
      .filter(item => item.isDirectory() && item.name.startsWith('i18n-backup-'))
      .map(item => {
        const timeStr = item.name.replace('i18n-backup-', '')

        const isoTimeStr = timeStr.replace(/-/g, (match, index) => {
          if (index >= 10) {
            return ':'
          }

          return match
        })

        return {
          name: item.name,
          path: path.join(backupsDir, item.name),
          time: new Date(isoTimeStr)
        }
      })
      .filter(item => !isNaN(item.time.getTime()))
      .sort((a, b) => b.time.getTime() - a.time.getTime())

    if (backupDirs.length > actualMaxBackups) {
      const toDelete = backupDirs.slice(actualMaxBackups)

      for (const backup of toDelete) {
        try {
          await fs.rm(backup.path, { recursive: true, force: true })
          console.log(`Removed old backup: ${backup.name} (created: ${backup.time.toISOString()})`)
        } catch (error) {
          console.log(`Error removing old backup ${backup.name}:`, error)
        }
      }

      console.log(`Cleaned up ${toDelete.length} old backups (keeping ${actualMaxBackups} most recent)`)
    } else {
      console.log(`No cleanup needed. Current backups: ${backupDirs.length}, max allowed: ${actualMaxBackups}`)
    }
  } catch (error) {
    console.log('Error cleaning up old backups:', error)
  }
}

async function createTimestampedBackup(): Promise<string> {
  const backupsDir = path.resolve(__dirname, '../../backups/i18n')
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const backupDir = path.join(backupsDir, `i18n-backup-${timestamp}`)

  try {
    await fs.mkdir(backupDir, { recursive: true })

    const localesDir = path.resolve(__dirname, '../../public/locales')
    const languages = await getAvailableLanguages()

    for (const lang of languages) {
      const langDir = path.join(localesDir, lang)
      const backupLangDir = path.join(backupDir, lang)

      try {
        await fs.mkdir(backupLangDir, { recursive: true })
        const files = await fs.readdir(langDir)
        const jsonFiles = files.filter(file => file.endsWith('.json'))

        for (const file of jsonFiles) {
          const sourcePath = path.join(langDir, file)
          const backupPath = path.join(backupLangDir, file)

          const content = await fs.readFile(sourcePath, 'utf-8')
          await fs.writeFile(backupPath, content, 'utf-8')
        }
      } catch (error) {
        console.log(`Error backing up language ${lang}:`, error)
      }
    }

    console.log(`Timestamped backup created at: ${backupDir}`)
    return backupDir

  } catch (error) {
    console.error('Error creating timestamped backup:', error)
    throw error
  }
}

async function safeExtract(): Promise<void> {
  try {
    console.log('Starting to extract i18n keys...')
    console.log('')

    console.log('Step 0: Create timestamped backup.')
    const backupPath = await createTimestampedBackup()
    console.log('')

    console.log('Step 1: Create a backup.')
    const backup = await createBackup()
    console.log('')

    console.log('Step 2: Scanning new keys.')
    runI18nScanner()
    console.log('')

    console.log('Step 3: Recover and merge translations.')
    await restoreAndMergeTranslations(backup)
    console.log('')

    console.log('Step 4: Generate types.')
    await generateTypes()
    console.log('')

    console.log('Step 5: Cleanup old backups.')
    await cleanupOldBackups()
    console.log('')

    console.log('Extraction completed successfully!')
    console.log(`Full backup available at: ${backupPath}`)

  } catch (error) {
    console.error('Error while extracting:', error)
    console.error('Check the timestamped backup for recovery if needed.')
    process.exit(1)
  }
}

safeExtract()

export { safeExtract }

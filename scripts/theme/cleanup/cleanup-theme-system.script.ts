#!/usr/bin/env tsx

/**
 * Cleanup theme script
 * Usage: tsx scripts/theme/cleanup/cleanup-theme-system.script.ts [--preview]
 */

import { spawn } from 'child_process'
import { existsSync } from 'fs'
import path from 'path'

const isWindows = process.platform === 'win32'
const isPreview = process.argv.includes('--preview') || process.argv.includes('--dry-run')

function showHelp() {
  console.log(`
Theme System Cleanup Script

Usage:
  tsx scripts/theme/cleanup-theme-system.script.ts [options]

Options:
  --preview, --dry-run   Preview what would be removed (Windows only)
  --help, -h             Show this help message

Examples:
  tsx scripts/theme/cleanup-theme-system.script.ts
  tsx scripts/theme/cleanup-theme-system.script.ts --preview

This script automatically detects OS and runs the appropriate cleanup script
`)
}

function runCleanupScript() {
  const scriptsDir = path.join(process.cwd(), 'scripts', 'theme', 'cleanup')
  let command: string
  let args: string[]
  let scriptPath: string

  if (isWindows) {
    scriptPath = path.join(scriptsDir, 'cleanup-theme-system.ps1')
    command = 'powershell'
    args = ['-ExecutionPolicy', 'Bypass', '-File', scriptPath]

    if (isPreview) {
      args.push('-WhatIf')
    }
  } else {
    scriptPath = path.join(scriptsDir, 'cleanup-theme-system.sh')
    command = 'bash'
    args = [scriptPath]

    if (isPreview) {
      console.log('Note: Bash script does not support preview mode. Running actual cleanup...')
    }
  }

  if (!existsSync(scriptPath)) {
    console.error(`Error: Cleanup script not found at ${scriptPath}`)
    process.exit(1)
  }

  console.log(`Running cleanup script for ${isWindows ? 'Windows' : 'Unix'}...`)

  if (isPreview && isWindows) {
    console.log('Preview mode: No files will be actually removed\n')
  }

  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: true
  })

  child.on('error', (error) => {
    console.error('Error running cleanup script:', error.message)
    process.exit(1)
  })

  child.on('close', (code) => {
    if (code === 0) {
      console.log('\nCleanup script completed successfully!')
    } else {
      console.error(`\nCleanup script failed with exit code: ${code}`)
      process.exit(code)
    }
  })
}

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  showHelp()

  process.exit(0)
}

runCleanupScript()

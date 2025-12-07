import { defineConfig } from 'vite'
import { createViteConfig } from './config'

export default defineConfig(({ mode }) => createViteConfig(mode))
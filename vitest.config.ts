// eslint-disable-next-line import/extensions
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'zustand-di',
    globals: true,
    environment: 'jsdom',
    dir: 'tests',
  },
})
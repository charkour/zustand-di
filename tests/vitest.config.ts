// eslint-disable-next-line import/extensions
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'zustand-di',
    globals: true,
    environment: 'jsdom',
    dir: '.',
    coverage: {
      include: ['**/src/**/*.{ts,tsx}'],
      allowExternal: true,
      reportOnFailure: true,
      reporter: ['text', 'json-summary', 'json'],
    },
  },
})
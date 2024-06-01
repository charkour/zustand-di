import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'zustand-di',
    globals: true,
    environment: 'happy-dom',
    dir: '.',
    coverage: {
      include: ['**/src/**/*.{ts,tsx}'],
      allowExternal: true,
      reportOnFailure: true,
      reporter: ['text', 'json-summary', 'json', 'html'],
    },
  },
})
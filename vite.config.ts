/// <reference types="vitest" />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'classmax',
      fileName: (format) => `${format}/index.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client'],
    },
  },
  test: {
    environment: 'happy-dom',
    coverage: {
      all: true,
      provider: 'istanbul',
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
      enabled: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/test-utils/**/*.{ts,tsx}'],
    },
    watch: false,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      outDir: 'dist',
      copyDtsFiles: false,
      logLevel: 'silent',
    }),
  ],
});

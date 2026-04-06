import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

// Polyfills for Node.js environment - MUST be before any imports
(globalThis as Record<string, unknown>).requestAnimationFrame = 
  ((cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 0)) as unknown as typeof requestAnimationFrame;
(globalThis as Record<string, unknown>).cancelAnimationFrame = 
  ((id: number) => clearTimeout(id as unknown as ReturnType<typeof setTimeout>)) as unknown as typeof cancelAnimationFrame;

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/unit/setup.ts'],
    include: [
      'src/**/*.{test,spec}.{ts,mts}',
      'server/**/*.{test,spec}.{ts,mts}',
      'tests/unit/**/*.test.ts',
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/src-tauri/**',
      '**/.next/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/generated/**',
        '**/tests/**',
      ],
      thresholds: {
        statements: 60,
        branches: 50,
        functions: 60,
        lines: 60,
      },
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});

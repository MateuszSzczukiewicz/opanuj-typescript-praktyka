import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: './utils/vitest/setup.node.ts',
    globals: true,
    environment: 'node',
    typecheck: {
      tsconfig: './tsconfig.json',
    },
  },
});

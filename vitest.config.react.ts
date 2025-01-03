import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './utils/vitest/setup.react.ts',
    globals: true,
    typecheck: {
      tsconfig: './utils/react/tsconfig.json',
    },
  },
});

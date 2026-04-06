import { defineConfig } from 'vitest/config';
import path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    css: {
      include: [/.+/],
    },
    server: {
      deps: {
        external: ['cssstyle', '@asamuzakjp/css-color'],
      },
    },
    pool: 'forks',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [tsconfigPaths()],
});

import { defineConfig } from 'vite';

// base must match the GitHub Pages subpath: owner.github.io/english-duo/
export default defineConfig({
  base: '/english-duo/',
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.js'],
  },
});
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Ako koristiš DOM u testovima
    globals: true, // Ako koristiš globalne funkcije kao jest
  },
});

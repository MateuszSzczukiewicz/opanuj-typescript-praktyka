import { defineConfig } from 'orval';

export default defineConfig({
  swapi: {
    output: {
      client: 'react-query',
      target: '../generated/swapi-client.ts',
      mode: 'split',
      mock: false,
      baseUrl: 'https://swapi.dev/api',
    },
    input: {
      target: './schema-sw.yml',
    },
  },
  dalle: {
    output: {
      client: 'react-query',
      target: '../generated/dalle-client.ts',
      mode: 'split',
      mock: false,
      baseUrl: 'https://api.openai.com/v1',
    },
    input: {
      target: './schema-dalle.yml',
    },
  },
});

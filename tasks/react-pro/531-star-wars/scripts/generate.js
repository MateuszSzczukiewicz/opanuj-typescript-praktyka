import { generate } from 'orval';

try {
  generate('./orval.config.ts');
} catch (error) {
  console.error('❌ Nie udało się wygenerować klienta (dodaj wątek na O:TS Forum):', error.message);
  process.exit(1);
}

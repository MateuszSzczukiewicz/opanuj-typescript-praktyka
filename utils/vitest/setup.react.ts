import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, expect, RunnerTask } from 'vitest';
import { toConfirmCompilation, trackVerify } from './helpers.ts';

expect.extend({
  toConfirmCompilation,
});

afterEach(() => {
  cleanup();
});

afterAll(({ tasks }: { tasks: RunnerTask[] }) => {
  trackVerify('react', tasks);
});

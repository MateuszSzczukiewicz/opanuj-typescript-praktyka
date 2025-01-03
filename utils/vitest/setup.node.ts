import { afterAll, expect, RunnerTask } from 'vitest';
import { toConfirmCompilation, trackVerify } from './helpers.ts';

expect.extend({
  toConfirmCompilation,
});

afterAll(({ tasks }: { tasks: RunnerTask[] }) => {
  trackVerify('core', tasks);
});

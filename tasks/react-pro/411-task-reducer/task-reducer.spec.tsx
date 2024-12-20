import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';

describe('Persisted state', () => {
  test('should compile component without errors', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });
});

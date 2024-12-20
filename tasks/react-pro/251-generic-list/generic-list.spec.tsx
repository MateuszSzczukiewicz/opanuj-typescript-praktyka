import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';

describe('Generic list', () => {
  test('should compile without errors', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('should error when using on a list without id', async () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'Fail.tsx'));
    expect(diagnostics).not.toConfirmCompilation();
  });
});

import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';

describe('Flexible children', () => {
  test('should compile without errors', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('should compile when children are provided', async () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'Pass.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('should error when children are not provided', async () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'Fail.tsx'));
    expect(diagnostics).not.toConfirmCompilation();
  });
});

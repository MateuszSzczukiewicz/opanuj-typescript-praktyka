import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';

describe('Three children', () => {
  test('should compile without errors', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('should compile with three children', async () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'Pass.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('should error when passing two and four children', async () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'Fail.tsx'));
    expect(diagnostics).not.toConfirmCompilation();
  });
});

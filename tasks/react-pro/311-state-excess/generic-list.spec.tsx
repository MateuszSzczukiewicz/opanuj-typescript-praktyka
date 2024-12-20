import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';

describe('State excess', () => {
  test('should compile without errors', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('should prevent adding extra properties to state', async () => {
    const fileContent = await fsPromises.readFile(join(__dirname, 'App.tsx'), 'utf8');
    const stateTypeDefender = Buffer.from('3a205461675374617465', 'hex').toString(); // encoded type to prevent spoiler
    try {
      expect(fileContent.includes(stateTypeDefender)).toBe(true);
    } catch {
      throw new Error(
        'Component should use recommended approach from the lesson to prevent adding extra properties to state',
      );
    }
  });
});

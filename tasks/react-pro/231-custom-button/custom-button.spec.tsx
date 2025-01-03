import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';

describe('Custom button', () => {
  test('should compile without errors', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('should use proper helper to extract button props', async () => {
    const fileContent = await fsPromises.readFile(join(__dirname, 'App.tsx'), 'utf8');
    const extractHelperFirst = Buffer.from('436f6d706f6e656e7450726f7073', 'hex').toString(); // encoded type to prevent spoiler
    const extractHelperSecond = Buffer.from('496e7472696e736963456c656d656e7473', 'hex').toString(); // encoded type to prevent spoiler
    try {
      expect(
        fileContent.includes(extractHelperFirst) || fileContent.includes(extractHelperSecond),
      ).toBe(true);
    } catch {
      throw new Error(
        'Component should use recommended approach from the lesson for extracting button props',
      );
    }
  });
});

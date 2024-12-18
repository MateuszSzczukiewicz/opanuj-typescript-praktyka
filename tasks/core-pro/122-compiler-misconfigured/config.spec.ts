import { join } from 'path';
import { describe, expect, it } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';

describe('TS Config', () => {
    it('should compile when strict mode is enabled', () => {
        const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
        expect(diagnostics).toConfirmCompilation();
    });
});

import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';

describe('Intro', () => {
    it('should confirm compilation', () => {
        const diagnostics = getCompilerDiagnostics(join(__dirname, 'hello-world.ts'));
        expect(diagnostics).toConfirmCompilation();
    });
});

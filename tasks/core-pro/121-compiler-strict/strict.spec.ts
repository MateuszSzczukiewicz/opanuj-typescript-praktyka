import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';
import { UserModule, UserType } from './task.ts';

describe('Strict mode', () => {
    it('should compile when strict mode is enabled', () => {
        const diagnostics = getCompilerDiagnostics(join(__dirname, 'user-management.ts'));
        expect(diagnostics).toConfirmCompilation();
    });

    it('should support filtering users', () => {
        const userModule = new UserModule();
        userModule.addUser({ id: 1, name: 'John' });
        userModule.addUser({ id: 2, name: 'Jane' });
        userModule.addUser({ id: 3, name: 'Kate' });

        userModule.removeUser(2);

        const result = userModule.filterUsers((user: UserType) => ({ isValid: user.name.startsWith('J') }));
        expect(result).toEqual([{ id: 1, name: 'John' }]);
    });
});

import { join } from 'path';
import { describe, expect, it } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { hasAccess, User, UserPermission, UserRole } from './task.ts';

describe('Using enums', () => {
    it('should compile with proper values', () => {
        const diagnostics = getCompilerDiagnostics(join(__dirname, 'enum-pass.ts'));
        expect(diagnostics).toConfirmCompilation();
    });

    it('should not compile with values outside of enum', () => {
        const diagnostics = getCompilerDiagnostics(join(__dirname, 'enum-fail.ts'));
        expect(diagnostics).not.toConfirmCompilation();
    });

    it('should properly check permissions for editor', () => {
        const userEditor: User = {
            role: UserRole.EDITOR,
            permissions: [UserPermission.READ, UserPermission.WRITE],
        };

        expect(hasAccess(userEditor, UserPermission.READ)).toBe(true);
        expect(hasAccess(userEditor, UserPermission.WRITE)).toBe(true);
        expect(hasAccess(userEditor, UserPermission.DELETE)).toBe(false);
    });

    it('should properly check permissions for admin', () => {
        const userAdmin: User = {
            role: UserRole.ADMIN,
            permissions: [UserPermission.READ, UserPermission.WRITE, UserPermission.DELETE],
        };

        expect(hasAccess(userAdmin, UserPermission.DELETE)).toBe(true);
    });
});

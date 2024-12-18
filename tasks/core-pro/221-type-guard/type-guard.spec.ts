import { join } from 'path';
import { describe, expect, it } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { getNotificationText } from './task.ts';

describe('Using type guards', () => {
    it('should compile without errors', () => {
        const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
        expect(diagnostics).toConfirmCompilation();
    });

    it('should return correct notification text', () => {
        expect(getNotificationText({ type: 'email', emailAddress: 'test@test.com', content: 'Hello man!' })).toBe(
            'Hello man!',
        );

        expect(getNotificationText({ type: 'sms', phoneNumber: 1234567890, message: 'Hi there!' })).toBe('Hi there!');

        expect(getNotificationText({ type: 'system', log: 'System error' })).toBe('System error');
    });

    it('should handle unknown notification type', () => {
        expect(getNotificationText({ type: 'push', content: 'Hello man!' })).toBe('Unknown notification');
    });
});

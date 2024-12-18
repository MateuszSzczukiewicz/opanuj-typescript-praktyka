import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';
import { InventoryStockTracker, MessageBus, OrderCancelledMessage, OrderCreatedMessage } from './task.ts';

describe('Generic Message Bug', () => {
    it('should compile', () => {
        const diagnostics = getCompilerDiagnostics(join(__dirname, './task.ts'));
        expect(diagnostics).toConfirmCompilation();
    });

    it('should track products in stock', () => {
        const bus = new MessageBus();
        const stock = {
            PRD1: 10,
            PRD2: 10,
        };
        const tracker = new InventoryStockTracker(bus, stock);

        bus.publish<OrderCreatedMessage>({
            type: 'orderCreated',
            payload: {
                orderId: '1',
                items: [{ productId: 'PRD1', quantity: 1 }],
            },
        });

        bus.publish<OrderCreatedMessage>({
            type: 'orderCreated',
            payload: {
                orderId: '2',
                items: [{ productId: 'PRD1', quantity: 3 }],
            },
        });

        bus.publish<OrderCreatedMessage>({
            type: 'orderCreated',
            payload: {
                orderId: '3',
                items: [{ productId: 'PRD2', quantity: 2 }],
            },
        });

        bus.publish<OrderCancelledMessage>({
            type: 'orderCancelled',
            payload: { orderId: '1' },
        });

        expect(tracker.getStock('PRD1')).toBe(7);
        expect(tracker.getStock('PRD2')).toBe(8);
    });
});

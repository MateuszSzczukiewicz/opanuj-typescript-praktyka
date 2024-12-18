export interface OrderCreatedMessage {
    type: 'orderCreated';
    payload: Order;
}

export interface OrderCancelledMessage {
    type: 'orderCancelled';
    payload: Omit<Order, 'items'>;
}

type Messages = {
    orderCreated: OrderCreatedMessage;
    orderCancelled: OrderCancelledMessage;
};

type MessageType = keyof Messages;

interface Order {
    readonly orderId: string;
    readonly items: ReadonlyArray<{ productId: string; quantity: number }>;
}

type Subscriber<T> = (message: T) => void;

export class MessageBus {
    private subscribers: {
        [K in MessageType]: Subscriber<Messages[K]>[];
    };

    constructor() {
        this.subscribers = {
            orderCreated: [],
            orderCancelled: []
        };
    }

    subscribe<K extends keyof Messages>(
        type: K,
        subscriber: Subscriber<Messages[K]>
    ): void {
        this.subscribers[type].push(subscriber);
    }

    publish<K extends MessageType>(message: Messages[K]): void {
        const subs = this.subscribers[message.type as K];
        for (const sub of subs) {
            sub(message);
        }
    }
}

export class InventoryStockTracker {
    constructor(
        private bus: MessageBus,
        private stock: Record<string, number>,
        private orders: Record<string, Order> = {}
    ) {
        this.subscribeToMessages();
    }

    private subscribeToMessages(): void {
        this.bus.subscribe("orderCreated", (message) => {
            this.orders[message.payload.orderId] = message.payload;

            for (const item of message.payload.items ?? []) {
                this.stock[item.productId] = (this.stock[item.productId] || 0) - item.quantity;
            }
        });

        this.bus.subscribe("orderCancelled", (message) => {
            const cancelledOrder = this.orders[message.payload.orderId];

            if (!cancelledOrder) {
                console.warn(`Zamówienie ${message.payload.orderId} nie istnieje lub nie ma przedmiotów!`);
                return;
            }

            for (const item of cancelledOrder.items || []) {
                this.stock[item.productId] = (this.stock[item.productId] || 0) + item.quantity;
            }

            delete this.orders[message.payload.orderId];
        });
    }

    getStock(productId: string): number {
        return this.stock[productId] || 0;
    }
}

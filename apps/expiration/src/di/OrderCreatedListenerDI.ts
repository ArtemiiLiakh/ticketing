import { OrderCreatedListener } from '../listeners/OrderCreatedListener';
import { OrderExpiredQueue } from '../messageQueue/queues/OrderExpiredQueue';

export const OrderCreatedListenerDI = new OrderCreatedListener(OrderExpiredQueue);
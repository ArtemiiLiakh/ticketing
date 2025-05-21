import { OrderCancelledListener } from '@components/eventListeners/OrderCancelledListener';
import { OrderCreatedListener } from '@components/eventListeners/OrderCreatedListener';
import { OrderRepositoryDI } from './OrderRepositoryDI';

export const OrderCancelledListenerDI = new OrderCancelledListener(OrderRepositoryDI);
export const OrderCreatedListenerDI = new OrderCreatedListener(OrderRepositoryDI);
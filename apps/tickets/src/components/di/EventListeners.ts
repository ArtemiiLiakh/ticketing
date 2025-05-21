import { OrderCancelledListener } from '@components/eventListeners/OrderCancelledListener'
import { OrderCreatedListener } from '@components/eventListeners/OrderCreatedListener'
import { TicketRepositoryDI } from './TicketRepositoryDI'
import { NATSEventBusDI } from '../../di/EventBusDI'

export const OrderCreatedListenerDI = new OrderCreatedListener(TicketRepositoryDI, NATSEventBusDI)
export const OrderCancelledListenerDI = new OrderCancelledListener(TicketRepositoryDI, NATSEventBusDI)
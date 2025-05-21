import { GetByIdOrderHandler } from '@components/orders/handlers/GetById/GetByIdOrderHandler';
import { GetByUserHandler } from '@components/orders/handlers/GetByUser/GetByUserHandler';
import config from '@config';
import { NATSEventBusDI } from '@di/EventBusDI';
import { CancelOrderHandler } from '../orders/handlers/Cancel/CancelOrderHandler';
import { CreateOrderHandler } from '../orders/handlers/Create/CreateOrderHandler';
import { OrderComponent } from '../orders/OrderComponent';
import { OrderRepositoryDI } from './OrderRepositoryDI';
import { TicketRepositoryDI } from './TicketRepositoryDI';

export const OrderComponentDI = new OrderComponent(
  new CreateOrderHandler(TicketRepositoryDI, OrderRepositoryDI, NATSEventBusDI, config),
  new CancelOrderHandler(OrderRepositoryDI, NATSEventBusDI),
  new GetByIdOrderHandler(OrderRepositoryDI, TicketRepositoryDI),
  new GetByUserHandler(OrderRepositoryDI),
);
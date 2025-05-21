import { Order } from '@domain/Order';
import { Ticket } from '@domain/Ticket';

export interface GetByIdOrderResponse {
  order: Order,
  ticket: Ticket,
}; 
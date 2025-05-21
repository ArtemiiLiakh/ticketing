import { OrderStatus } from '@app2/common/types';

export interface CreateOrderDTO {
  ticketId: string;
  userId: string;
  status: OrderStatus;
}
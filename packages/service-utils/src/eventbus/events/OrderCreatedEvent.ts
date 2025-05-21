import { OrderStatus } from '@app2/common/types';

export interface OrderCreatedEvent {
  id: string;
  status: OrderStatus;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  ticket: {
    id: string;
    price: number;
  };
  version: number;
}
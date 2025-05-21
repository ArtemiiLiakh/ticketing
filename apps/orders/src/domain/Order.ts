import { OrderStatus } from '@app2/common/types';

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticketId: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}
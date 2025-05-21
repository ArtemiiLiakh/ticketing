import { OrderStatus } from '@app2/common/types';

export interface Order {
  id: string;
  userId: string;
  price: number;
  status: OrderStatus;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}
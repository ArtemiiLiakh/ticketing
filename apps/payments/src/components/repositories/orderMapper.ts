import { Order } from '@domain/Order';
import { OrderDocument } from '@models/OrderModel';

export const orderMapper = (order: OrderDocument): Order => ({
  id: order.publicId,
  userId: order.userId,
  price: order.price,
  status: order.status,
  expiresAt: order.expiresAt,
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
  version: order.version,
});
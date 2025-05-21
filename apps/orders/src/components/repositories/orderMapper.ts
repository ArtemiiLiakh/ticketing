import { Order } from '@domain/Order';
import { OrderDocument } from '@models/orders';

export const orderMapper = (order: OrderDocument): Order => ({
  id: order.publicId,
  ticketId: order.ticket.publicId,
  userId: order.userId,
  status: order.status,
  createdAt: order.createdAt,
  expiresAt: order.expiresAt,
  updatedAt: order.updatedAt,
  version: order.version,
});
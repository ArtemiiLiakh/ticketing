import { Nullable, OrderStatus, PaginationByPageDTO, PaginationByPageResponse } from '@app2/common/types';
import { Order } from '@domain/Order';
import { OrderModel } from '@models/orders';
import { orderMapper } from './orderMapper';
import { TicketModel } from '@models/tickets';

interface CreateOrder {
  ticketId: string;
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
}

export class OrderRepository {
  async create ({ ticketId, userId, expiresAt, status }: CreateOrder): Promise<Order> {
    const ticket = await TicketModel.findOne({
      publicId: ticketId,
    });

    if (!ticket) throw new Error(`Ticket with ticket id ${ticketId} not found for order`);

    const order = await OrderModel.create({
      userId,
      expiresAt,
      status,
      ticket: {
        _id: ticket._id,
      },
    });

    return orderMapper(order);
  }

  async setStatus (orderId: string, status: OrderStatus): Promise<void> {
    await OrderModel.updateOne({
      publicId: orderId,
    }, {
      status,
    });
  }

  async getById (id: string): Promise<Nullable<Order>> {
    const order = await OrderModel.findOne({
      publicId: id,
    }).populate('ticket');

    if (!order) return null;

    return orderMapper(order);
  }

  async getByUser (userId: string, { page, pageSize }: PaginationByPageDTO): Promise<PaginationByPageResponse<Order>> {
    const skip = page*pageSize;

    const orders = await OrderModel.find({
      userId,
    }, {}, {
      skip,
      limit: pageSize,
    });

    const ordersCount = await OrderModel.countDocuments({ userId });

    const totalPages = Math.ceil(ordersCount/page);
    const hasNext = (ordersCount-skip-2*pageSize) > 0;
    return {
      data: orders.map(orderMapper),
      pagination: {
        page,
        pageSize,
        hasNext,
        totalPages,
      },
    };
  }
}
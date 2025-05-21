import { Order } from '@domain/Order';
import { OrderModel } from '@models/OrderModel';
import { orderMapper } from './orderMapper';
import { Nullable, OrderStatus } from '@app2/common/types';
import { TransactionalRepository } from '@app2/service-utils/unitOfWork';
import { ClientSession } from 'mongoose';

interface CreateOrder {
  id?: string,
  userId: string,
  price: number,
  status: OrderStatus,
  expiresAt: Date,
  createdAt: Date,
  updatedAt: Date,
}

export class OrderRepository implements TransactionalRepository<ClientSession> {
  private session: ClientSession | undefined;
  
  async create(data: CreateOrder): Promise<Order> {
    const order = new OrderModel({
      publicId: data.id,
      userId: data.userId,
      price: data.price,
      status: data.status,
      expiresAt: data.expiresAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });

    await order.save({ session: this.session });

    return orderMapper(order);
  }

  async getById (id: string): Promise<Nullable<Order>> {
    const order = await OrderModel.findOne({
      publicId: id,
    }, {}, { session: this.session });

    if (!order) return null;

    return orderMapper(order);
  } 

  async setStatus (id: string, status: OrderStatus): Promise<void> {
    await OrderModel.updateOne({
      publicId: id,
    }, {
      status,
    }, { session: this.session });
  }

  setSession(session: ClientSession): void {
    this.session = session;
  }
}
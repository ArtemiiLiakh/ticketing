import { Channels, EventBusListener, EventMessage, QueueGroups } from '@app2/service-utils/eventbus';
import { OrderCreatedEvent } from '@app2/service-utils/eventbus/events';
import { OrderRepository } from '@components/repositories/OrderRepository';

export class OrderCreatedListener extends EventBusListener<OrderCreatedEvent> {
  channel = Channels.ORDER_CREATED;
  queueGroup = QueueGroups.PAYMENT_GROUP;
  
  constructor (
    private readonly orderRepository: OrderRepository,
  ) { super() }

  async onMessage(data: OrderCreatedEvent, msg: EventMessage): Promise<void> {
    await this.orderRepository.create({
      id: data.id,
      userId: data.userId,
      price: data.ticket.price,
      status: data.status,
      expiresAt: data.expiresAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });

    msg.ack();
  }
}
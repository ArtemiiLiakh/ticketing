import { OrderStatus } from '@app2/common/types';
import { Channels, EventBusClient, EventBusListener, EventMessage, QueueGroups } from "@app2/service-utils/eventbus";
import { ExpirationCompletedEvent, OrderCancelledEvent } from '@app2/service-utils/eventbus/events';
import { OrderRepository } from '@components/repositories/OrderRepository';

export class ExpirationCompleteListener extends EventBusListener<ExpirationCompletedEvent> {
  channel = Channels.EXPIRATION_COMPLETED;
  queueGroup = QueueGroups.ORDER_GROUP;
  
  constructor (
    private readonly orderRepository: OrderRepository,
    private readonly eventBusClient: EventBusClient,
  ) { super() }

  async onMessage({ orderId }: ExpirationCompletedEvent, msg: EventMessage): Promise<void> {
    const order = await this.orderRepository.getById(orderId);
    
    if (!order) {
      throw new Error('Order not found');
    }

    await this.orderRepository.setStatus(orderId, OrderStatus.CANCELLED);

    await this.eventBusClient.publish<OrderCancelledEvent>(Channels.ORDER_CANCELLED, {
      id: order.id,
      ticket: {
        id: order.ticketId,
      },
      version: ++order.version,
    });

    msg.ack();
  }
}
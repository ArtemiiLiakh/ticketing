import { OrderStatus } from '@app2/common/types';
import { Channels, EventBusListener, EventMessage, QueueGroups } from '@app2/service-utils/eventbus';
import { OrderCancelledEvent } from '@app2/service-utils/eventbus/events';
import { OrderRepository } from '@components/repositories/OrderRepository';

export class OrderCancelledListener extends EventBusListener<OrderCancelledEvent> {
  channel = Channels.ORDER_CANCELLED;
  queueGroup = QueueGroups.PAYMENT_GROUP;
  
  constructor (
    private readonly orderRepository: OrderRepository,
  ) { super() }

  async onMessage({ id, version }: OrderCancelledEvent, msg: EventMessage): Promise<void> {
    const order = await this.orderRepository.getById(id);
    
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }

    if (order.version !== version-1) {
      throw new Error(`Order version are incompitable provided order version is ${version} but current ${order.version}. Order id: ${id}`)
    }

    this.orderRepository.setStatus(id, OrderStatus.CANCELLED);

    msg.ack();
  }
}
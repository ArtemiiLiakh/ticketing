import { OrderStatus } from '@app2/common/types';
import { Channels, EventBusListener, EventMessage, QueueGroups } from '@app2/service-utils/eventbus';
import { PaymentCreatedEvent } from '@app2/service-utils/eventbus/events';
import { OrderRepository } from '@components/repositories/OrderRepository';

export class PaymentCreatedListener extends EventBusListener<PaymentCreatedEvent> {
  channel = Channels.PAYMENT_CREATED;
  queueGroup = QueueGroups.ORDER_GROUP;

  constructor (
    private readonly orderRepository: OrderRepository,
  ) { super() }

  async onMessage({ orderId }: PaymentCreatedEvent, msg: EventMessage): Promise<void> {
    const order = await this.orderRepository.getById(orderId);
    
    if (!order) {
      throw new Error(`Order with id '${orderId}' not found`);
    }

    await this.orderRepository.setStatus(orderId, OrderStatus.PENDING);

    msg.ack();
  }
}
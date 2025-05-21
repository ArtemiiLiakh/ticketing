import { OrderStatus } from '@app2/common/types';
import { Channels, EventBusListener, EventMessage, QueueGroups } from '@app2/service-utils/eventbus';
import { PaymentCompletedEvent } from '@app2/service-utils/eventbus/events';
import { OrderRepository } from '@components/repositories/OrderRepository';

export class PaymentCompletedListener extends EventBusListener<PaymentCompletedEvent> {
  channel = Channels.PAYMENT_CONFIRMED;
  queueGroup = QueueGroups.ORDER_GROUP;

  constructor (
    private readonly orderRepository: OrderRepository,
  ) { super() }

  async onMessage({ orderId }: PaymentCompletedEvent, msg: EventMessage): Promise<void> {
    const order = await this.orderRepository.getById(orderId);
    
    if (!order) {
      throw new Error(`Order with id '${orderId}' not found`);
    }

    await this.orderRepository.setStatus(orderId, OrderStatus.COMPLETE);
    
    msg.ack();
  }
}
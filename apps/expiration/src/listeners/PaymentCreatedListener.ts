import { Channels } from '@app2/service-utils/eventbus/Channels';
import { PaymentCreatedEvent } from '@app2/service-utils/eventbus/events';
import { EventBusListener, EventMessage } from '@app2/service-utils/eventbus/Listener';
import { QueueGroups } from '@app2/service-utils/eventbus/QueueGroups';
import { MessageQueue } from '../messageQueue/MessageQueue';

export class PaymentCreatedListener extends EventBusListener<PaymentCreatedEvent> {
  channel = Channels.PAYMENT_CREATED;
  queueGroup = QueueGroups.EXPIRATION_GROUP;

  constructor (
    private readonly messageQueue: MessageQueue,
  ) { super() }

  async onMessage(data: PaymentCreatedEvent, msg: EventMessage): Promise<void> {
    console.log('remove data id:', data.orderId);
    await this.messageQueue.removeJob(data.orderId);
    msg.ack();
  }
}
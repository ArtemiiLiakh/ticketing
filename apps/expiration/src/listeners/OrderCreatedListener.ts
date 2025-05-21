import { Channels } from '@app2/service-utils/eventbus/Channels';
import { OrderCreatedEvent } from '@app2/service-utils/eventbus/events';
import { EventBusListener, EventMessage } from '@app2/service-utils/eventbus/Listener';
import { QueueGroups } from '@app2/service-utils/eventbus/QueueGroups';
import { MessageQueue } from '../messageQueue/MessageQueue';
import { OrderExpiredPayload } from '../messageQueue/payloads/OrderExpiredPayload';

export class OrderCreatedListener extends EventBusListener<OrderCreatedEvent> {
  channel = Channels.ORDER_CREATED;
  queueGroup = QueueGroups.EXPIRATION_GROUP;

  constructor (
    private readonly messageQueue: MessageQueue<OrderExpiredPayload>,
  ) { super () }

  async onMessage(data: OrderCreatedEvent, msg: EventMessage): Promise<void> {
    const delay = new Date(data.expiresAt).getTime() - Date.now();

    await this.messageQueue.add({
      orderId: data.id,
    }, {
      jobId: data.id,
      delay,
    });

    msg.ack();
  }
}